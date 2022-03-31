<template lang="pug">
div(
  ref="actionsLayoutRef",
  :class="styles.ActionsLayout",
)
  ButtonGroup(spacing="extraTight")
    template(
      v-if="measuredActions.showable.length > 0"
      v-for="action in measuredActions.showable",
      :key="action.content",
    )
      SecondaryAction(
        v-if="action.content",
        v-bind="action",
        @get-offset-width="handleActionsOffsetWidth"
      ) {{ action.content }}
    template(
      v-for="action in actions",
      :key="action.content",
    )
      SecondaryAction(
        v-if="!measuredActions.showable.length && !measuredActions.rolledUp.includes(action)",
        v-bind="action",
        @click="action.onAction ? action.onAction() : undefined",
        @get-offset-width="handleActionsOffsetWidth",
      ) {{ action.content }}
    MenuGroup(
      v-for="group in filteredGroups",
      :key="group.title",
      v-bind="menuGroupProps(group)",
      :actions="getMenuGroupActions(group)",
      @open="handleMenuGroupToggle",
      @close="handleMenuGroupClose",
      @get-offset-width="handleActionsOffsetWidth",
    )
  EventListener(
    event="resize",
    :handler="handleResize",
  )
</template>

<script setup lang="ts">
import { inject, ref, computed, onUpdated } from 'vue';
import debounce from 'lodash/debounce';
import styles from '@/classes/ActionMenu-Actions.json';
import { ButtonGroup, EventListener } from '@/components';
import type { ActionListItemDescriptor } from '@/components/ActionList/utils';
import type { MenuActionDescriptor } from '@/utilities/interface';
import type { MenuGroupDescriptor } from '../MenuGroup/utils';
import { MenuGroup } from '../MenuGroup';
import { SecondaryAction } from '../SecondaryAction';

interface Props {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
}

interface MeasuredActions {
  showable: MenuActionDescriptor[];
  rolledUp: (MenuActionDescriptor | MenuGroupDescriptor)[];
}

const ACTION_SPACING = 8;

const lang = inject('lang') as Record<string, any>;

const props = defineProps<Props>();

const actionsLayoutRef = ref<HTMLDivElement | null>(null);
const menuGroupWidth = ref<number>(0);
const availableWidth = ref<number>(0);
const actionsAndGroupsLength = ref<number>(0);
const timesMeasured = ref(0);
const actionWidths = ref<number[]>([]);

const activeMenuGroup = ref<string | null>(null);
const measuredActions = ref<MeasuredActions>({
  showable: [],
  rolledUp: [],
});

const defaultRollupGroup = ref<MenuGroupDescriptor>({
  title: lang.Polaris.ActionMenu.Actions.moreActions,
  actions: [],
});

const lastMenuGroup = computed(() => {
  if (props.groups && props.groups.length) {
    return [...props.groups].pop();
  }

  return [];
});

const lastMenuGroupWidth = computed(() => [...actionWidths.value].pop() || 0);

const handleActionsOffsetWidth = (width: number) => {
  actionWidths.value = [...actionWidths.value, width];
}

const handleMenuGroupToggle = (group: string) => {
  if (activeMenuGroup.value) {
    activeMenuGroup.value = null;
  } else {
    activeMenuGroup.value = group;
  }
}

const handleMenuGroupClose = () => {
  activeMenuGroup.value = null;
}

const combinedGroups = computed(() => {
  if (props.groups) {
    return [...props.groups, defaultRollupGroup.value];
  }

  return [defaultRollupGroup.value];
});

const filteredGroups = computed(() => {
  return combinedGroups.value.filter((group) => {
    return props.groups && props.groups.length === 0
      ? group
      : group === lastMenuGroup.value ||
          !measuredActions.value.rolledUp.some(
            (rolledUpGroup) =>
              isMenuGroup(rolledUpGroup) && rolledUpGroup.title === group.title,
          );
  });
});

const isDefaultGroup = (group: MenuGroupDescriptor) => group === defaultRollupGroup.value;
const isLastMenuGroup = (group: MenuGroupDescriptor) => group === lastMenuGroup.value;

const finalRolledUpActions = computed(() => {
  return measuredActions.value.rolledUp.reduce(
    (memo, action) => {
      memo.push(...(isMenuGroup(action) ? action.actions : [action]));

      return memo;
    },
    [] as ActionListItemDescriptor[],
  );
});

const menuGroupProps = (group: MenuGroupDescriptor) => {
  const { actions, ...rest } = group;
  return { ...rest, active: activeMenuGroup.value === group.title };
}

const getMenuGroupActions = (group: MenuGroupDescriptor): ActionListItemDescriptor[] => {
  // The condition is `(!x && !y) || (!x && y) || (x && z && w)`
  // there are too many ways to write this condition, e.g: !x || (w && z)
  // But I want to keep it simple and readable as original conditions from polaris-react.
  if (!isDefaultGroup(group) && !isLastMenuGroup(group)) {
    return group.actions;
  }

  if (!isDefaultGroup(group) && isLastMenuGroup(group)) {
    return [...finalRolledUpActions.value, ...group.actions];
  }

  if (isDefaultGroup(group) && (!props.groups || props.groups.length === 0) && finalRolledUpActions.value.length) {
    return finalRolledUpActions.value;
  }

  return [];
}

const updateActions = () => {
  let actionsAndGroups: MenuActionDescriptor[] = [...(props.actions || []), ...(props.groups || [])];

  if (props.groups && props.groups.length > 0) {
    // We don't want to include actions from the last group
    // since it is always rendered with its own actions
    actionsAndGroups = [...actionsAndGroups].slice(
      0,
      actionsAndGroups.length - 1,
    );
  }
  const showable = actionsAndGroups.slice(0, measuredActions.value.showable.length);
  const rolledUp = actionsAndGroups.slice(
    measuredActions.value.showable.length,
    actionsAndGroups.length,
  );

  measuredActions.value = {
    showable,
    rolledUp,
  };
};

onUpdated(() => {
  updateActions();

  if (!actionsLayoutRef.value) {
    return;
  }

  availableWidth.value = actionsLayoutRef.value.offsetWidth;
  if (
    // Allow measuring twice
    // This accounts for the initial paint and re-flow
    timesMeasured.value >= 2 &&
    [...(props.actions || []), ...(props.groups || [])].length === actionsAndGroupsLength.value
  ) {
    updateActions();
    return;
  }
  measureActions();
});

const measureActions = () => {
  if (
    actionWidths.value.length === 0 ||
    availableWidth.value === 0
  ) {
    return;
  }

  const actionsAndGroups = [...(props.actions || []), ...(props.groups || [])];

  if (actionsAndGroups.length === 1) {
    measuredActions.value = {
      showable: actionsAndGroups,
      rolledUp: [],
    };
    return;
  }

  let currentAvailableWidth = availableWidth.value;
  let newShowableActions: MenuActionDescriptor[] = [];
  let newRolledUpActions: (MenuActionDescriptor | MenuGroupDescriptor)[] = [];

  actionsAndGroups.forEach((action, index) => {
    const canFitAction =
      actionWidths.value[index] +
      menuGroupWidth.value +
      ACTION_SPACING +
      lastMenuGroupWidth.value <=
      currentAvailableWidth;

    if (canFitAction) {
      currentAvailableWidth -=
        actionWidths.value[index] + ACTION_SPACING * 2;
      newShowableActions = [...newShowableActions, action];
    } else {
      currentAvailableWidth = 0;
      // Find last group if it exists and always render it as a rolled up action below
      if (action === lastMenuGroup.value) { return; }
      newRolledUpActions = [...newRolledUpActions, action];
    }
  });

  measuredActions.value = {
    showable: newShowableActions,
    rolledUp: newRolledUpActions,
  };

  timesMeasured.value += 1;
  actionsAndGroupsLength.value = actionsAndGroups.length;
};

const handleResize = () => {
  debounce(
    () => {
      if (!actionsLayoutRef.value) { return; }
      availableWidth.value = actionsLayoutRef.value.offsetWidth;
      // Set timesMeasured to 0 to allow re-measuring
      timesMeasured.value = 0;
      measureActions();
    },
    50,
    {leading: false, trailing: true},
  );
};

function isMenuGroup(
  actionOrMenuGroup: MenuGroupDescriptor | MenuActionDescriptor,
): actionOrMenuGroup is MenuGroupDescriptor {
  return 'title' in actionOrMenuGroup;
}
</script>

<style lang="scss">
@import 'polaris-react/src/components/ActionMenu/components/Actions/Actions.scss';
</style>

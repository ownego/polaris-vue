<template lang="pug">
div(:class="styles.ActionsLayoutOuter")
  ActionsMeasurer(
    :actions="actions",
    :groups="groups",
    @measurements="handleMeasurement",
  )
  div(:class="classname")
    SecondaryAction(
      v-for="action, index in actionsFilter",
      v-bind="getSecondaryActionProps(index)"
      :key="action.content",
      @click="action.onAction?.() || undefined",
    ) {{ action.content }}
    MenuGroup(
      v-for="group in filteredGroups",
      v-bind="menuGroupProps(group)",
      :key="group.title",
      :title="group.title",
      :actions="getMenuGroupActions(group)",
      @open="handleMenuGroupToggle",
      @close="handleMenuGroupClose",
    )
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  reactive,
  getCurrentInstance,
} from 'vue';
import { getVisibleAndHiddenActionsIndices } from '@polaris/components/ActionMenu/components/Actions/utilities';
import type {
  ActionListItemDescriptor,
  MenuActionDescriptor,
  ActionListSection,
  MenuGroupDescriptor,
} from '@/utilities/types';
import useI18n from '@/use/useI18n';
import { classNames } from '@/utilities/css';
import styles from '@polaris/components/ActionMenu/components/Actions/Actions.module.css';
import { SecondaryAction, MenuGroup } from '../index';
import { ActionsMeasurer } from './components/ActionMeasurer';
import type { MenuGroupProps } from '../MenuGroup/MenuGroup.vue';
import type { SecondaryActionProps } from '../SecondaryAction/SecondaryAction.vue';
import type { ActionsMeasurements } from './components/ActionMeasurer/ActionsMeasurer.vue';

interface Props {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
}

interface ActionsState {
  visibleActions: number[];
  hiddenActions: number[];
  visibleGroups: number[];
  hiddenGroups: number[];
  actionsWidths: number[];
  containerWidth: number;
  disclosureWidth: number;
  hasMeasured: boolean;
}

const i18n = useI18n();
const currentInstance = getCurrentInstance();

const props = defineProps<Props>();

const emits = defineEmits<{
  /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
  (event: 'action-rollup', hasRolledUp: boolean): void;
}>();

const rollupActiveRef = ref<boolean | null>(null);
const activeMenuGroup = ref<string | null>(null);

const defaultRollupGroup = ref<MenuGroupDescriptor>({
  title: i18n.translate('Polaris.ActionMenu.Actions.moreActions'),
  actions: [],
});

const state = reactive<ActionsState>({
  disclosureWidth: 0,
  containerWidth: Infinity,
  actionsWidths: [],
  visibleActions: [],
  hiddenActions: [],
  visibleGroups: [],
  hiddenGroups: [],
  hasMeasured: false,
});

const classname = computed(() => classNames(
  styles.ActionsLayout,
  !state.hasMeasured && styles['ActionsLayout--measuring'],
));

const getSecondaryActionProps = (index: number) => (
  props.actions?.[index] as SecondaryActionProps
);

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

const actionsOrDefault = computed(() => props.actions ?? []);
const groupsOrDefault = computed(() => props.groups ?? []);

const groupsToFilter = computed(() =>
  state.hiddenGroups.length > 0 || state.hiddenActions.length > 0
    ? [...groupsOrDefault.value, defaultRollupGroup.value]
    : [...groupsOrDefault.value],
);

const filteredGroups = computed(() =>
  groupsToFilter.value.filter((group, index) => {
    const hasNoGroupsProp = groupsOrDefault.value.length === 0;
    const isVisibleGroup = state.visibleGroups.includes(index);
    const isDefaultGroup = group.title === defaultRollupGroup.value.title &&
      group.actions.length === 0;

    if (hasNoGroupsProp) {
      return state.hiddenActions.length > 0;
    }

    if (isDefaultGroup) {
      return true;
    }

    return isVisibleGroup;
  }),
);

const actionsFilter = computed(() =>
  actionsOrDefault.value.filter((_, index) => {
    if (!state.visibleActions.includes(index)) {
      return false;
    }

    return true;
  }),
);

const hiddenActionObjects = computed(() => state.hiddenActions
  .map((index) => actionsOrDefault.value[index])
  .filter((action) => action != null)
);

const hiddenGroupObjects = computed(() => state.hiddenGroups
  .map((index) => groupsOrDefault.value[index])
  .filter((group) => group != null)
);

const finalRolledUp = computed(() => {
  const allHiddenItems = [...hiddenActionObjects.value, ...hiddenGroupObjects.value];
  return allHiddenItems.reduce(
    ([actions, sections], action) => {
      if (isMenuGroup(action)) {
        sections.push({
          title: action.title,
          items: action.actions.map((sectionAction) => ({
            ...sectionAction,
            disabled: action.disabled || sectionAction.disabled,
          })),
        });
      } else {
        actions.push(action as any);
      }

      return [actions as ActionListItemDescriptor[], sections as ActionListSection[]];
    },
    [[] as ActionListItemDescriptor[], [] as ActionListSection[]],
  );
});

const finalRolledUpActions = computed(() => {
  return finalRolledUp.value[0] as ActionListItemDescriptor[]
});
const finalRolledUpSectionGroups = computed(() => finalRolledUp.value[1] as ActionListSection[]);

const menuGroupProps = (group: MenuGroupDescriptor) => {
  const { actions, ...rest } = group;
  return {
    ...rest,
    active: activeMenuGroup.value === group.title,
    sections: finalRolledUpSectionGroups.value,
  } as unknown as MenuGroupProps;
}

const getMenuGroupActions = (group: MenuGroupDescriptor): ActionListItemDescriptor[] => {
  const isDefaultGroup = group === defaultRollupGroup.value;

  // The condition is `(!x && !y) || (!x && y) || (x && z && w)`
  // there are too many ways to write this condition, e.g: !x || (w && z)
  // But I want to keep it simple and readable as original conditions from polaris-react.
  if (!isDefaultGroup) {
    return group.actions;
  }

  return [...finalRolledUpActions.value, ...group.actions];
};

const handleMeasurement = (measurements: ActionsMeasurements) => {
  const {
    hiddenActionsWidths: actionsWidths,
    containerWidth,
    disclosureWidth,
  } = measurements;

  const { visibleActions, hiddenActions, visibleGroups, hiddenGroups } =
    getVisibleAndHiddenActionsIndices(
      actionsOrDefault.value,
      groupsOrDefault.value,
      disclosureWidth,
      actionsWidths,
      containerWidth,
    );

  if (currentInstance?.vnode.props?.onActionRollup) {
    const isRollupActive =
      hiddenActions.length > 0 || hiddenGroups.length > 0;
    if (rollupActiveRef.value !== isRollupActive) {
      emits('action-rollup', isRollupActive);
      rollupActiveRef.value = isRollupActive;
    }
  }

  state.visibleActions = visibleActions;
  state.hiddenActions = hiddenActions;
  state.visibleGroups = visibleGroups;
  state.hiddenGroups = hiddenGroups;
  state.actionsWidths = actionsWidths;
  state.containerWidth = containerWidth;
  state.disclosureWidth = disclosureWidth;
  state.hasMeasured = true;
};

watch(
  () => [
    state.containerWidth,
    state.disclosureWidth,
    props.actions,
    props.groups,
    state.actionsWidths,
  ],
  () => {
    if (state.containerWidth === 0) {
      return;
    }
    const { visibleActions, visibleGroups, hiddenActions, hiddenGroups } =
      getVisibleAndHiddenActionsIndices(
        props.actions,
        props.groups,
        state.disclosureWidth,
        state.actionsWidths,
        state.containerWidth,
      );
    state.visibleActions = visibleActions;
    state.visibleGroups = visibleGroups;
    state.hiddenActions = hiddenActions;
    state.hiddenGroups = hiddenGroups;
    state.hasMeasured = state.containerWidth !== Infinity;
  },
  {
    immediate: true,
  }
);

const isMenuGroup = (
  actionOrMenuGroup: MenuGroupDescriptor | MenuActionDescriptor,
): actionOrMenuGroup is MenuGroupDescriptor => {
  return 'title' in actionOrMenuGroup;
}
</script>

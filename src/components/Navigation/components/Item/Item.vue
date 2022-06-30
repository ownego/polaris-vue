<template lang="pug">
li(v-if="!url", :class="styles.ListItem")
  button(
    type="button",
    :class="classNameOrigin",
    :disabled="disabled",
    :aria-disabled="disabled",
    :aria-label="accessibilityLabel",
    @click="getClickHandler",
    @keyup.tab="handleKeyUp",
    @blur="handleBlur",
  )
    div(
      v-if="icon",
      :class="iconClassName",
    )
      Icon(:source="icon")
    span(:class="styles.Text")
      | {{ label }}
      span(v-if="hasNewChild", :class="styles.Indicator")
        Indicator(pulse)
    div(
      v-if="props.new || badge",
      :class="styles.Badge"
    )
      Badge(v-if="props.new", status="new", size="small") {{ i18n.translate('Polaris.Badge.STATUS_LABELS.new') }}
      Badge(v-else-if="typeof badge === 'string'", status="new", size="small") {{ badge }}
      Badge(v-else-if="typeof badge === 'object'", v-bind="badge") {{ badge.content }}

li(v-else, :class="className")
  div(:class="styles.ItemWrapper")
    UnstyledLink(
      :url="url",
      :class="itemClassName",
      :external="external",
      :tabIndex="tabIndex",
      :aria-disabled="disabled",
      :aria-label="accessibilityLabel",
      @click="getClickHandler",
      @keyup.tab="handleKeyUp",
      @blur="handleBlur",
      v-bind="{...normalizeAriaAttributes(secondaryNavigationId, !!subNavigationItems && subNavigationItems.length > 0, !!showExpanded)}",
    )
      div(
        v-if="icon",
        :class="iconClassName",
      )
        Icon(:source="icon")
      span(:class="styles.Text")
        | {{ label }}
        span(v-if="hasNewChild", :class="styles.Indicator")
          Indicator(pulse)
      div(
        v-if="props.new || badge",
        :class="styles.Badge"
      )
        Badge(v-if="props.new", status="new", size="small") {{ i18n.translate('Polaris.Badge.STATUS_LABELS.new') }}
        Badge(v-else-if="typeof badge === 'string'", status="new", size="small") {{ badge }}
        Badge(v-else-if="typeof badge === 'object'", v-bind="badge") {{ badge.content }}
      div(
        v-if="external",
        :class="styles.ExternalIcon"
      )
        Icon(
          color="base",
          :accessibilityLabel="i18n.translate('Polaris.Common.newWindowAccessibilityHint')",
          :source="ExternalMinor",
        )

    template(v-if="secondaryAction")
      Tooltip(
        v-if="secondaryAction.tooltip",
        v-bind="secondaryAction.tooltip",
      )
        UnstyledLink(
          v-if="secondaryAction",
          external,
          :url="secondaryAction.url",
          :class="styles.SecondaryAction",
          :tabIndex="tabIndex",
          :aria-disabled="disabled",
          :aria-label="secondaryAction.accessibilityLabel",
          @click="secondaryAction && secondaryAction.onClick",
        )
          Icon(:source="secondaryAction.icon")

      UnstyledLink(
        v-else,
        external,
        :url="secondaryAction.url",
        :class="styles.SecondaryAction",
        :tabIndex="tabIndex",
        :aria-disabled="disabled",
        :aria-label="secondaryAction.accessibilityLabel",
        @click="secondaryAction && secondaryAction.onClick",
      )
        Icon(:source="secondaryAction.icon")
  div(
    v-if="subNavigationItems && subNavigationItems.length > 0",
    :class="SecondaryNavigationClassName",
  )
    Secondary(:expanded="!!showExpanded", :id="secondaryNavigationId")
      Item(
        v-for="item in subNavigationItems",
        :key="item.label",
        v-bind="item",
        :matches="item === longestMatch",
        @click="() => { onNavigationDismiss && onNavigationDismiss(); item.onClick && item.onClick(); }",
      )
</template>

<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import ExternalMinor from '@icons/ExternalMinor.svg';
import styles from '@/classes/Navigation.json';
import { UseUniqueId } from '@/use';
import { UseMediaQuery } from '@/utilities/media-query';
import { UseNavigationContext } from '../../context';
import {
  Badge,
  Icon,
  UnstyledLink,
  Indicator,
  Tooltip,
} from '@/components';
import type { IconProps } from '@/components/Icon/utils';
import type { SecondaryAction } from './utils';
import type { BadgeItemProps, ItemURLDetails, SubNavigationItem } from './utils';
import { UseI18n } from '@/use';

import { Secondary } from './components';

interface ItemProps {
  url?: string;
  matches?: boolean;
  matchPaths?: string[];
  excludePaths?: string[];
  external?: boolean;
  icon?: IconProps['source'];
  badge?: BadgeItemProps | string;
  label: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  selected?: boolean;
  exactMatch?: boolean;
  new?: boolean;
  subNavigationItems?: SubNavigationItem[];
  secondaryAction?: SecondaryAction;
  expanded?: boolean;
  shouldResizeIcon?: boolean;
}

const props = defineProps<ItemProps>();
const emits = defineEmits<{
  (e: 'toggle-expanded-state'): void;
  (e: 'click'): void;
}>();

const { useMediaQuery } = UseMediaQuery();
const { isNavigationCollapsed } = useMediaQuery();

const { useUniqueId } = UseUniqueId();
const secondaryNavigationId = useUniqueId('SecondaryNavigation');

const { useNavigationContext } = UseNavigationContext();
const { location, onNavigationDismiss } = useNavigationContext();

const i18n = UseI18n();

const keyFocused = ref(false);

onUpdated(() => {
  if (!isNavigationCollapsed && props.expanded) {
    onToggleExpandedState();
  }
});

const onToggleExpandedState = (() => {
  emits('toggle-expanded-state');
});

const handleKeyUp = (event: KeyboardEvent) => {
  if (!keyFocused.value) {
    keyFocused.value = true;
  }
};

const handleBlur = () => {
  keyFocused.value && (keyFocused.value = false);
};

const tabIndex = computed(() => props.disabled ? -1 : 0);

const hasNewChild = computed(() => {
  if (props.subNavigationItems) {
    return props.subNavigationItems.filter((subNavigationItem) => subNavigationItem.new).length > 0;
  }

  return false;
});

const classNameOrigin = computed(() => {
  return classNames(
    styles.Item,
    props.disabled && styles['Item-disabled'],
    keyFocused.value && styles.keyFocused,
    props.selected && styles['Item-selected'],
  );
});

const className = computed(() => {
  return classNames(
    styles.ListItem,
    props.secondaryAction && styles['ListItem-hasAction'],
  );
});

const iconClassName = computed(() => {
  return classNames(
    styles.Icon,
    props.shouldResizeIcon && styles['Icon-resized'],
  );
});

const matchState = matchStateForItem({
  url: props.url,
  matches: props.matches,
  exactMatch: props.exactMatch,
  matchPaths: props.matchPaths,
  excludePaths: props.excludePaths,
}, location);

const matchingSubNavigationItems = computed(() => {
  return props.subNavigationItems
  && props.subNavigationItems.filter((item) => {
    const subMatchState = matchStateForItem(item, location);
    return (
      subMatchState === 'forced' ||
      subMatchState === 'url' ||
      subMatchState === 'paths'
    );
  });
});

const childIsActive = computed(() => {
  return matchingSubNavigationItems.value && matchingSubNavigationItems.value.length > 0;
});

const selected = computed(() => {
  return props.selected == null
    ? matchState === 'forced' ||
      matchState === 'url' ||
      matchState === 'paths'
    : props.selected;
});

const showExpanded = computed(() => selected.value || props.expanded || childIsActive.value);

const canBeActive = (!props.subNavigationItems || props.subNavigationItems.length === 0) || !childIsActive.value;

const itemClassName = computed(() => {
  return classNames(
    styles.Item,
    props.disabled && styles['Item-disabled'],
    selected.value && canBeActive && styles['Item-selected'],
    showExpanded.value && styles.subNavigationActive,
    childIsActive.value && styles['Item-child-active'],
    keyFocused.value && styles.keyFocused,
  );
});

const longestMatch = computed(() => {
  if (matchingSubNavigationItems.value) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    return matchingSubNavigationItems.value.sort(
      ({url: firstUrl}, {url: secondUrl}) => secondUrl.length - firstUrl.length,
    )[0];
  }

  return null;
});

const SecondaryNavigationClassName = computed(() => {
  return classNames(
    styles.SecondaryNavigation,
    showExpanded.value && styles.isExpanded,
    !props.icon && styles['SecondaryNavigation-noIcon'],
  );
});

const getClickHandler = (event: MouseEvent) => {
  const currentTarget = event.currentTarget as HTMLElement;

  if (currentTarget.getAttribute('href') === location) {
    event.preventDefault();
  }

  if (
    props.subNavigationItems &&
    props.subNavigationItems.length > 0 &&
    isNavigationCollapsed
  ) {
    event.preventDefault();
    onToggleExpandedState();
  } else if (onNavigationDismiss) {
    onNavigationDismiss();
    emits('click');
    return;
  }

  emits('click');
};

// Common functions
function isNavigationItemActive(
  navigationItem: ItemProps,
  currentPath: string,
) {
  const matchStateItem = matchStateForItem(navigationItem, currentPath);

  const matchingSubNavigationItemsActive =
    navigationItem.subNavigationItems &&
    navigationItem.subNavigationItems.filter((item) => {
      const subMatchState = matchStateForItem(item, currentPath);
      return (
        subMatchState === 'forced' ||
        subMatchState === 'url' ||
        subMatchState === 'paths'
      );
    });

  const childItemIsActive =
    matchingSubNavigationItemsActive && matchingSubNavigationItemsActive.length > 0;

  const selectedItem =
    matchStateItem === 'forced' ||
    matchStateItem === 'url' ||
    matchStateItem === 'paths';

  return selectedItem || childItemIsActive;
}

function normalizePathname(pathname: string) {
  const barePathname = pathname.split('?')[0].split('#')[0];
  return barePathname.endsWith('/') ? barePathname : `${barePathname}/`;
}

function safeEqual(locationPath: string, path: string) {
  return normalizePathname(locationPath) === normalizePathname(path);
}

function safeStartsWith(locationPath: string, path: string) {
  return normalizePathname(locationPath).startsWith(normalizePathname(path));
}

function matchStateForItem(
  {url, matches, exactMatch, matchPaths, excludePaths}: ItemURLDetails,
  itemLocation: string,
) {
  if (url == null) {
    return 'no-match';
  }

  if (matches) {
    return 'forced';
  }

  if (
    matches === false ||
    (excludePaths &&
      excludePaths.some((path) => safeStartsWith(itemLocation, path)))
  ) {
    return 'excluded';
  }

  if (matchPaths && matchPaths.some((path) => safeStartsWith(itemLocation, path))) {
    return 'paths';
  }

  const matchesUrl = exactMatch
    ? safeEqual(itemLocation, url)
    : safeStartsWith(itemLocation, url);
  return matchesUrl ? 'url' : 'no-match';
}

function normalizeAriaAttributes(
  controlId: string,
  hasSubMenu: boolean,
  expanded: boolean,
) {
  return hasSubMenu
    ? {
      'aria-expanded': expanded,
      'aria-controls': controlId,
    }
    : undefined;
}
</script>

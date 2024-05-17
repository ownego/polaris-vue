import type { VNode } from 'vue';
import type { ActionListItemDescriptor, VueNode } from '@/utilities/types';

export type TabAction =
  | 'rename'
  | 'edit'
  | 'edit-columns'
  | 'duplicate'
  | 'delete';

interface TabActionDescriptor
  extends Omit<ActionListItemDescriptor, 'onAction'> {
    type: TabAction;
    onAction?: (name: string) => void;
    onPrimaryAction?: (name: string) => Promise<boolean> | void;
  }

export type TabsEvents = {
  /** Optional callback invoked when a Tab becomes selected. */
  'select': [selectedTabIndex: number];
  /** Optional callback invoked when a merchant saves a new view from the Modal */
  'create-new-view': [value: string];
}

export interface TabProps {
  /** The unique identifier for the Tab */
  id: string;
  /** The name of the Tab */
  content: string;
  /** A unique identifier for the panel */
  panelID?: string;
  /** The accessible label for the Tab, if the name alone does not give enough context */
  accessibilityLabel?: string;
  /** A badge to render next to the view name */
  badge?: string;
  /** Optional URL if the Tab points to a location */
  url?: string;
  /** If true, will remove the ability to edit/rename/delete the view. */
  isLocked?: boolean;
  /** Whether the Tab is disabled */
  disabled?: boolean;
  /** A list of actions which map to actions that a merchant can take with this  */
  actions?: TabActionDescriptor[];
  /** Optional array that has a list of names of currently existing views. Used to check if a view name is unique. */
  viewNames?: string[];
  /** If true, the primary button in the currently open Modal will show a loading state */
  isModalLoading?: boolean;
  /** If the Tab is currently focused */
  focused?: boolean;
  /** If a sibling Tab currently has focus */
  siblingTabHasFocus?: boolean;
  /** If the Tab is selected */
  selected?: boolean;
  /** If the Tab is currently being measured */
  measuring?: boolean;
  /** Overrides the tabIndex calculated by the Tabs component */
  tabIndexOverride?: 0 | -1;
  /** Override z-index of popovers and tooltips */
  disclosureZIndexOverride?: number;
}

export type TabEvents = {
  'tab-action': [];
  'focus': [];
  /** Callback to let the Tabs know that a Popover is open inside of a Tab. Used to control focus. */
  'toggle-popover': [value: boolean];
  /** Callback to let the Tabs know that a Modal is open inside of a Tab. Used to control focus. */
  'toggle-modal': [value: boolean];
}

export type TabSlots = {
  /** Elements to display inside the tag*/
  default: (_?: VueNode) => VNode[];
  /** An icon to render in place of a view name. Please pass the full Icon component, rather
   * than a reference to the particular icon source. */
  icon: (_?: VueNode) => VNode[];
}

export interface TabMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenTabWidths: number[];
}

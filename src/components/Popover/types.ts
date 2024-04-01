import type {
  PopoverOverlayProps,
  PopoverAutofocusTarget,
} from './components/PopoverOverlay/types';

export type PopoverProps = {
  /** The preferred direction to open the popover */
 preferredPosition?: PopoverOverlayProps['preferredPosition'];
 /** The preferred alignment of the popover relative to its activator */
 preferredAlignment?: PopoverOverlayProps['preferredAlignment'];
 /** Show or hide the Popover */
 active: boolean;
 /**
  * Use the activator's input element to calculate the Popover position
  * @default true
  */
 preferInputActivator?: PopoverOverlayProps['preferInputActivator'];
 /**
  * The element type to wrap the activator with
  * @default 'div'
  */
 activatorWrapper?: string;
 /** Override on the default z-index of 400 */
 zIndexOverride?: number;
 /** Prevents focusing the activator or the next focusable element when the popover is deactivated */
 preventFocusOnClose?: boolean;
 /** Automatically add wrap content in a section */
 sectioned?: boolean;
 /** Allow popover to stretch to the full width of its activator */
 fullWidth?: boolean;
 /** Allow popover to stretch to fit content vertically */
 fullHeight?: boolean;
 /** Allow popover content to determine the overlay width and height */
 fluidContent?: boolean;
 /** Remains in a fixed position */
 fixed?: boolean;
 /** Used to illustrate the type of popover element */
 ariaHaspopup?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
 /** Allow the popover overlay to be hidden when printing */
 hideOnPrint?: boolean;
 /**
  * The preferred auto focus target defaulting to the popover container
  * @default 'container'
  */
 autofocusTarget?: PopoverAutofocusTarget;
 /** Prevents closing the popover when other overlays are clicked */
 preventCloseOnChildOverlayClick?: boolean;
 /**
  * Prevents page scrolling when the end of the scrollable Popover overlay content is reached - applied to Pane subcomponent
  * @default false
  */
 captureOverscroll?: boolean;
}

export type CheckableButtonProps = {
  accessibilityLabel?: string;
  label?: string;
  selected?: boolean | 'indeterminate';
  disabled?: boolean;
  ariaLive?: 'off' | 'polite';
}

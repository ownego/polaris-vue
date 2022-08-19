export function useDisableClick(disabled?: boolean, handleClick?: () => void) {
  const handleClickWrapper = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (!disabled) {
    return handleClick;
  }

  return handleClickWrapper;
}

export function useDisableKeyboard(
  disabled?: boolean,
  handleKeyDown?: (event: KeyboardEvent) => void,
) {
  const handleKeyDownWrapper = (event: KeyboardEvent) => {
    if (disabled && (event?.key === ' ' || event.key === 'Enter')) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  if (!disabled) {
    return handleKeyDown;
  }

  return handleKeyDownWrapper;
}

export function useDisableClick(disabled?: boolean, handleClick?: () => void) {
  const handleClickWrapper = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (!disabled) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const fallbackEvent = () => { };
    return handleClick || fallbackEvent;
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

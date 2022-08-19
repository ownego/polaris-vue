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

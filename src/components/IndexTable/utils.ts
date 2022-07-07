export function getTableHeadingsBySelector(
  wrapperElement: HTMLElement | null,
  selector: string,
) {
  return wrapperElement
    ? Array.from(wrapperElement.querySelectorAll<HTMLElement>(selector))
    : [];
}

export interface IndexTableHeading {
  title: string;
  flush?: boolean;
  new?: boolean;
  hidden?: boolean;
}

export type IndexTableSortDirection = 'ascending' | 'descending';

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
  id?: string;
  new?: boolean;
  hidden?: boolean;
}

export type IndexTableSortToggleLabel = {
  [key in IndexTableSortDirection]: string;
};

export interface IndexTableSortToggleLabels {
  [key: number]: IndexTableSortToggleLabel;
}

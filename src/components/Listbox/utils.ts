export enum AutoSelection {
  /** Default active option is the first selected option. If no options are selected, defaults to first interactive option. */
  FirstSelected = 'FIRST_SELECTED',
  /** Default active option is always the first interactive option. */
  First = 'FIRST',
  /** Default to the manual selection pattern. */
  None = 'NONE',
}

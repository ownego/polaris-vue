export interface TabDescriptor {
  /** A unique identifier for the tab */
  id: string;
  /** A destination to link to */
  url?: string;
  /** Content for the tab */
  content?: string;
  /** A unique identifier for the panel */
  panelID?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
}

export interface TabMeasurerProps {
  tabToFocus: number;
  siblingTabHasFocus: boolean;
  selected: number;
  tabs: TabDescriptor[];
}

export interface TabMeasurements {
  containerWidth: number;
  disclosureWidth: number;
  hiddenTabWidths: number[];
}

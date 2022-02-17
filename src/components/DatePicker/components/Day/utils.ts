export interface DayProps {
  focused?: boolean;
  day?: Date;
  selected?: boolean;
  inRange?: boolean;
  inHoveringRange?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastDayOfMonth?: any;
  isLastSelectedDay?: boolean;
  isFirstSelectedDay?: boolean;
  isHoveringRight?: boolean;
  rangeIsDifferent?: boolean;
  weekday?: string;
  selectedAccessibilityLabelPrefix?: string;
}

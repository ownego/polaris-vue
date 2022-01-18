export interface MappedActionContextType {
  role?: string;
  url?: string;
  external?: boolean;
  destructive?: boolean;
}

export interface OptionProps {
  value: string;
  accessibilityLabel?: string;
  selected?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

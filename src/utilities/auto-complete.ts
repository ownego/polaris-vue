export interface MappedActionContextType {
  role?: string;
  url?: string;
  external?: boolean;
  onAction?(): void;
  destructive?: boolean;
}

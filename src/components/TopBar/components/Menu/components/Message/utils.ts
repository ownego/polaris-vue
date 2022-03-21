type Status = 'info' | 'success' | 'attention' | 'warning' | 'critical' | 'new';
type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
type Size = 'small' | 'medium';

export interface BadgeProps {
  /** Colors and labels the badge with the given status. */
  status?: Status;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
  /**
   * Medium or small size.
   * @default 'medium'
   */
  size?: Size;
  /** Pass a custom accessibilityLabel */
  statusAndProgressLabelOverride?: string;
}

export interface MessageProps {
  title: string;
  description: string;
  action: { onClick(): void; content: string };
  link: { to: string; content: string };
  badge?: { content: string; status: BadgeProps['status'] };
}

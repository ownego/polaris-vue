export type Status = 'info' | 'success' | 'attention' | 'warning' | 'critical' | 'new';
export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
export type Size = 'small' | 'medium';

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

export function getDefaultAccessibilityLabel(
  progress?: Progress,
  status?: Status,
): string {
  let progressLabel = '';
  let statusLabel = '';

  if (!progress && !status) {
    return '';
  }
  switch (progress) {
  case 'incomplete':
    progressLabel = 'Incomplete';
    break;
  case 'partiallyComplete':
    progressLabel = 'Partially complete';
    break;
  case 'complete':
    progressLabel = 'Complete';
    break;
  }

  switch (status) {
  case 'info':
    statusLabel = 'Info';
    break;
  case 'success':
    statusLabel = 'Success';
    break;
  case 'warning':
    statusLabel = 'Warning';
    break;
  case 'critical':
    statusLabel = 'Critical';
    break;
  case 'attention':
    statusLabel = 'Attention';
    break;
  case 'new':
    statusLabel = 'New';
    break;
  }

  return `${statusLabel} ${progressLabel}`;
}

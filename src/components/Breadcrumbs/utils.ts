import type { CallbackAction, LinkAction } from '@/utilities/type';

export interface BreadcrumbsProps {
  /** Collection of breadcrumbs */
  breadcrumbs: (CallbackAction | LinkAction)[];
}

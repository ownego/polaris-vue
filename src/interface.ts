import type { Action, IconSource } from 'types/type';

export interface anyKey {
  [key: string]: any;
}

export interface DisableableAction extends Action {
  /** Whether or not the action is disabled */
  disabled?: boolean;
}

export interface BadgeAction {
  badge?: {
    status: 'new';
    content: string;
  };
}

export interface IconableAction extends Action {
  /** Source of the icon */
  icon?: IconSource;
}

export interface DestructableAction extends Action {
  /** Destructive action */
  destructive?: boolean;
}

export interface LoadableAction extends Action {
  /** Should a spinner be displayed */
  loading?: boolean;
}

export interface OutlineableAction extends Action {
  /** Should action be displayed as an outlined button */
  outline?: boolean;
}

export interface PlainAction extends Action {
  /** Should action be displayed as a plain link */
  plain?: boolean;
}

export interface ComplexAction
  extends Action,
  DisableableAction,
  DestructableAction,
  IconableAction,
  OutlineableAction,
  LoadableAction,
  PlainAction { }

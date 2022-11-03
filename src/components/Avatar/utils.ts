export const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five'];

export type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export type Shape = 'square' | 'round';

export interface AvatarProps {
  /**
   * Size of avatar
   * @default 'medium'
   */
  size?: Size;
  /** The name of the person */
  name?: string;
  /** Initials of person to display */
  initials?: string;
  /** Whether the avatar is for a customer */
  customer?: boolean;
  /** URL of the avatar image which falls back to initials if the image fails to load */
  source?: string;
  /** Accessible label for the avatar image */
  accessibilityLabel?: string;
}

/**
 * Computes a rudimentary hash from a string by xoring the character codes
 * of all characters
 */
export function xorHash(str: string) {
  let hash = 0;

  for (const char of str) {
    hash ^= char.charCodeAt(0);
  }

  return hash;
}

export function styleClass(name?: string) {
  return name
    ? STYLE_CLASSES[xorHash(name) % STYLE_CLASSES.length]
    : STYLE_CLASSES[0];
}

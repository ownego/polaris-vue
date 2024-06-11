export type Element =
  | 'dt'
  | 'dd'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'legend';

export type Variant =
  | 'headingXs'
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'
  | 'headingXl'
  | 'heading2xl'
  | 'heading3xl'
  | 'bodyXs'
  | 'bodySm'
  | 'bodyMd'
  | 'bodyLg';

export type Alignment = 'start' | 'center' | 'end' | 'justify';

export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type Tone =
  | 'base'
  | 'disabled'
  | 'inherit'
  | 'success'
  | 'critical'
  | 'caution'
  | 'subdued'
  | 'text-inverse'
  | 'text-inverse-secondary'
  | 'magic'
  | 'magic-subdued';

export type TextDecorationLine = 'line-through';

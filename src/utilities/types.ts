import type { Component } from 'vue';

export type Target = '_blank' | '_self' | '_parent' | '_top';

export type IconSource = Component | string | (string | Component)[]

export type VueNode = string | number | boolean | Component | Element | null | undefined;

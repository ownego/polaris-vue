import { layer } from '@polaris/components/shared';

export const getMarginsForNode = (node: HTMLElement) => {
  const window = node.ownerDocument.defaultView || globalThis.window;
  const nodeStyles = window.getComputedStyle(node);

  return {
    activator: parseFloat(nodeStyles.marginTop || '0'),
    container: parseFloat(nodeStyles.marginBottom || '0'),
    horizontal: parseFloat(nodeStyles.marginLeft || '0'),
  };
}

export const getZIndexForLayerFromNode = (node: HTMLElement) => {
  const layerNode = node.closest(layer.selector) || node?.ownerDocument.body;
  const zIndex = layerNode === node?.ownerDocument.body ? 'auto' : parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);

  return zIndex === 'auto' || isNaN(zIndex) ? null : zIndex;
}

export const isDocument = (node: HTMLElement | Document): node is Document => {
  return node.ownerDocument === null;
}

import { layer } from 'polaris-react/src/components/shared';

export function isDocument(node: HTMLElement | Document): node is Document {
  return node === document;
}

export function getMarginsForNode(node: HTMLElement) {
  const nodeStyles = window.getComputedStyle(node);
  return {
    activator: parseFloat(nodeStyles.marginTop || '0'),
    container: parseFloat(nodeStyles.marginBottom || '0'),
    horizontal: parseFloat(nodeStyles.marginLeft || '0'),
  };
}

export function getZIndexForLayerFromNode(node: HTMLElement) {
  const layerNode = node.closest(layer.selector) || document.body;
  const zIndex = layerNode === document.body
    ? 'auto'
    : parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
  return zIndex === 'auto' || Number.isNaN(zIndex) ? null : zIndex;
}

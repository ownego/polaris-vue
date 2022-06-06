/* eslint-disable */
const {basename} = require('path');

const {camelCase} = require('change-case');

const COMPONENT_REGEX = /^[A-Z]\w+$/;
const SUBCOMPONENT_VARIATION_SELECTOR = /^\w+-\w+$/;
const STYLES_COMPONENT_REGEX = /.*\/components\/(.*)\/Styles.vue/;
const NESTED_COMPONENT_PATH_REGEX = /.*\/components\/(.*)\/components/;

const scopedHashes = {};

module.exports = function generateScopedName(name, filename, css) {
  if (filename.includes('@shopify/polaris-tokens') || filename.includes('CustomProperties')) {
    return name;
  }

  const parseName = name.split('_');
  const originalName = parseName.length > 1 ? parseName[1] : name;

  // Get component name from filepath
  // Eg: ./components/Button/Button.vue?id=...&lang=... -> Button
  let componentName = basename(filename, '.vue').replace(/\.vue.*/, '');

  if (componentName === 'Styles') {
    const styleComponentMatch = STYLES_COMPONENT_REGEX.exec(filename);
    if (styleComponentMatch && styleComponentMatch.length > 1) {
      componentName = styleComponentMatch[1];
    }
  }

  // Get parent component name from child filepath
  // Eg: ./components/Button/components/Icon.vue?id=...&lang=... -> Button
  const nestedComponentMatch = NESTED_COMPONENT_PATH_REGEX.exec(filename);
  const isNested = nestedComponentMatch && nestedComponentMatch.length > 1;

  // If the filepath is a nested component
  let polarisComponentName = null;
  if (isNested) {
    // Check if the nested component does not have the same hash as the parent component
    // -> it will be a separated component
    // -> unless it will be a current parent component
    polarisComponentName = `${polarisClassName(nestedComponentMatch[1])}-${componentName}`;
    scopedHashes[parseName[2]] = polarisComponentName;
  } else {
    // create new component with root name
    // Eg: Button -> Polaris-Button
    polarisComponentName = polarisClassName(componentName);

    // Save the hash to the component name
    if (parseName[2] && !scopedHashes[parseName[2]]) {
      scopedHashes[parseName[2]] = polarisComponentName;
    }
  }

  // const polarisComponentName =
  //   nestedComponentMatch && nestedComponentMatch.length > 1 && !isNestedComponent
  //     ? `${polarisClassName(nestedComponentMatch[1])}-${componentName}`
  //     : polarisClassName(componentName);

  let className;

  // Component
  if (isComponent(originalName)) {
    className =
      componentName === originalName
        ? polarisComponentName
        : subcomponentClassName(polarisComponentName, originalName);

  } else if (SUBCOMPONENT_VARIATION_SELECTOR.test(originalName)) {
    // Variation of subcomponent
    const [subcomponent, variation] = originalName.split('-');
    const subcomponentName = subcomponentClassName(
      polarisComponentName,
      subcomponent,
    );
    className = variationClassName(subcomponentName, camelCase(variation));
  } else {
    // Variation of component
    className = variationClassName(polarisComponentName, camelCase(originalName));
  }

  return className;
};

function isComponent(className) {
  return COMPONENT_REGEX.test(className);
}

function polarisClassName(className) {
  return `Polaris-${className}`;
}

function subcomponentClassName(component, subcomponent) {
  return `${component}__${subcomponent}`;
}

function variationClassName(component, variation) {
  return `${component}--${variation}`;
}

// Taken from the string-hash package
function stringHash(str) {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

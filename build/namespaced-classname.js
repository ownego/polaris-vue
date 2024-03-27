import { basename } from 'path';
import { camelCase } from 'change-case';

const COMPONENT_REGEX = /^[A-Z]\w+$/;
const SUBCOMPONENT_VARIATION_SELECTOR = /^\w+-\w+$/;
const NESTED_COMPONENT_PATH_REGEX = /.*\/components\/(.*)\/components/;

export function generateScopedName(name, filename) {
  let componentName = basename(filename, '.module.css').replace(/\.vue.*/, '');
  const nestedComponentMatch = NESTED_COMPONENT_PATH_REGEX.exec(filename);

  const polarisComponentName =
    nestedComponentMatch && nestedComponentMatch.length > 1
      ? `${polarisClassName(nestedComponentMatch[1])}-${componentName}`
      : polarisClassName(componentName);

  let className;

  if (isComponent(name)) {
    className =
      componentName === name
      ? polarisComponentName
      : subcomponentClassName(polarisComponentName, name);
  } else if (SUBCOMPONENT_VARIATION_SELECTOR.test(name)) {
    const [subcomponent, variation] = name.split('-');
    const subcomponentName = subcomponentClassName(
      polarisComponentName,
      subcomponent,
    );
    className = variationClassName(subcomponentName, camelCase(variation));
  } else {
    className = variationClassName(polarisComponentName, camelCase(name));
  }

  const suffix = '';

  return className + suffix;
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

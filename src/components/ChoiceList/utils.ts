import { VueConstructor } from 'vue';

export interface choiceProps {
  value: string | boolean,
  disabledField: boolean,
  describedByErrorField: boolean,
  label: string,
  helpText: string,
  renderChildrenField: string | VueConstructor<Vue>,
}

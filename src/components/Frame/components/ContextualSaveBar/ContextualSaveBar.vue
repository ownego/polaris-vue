<template lang="pug">
CustomProperties(color-scheme="dark")
  div(:class="styles.ContextualSaveBar")
    div(
      v-if="slots.contextControl",
      :class="styles.ContextControl",
    )
      slot(name="contextControl")
    div(
      v-if="!alignContentFlush && !slots.contextControl",
      :class="styles.LogoContainer",
      :style="width",
    )
      Image(
        v-if="logo",
        :style="{ width }",
        :source="logo.contextualSaveBarSource || ''",
        alt="",
      )
    div(:class="contentsClassName")
      h2(:class="styles.Message") {{ message }}
      div(:class="styles.ActionContainer")
        Stack(
          spacing="tight",
          :wrap="false",
        )
          slot(name="secondaryMenu")
          Button(
            v-if="discardAction",
            :url="discardAction.url",
            :loading="discardAction.loading",
            :disabled="discardAction.disabled",
            :accessibilityLabel="discardAction.content",
            @click="discardActionHandler",
          )
            template(v-if="discardAction.content") {{ discardAction.content }}
            template(v-else) {{ discardLang }}
          Button(
            v-if="saveAction",
            primary,
            :url="saveAction.url",
            :loading="saveAction.loading",
            :disabled="saveAction.disabled",
            :accessibilityLabel="saveAction.content",
            @click="saveAction.onAction",
          )
            template(v-if="saveAction.content") {{ saveAction.content }}
            template(v-else) {{ saveLang }}
DiscardConfirmationModal(
  v-if="discardAction && discardAction.onAction && discardAction.discardConfirmationModal",
  :open="discardConfirmationModalVisible",
  @cancel="toggleDiscardConfirmationModal",
  @discard="handleDiscardAction",
)
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { classNames } from 'polaris/polaris-react/src/utilities/css';
import { getWidth } from 'polaris/polaris-react/src/utilities/get-width';
import { CustomProperties, Stack, Image, Button } from '@/components';
import styles from '@/classes/Frame-ContextualSaveBar.json';
import type { ContextualSaveBarAction, ContextualSaveBarCombinedActionProps } from '@/utilities/frame/types';
import { UseFrame } from '@/utilities/frame';
import { UseI18n } from '@/use';
import { DiscardConfirmationModal } from './components';

interface ContextualSaveBarProps {
  /** Extend the contents section to be flush with the left edge  */
  alignContentFlush?: boolean;
  /** Accepts a string of content that will be rendered to the left of the actions */
  message?: string;
  /** Save or commit contextual save bar action with text defaulting to 'Save' */
  saveAction?: ContextualSaveBarAction;
  /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
  discardAction?: ContextualSaveBarCombinedActionProps;
  /** Remove the normal max-width on the contextual save bar */
  fullWidth?: boolean;
}

const props = defineProps<ContextualSaveBarProps>();

const i18n = UseI18n();

const slots = useSlots();

const contentsClassName = computed(() => {
  return classNames(
    styles.Contents,
    props.fullWidth && styles.fullWidth,
  );
});

const saveLang = i18n.translate('Polaris.ContextualSaveBar.save');
const discardLang = i18n.translate('Polaris.ContextualSaveBar.discard');

// Get logo from frame context
const { useFrame } = UseFrame();
const { logo } = useFrame();

const width = getWidth(logo, 104);

const discardConfirmationModalVisible = ref(false);

const toggleDiscardConfirmationModal = () => {
  discardConfirmationModalVisible.value = !discardConfirmationModalVisible.value;
};

const closeDiscardConfirmationModal = () => {
  discardConfirmationModalVisible.value = false;
};

const discardActionHandler = () => {
  if (props.discardAction) {
    if (props.discardAction.discardConfirmationModal) {
      toggleDiscardConfirmationModal();
    } else {
      props.discardAction.onAction && props.discardAction.onAction();
    }
  }
};

const handleDiscardAction = () => {
  if (props.discardAction && props.discardAction.onAction) {
    props.discardAction.onAction();
  }
  closeDiscardConfirmationModal();
};
</script>

<style lang="scss">
@import 'polaris/polaris-react/src/components/Frame/components/ContextualSaveBar/ContextualSaveBar.scss';
</style>

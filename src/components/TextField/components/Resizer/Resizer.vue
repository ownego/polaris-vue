<template lang="pug">
div(
  aria-hidden="true",
  :class="wrapperClassName",
)
  EventListener(
    event="resize",
    handler="handleHeightCheck",
  )
  div(
    ref="contentNode",
    :class="dummyInputClassName",
    v-html="finalContents",
  )
  div(
    v-if="minimumLines",
    ref="minimumLinesNode",
    :class="dummyInputClassName",
    v-html="minimumLinesContents",
  )
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Ref } from 'vue-property-decorator';
import styles from '@/classes/TextField.json';
import { EventListener } from '@/components';

const ENTITIES_TO_REPLACE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '\n': '<br>',
  '\r': '',
};

const REPLACE_REGEX = new RegExp(
  `[${Object.keys(ENTITIES_TO_REPLACE).join()}]`,
  'g',
);

function replaceEntity(entity: string) {
  return ENTITIES_TO_REPLACE[entity as keyof typeof ENTITIES_TO_REPLACE];
}

@Component({
  components: {
    EventListener,
  },
})
export default class Resizer extends Vue {
  @Ref('contentNode') contentNode!: HTMLDivElement;

  @Ref('minimumLinesNode') minimumLinesNode!: HTMLDivElement;

  @Prop({ type: String })
  public contents!: string;

  @Prop({ type: Number })
  public currentHeight?: number | null;

  @Prop({ type: Number })
  public minimumLines!: number;

  public wrapperClassName = styles.Resizer;

  public dummyInputClassName = styles.DummyInput;

  get minimumLinesContents(): string {
    let content = '';

    for (let line = 0; line < this.minimumLines; line += 1) {
      content += '<br>';
    }

    return content;
  }

  get finalContents(): string {
    return this.contents
      ? `${this.contents.replace(REPLACE_REGEX, replaceEntity)}<br>`
      : '</br>';
  }

  protected mounted(): void {
    this.handleHeightCheck();
  }

  public handleHeightCheck() {
    if (!this.contentNode || !this.minimumLinesNode) {
      return;
    }

    const newHeight = Math.max(
      this.contentNode.offsetHeight,
      this.minimumLinesNode.offsetHeight,
    );

    if (newHeight !== this.currentHeight) {
      this.$emit('height-change', newHeight);
    }
  }
}
</script>

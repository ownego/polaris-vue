<template>
  <AppProvider>
    <Page title="Demo" class="demo-page">

      <Card title="Text Field">
        <CardSection title="Super Simple Params">
          <FormLayout>
            <TextField label="Hello" v-model="val" />
          </FormLayout>
        </CardSection>

        <CardSection title="Simple Params">
          <FormLayout>
            <TextField
              v-model="val"
              label="Hello"
              help-text="Help"
              suffix="SUF"
              prefix="PRE"
            >
            </TextField>
          </FormLayout>
        </CardSection>

        <CardSection title="Simple Params Overriden by Slots">
          <FormLayout>
            <TextField
              v-model="val"
              label="Hello"
              help-text="Help"
              suffix="SUF"
              prefix="PRE"
            >
              <template #label>Label Slot</template>
              <template #help-text>Help Text Slot</template>
              <template #prefix>Prefix Slot</template>
              <template #suffix>Suffix Slot</template>
            </TextField>
          </FormLayout>
        </CardSection>

        <CardSection title="+Error">
          <FormLayout>
            <TextField
              v-model="val"
              label="Hello"
              help-text="Help"
              suffix="SUF"
              prefix="PRE"
              error="This is an error"
            >
              <template #label>Label Slot</template>
              <template #help-text>Help Text Slot</template>
              <template #prefix>Prefix Slot</template>
              <template #suffix>Suffix Slot</template>
            </TextField>
          </FormLayout>
        </CardSection>

        <CardSection title="Multiline">
          <FormLayout>
            <TextField
              v-model="val3"
              label="Hello"
              :multiline="4"
            />
          </FormLayout>
        </CardSection>
      </Card>

      <Card title="Select">
        <CardSection title="+Error">
          <FormLayout>
            <Select
              v-model="val2"
              label="Hello"
              placeholder="Select"
              :options="[{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]"
            >
              <!-- <template #label>Label Slot</template> -->
            </Select>
          </FormLayout>
        </CardSection>
      </Card>

      <div style="height:48px;">
        &nbsp;
      </div>
    </Page>
  </AppProvider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  AppProvider,
  TextField,
  FormLayout,
  Card,
  CardSection,
  Page,
  Select,
} from './components'

const val = ref('')
const val2 = ref('')
const val3 = ref('')
</script>

<style scoped>
.demo-page {
  padding-bottom: 48px !important;
}
</style>
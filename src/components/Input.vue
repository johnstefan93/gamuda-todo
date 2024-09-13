<template>
  <v-text-field
    v-model="inputValue"
    :label="label"
    color="primary"
    clearable
    @input="$emit('update:modelValue', inputValue)"
  >
  </v-text-field>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppInput",
  props: {
    label: {
      type: String,
      default: "Input Label",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    },
  },
});
</script>

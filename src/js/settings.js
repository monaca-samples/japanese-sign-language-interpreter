import { reactive } from 'vue';

export const settings = reactive({
  value: 500,
  setValue(value) {
    this.value = value;
  },
  getValue() {
    return this.value;
  },
});

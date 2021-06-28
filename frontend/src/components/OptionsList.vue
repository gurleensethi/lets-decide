<template>
  <div>
    <div v-for="(option, index) in options" :key="option.id">
      <input v-model="option.name" :placeholder="'Option ' + (index + 1)" />
      <button @click="removeOption(index)">Remove Option</button>
    </div>
    <button @click="addOption">Add New Option</button>
  </div>
</template>

<script>
export default {
  name: "OptionsList",
  props: ["options"],
  emits: ["onOptionsUpdate", "addOption", "removeOption"],
  methods: {
    addOption() {
      this.$emit("addOption");
    },
    removeOption(index) {
      this.$emit("removeOption", index);
    },
  },
};
</script>

<style scoped></style>

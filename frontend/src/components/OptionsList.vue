<template>
  <div class="border-2 p-4 rounded-lg">
    <div v-for="(option, index) in options" :key="option.id" class="flex mb-6">
      <input
        class="w-full text-lg border-b-2 outline-none py-2 mr-4"
        v-model="option.name"
        :placeholder="'Option ' + (index + 1)"
      />
      <button
        @click="removeOption(index)"
        class="
          flex
          justify-center
          items-center
          text-xs
          bg-gray-400
          text-white
          rounded-full
          self-center
          w-6
          h-6
        "
      >
        X
      </button>
    </div>
    <button
      @click="addOption"
      class="text-md text-purple-500 uppercase font-bold"
    >
      Add New Option
    </button>
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

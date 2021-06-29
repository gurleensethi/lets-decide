<template>
  <div>
    <div v-for="option in options" :key="option.id">
      <div
        :class="[
          'text-2xl shadow-xl p-4 mb-6 rounded-lg cursor-pointer hover:bg-purple-500 hover:text-white transition',
          option.id === selectedOption
            ? 'bg-purple-700 text-white'
            : 'bg-white text-purple-500',
        ]"
        @click="$emit('optionSelected', option.id)"
      >
        {{ option.option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnswerOptionsList",
  props: ["options", "selectedOption"],
  emits: ["optionSelected"],
};
</script>

<style scoped></style>

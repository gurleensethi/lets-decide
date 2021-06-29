<template>
  <div>
    <div v-for="option in options" :key="option.id">
      <div
        :style="{
          backgroundColor: option.id === selectedOption ? 'black' : '',
        }"
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

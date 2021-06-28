<template>
  <div>Question</div>
</template>

<script>
export default {
  name: "Question",
  created() {
    console.log("Question ID:", this.$route.params.id);
  },
};
</script>

<style scoped></style>

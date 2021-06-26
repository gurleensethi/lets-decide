<template>HomePage</template>

<script>
export default {
  name: "Home",
  created() {
    this.$store.dispatch("resolveUserId");
  },
};
</script>

<style scoped></style>

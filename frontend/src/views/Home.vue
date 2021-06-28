<template>
  <div>Let's Decide</div>
  <div class="flex flex-col">
    <button>Enter a Code</button>
    <button>New Decision</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    this.$store.dispatch("resolveUserId");
  },
};
</script>

<style scoped></style>

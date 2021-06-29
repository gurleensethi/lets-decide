<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <div class="p-8 max-w-screen-md mx-auto">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("resolveUserId");
  },
};
</script>

<style></style>

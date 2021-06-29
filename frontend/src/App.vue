<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <div class="p-4 text-xl border-b">
    <div class="cursor-pointer" @click="$router.push('/')">Let's Decide</div>
  </div>
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

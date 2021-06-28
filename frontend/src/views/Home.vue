<template>
  <div>Let's Decide</div>
  <div class="flex flex-col">
    <button>Enter a Code</button>
    <router-link :to="{ name: 'CreateQuestion' }">New Question</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped></style>

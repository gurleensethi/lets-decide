<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-xl mb-4 text-gray-500">
      Decide something new with your friends 👯‍♂️
    </div>
    <router-link
      class="
        text-xl
        bg-purple-500
        px-4
        py-2
        text-white
        rounded-lg
        shadow-md
        mb-6
      "
      :to="{ name: 'CreateQuestion' }"
      >New Question</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped></style>

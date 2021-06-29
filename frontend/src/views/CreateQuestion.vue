<template>
  <div class="text-2xl font-bold mb-6">Create New Question</div>
  <input
    placeholder="Enter Question"
    v-model="question"
    class="
      focus:ring-2 focus:ring-purple-300 focus:ring-offset-2
      border-2 border-purple-300
      p-2
      text-xl
      rounded-lg
      outline-none
      w-full
    "
  />
  <div class="text-red-500 text-lg my-2 mb-6">
    {{ errors.question }}
  </div>
  <div class="text-xl mb-2">Add Options</div>
  <options-list
    :options="options"
    @addOption="addOption"
    @removeOption="removeOption"
  />
  <div class="text-red-500 text-lg my-2 mb-6">
    {{ errors.option }}
  </div>
  <button
    class="
      bg-purple-500
      text-white
      font-bold
      uppercase
      hover:bg-purple-700
      px-4
      py-2
      rounded-md
      transition
    "
    @click="createQuestion"
  >
    Create
  </button>
</template>

<script>
import OptionsList from "../components/OptionsList.vue";

export default {
  name: "CreateQuestion",
  components: {
    OptionsList,
  },
  data() {
    return {
      question: "",
      options: [{ id: Date.now() }],
      errors: {
        question: "",
        option: "",
      },
    };
  },
  methods: {
    addOption() {
      this.options.push({ id: Date.now() });
    },
    createQuestion() {
      if (!this.question) {
        this.errors.question = "Please enter a valid question.";
        return;
      }

      if (this.options.length === 0) {
        this.errors.option = "Please enter at least 1 option.";
        return;
      }

      if (this.options.findIndex((option) => !option.name) !== -1) {
        this.errors.option = "Option cannot be empty.";
        return;
      }

      this.$store
        .dispatch("createQuestion", {
          question: this.question,
          options: this.options.map((item) => ({ option: item.name })),
        })
        .then((res) => {
          this.$router.push(`/question/${res.id}`);
        });
    },
    removeOption(index) {
      this.options.splice(index, 1);
    },
  },
};
</script>

<style scoped></style>

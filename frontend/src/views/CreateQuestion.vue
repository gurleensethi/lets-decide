<template>
  <div>Create Question</div>
  <input placeholder="Enter Question" v-model="question" />
  <div v-if="errors.question">{{ errors.question }}</div>
  <options-list
    :options="options"
    @addOption="addOption"
    @removeOption="removeOption"
  />
  <div v-if="errors.option">{{ errors.option }}</div>
  <button @click="createQuestion">Create</button>
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

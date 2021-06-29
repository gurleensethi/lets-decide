<template>
  <div>Question</div>
  <div v-if="question">
    <div>{{ question.question }}</div>
    <div>Options:</div>
    <answer-options-list
      :options="question.options"
      :selectedOption="selectedOption"
      @optionSelected="optionSelected"
    />
    <button>Submit</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AnswerOptionsList from "../components/AnswerOptionsList.vue";

export default {
  props: ["questionId"],
  name: "Question",
  components: {
    AnswerOptionsList,
  },
  computed: {
    ...mapGetters(["question"]),
  },
  methods: {
    optionSelected(id) {
      this.selectedOption = id;
    },
  },
  data() {
    return {
      selectedOption: null,
    };
  },
  created() {
    this.$store.dispatch("loadQuestion", this.$props.questionId);
  },
};
</script>

<style scoped></style>

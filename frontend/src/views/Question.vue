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
  <div v-if="errorMessage">{{ errorMessage }}</div>
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
    ...mapGetters(["question", "userId"]),
  },
  methods: {
    optionSelected(id) {
      this.selectedOption = id;
      this.$store.dispatch("voteForQuestion", id);
    },
  },
  data() {
    return {
      selectedOption: null,
      errorMessage: null,
    };
  },
  created() {
    this.$store.dispatch("loadQuestion", this.$props.questionId).then((res) => {
      if (res.isError) {
        this.errorMessage = res.message;
      } else {
        const voteIndex = this.question.votes.findIndex(
          (vote) => vote.userId === this.userId
        );

        if (voteIndex !== -1) {
          this.selectedOption = this.question.votes[voteIndex].optionId;
        }
      }
    });
  },
};
</script>

<style scoped></style>

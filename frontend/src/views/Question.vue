<template>
  <div v-if="question">
    <div class="text-3xl font-bold mb-2">{{ question.question }}</div>
    <div class="text-lg text-gray-400 mb-6">Select an option</div>
    <answer-options-list
      :options="question.options"
      :selectedOption="selectedOption"
      @optionSelected="optionSelected"
      class="mb-8"
    />
    <div
      v-if="question.createdBy === userId"
      class="
        p-4
        border-2 border-purple-500
        rounded-lg
        flex flex-col
        justify-center
        items-center
      "
    >
      <div class="text-xl mb-4 font-semibold">
        Share this question with your friends using the following code
      </div>
      <div class="text-2xl bg-gray-400 text-white p-2 rounded-lg inline-block">
        {{ question.id }}
      </div>
      <div class="text-lg opacity-50 my-4">OR</div>
      <div
        class="
          text-xl
          underline
          p-2
          rounded-lg
          inline-block
          text-gray-500
          cursor-pointer
        "
      >
        Copy Link 🔗
      </div>
    </div>
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

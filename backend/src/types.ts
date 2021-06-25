export const TYPES = {
  PrismaClient: Symbol.for("PrismaClient"),
  UserIdMiddleware: Symbol.for("UserIdMiddleware"),
};

export interface CreateQuestionPayload {
  question: string;
  options: {
    option: string;
  }[];
  maxVotes?: number;
}

import { inject } from "inversify";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import validationMiddleware from "../../middleware/validation.middleware";
import { QuestionService } from "../../services/question.service";
import { CreateQuestionPayload, TYPES } from "../../types";
import { createQuestionValidator } from "./question.validator";

@controller("/questions")
export class QuestionController {
  constructor(
    @inject(QuestionService) private questionService: QuestionService
  ) {}

  @httpPost(
    "/",
    TYPES.UserIdMiddleware,
    validationMiddleware({ body: createQuestionValidator })
  )
  public async createQuestion(@requestBody() body: CreateQuestionPayload) {
    return this.questionService.createQuestion(body);
  }
}

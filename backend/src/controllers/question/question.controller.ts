import { Request } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  request,
  requestBody,
  requestParam,
} from "inversify-express-utils";
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
  public async createQuestion(
    @request() req: Request,
    @requestBody() body: CreateQuestionPayload
  ) {
    return this.questionService.createQuestion(req.user, body);
  }

  @httpGet("/:id", TYPES.UserIdMiddleware)
  public async getQuestionId(@requestParam("id") id: string) {
    return this.questionService.getQuestionById(id);
  }
}

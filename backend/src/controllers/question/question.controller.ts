import { Request } from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  httpPut,
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

  @httpPut("/:questionId/vote/:optionId", TYPES.UserIdMiddleware)
  public async voteForQuestion(
    @request() req: Request,
    @requestParam("questionId") questionId: string,
    @requestParam("optionId") optionId: string
  ) {
    return this.questionService.voteForQuestion(req.user, questionId, optionId);
  }
}

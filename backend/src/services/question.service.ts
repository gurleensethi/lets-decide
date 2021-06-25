import { Option, PrismaClient, Question } from "@prisma/client";
import cuid from "cuid";
import { inject, injectable } from "inversify";
import { CreateQuestionPayload, TYPES } from "../types";

@injectable()
export class QuestionService {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  private generateUniqueId(): string {
    const id = cuid();
    return id.substring(id.length - 6);
  }

  public async createQuestion(
    payload: CreateQuestionPayload
  ): Promise<Question & { options: Option[] }> {
    let id = this.generateUniqueId();

    while (true) {
      id = this.generateUniqueId();

      console.log(`Trying to create question with id ${id}`);

      const existingQuestion = await this.prismaClient.question.findFirst({
        where: { id },
      });

      if (existingQuestion === null) {
        break;
      }

      console.log(`Question already exists for id ${id}, finding new id...`);
    }

    const expiryDate = Date.now() + 1800000;

    const question = await this.prismaClient.question.create({
      data: {
        id,
        question: payload.question,
        maxVotes: payload.maxVotes,
        expiresAt: new Date(expiryDate),
        options: {
          create: payload.options.map((item) => ({
            id: cuid(),
            option: item.option,
          })),
        },
      },
      select: {
        id: true,
        expiresAt: true,
        maxVotes: true,
        question: true,
        options: true,
      },
    });

    return question;
  }
}

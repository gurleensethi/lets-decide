import { Option, PrismaClient, Question, Vote } from "@prisma/client";
import cuid from "cuid";
import { inject, injectable } from "inversify";
import { HttpError } from "../errors/http.error";
import { CreateQuestionPayload, TYPES } from "../types";

@injectable()
export class QuestionService {
  constructor(@inject(TYPES.PrismaClient) private prismaClient: PrismaClient) {}

  private generateUniqueId(): string {
    const id = cuid();
    return id.substring(id.length - 6);
  }

  public async getQuestionById(id: string) {
    const question = await this.prismaClient.question.findUnique({
      where: { id },
      include: { options: true, votes: true },
    });

    if (!question) {
      throw new HttpError(404, "Question not found!");
    }

    return question;
  }

  public async createQuestion(
    userId: string,
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
        createdBy: userId,
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
        createdBy: true,
      },
    });

    return question;
  }

  public async voteForQuestion(
    userId: string,
    questionId: string,
    optionId: string
  ): Promise<Vote> {
    const question = await this.prismaClient.question.findUnique({
      where: { id: questionId },
      select: { options: true },
    });

    if (!question) {
      throw new HttpError(404, `Question not found!`);
    }

    // Check if question has the option.
    if (question.options.findIndex((option) => option.id === optionId) === -1) {
      throw new HttpError(404, "Invalid option for question");
    }

    // Delete existing votes for this question
    await this.prismaClient.vote.deleteMany({
      where: { questionId, userId },
    });

    // Create the new vote
    return await this.prismaClient.vote.create({
      data: { optionId, questionId, userId },
    });
  }
}

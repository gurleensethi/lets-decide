import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class FooService {
  constructor(
    @inject(TYPES.PrismaClient) private prismaService: PrismaClient
  ) {}

  public async hello() {
    return {
      question: await this.prismaService.question.findMany({
        include: {
          options: {
            include: {
              votes: true,
            },
          },
        },
      }),
    };
  }
}

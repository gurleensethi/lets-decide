import joi from "joi";

export const createQuestionValidator = joi.object({
  question: joi.string().min(6).required(),
  options: joi
    .array()
    .items(
      joi.object({
        option: joi.string().required(),
      })
    )
    .required(),
  maxVotes: joi.number().optional(),
});

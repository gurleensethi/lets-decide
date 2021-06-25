import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export default function validationMiddleware(
  validators: { body?: Joi.Schema } = {}
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (validators.body) {
      const validation = validators.body.validate(req.body);

      if (validation.error) {
        res.statusCode = 400;
        res.json({
          message: validation.error.details
            .map((item) => item.message)
            .join("\n"),
        });
        return;
      }
    }

    return next();
  };
}

export class HttpError extends Error {
  constructor(private statusCode: number, message: string) {
    super(message);
  }
}

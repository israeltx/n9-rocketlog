import { Request, Response } from "express";
import { resolve } from "path";

class SessionsController {
  create(request: Request, response: Response) {
    return response.json({message:'ok'})
  }
}

export { SessionsController }
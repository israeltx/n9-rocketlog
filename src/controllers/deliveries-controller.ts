import { Request, Response } from "express";
// import { AppError } from "@/utils/AppError";
// import { authConfig } from "@/configs/auth";
// import { prisma } from "@/database/prisma";
// import { sign } from "jsonwebtoken"
// import { compare } from "bcrypt";
// import { z } from "zod"

class DeliveriesController {
  create(request: Request, response: Response) {
    return response.json({message:'ok'})
  }
}

export { DeliveriesController }
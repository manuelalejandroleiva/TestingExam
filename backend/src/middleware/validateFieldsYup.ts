
import { Request, Response, NextFunction } from "express";

export const validateFieldsyup = (schema: any) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    await schema.validate(req.body)
    
    next()
  } catch (error) {
    //@ts-ignore
    return res.status(404).json({ msg: error.message })

  }



};

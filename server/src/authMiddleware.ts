import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    res.locals.user = decodedToken;

    next();
  } catch (error: any) {
    res.status(401).json({
      error: error.message,
    });
  }
};

export default authenticate;

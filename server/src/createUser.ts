import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    res.json(userRecord.toJSON());
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export default createUser;
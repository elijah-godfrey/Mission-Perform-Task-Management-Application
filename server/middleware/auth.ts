import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authenticated request interface
export interface AuthRequest extends Request {
  user?: any;
}

// Authenticated request middleware
export const auth: RequestHandler = async (
    req: AuthRequest, res: Response, next: NextFunction
) => {
  try {
    // Strip 'Bearer' from token if present, leaving only the token
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'No token, authorization denied' });
      return;
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    // Verify token
    const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET
    ) as any;

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: 'Token is not valid' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}; 
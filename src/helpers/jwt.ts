import { sign, verify } from 'jsonwebtoken';
const SECRET_KEY = 'superpower';

export const signToken = (payload: object) => sign(payload, SECRET_KEY);
export const verifyToken = (token: any) => verify(token, SECRET_KEY);

import { hashSync, compareSync } from 'bcrypt';

export const hashPass = (password: string) => hashSync(password, 10);

export const comparePass = (password: string, hash: string) =>
  compareSync(password, hash);

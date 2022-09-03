import { Document } from 'mongoose';

interface IQuestions extends Document {
  readonly question: string;
  readonly option: Array<object>;
}

interface IUsers extends Document {
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
}

export { IQuestions, IUsers };

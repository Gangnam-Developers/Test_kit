import { Document } from 'mongoose';

interface IQuestions extends Document {
  readonly question: string;
  readonly option: Array<object>;
}

interface IUsers extends Document {
  readonly name: string;
  readonly email: string;
  readonly picture: string;
  readonly quizzes: Array<any>;
}

export { IQuestions, IUsers };

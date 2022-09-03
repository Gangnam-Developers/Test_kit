import { Connection } from 'mongoose';
import { QuestionSchema } from 'src/model/questions.schema';
import { UserSchema } from 'src/model/users.schema';

const UserProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

const QuestionProviders = [
  {
    provide: 'QUESTIONS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Questions', QuestionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

export { UserProviders, QuestionProviders };

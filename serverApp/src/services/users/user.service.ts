import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUser } from 'src/struct/input/input';
import { IUsers } from 'src/struct/interface/interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUsers>,
  ) {}

  getCompetitors = async () => {
    return await this.userModel.find().exec();
  };

  getUser = async (email: string) => {
    return await this.userModel.findOne({ email });
  };

  updateQuizz = async (email: string, quizzes: object) => {
    return await this.userModel.findOneAndUpdate(
      { email: email },
      {
        $push: {
          quizzes: quizzes,
        },
      },
      {
        upsert: true,
      },
    );
  };

  create = async (createUser: CreateUser): Promise<IUsers> => {
    const initUser = new this.userModel(createUser);
    return await initUser.save();
  };
}

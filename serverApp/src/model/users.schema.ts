import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    picture: String,
    quizzes: Array<any>,
    rate: Number,
  },
  {
    timestamps: true,
  },
);

export { UserSchema };

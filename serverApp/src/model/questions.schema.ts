import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    question: String,
    options: Array<object>,
  },
  {
    timestamps: true,
  },
);

export { QuestionSchema };

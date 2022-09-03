import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    picture: String,
  },
  {
    timestamps: true,
  },
);

export { UserSchema };

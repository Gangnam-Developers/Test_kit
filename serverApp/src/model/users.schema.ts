import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
  },
  {
    timestamps: true,
  },
);

export { UserSchema };

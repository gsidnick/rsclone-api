import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
      required: true,
    },
  },
  {
    strictQuery: true,
  },
);

export default mongoose.model('User', userSchema);

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    word: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    learn: {
      type: Number,
      default: 0,
    },
  },
  {
    strictQuery: true,
  },
);

export default mongoose.model('Word', wordSchema);

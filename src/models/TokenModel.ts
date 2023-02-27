import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    strictQuery: true,
  },
);

export default mongoose.model('Token', tokenSchema);

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statisticSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    score: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  {
    strictQuery: true,
  },
);

export default mongoose.model('Statistic', statisticSchema);

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const statisticSchema = new Schema(
  {
    score: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  {
    strictQuery: true,
  },
);

export default mongoose.model('Statistic', statisticSchema);

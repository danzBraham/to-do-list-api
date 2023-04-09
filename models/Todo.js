import mongoose from "mongoose";

export const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Todo", TodoSchema);

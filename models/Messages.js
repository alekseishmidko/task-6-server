import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema(
  {
    key: { type: Number, unique: true },
    user: { type: String },
    text: { type: String, required: true },
    tags: { type: [] },
    dateOfCreate: { type: String },
  }
  // { timestamps: true }
);
export default mongoose.model("MessageModel", MessageSchema);

import mongoose from "mongoose";

export interface IPost extends mongoose.Document {
  title?: string;
  message?: string;
  creator?: string;
  tags?: string[];
  selectedFile?: string;
  likeCount: number;
  createdAt: string;
}

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const PostMessage = mongoose.model<IPost>("PostMessage", postSchema);

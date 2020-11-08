import { Request, Response } from "express";
import mongoose from "mongoose";
import { IPost, PostMessage } from "../models/postMessage";

type handler = (req: Request, res: Response) => any;

export const getPosts: handler = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const createPost: handler = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
};

export const updatePost: handler = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }
  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost: handler = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post deleted" });
};

export const likePost: handler = async (req, res) => {
  const { id } = req.params;
  const post = await PostMessage.findById(id);
  if (!post) {
    return res.status(404).send("No post with that id");
  }

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );
    res.json(updatedPost);
  } catch (e) {
    console.log(e);
  }
};

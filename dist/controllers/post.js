"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postMessage_1 = require("../models/postMessage");
exports.getPosts = async (req, res) => {
    try {
        const postMessage = await postMessage_1.PostMessage.find();
        res.status(200).json(postMessage);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postMessage_1.PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch (e) {
        res.status(409).json({ message: e.message });
    }
};
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id");
    }
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await postMessage_1.PostMessage.findByIdAndUpdate(id, updatedPost, {
        new: true,
    });
    res.json(updatedPost);
};
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id");
    }
    await postMessage_1.PostMessage.findByIdAndDelete(id);
    res.json({ message: "Post deleted" });
};
exports.likePost = async (req, res) => {
    const { id } = req.params;
    const post = await postMessage_1.PostMessage.findById(id);
    if (!post) {
        return res.status(404).send("No post with that id");
    }
    try {
        const updatedPost = await postMessage_1.PostMessage.findByIdAndUpdate(id, {
            likeCount: post.likeCount + 1,
        }, { new: true });
        res.json(updatedPost);
    }
    catch (e) {
        console.log(e);
    }
};
//# sourceMappingURL=post.js.map
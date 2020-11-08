"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controllers/post");
const router = express_1.default.Router();
router.get("/", post_1.getPosts);
router.post("/", post_1.createPost);
router.patch("/:id", post_1.updatePost);
router.delete("/:id", post_1.deletePost);
router.patch("/:id/likePost", post_1.likePost);
exports.default = router;
//# sourceMappingURL=posts.js.map
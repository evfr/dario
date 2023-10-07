"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = __importDefault(require("../services/PostService"));
class PostController {
    constructor() {
        this.getAllUserPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            const posts = yield this.postService.getAllUserPosts(user.id);
            res.json(posts);
        });
        this.getUserFriendsPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            const posts = yield this.postService.getUserFriendsPosts(user.id);
            res.json(posts);
        });
        this.addPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            const { text } = req.body;
            if (!text) {
                res.status(400).json({ message: 'Bad request. missing field "text"' });
            }
            const random = Math.floor(Math.random() * 10000) + 1;
            const date = new Date();
            const newPost = yield this.postService.addPost({ id: random, text, userId: user.id, date });
            res.json(newPost);
        });
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            const postId = parseInt(req.params.id);
            const { text } = req.body;
            if (!text) {
                res.status(400).json({ message: 'Bad request. missing field "text" or "id"' });
            }
            const newPost = yield this.postService.updatePost({ id: postId, text, userId: user.id, date: new Date() });
            res.json(newPost);
        });
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(req.params.id);
            yield this.postService.deletePost(postId);
            res.json({ deleted: true });
        });
        this.postService = new PostService_1.default();
    }
}
exports.default = PostController;
//# sourceMappingURL=PostController.js.map
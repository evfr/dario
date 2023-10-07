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
const DbService_1 = __importDefault(require("./DbService"));
class PostService {
    getAllUserPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            const dbPosts = yield this.db.collection("posts").find({ userId }).toArray();
            const transformedPosts = dbPosts.map(dbPost => ({
                id: dbPost.id,
                userId: dbPost.id,
                text: dbPost.text,
                date: dbPost.date
            }));
            return transformedPosts;
        });
    }
    getUserFriendsPosts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            const friendsIds = yield this.db.collection("users").find({ id: userId }, { projection: { friends: 1 } }).toArray();
            if (!friendsIds || !friendsIds.length) {
                return [];
            }
            const dbPosts = yield this.db.collection("posts").find({ userId: { $in: friendsIds[0].friends } }).toArray();
            const transformedPosts = dbPosts.map(dbPost => ({
                id: dbPost.id,
                userId: dbPost.userId,
                text: dbPost.text,
                date: dbPost.date
            }));
            return transformedPosts;
        });
    }
    addPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            yield this.db.collection("posts").insertOne(post);
            return post;
        });
    }
    updatePost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            yield this.db.collection("posts").updateOne({ id: post.id, userId: post.userId }, { $set: { text: post.text, date: post.date } });
            return post;
        });
    }
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            yield this.db.collection("posts").deleteOne({ id: postId });
            return;
        });
    }
}
exports.default = PostService;
//# sourceMappingURL=PostService.js.map
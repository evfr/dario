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
const FriendService_1 = __importDefault(require("../services/FriendService"));
class PostController {
    constructor() {
        this.getUserFriends = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            const friends = yield this.friendService.getUserFriends(user.id);
            res.json(friends);
        });
        this.sendFriendRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            const { friendId } = req.body;
            if (!friendId) {
                res.status(400).json({ message: 'Bad request. missing field "friendId"' });
            }
            const result = yield this.friendService.sendFriendRequest(friendId, user.id);
            res.json({ sent: result });
        });
        this.acceptFriendRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            const { friendId } = req.body;
            if (!friendId) {
                res.status(400).json({ message: 'Bad request. missing field "friendId"' });
            }
            const result = yield this.friendService.acceptFriendRequest(friendId, user.id);
            res.json({ accepted: result });
        });
        this.rejectFriendRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.user;
            const { friendId } = req.body;
            if (!friendId) {
                res.status(400).json({ message: 'Bad request. missing field "friendId"' });
            }
            const result = yield this.friendService.rejectFriendRequest(friendId, user.id);
            res.json({ rejected: result });
        });
        this.friendService = new FriendService_1.default();
    }
}
exports.default = PostController;
//# sourceMappingURL=FriendController.js.map
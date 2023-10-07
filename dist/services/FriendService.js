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
class FriendService {
    getUserFriends(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            const dbFriends = yield this.db.collection("users").find({ userId }).toArray();
            const transformedFriends = dbFriends.map(dbFriend => ({
                id: dbFriend.id,
                name: dbFriend.id,
                email: dbFriend.email,
                pass: ''
            }));
            return transformedFriends;
        });
    }
    sendFriendRequest(friendId, myId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            yield this.db.collection("users").updateOne({ id: friendId }, { $push: { friendRequests: { $each: [myId] } } });
            return true;
        });
    }
    acceptFriendRequest(friendId, myId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            yield this.db.collection("users").updateOne({ id: myId }, {
                $push: { friends: { $each: [friendId] } },
                $pull: { friendRequests: friendId },
            });
            return true;
        });
    }
    rejectFriendRequest(friendId, myId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            yield this.db.collection("users").updateOne({ id: myId }, { $pull: { friendRequests: friendId } });
            return true;
        });
    }
}
exports.default = FriendService;
//# sourceMappingURL=FriendService.js.map
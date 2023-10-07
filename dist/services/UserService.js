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
class UserService {
    isEligible(checkContact) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            const dbContact = yield this.db.collection('contacts').findOne(checkContact);
            if (dbContact) {
                const contact = {
                    id: dbContact.id,
                    name: dbContact.name,
                    email: dbContact.email,
                    phone: dbContact.phone,
                    isEnrolled: dbContact.isEnrolled
                };
                return contact;
            }
            return null;
        });
    }
    setEnrolled(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield DbService_1.default.getDb();
            yield this.db.collection('contacts').findOneAndUpdate(contact, { $set: { isEnrolled: true } });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map
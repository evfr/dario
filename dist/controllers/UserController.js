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
const UserService_1 = __importDefault(require("../services/UserService"));
const EmailService_1 = __importDefault(require("../services/EmailService"));
const EligibleDevicesTemplateService_1 = __importDefault(require("../services/EligibleDevicesTemplateService"));
class UserController {
    constructor() {
        this.validateUserData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phone, email, id } = req.body;
                if (!name || !phone || !email || !id) {
                    res.status(400).json({ message: 'Bad request. missing field' });
                    return;
                }
                const phonePattern = /^(?:\+\d{1,3})?\d{10}(?:$|-\d{1,4}$)/;
                if (!phonePattern.test(phone)) {
                    res.status(400).json({ message: 'Bad request. Phone number is incorrect' });
                    return;
                }
                ;
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(email)) {
                    res.status(400).json({ message: 'Bad request. Email is incorrect' });
                    return;
                }
                ;
                if (!/^\d{9}$/.test(id)) {
                    res.status(400).json({ message: 'Bad request. Id is incorrect' });
                    return;
                }
                next();
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
        this.getUserDevices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phone, email, id } = req.body;
                const dbContact = yield this.userService.isEligible({ name, phone, email, id });
                if (dbContact) {
                    const html = EligibleDevicesTemplateService_1.default.getHTML({ name, phone, email, id });
                    if (!dbContact.isEnrolled) {
                        const msg = {
                            to: email,
                            from: 'evfisher@gmail.com',
                            subject: 'Your Dario Health Eligible Devices',
                            html,
                        };
                        yield this.emailService.sendEmail(msg);
                        yield this.userService.setEnrolled({ name, phone, email, id });
                    }
                    res.status(200).json({ eligibleDevices: html });
                }
                else {
                    res.status(400).json({ message: 'User is not eligible. Please contact your employer.' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
        this.userService = new UserService_1.default();
        this.emailService = new EmailService_1.default();
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map
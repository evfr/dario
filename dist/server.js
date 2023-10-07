"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const UserController_1 = __importDefault(require("./controllers/UserController"));
const DbService_1 = __importDefault(require("./services/DbService"));
const ContactsImportController_1 = __importDefault(require("./controllers/ContactsImportController"));
const ReportController_1 = __importDefault(require("./controllers/ReportController"));
class Server {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.configureMiddleware();
        this.configureRoutes();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public'));
    }
    configureRoutes() {
        const userController = new UserController_1.default();
        const importController = new ContactsImportController_1.default();
        const reportController = new ReportController_1.default();
        this.app.get('/import', importController.import);
        this.app.get('/form', (req, res) => {
            res.sendFile('form.html', { root: 'public' });
        });
        this.app.post('/submit', userController.validateUserData, userController.getUserDevices);
        this.app.get('/report', reportController.report);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield DbService_1.default.getDb();
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        });
    }
}
const port = 3000;
const server = new Server(port);
server.start();
//# sourceMappingURL=server.js.map
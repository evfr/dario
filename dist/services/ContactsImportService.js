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
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const path = __importStar(require("path"));
const DbService_1 = __importDefault(require("./DbService"));
const filePath = path.join(__dirname, '..', '..', 'data', 'contacts.csv');
class ContactsImportService {
    import() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.db = yield DbService_1.default.getDb();
                yield this.db.collection('contacts').deleteMany({});
                const bulkOps = [];
                const batchSize = parseInt((_a = process.env.CONTACTS_BATCH_SIZE) !== null && _a !== void 0 ? _a : '50');
                const rl = readline.createInterface({
                    input: fs.createReadStream(filePath),
                    crlfDelay: Infinity,
                });
                rl.on('line', (line) => __awaiter(this, void 0, void 0, function* () {
                    const contactData = line.split(',');
                    // Create a new contact document
                    const contact = {
                        name: contactData[0].trim(),
                        email: contactData[1].trim(),
                        phone: contactData[2].trim(),
                        id: contactData[3].trim(),
                        isEnrolled: false
                    };
                    bulkOps.push({
                        insertOne: {
                            document: contact,
                        },
                    });
                    // If the batch size is reached, perform a bulk insert
                    if (bulkOps.length === batchSize) {
                        yield this.db.collection('contacts').bulkWrite(bulkOps, { ordered: false });
                        bulkOps.length = 0; // Clear the bulk operations array
                    }
                }));
                rl.on('close', () => __awaiter(this, void 0, void 0, function* () {
                    // Insert any remaining documents in the bulk operations array
                    if (bulkOps.length > 0) {
                        yield this.db.collection('contacts').bulkWrite(bulkOps, { ordered: false });
                        console.log('Finished reading the file and performing bulk inserts');
                    }
                }));
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = ContactsImportService;
//# sourceMappingURL=ContactsImportService.js.map
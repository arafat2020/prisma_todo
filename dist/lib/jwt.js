"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_severt = '89734jkshfg9309503hnk';
const createToken = (id, name) => {
    return jsonwebtoken_1.default.sign({
        data: {
            id, name
        }
    }, jwt_severt, { expiresIn: '10h' });
};
exports.createToken = createToken;
const verifyJwt = (token) => {
    return jsonwebtoken_1.default.verify(token, jwt_severt, function (err, decoded) {
        return decoded;
    });
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwt.js.map
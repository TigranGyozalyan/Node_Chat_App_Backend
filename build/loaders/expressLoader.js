"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const RoomController_1 = __importDefault(require("../controller/RoomController"));
const security_1 = require("../security");
exports.default = async ({ app }) => {
    app.use(cors_1.default(security_1.corsConfig));
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    app.use(UserController_1.default);
    app.use(RoomController_1.default);
    return http.createServer(app);
};

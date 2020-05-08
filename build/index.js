"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../env");
require("reflect-metadata");
const loaders_1 = __importDefault(require("./loaders"));
async function init() {
    const app = express_1.default();
    const server = await loaders_1.default({ app });
    server.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
}
init();

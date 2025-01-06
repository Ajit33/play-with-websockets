"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const httpServer = app.listen(8000);
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on("connection", (ws) => {
    console.log("A client is connected ");
    ws.send("Welcome to web socker server");
    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
        // Echo the message back to the client
        ws.send(`Server received: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected.');
    });
    // Handle errors
    ws.on('error', (error) => {
        console.error(`WebSocket error: ${error}`);
    });
});

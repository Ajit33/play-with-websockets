import express, { Request, Response, NextFunction } from "express";
import { WebSocketServer, WebSocket } from "ws";
import http from "http"; // TypeScript requires explicit typing for HTTP server

// Initialize express application
const app = express();
app.use(express.json());

// Create an HTTP server to pass to WebSocketServer
const httpServer = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws: WebSocket) => {
    console.log("A client is connected");
    
   
    ws.send("Welcome to the WebSocket server");


    ws.on("message", (message: string) => {
        console.log(`Received: ${message}`);

        
        ws.send(`Server received: ${message}`);
    });

    ws.on("close", () => {
        console.log("Client disconnected.");
    });

    // Handle WebSocket errors
    ws.on("error", (error: Error) => {
        console.error(`WebSocket error: ${error.message}`);
    });
});

// Start the HTTP server
const PORT = 8000;
httpServer.listen(PORT, () => {
    console.log(`HTTP server is running on http://localhost:${PORT}`);
});

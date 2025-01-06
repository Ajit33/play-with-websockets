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
let request = 0;

wss.on("connection", (ws: WebSocket) => {
    console.log("A client is connected");

    ws.send("Welcome to the WebSocket server");

    ws.on("message", (message: string) => {
        // Parse the message as JSON and extract the number
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            ws.send("Invalid JSON format");
            return;
        }

        const numericMessage = Number(parsedMessage.message); // Access the 'message' field from the JSON

        if (isNaN(numericMessage)) {
            ws.send("Invalid message: Not a number");
            return;
        }

        request++;
        console.log(`Received: ${numericMessage}`);
        
        const ans = numericMessage % 2;
        console.log(ans);

        if (numericMessage % 2 === 0 && request % 6 !== 0) {
            ws.send("Current batsman is playing");
        } else {
            ws.send("Bating switch to non-strike");
        }

        ws.send(`Server received: ${numericMessage}`);
    });

    ws.on("close", () => {
        console.log("Client disconnected.");
        request=0;
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

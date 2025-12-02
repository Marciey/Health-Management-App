import express from "express";
import { sendMessage } from "../controller/messageController.js";
const router = express.Router();
console.log("Message router loaded");
router.post('/send', sendMessage);
export default router;
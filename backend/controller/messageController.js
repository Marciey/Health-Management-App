import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import {Message} from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
        const body = req.body || {};                  // avoid destructuring undefined
        const { firstName, lastName, email, phone, message } = body;

        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        await Message.create({ firstName, lastName, email, phone, message });

        return res.status(200).json({
            success: true,
            message: "Message sent successfully.",
        });
});

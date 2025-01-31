const assistant = require('../config/ibmConfig');

class ChatbotController {
    static async sendMessage(req, res, next) {
        try {
            const { sessionId, message } = req.body;
            const response = await assistant.message({
                assistantId: process.env.IBM_ASSISTANT_ID,
                sessionId,
                input: {
                    'message_type': 'text',
                    'text': message,
                }
            });
            res.json(response.result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ChatbotController; 
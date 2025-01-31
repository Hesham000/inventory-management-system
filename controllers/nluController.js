const { nlu } = require('../config/ibmConfig');

class NLUController {
    static async analyzeText(req, res, next) {
        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ message: 'Text is required for analysis' });
            }

            const analyzeParams = {
                text,
                features: {
                    sentiment: {},
                    emotion: {},
                    keywords: {},
                },
            };

            const analysisResults = await nlu.analyze(analyzeParams);
            res.json(analysisResults.result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NLUController; 
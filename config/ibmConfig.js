const AssistantV2 = require('ibm-watson/assistant/v2');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const { S3 } = require('ibm-cos-sdk');

const assistant = new AssistantV2({
    version: '2021-06-14',
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_API_KEY,
    }),
    serviceUrl: process.env.IBM_SERVICE_URL,
});

const nlu = new NaturalLanguageUnderstandingV1({
    version: '2021-08-01',
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_NLU_API_KEY,
    }),
    serviceUrl: process.env.IBM_NLU_SERVICE_URL,
});

const visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_VR_API_KEY,
    }),
    serviceUrl: process.env.IBM_VR_SERVICE_URL,
});

const cos = new S3({
    endpoint: process.env.IBM_COS_ENDPOINT,
    apiKeyId: process.env.IBM_COS_API_KEY,
    ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
    serviceInstanceId: process.env.IBM_COS_INSTANCE_ID,
});

module.exports = { assistant, nlu, visualRecognition, cos }; 
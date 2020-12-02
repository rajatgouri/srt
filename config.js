module.exports = {
    mongoUrl : 'mongodb://localhost:27017/truckloads',
    stripeKey: 'sk_test_aWM6xSsKwEGjnm4YcM2kFE3600yta0e0ez',
    aws: {
        accessKey: 'AKIAJMIIKCUWU56OONVQ',
        secretKey: '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',
        region: 'ap-southeast-2'
    },
    googleKey: 'AIzaSyClAnc__rQnEoH75Zs2sbWKj06tAYlSQus',
    jwt: {
        email: {
            secretKey: 'jsonEmailWebTokenTruckLoadsSecretKey',
            expiresIn: '15m'
        },
        password : {
            secretKey: 'jsonPasswordWebTokenTruckLoadsSecretKey',
            expiresIn: '15m'
        }
        
        
    }
}
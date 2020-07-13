const config     = require('../config');
const rcSDK      = require('@ringcentral/sdk').SDK;
const rcsdk      = new rcSDK({
    server          : config.ringcentral.serverURL,
    clientId        : config.ringcentral.clientId,
    clientSecret    : config.ringcentral.clientSecret,
    redirectUri     : ''
});
const rcPlatform = rcsdk.platform();

const ringcentral = {
    
}

module.exports = ringcentral;
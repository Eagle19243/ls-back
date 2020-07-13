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
    getMessages
}

async function getContacts(rcAuthData) {    
    rcPlatform.auth().setData(rcAuthData);

    try {
        const response = await rcPlatform.get(`/restapi/v1.0/account/~/extension/~/address-book/contact`);
        const jsonObj = response.json();
        return jsonObj.records;
    } catch (err) {
        console.log('getContacts', err.message);
        return [];
    }
}

async function getMessageList(rcAuthData) {        
    rcPlatform.auth().setData(rcAuthData);

    try {
        const response = await rcPlatform.get(`/restapi/v1.0/account/~/extension/~/message-store`);
        const jsonObj = response.json();
        return jsonObj.records;
    } catch(err) {
        console.log('getMessageList', err.message);
        return [];
    }
}

async function getMessages(phoneNumber, rcAuthData) {
    // const contacts = await getContacts(rcAuthData);
    const messages = await getMessageList(rcAuthData);
    const result   = {};
    
    for (const data of messages) {
        if (data['from']['phoneNumber'] != phoneNumber) {
            if (result[data['from']['phoneNumber']] != undefined) {
                result[data['from']['phoneNumber']].push(data);
            } else {
                result[data['from']['phoneNumber']] = [data];
            }
        }

        for (const record of data["to"]) {
            const phone_number = record["phoneNumber"];

            if (result[phone_number] != undefined) {
                result[phone_number].push(data);
            } else {
                result[phone_number] = [data];
            }
        }
    }

    for (const key in result) {
        result[key] = result[key].sort((a, b) => {
            return new Date(a.creationTime).getTime() - new Date(b.creationTime).getTime();
        });
    }

    return result;
}

module.exports = ringcentral;
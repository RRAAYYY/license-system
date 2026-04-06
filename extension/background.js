const CHECK_INTERVAL = 5 * 60 * 1000;
chrome.alarms.create('checkLicenseStatus', { periodInMinutes: 5 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkLicenseStatus') {
        checkLicenseExpiry();
    }
});

async function checkLicenseExpiry() {
    const { licensedKey, licenseData } = await chrome.storage.local.get(['licensedKey', 'licenseData']);

    if (licensedKey && licenseData) {
        const expiry = new Date(licenseData.expiresAt);
        const now = new Date();

        if (now > expiry) {
            chrome.action.setBadgeText({ text: '⚠' });
            chrome.action.setBadgeBackgroundColor({ color: '#dc3545' });
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, { action: 'licenseExpired' }).catch(() => {});
                });
            });
        } else {
            chrome.action.setBadgeText({ text: '✓' });
            chrome.action.setBadgeBackgroundColor({ color: '#28a745' });
        }
    } else {
        chrome.action.setBadgeText({ text: '' });
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkLicense') {
        chrome.storage.local.get(['licensedKey', 'licenseData'], (result) => {
            sendResponse({ isActive: !!result.licensedKey && new Date(result.licenseData?.expiresAt) > new Date(), license: result.licenseData });
        });
        return true;
    }
});

chrome.runtime.onInstalled.addListener(() => {
    console.log('License Key System Extension installed');
    checkLicenseExpiry();
});
// background.js

// Function to check license expiry
function checkLicenseExpiry() {
    const expirationDate = new Date('2026-04-07T00:00:00Z'); // License expires on this date
    const currentDate = new Date();
    const remainingTime = expirationDate - currentDate;
    const minutesRemaining = Math.floor(remainingTime / 1000 / 60);

    if (minutesRemaining <= 0) {
        // License has expired
        chrome.browserAction.setBadgeText({text: 'EXPIRED'});
    } else {
        // Update badge text with remaining time
        chrome.browserAction.setBadgeText({text: `${minutesRemaining} min`});
    }
}

// Check every 5 minutes
setInterval(checkLicenseExpiry, 5 * 60 * 1000);
checkLicenseExpiry();
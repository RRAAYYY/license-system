// background.js

// Background service worker for key validation and expiry checks.

const VALID_KEYS = ['your-key-1', 'your-key-2']; // Replace with your actual keys

function checkKeyValidity(key) {
    return VALID_KEYS.includes(key);
}

function checkKeyExpiry(key) {
    // This function checks if a key has expired. 
    // For demo purposes, we'll assume keys have a fixed expiry date.
    const expiryDate = new Date('2026-04-07T10:18:53Z'); // Example expiry date
    return new Date() < expiryDate;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'validateKey') {
        const isValid = checkKeyValidity(request.key);
        const isExpired = !checkKeyExpiry(request.key);
        sendResponse({ valid: isValid, expired: isExpired });
    }
});
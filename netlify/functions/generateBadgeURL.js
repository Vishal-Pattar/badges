const generateBadgeURL = (label, message, color) => `https://img.shields.io/badge/${label}-${message}-${color}?cache_bust=${Date.now()}`;

module.exports = generateBadgeURL;

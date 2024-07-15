const { fetchData, endpoints } = require('./fetchData');
const generateBadgeURL = require('./generateBadgeURL');
const axios = require('axios');

exports.handler = async (event) => {
    const { owner, repo, metric } = event.queryStringParameters;
    const color = event.queryStringParameters.color || 'blue';

    if (!endpoints[metric]) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid metric' })
        };
    }

    try {
        const data = await fetchData(owner, repo, endpoints[metric]);
        const badgeURL = generateBadgeURL(metric.charAt(0).toUpperCase() + metric.slice(1), `${data}`, color);

        const svgResponse = await axios.get(badgeURL, { headers: { Accept: 'image/svg+xml' } });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'image/svg+xml' },
            body: svgResponse.data
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error fetching data' })
        };
    }
};
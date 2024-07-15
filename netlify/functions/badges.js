const { fetchData, endpoints } = require('./fetchData');
const generateBadgeURL = require('./generateBadgeURL');
const axios = require('axios');

exports.handler = async (event) => {
    const { owner, repo } = event.queryStringParameters;
    console.log('owner:', owner, 'repo:', repo);
    const color = event.queryStringParameters.color || 'blue';

    try {
        const results = await Promise.all(Object.entries(endpoints).map(async ([metric, endpoint]) => {
            const data = await fetchData(owner, repo, endpoint);
            return { metric, data };
        }));

        const badges = results.map(({ metric, data }) => {
            const badgeURL = generateBadgeURL(metric.charAt(0).toUpperCase() + metric.slice(1), `${data}`, color);
            return { metric, badgeURL };
        });

        const badgePromises = badges.map(async ({ badgeURL }) => {
            try {
                const { data: svg } = await axios.get(badgeURL, { headers: { Accept: 'image/svg+xml' } });
                return svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
            } catch (error) {
                return null;
            }
        });

        const badgeSvgs = await Promise.all(badgePromises);

        let totalWidth = 0;
        let maxHeight = 0;
        let serialCounter = 1;

        const badgeDetails = badgeSvgs.map(svg => {
            const width = parseInt(svg.match(/width="(\d+)"/)[1]) || 0;
            const height = parseInt(svg.match(/height="(\d+)"/)[1]) || 0;
            totalWidth += width + 5;
            maxHeight = Math.max(maxHeight, height);

            const modifiedSvg = svg
                .replace(/id="s"/g, `id="s${serialCounter++}"`)
                .replace(/id="r"/g, `id="r${serialCounter}"`)
                .replace(/clip-path="url\(#r\)"/g, `clip-path="url(#r${serialCounter})"`)
                .replace(/fill="url\(#s\)"/g, `fill="url(#s${serialCounter})"`);

            return { svg: modifiedSvg, width, height };
        });

        let combinedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${maxHeight}">`;
        let xOffset = 0;
        badgeDetails.forEach(({ svg, width }) => {
            combinedSvg += `<g transform="translate(${xOffset}, 0)">${svg}</g>`;
            xOffset += width + 5;
        });
        combinedSvg += '</svg>';

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'image/svg+xml' },
            body: combinedSvg
        };
    } catch (error) {
        console.error('Error processing request:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
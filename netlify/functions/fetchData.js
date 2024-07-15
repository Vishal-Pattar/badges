const axios = require('axios');
require('dotenv').config();

const githubToken = process.env.GITHUB_TOKEN;

const endpoints = {
    views: 'traffic/views',
    clones: 'traffic/clones',
    forks: 'forks',
    downloads: 'releases',
    commits: 'commits'
};

const fetchData = async (owner, repo, endpoint) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/${endpoint}`;
    const headers = { Authorization: `token ${githubToken}` };

    try {
        const { data } = await axios.get(url, { headers });
        if (endpoint === 'traffic/views' || endpoint === 'traffic/clones') return data.count;
        if (endpoint === 'forks' || endpoint === 'commits') return data.length;
        if (endpoint === 'releases') return data.reduce((acc, release) => acc + release.assets.reduce((count, asset) => count + asset.download_count, 0), 0);
        return 0;
    } catch (error) {
        return 'Error';
    }
};
    
module.exports = { fetchData, endpoints };
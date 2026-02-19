const GitHubSDK = require('../GitHubSDK');
const nodeFetch = require('node-fetch');
global.fetch = nodeFetch;
const { USERNAME, SECRET_TOKEN } = require('../config/token');

describe('GitHubSDK', () => {
    it ('should create instance with username and token', () => {
        const sdk = new GitHubSDK('testUser', 'testToken')
        expect(sdk.userName).toBe('testUser')
        expect(sdk.token).toBe('testToken')
        expect(sdk.baseUrl).toBe('https://api.github.com')
    })

    // it ('sendInvitation method should exist', () => {
    //     const sdk = new GitHubSDK('testUser', 'testToken')
    //     expect(typeof sdk.sendInvitation).toBe('function')
    // })

    // it ('should send invitation', async () => {
    //     const sdk = new GitHubSDK(USERNAME, SECRET_TOKEN)
    //     const repoName = 'practice-js-basics';
    //     const userToInvite = 'devmentor-pl';

    //     const response = await sdk.sendInvitation(repoName, userToInvite)
    //     console.log(response.status);

    //     expect(response.status === 201 || response.status === 204).toBe(true)
    // })

    it ('should fetch user information', async () => {
        const sdk = new GitHubSDK(USERNAME, SECRET_TOKEN)
        const response = await sdk.getUserInfo('code-mike-code')
        
        expect(response.status).toBe(200)

        const data = await response.json()
        expect(data.login).toBe('code-mike-code')
    })

    it('should fetch pinned repositories', async () => {
        const sdk = new GitHubSDK(USERNAME, SECRET_TOKEN);
        const response = await sdk.getPinnedRepos();
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty('data.user.pinnedItems.nodes');
        const nodes = data.data.user.pinnedItems.nodes;
        expect(Array.isArray(nodes)).toBe(true);
        // Optionally check if at least one repo is returned
        // expect(nodes.length).toBeGreaterThan(0);
    });
})

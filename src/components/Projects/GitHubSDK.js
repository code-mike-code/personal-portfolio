class GitHubSDK {
    constructor(userName, token) {
        this.userName = userName;
        this.token = token;
        this.baseUrl = 'https://api.github.com';
    }

    async getPinnedRepos() {
        // This endpoint is not public in GitHub API, so we use GraphQL
        const url = `${this.baseUrl}/graphql`;
        const query = `
        query {
          user(login: "${this.userName}") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  stargazerCount
                  forkCount
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
            }
          }
        }`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        });
        return response;
    }
}

export default GitHubSDK;

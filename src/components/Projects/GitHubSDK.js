// Public GitHub REST API — no token, no secret ends up in the bundle.
// Repos for the section are picked by topic (default "portfolio"),
// z fallbackiem na najpopularniejsze publiczne repozytoria.
class GitHubSDK {
  constructor(userName) {
    this.userName = userName;
    this.baseUrl = 'https://api.github.com';
  }

  async getPortfolioRepos({ topic = 'portfolio', limit = 6 } = {}) {
    const url = `${this.baseUrl}/users/${this.userName}/repos?per_page=100&sort=updated`;
    const response = await fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    const tagged = repos.filter(
      (repo) => Array.isArray(repo.topics) && repo.topics.includes(topic)
    );

    const picked = (tagged.length > 0
      ? tagged
      : repos
          .filter((repo) => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
    ).slice(0, limit);

    // Shape matching the section components (previously GraphQL pinnedItems)
    return picked.map((repo) => ({
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      stargazerCount: repo.stargazers_count,
      forkCount: repo.forks_count,
      primaryLanguage: repo.language ? { name: repo.language, color: null } : null,
    }));
  }
}

export default GitHubSDK;

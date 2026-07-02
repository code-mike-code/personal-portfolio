const GitHubSDK = require('../GitHubSDK').default;

const restRepo = (overrides = {}) => ({
  id: 1,
  name: 'repo',
  html_url: 'https://github.com/user/repo',
  description: 'desc',
  stargazers_count: 0,
  forks_count: 0,
  language: 'JavaScript',
  topics: [],
  fork: false,
  ...overrides,
});

describe('GitHubSDK', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete global.fetch;
  });

  it('should create instance with username', () => {
    const sdk = new GitHubSDK('testUser');
    expect(sdk.userName).toBe('testUser');
    expect(sdk.baseUrl).toBe('https://api.github.com');
  });

  it('should fetch repos tagged with the portfolio topic and map them', async () => {
    const repos = [
      restRepo({ id: 1, name: 'a', topics: ['portfolio'], stargazers_count: 2, forks_count: 1 }),
      restRepo({ id: 2, name: 'b' }),
    ];
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => repos });

    const sdk = new GitHubSDK('user');
    const result = await sdk.getPortfolioRepos();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/users/user/repos?per_page=100&sort=updated',
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    expect(result).toEqual([
      {
        id: 1,
        name: 'a',
        url: 'https://github.com/user/repo',
        description: 'desc',
        stargazerCount: 2,
        forkCount: 1,
        primaryLanguage: { name: 'JavaScript', color: null },
      },
    ]);
  });

  it('should fall back to top-starred non-fork repos when no topic matches', async () => {
    const repos = [
      restRepo({ id: 1, name: 'low', stargazers_count: 1 }),
      restRepo({ id: 2, name: 'top', stargazers_count: 10 }),
      restRepo({ id: 3, name: 'forked', stargazers_count: 99, fork: true }),
    ];
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => repos });

    const sdk = new GitHubSDK('user');
    const result = await sdk.getPortfolioRepos({ limit: 2 });

    expect(result.map((r) => r.name)).toEqual(['top', 'low']);
  });

  it('should throw on API error', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 403 });

    const sdk = new GitHubSDK('user');
    await expect(sdk.getPortfolioRepos()).rejects.toThrow('GitHub API error: 403');
  });
});

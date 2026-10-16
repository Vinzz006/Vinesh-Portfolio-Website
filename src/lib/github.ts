export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
}

const BASE_URL = 'https://api.github.com';
const USERNAME = 'Vinzz006';

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${BASE_URL}/users/${USERNAME}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${BASE_URL}/users/${USERNAME}/repos?sort=updated&per_page=30&type=public`,
    { headers: { Accept: 'application/vnd.github.v3+json' } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const repos: GitHubRepo[] = await res.json();
  return repos.filter((r) => !r.fork && r.name !== USERNAME);
}

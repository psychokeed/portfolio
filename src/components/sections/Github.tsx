import { useEffect, useState } from 'react';
import type { GithubUser } from '../../types/portfolio';
import { githubUsername } from '../../data/content';
import { useGithubRepos } from '../../hooks/useGithubRepos';

/*
  DATA FETCHING = STATE + EFFECT, TOGETHER
  -------------------------------------------
  Every fetch needs at least three states, because a request can be in
  three places at any moment: still loading, failed, or succeeded with
  data. Modeling all three explicitly (instead of just `data` and hoping)
  is what lets the UI show a spinner, an error message, or the real
  content — instead of a blank page while the network is slow, or a
  crash if GitHub's API is down.

  The fetch itself goes in useEffect for the same reason the terminal's
  typing animation did: talking to the network is a side effect, not
  part of rendering. The dependency array `[]` means "run once when
  this page mounts" — we don't want to refetch on every re-render.
*/
export default function Github() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const { repos } = useGithubRepos(githubUsername, 4);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (!res.ok) throw new Error('GitHub API request failed');
        const data: GithubUser = await res.json();
        if (!cancelled) {
          setUser(data);
          setStatus('ready');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') {
    return (
      <section className="page-center" id="github">
        <p className="lede">Loading GitHub stats…</p>
      </section>
    );
  }

  if (status === 'error' || !user) {
    return (
      <section className="page-center" id="github">
        <h1>GitHub</h1>
        <p className="lede">
          Couldn't load live stats right now — set your real username in{' '}
          <code>src/data/content.ts</code> (<code>githubUsername</code>) and make sure
          it's a public GitHub account.
        </p>
      </section>
    );
  }

  return (
    <section className="page-center wide" id="github">
      <div className="gh-header">
        <img className="gh-avatar" src={user.avatar_url} alt={`${user.login}'s GitHub avatar`} />
        <div>
          <h1 className="left" style={{ marginBottom: 4 }}>{user.login}</h1>
          <div className="gh-handle">@{user.login}</div>
        </div>
        <a className="btn btn-primary gh-profile-btn" href={user.html_url} target="_blank" rel="noreferrer">
          View Profile ↗
        </a>
      </div>

      <div className="gh-stats-grid">
        <div className="gh-stat"><div className="gh-stat-num">{user.public_repos}</div><div className="gh-stat-label">REPOSITORIES</div></div>
        <div className="gh-stat"><div className="gh-stat-num">{user.followers}</div><div className="gh-stat-label">FOLLOWERS</div></div>
        <div className="gh-stat"><div className="gh-stat-num">{user.following}</div><div className="gh-stat-label">FOLLOWING</div></div>
        <div className="gh-stat"><div className="gh-stat-num">{user.public_gists}</div><div className="gh-stat-label">GISTS</div></div>
      </div>

      <h2 className="gh-section-title">Popular Repositories</h2>
      <div className="gh-repo-grid">
        {repos.map((repo) => (
          <a className="gh-repo-card" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
            <div className="gh-repo-name">{repo.name} ↗</div>
            <p className="gh-repo-desc">{repo.description ?? 'No description'}</p>
            <div className="gh-repo-meta">
              {repo.language && (
                <span className="gh-lang"><span className="gh-lang-dot" />{repo.language}</span>
              )}
              <span>★ {repo.stargazers_count}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

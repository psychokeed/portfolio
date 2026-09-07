import { useEffect, useState } from 'react';
import type { GithubRepo } from '../types/portfolio';

/*
  WHY THIS IS A HOOK, NOT JUST A FUNCTION
  ------------------------------------------
  Both the Projects page and the GitHub page need "this user's public
  repos, fetched once, with loading/error states." Rather than copy the
  same useState + useEffect block into both components, we write it
  once here. Each component that calls useGithubRepos(...) gets its
  OWN independent state — calling this hook twice (once per page)
  does NOT share data between them, it just shares the *logic*.
*/
export function useGithubRepos(username: string, perPage = 6) {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}`
        );
        if (!res.ok) throw new Error('GitHub API request failed');
        const data: GithubRepo[] = await res.json();
        if (!cancelled) {
          // Exclude forks — a portfolio should show work you wrote,
          // not repos you merely cloned from someone else.
          setRepos(data.filter((repo) => !repo.fork));
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
  }, [username, perPage]);

  return { repos, status };
}

import { projects, githubUsername } from '../../data/content';
import { useGithubRepos } from '../../hooks/useGithubRepos';

export default function Projects() {
  // Curated write-ups stay hand-authored (rich descriptions, stack,
  // highlights). Live repos get appended below them in the SAME list,
  // continuing the numbering — one unified feed, exactly like the
  // reference site, instead of a separate "GitHub" section.
  const { repos, status } = useGithubRepos(githubUsername, 10);
  const totalCount = projects.length + repos.length;

  return (
    <section className="page-center wide" id="projects">
      <div className="folder-badge">
        <span className="folder-icon" aria-hidden="true">📁</span>
        {totalCount} Projects
      </div>
      <h1 className="left">Featured Work</h1>
      <p className="lede left">
        A curated collection of projects I've built for the Kenyan market and
        beyond — each solving a real problem, from payments to hiring to
        education.
      </p>

      <div className="project-feed">
        {projects.map((project, i) => (
          <div className="feed-row" key={project.name}>
            <span className="feed-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="feed-icon" aria-hidden="true">⚙</span>
            <div className="feed-body">
              <h3>{project.name} <span className="feed-tag">({project.tag})</span></h3>
              <p>{project.description}</p>
              {project.stack.length > 0 && (
                <div className="proj-stack">
                  {project.stack.map((tech) => (
                    <span className="chip" key={tech}>{tech}</span>
                  ))}
                </div>
              )}
              {project.highlights.length > 0 && (
                <ul className="proj-highlights">
                  {project.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {status === 'loading' && (
          <div className="feed-row">
            <span className="feed-num">{String(projects.length + 1).padStart(2, '0')}</span>
            <span className="feed-icon" aria-hidden="true">⚙</span>
            <div className="feed-body"><p>Loading more from GitHub…</p></div>
          </div>
        )}

        {status === 'ready' && repos.map((repo, i) => (
          <div className="feed-row" key={repo.id}>
            <span className="feed-num">{String(projects.length + i + 1).padStart(2, '0')}</span>
            <span className="feed-icon" aria-hidden="true">⚙</span>
            <div className="feed-body">
              <h3>
                {formatRepoName(repo.name)}
                {repo.language && <span className="feed-tag"> ({repo.language})</span>}
              </h3>
              <p>{repo.description ?? 'No description provided.'}</p>
              <a className="view-project-link" href={repo.html_url} target="_blank" rel="noreferrer">
                View Project ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="explore-github-wrap">
        <a
          className="explore-github-btn"
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true">⚇</span> Explore more on GitHub ↗
        </a>
      </div>
    </section>
  );
}

// GitHub repo names are often kebab/underscore-cased ("Basic_react_Projects").
// This turns them into readable title text for display, the way the
// reference site's repo-derived project titles read as normal words.
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

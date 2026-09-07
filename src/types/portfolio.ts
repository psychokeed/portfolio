// Every "file" in the fake VS Code sidebar is really just a section of
// the page. We give each one a stable id — this id is used to:
//   1. know which tab/file-item is "active"
//   2. scroll to the right section
//   3. label things in the status bar
//
// A union of string literals (instead of `string`) means TypeScript will
// error if you ever typo 'projcets' somewhere — the compiler knows the
// full list of valid values.
export type FileId = 'home' | 'about' | 'projects' | 'skills' | 'contact' | 'github';

export interface FileMeta {
  id: FileId;
  label: string;       // "home.tsx"
  iconClass: string;    // css class for the colored dot (ic-tsx, ic-md, ...)
  path: string;         // the URL this file routes to, e.g. "/about"
}

export interface Project {
  name: string;
  tag: string;          // short descriptor shown in parens, e.g. "Job Platform"
  description: string;
  stack: string[];
  highlights: string[];
}

export interface SkillGroup {
  key: string;           // "web", "devops", ...
  skills: string[];
}

export interface ContactLink {
  label: string;         // "email"
  value: string;         // display text
  href: string;           // "mailto:..." or a real URL
}

// A single line in the animated terminal sequence.
export type TermLineType = 'cmd' | 'ok' | 'out';

export interface TermLine {
  type: TermLineType;
  text: string;
}

// Shapes for the two GitHub REST endpoints the Github page calls.
// We only declare the fields we actually use — TypeScript doesn't
// require modeling an entire API response, just the slice you touch.
export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

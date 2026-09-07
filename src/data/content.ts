import type { FileMeta, Project, SkillGroup, ContactLink } from '../types/portfolio';

// Drives the live stats/repos fetched on the GitHub and Projects pages.
export const githubUsername = 'psychokeed';

export const files: FileMeta[] = [
  { id: 'home', label: 'home.tsx', iconClass: 'ic-tsx', path: '/' },
  { id: 'about', label: 'about.html', iconClass: 'ic-html', path: '/about' },
  { id: 'projects', label: 'projects.js', iconClass: 'ic-js', path: '/projects' },
  { id: 'skills', label: 'skills.json', iconClass: 'ic-json', path: '/skills' },
  { id: 'contact', label: 'contact.css', iconClass: 'ic-css', path: '/contact' },
  { id: 'github', label: 'github.md', iconClass: 'ic-md', path: '/github' },
];

// Education/coursework-tied projects removed on request — only
// standalone product work stays here.
export const projects: Project[] = [
  {
    name: 'GlobalJobHub',
    tag: 'Job Platform',
    description:
      "A MERN job platform built for the Kenyan market, with employer and jobseeker dashboards and M-Pesa STK push payments wired directly into subscription gating.",
    stack: ['React + Vite', 'TypeScript', 'Node.js', 'MongoDB', 'M-Pesa Daraja'],
    highlights: [
      'Subscription-based feature gating with M-Pesa STK push payment flows',
      'Salary benchmarking, bulk messaging, auto-rejection cron jobs, offer letters, hiring rooms',
      'Employer and jobseeker dashboards with a consistent dark-theme UI',
    ],
  },
  {
    name: 'EduBridge',
    tag: 'Academic Management Platform',
    description:
      'An academic management platform on the MERN stack, with an academic risk predictor and SMS-based notifications.',
    stack: ['React + Vite', 'TypeScript', 'Node.js', 'MongoDB', "Africa's Talking"],
    highlights: [
      'Academic Risk Predictor and a QR-based digital academic passport',
      "Smart SMS notification system built on the Africa's Talking API",
      'Role-based dashboard routing across student, staff, and admin roles',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  { key: 'web', skills: ['React', 'Vite', 'Node.js', 'MongoDB', 'TypeScript', 'Python'] },
  { key: 'desktop / mobile', skills: ['VB.NET (.NET 8 WinForms)', 'ADO.NET', 'Java (Android)'] },
  { key: 'fintech & comms integration', skills: ['M-Pesa Daraja API', "Africa's Talking SMS"] },
  { key: 'devops', skills: ['CI/CD pipelines', 'Containerization', 'WSL2 / Ubuntu'] },
];

export const contactLinks: ContactLink[] = [
  { label: 'email', value: 'bnzuki4@gmail.com', href: 'mailto:bnzuki4@gmail.com' },
  { label: 'github', value: 'psychokeed', href: 'https://github.com/psychokeed' },
  { label: 'linkedin', value: 'briannzuki', href: 'https://www.linkedin.com/in/briannzuki/' },
];

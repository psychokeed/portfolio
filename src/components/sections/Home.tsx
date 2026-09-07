import { Link } from 'react-router-dom';
import { contactLinks } from '../../data/content';

export default function Home() {
  // Pull the real URLs from the same contactLinks array the Contact
  // page uses, keyed by label — one source of truth instead of typing
  // these URLs out a second time here.
  const github = contactLinks.find((l) => l.label === 'github');
  const email = contactLinks.find((l) => l.label === 'email');
  const linkedin = contactLinks.find((l) => l.label === 'linkedin');

  return (
    <section className="page-center" id="home">
      <div className="code-icon" aria-hidden="true">&lt;/&gt;</div>
      <div className="eyebrow">HELLO, I'M</div>
      <h1>Brian Nzuki</h1>
      <div className="role">Fullstack Software Engineer</div>
      <div className="role-underline" />
      <p className="lede">
        Fullstack software engineer building web platforms and
        fintech-integrated software for the Kenyan market — wiring React/Node
        products into M-Pesa's Daraja API and Africa's Talking SMS.
        Specializing in the MERN stack, Python, and scalable web solutions.
      </p>
      <div className="btn-row">
        <Link to="/projects" className="btn btn-primary">View Projects →</Link>
        <Link to="/about" className="btn btn-ghost">Learn More</Link>
      </div>
      <div className="hr" />
      <div className="link-row">
        <a href={github?.href} target="_blank" rel="noreferrer">GitHub</a><span className="sep">/</span>
        <a href={email?.href}>Email</a><span className="sep">/</span>
        <a href={linkedin?.href} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}

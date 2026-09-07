import { contactLinks } from '../../data/content';

export default function Contact() {
  return (
    <section className="page-center" id="contact">
      <h1>Contact Me</h1>
      <p className="lede">
        Feel free to reach out to me through any of the social platforms
        below. I'm always open to new opportunities and connections.
      </p>

      <div className="code-box">
        <div className="code-box-line">
          <span className="code-box-num">1</span>
          <span><span className="cm-fn">.socials</span>{'{'}</span>
        </div>
        {contactLinks.map((link, i) => (
          <div className="code-box-line" key={link.label}>
            <span className="code-box-num">{i + 2}</span>
            <span>
              &nbsp;&nbsp;{link.label}:{' '}
              <a
                className="cm-str code-box-link"
                href={link.href}
                target={link.label === 'email' ? undefined : '_blank'}
                rel={link.label === 'email' ? undefined : 'noreferrer'}
              >
                {link.value}
              </a>;
            </span>
          </div>
        ))}
        <div className="code-box-line">
          <span className="code-box-num">{contactLinks.length + 2}</span>
          <span>{'}'}</span>
        </div>
      </div>
    </section>
  );
}

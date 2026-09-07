import { skillGroups } from '../../data/content';

export default function Skills() {
  const lines: { key: string; skills: string[] }[] = skillGroups;
  return (
    <section className="page-center" id="skills">
      <h1>Skills</h1>
      <p className="lede">The tools and technologies I work with.</p>

      <div className="code-box">
        <div className="code-box-line">
          <span className="code-box-num">1</span>
          <span>{'{'}</span>
        </div>
        {lines.map((group, i) => (
          <div className="code-box-line" key={group.key}>
            <span className="code-box-num">{i + 2}</span>
            <span>
              &nbsp;&nbsp;<span className="cm-fn">"{group.key}"</span>: [
              {group.skills.map((s, j) => (
                <span key={s}>
                  <span className="cm-str">"{s}"</span>
                  {j < group.skills.length - 1 ? ', ' : ''}
                </span>
              ))}
              ]{i < lines.length - 1 ? ',' : ''}
            </span>
          </div>
        ))}
        <div className="code-box-line">
          <span className="code-box-num">{lines.length + 2}</span>
          <span>{'}'}</span>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <section className="page-center" id="about">
      <h1>About Me</h1>
      <p className="tagline">"Building software that works where the infrastructure doesn't."</p>
      <p className="lede">
        I'm a fullstack software engineer building software that fits
        the Kenyan market specifically — payments that go through M-Pesa,
        notifications that arrive by SMS, and interfaces that hold up on
        real-world connections. My core stack is MERN and Python, with additional
        experience shipping desktop systems in VB.NET.
      </p>
      <ul className="about-list">
        <li>Building GlobalJobHub and EduBridge — full MERN platforms for the Kenyan job and education markets</li>
        <li>Integrating M-Pesa Daraja (STK push) and Africa's Talking SMS into production apps</li>
        <li>Building VB.NET (.NET 8) WinForms desktop systems, including ADO.NET/MySQL database projects</li>
        <li>Self-studying DevOps: CI/CD pipelines, containerization concepts, WSL2/Ubuntu</li>
      </ul>
    </section>
  );
}

import './ElegantExecutiveTemplate.css';

const ElegantExecutiveTemplate = ({ data, color, type }) => {
  const { personalInfo, summary, experience, education, skills, certifications, jobProfile } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);

  return (
    <div className="elegant-executive-template" style={{ '--primary': color.primary, '--secondary': color.secondary }}>
      <div className="ee-header">
        <div className="header-background"></div>
        <div className="header-content">
          {personalInfo.profileImage && (
            <div className="profile-img-container">
              <img src={personalInfo.profileImage} alt="Profile" className="profile-img" />
            </div>
          )}
          <h1>{personalInfo.name}</h1>
          <h2 className="title">{jobProfile || 'Executive Professional'}</h2>
          <div className="contact-line">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span className="divider">•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span className="divider">•</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
            {personalInfo.linkedin && <span className="divider">•</span>}
            {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {personalInfo.github && <span className="divider">•</span>}
            {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>}
          </div>
        </div>
      </div>

      <div className="ee-body">
        <div className="column-left">
          {summary && (
            <section className="content-section">
              <div className="section-title">
                <div className="line-decoration"></div>
                <h3>Professional Summary</h3>
              </div>
              <p className="summary-text">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="content-section">
              <div className="section-title">
                <div className="line-decoration"></div>
                <h3>Career Experience</h3>
              </div>
              {experience.map((exp, index) => (
                <div key={index} className="experience-entry">
                  <div className="entry-header">
                    <div>
                      <h4>{exp.position}</h4>
                      <p className="company-name">{exp.company}</p>
                    </div>
                    <span className="date-range">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  {exp.description && <p className="entry-description">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section className="content-section">
              <div className="section-title">
                <div className="line-decoration"></div>
                <h3>Education</h3>
              </div>
              {education.map((edu, index) => (
                <div key={index} className="education-entry">
                  <div className="entry-header">
                    <div>
                      <h4>{edu.school}</h4>
                      <p className="degree">{edu.degree} in {edu.field}</p>
                    </div>
                    <span className="date-range">{edu.startYear} - {edu.endYear}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="column-right">
          {skillsList.length > 0 && (
            <section className="content-section">
              <div className="section-title">
                <div className="line-decoration"></div>
                <h3>Core Competencies</h3>
              </div>
              <ul className="skills-list">
                {skillsList.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {certifications.length > 0 && certifications.some(c => c.name) && (
            <section className="content-section">
              <div className="section-title">
                <div className="line-decoration"></div>
                <h3>Certifications</h3>
              </div>
              {certifications.filter(c => c.name).map((cert, index) => (
                <div key={index} className="cert-entry">
                  <p className="cert-name">{cert.name}</p>
                  <p className="cert-org">{cert.issuer}</p>
                  {cert.date && <p className="cert-date">{cert.date}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElegantExecutiveTemplate;
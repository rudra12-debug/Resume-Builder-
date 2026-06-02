import './MinimalistAITemplate.css';

const formatDateForDisplay = (dateStr) => {
  if (!dateStr || dateStr === 'Present') return dateStr;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const MinimalistAITemplate = ({ data, color, type }) => {
  const { personalInfo, summary, experience, education, skills, certifications, jobProfile } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);

  return (
    <div className="minimalist-ai-template" style={{ '--primary': color.primary, '--secondary': color.secondary }}>
      <div className="m-ai-header">
        <div className="header-left">
          {personalInfo.profileImage && (
            <div className="profile-img-container">
              <img src={personalInfo.profileImage} alt="Profile" className="profile-img" />
            </div>
          )}
          <div className="name-section">
            <h1>{personalInfo.name}</h1>
            <p className="job-title">{jobProfile || 'Professional'}</p>
          </div>
        </div>
        <div className="contact-grid">
          {personalInfo.email && <div className="contact-item">
            <span className="icon">✉️</span>
            <span>{personalInfo.email}</span>
          </div>}
          {personalInfo.phone && <div className="contact-item">
            <span className="icon">📞</span>
            <span>{personalInfo.phone}</span>
          </div>}
          {personalInfo.address && <div className="contact-item">
            <span className="icon">📍</span>
            <span>{personalInfo.address}</span>
          </div>}
          {personalInfo.linkedin && <div className="contact-item">
            <span className="icon">🔗</span>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>}
          {personalInfo.github && <div className="contact-item">
            <span className="icon">💻</span>
            <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>}
        </div>
      </div>

      <div className="m-ai-content">
        <div className="main-section">
          {summary && (
            <section>
              <div className="section-label">Profile</div>
              <p className="summary">{summary}</p>
            </section>
          )}

          {experience.length > 0 && experience.some(e => e.company || e.position) && (
            <section>
              <div className="section-label">Experience</div>
              {experience.filter(e => e.company || e.position).map((exp, index) => (
                <div key={index} className="exp-block">
                  <div className="exp-header">
                    <div>
                      <h3>{exp.position}</h3>
                      <p className="company">{exp.company}</p>
                    </div>
                    <span className="period">
                      {formatDateForDisplay(exp.startDate)} - {formatDateForDisplay(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && <p className="desc">{exp.description}</p>}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && education.some(e => e.school || e.degree) && (
            <section>
              <div className="section-label">Education</div>
              {education.filter(e => e.school || e.degree).map((edu, index) => (
                <div key={index} className="edu-block">
                  <div className="edu-header">
                    <div>
                      <h3>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                      <p className="school">{edu.school}</p>
                    </div>
                    <span className="period">{edu.startYear} - {edu.endYear}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="side-section">
          {skillsList.length > 0 && (
            <section>
              <div className="section-label">Skills</div>
              <div className="skills-cloud">
                {skillsList.map((skill, index) => (
                  <span key={index} className="skill-bubble">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && certifications.some(c => c.name) && (
            <section>
              <div className="section-label">Certifications</div>
              {certifications.filter(c => c.name).map((cert, index) => (
                <div key={index} className="cert-card">
                  <p className="cert-name">{cert.name}</p>
                  {cert.issuer && <p className="cert-issuer">{cert.issuer}</p>}
                  {cert.date && <p className="cert-date">{formatDateForDisplay(cert.date)}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistAITemplate;

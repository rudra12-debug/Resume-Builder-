import './CreativeTemplate.css';

const formatDateForDisplay = (dateStr) => {
  if (!dateStr || dateStr === 'Present') return dateStr;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const CreativeTemplate = ({ data, color, type }) => {
  const { personalInfo, summary, experience, education, skills, certifications, jobProfile } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);

  return (
    <div className="creative-template" style={{ '--primary': color.primary, '--secondary': color.secondary }}>
      <div className="creative-sidebar">
        {personalInfo.profileImage && (
          <div className="profile-img-container">
            <img src={personalInfo.profileImage} alt="Profile" className="profile-img" />
          </div>
        )}
        <div className="creative-name-box">
          <h1>{personalInfo.name}</h1>
          <p className="job-title">{jobProfile || 'Professional'}</p>
        </div>

        <div className="sidebar-content">
          {skillsList.length > 0 && (
            <section>
              <h2>Skills</h2>
              <div className="skills-list">
                {skillsList.map((skill, index) => (
                  <span key={index} className="skill-item">{skill}</span>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2>Contact</h2>
            <div className="contact-list">
              {personalInfo.email && <p>📧 {personalInfo.email}</p>}
              {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
              {personalInfo.address && <p>📍 {personalInfo.address}</p>}
              {personalInfo.linkedin && <p>🔗 <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>}
              {personalInfo.github && <p>💻 <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a></p>}
            </div>
          </section>

          {certifications.length > 0 && certifications.some(c => c.name) && (
            <section>
              <h2>Certifications</h2>
              {certifications.filter(c => c.name).map((cert, index) => (
                <div key={index} className="cert-item">
                  <h4>{cert.name}</h4>
                  {cert.issuer && <p>{cert.issuer}</p>}
                  {cert.date && <p className="date">{formatDateForDisplay(cert.date)}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      <div className="creative-main">
        {summary && (
          <section>
            <div className="section-title">
              <h2>About Me</h2>
            </div>
            <p className="summary-text">{summary}</p>
          </section>
        )}

        {experience.length > 0 && experience.some(e => e.company || e.position) && (
          <section>
            <div className="section-title">
              <h2>Experience</h2>
            </div>
            {experience.filter(e => e.company || e.position).map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="exp-header">
                    <div>
                      <h3>{exp.position}</h3>
                      <p className="company">{exp.company}</p>
                    </div>
                    <span className="date">
                      {formatDateForDisplay(exp.startDate)} - {formatDateForDisplay(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && <p className="description">{exp.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && education.some(e => e.school || e.degree) && (
          <section>
            <div className="section-title">
              <h2>Education</h2>
            </div>
            {education.filter(e => e.school || e.degree).map((edu, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="edu-header">
                    <div>
                      <h3>{edu.school}</h3>
                      <p className="degree">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    </div>
                    <span className="date">{edu.startYear} - {edu.endYear}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;

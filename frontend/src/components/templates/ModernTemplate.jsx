import './ModernTemplate.css';

const formatDateForDisplay = (dateStr) => {
  if (!dateStr || dateStr === 'Present') return dateStr;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ModernTemplate = ({ data, color, type }) => {
  const { personalInfo, summary, experience, education, skills, certifications, jobProfile } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);

  return (
    <div className="modern-template" style={{ '--primary': color.primary, '--secondary': color.secondary }}>
      <div className="modern-header">
        {personalInfo.profileImage && (
          <div className="profile-img-container">
            <img src={personalInfo.profileImage} alt="Profile" className="profile-img" />
          </div>
        )}
        <h1>{personalInfo.name}</h1>
        <p className="job-title">{jobProfile || 'Professional'}</p>
        <div className="contact-info">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.linkedin && <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>}
        </div>
      </div>

      <div className="modern-content">
        <div className="modern-left">
          {summary && (
            <section>
              <h2>Professional Summary</h2>
              <p>{summary}</p>
            </section>
          )}

          {experience.length > 0 && experience.some(e => e.company || e.position) && (
            <section>
              <h2>Experience</h2>
              {experience.filter(e => e.company || e.position).map((exp, index) => (
                <div key={index} className="experience-item">
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
              ))}
            </section>
          )}

          {education.length > 0 && education.some(e => e.school || e.degree) && (
            <section>
              <h2>Education</h2>
              {education.filter(e => e.school || e.degree).map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="edu-header">
                    <div>
                      <h3>{edu.school}</h3>
                      <p className="degree">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    </div>
                    <span className="date">{edu.startYear} - {edu.endYear}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="modern-right">
          {skillsList.length > 0 && (
            <section>
              <h2>Skills</h2>
              <div className="skills-list">
                {skillsList.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </section>
          )}

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
    </div>
  );
};

export default ModernTemplate;

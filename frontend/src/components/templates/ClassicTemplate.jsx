import './ClassicTemplate.css';

const ClassicTemplate = ({ data, color, type }) => {
  const { personalInfo, summary, experience, education, skills, certifications, jobProfile } = data;
  const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);

  return (
    <div className="classic-template" style={{ '--primary': color.primary, '--secondary': color.secondary }}>
      <div className="classic-header">
        {personalInfo.profileImage && (
          <div className="profile-img-container">
            <img src={personalInfo.profileImage} alt="Profile" className="profile-img" />
          </div>
        )}
        <h1>{personalInfo.name}</h1>
        <p className="job-title">{jobProfile || 'Professional'}</p>
        <div className="contact-info">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.address && <span>| {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>| <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></span>}
          {personalInfo.github && <span>| <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a></span>}
        </div>
        <hr />
      </div>

      <div className="classic-content">
        {summary && (
          <section>
            <h2>Professional Summary</h2>
            <p>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section>
            <h2>Professional Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="exp-header">
                  <div>
                    <h3>{exp.position}</h3>
                    <p className="company">{exp.company}</p>
                  </div>
                  <span className="date">{exp.startDate} - {exp.endDate}</span>
                </div>
                {exp.description && <p className="description">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="edu-header">
                  <div>
                    <h3>{edu.degree} in {edu.field}</h3>
                    <p className="school">{edu.school}</p>
                  </div>
                  <span className="date">{edu.startYear} - {edu.endYear}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {skillsList.length > 0 && (
          <section>
            <h2>Skills</h2>
            <p className="skills-text">{skills}</p>
          </section>
        )}

        {certifications.length > 0 && certifications.some(c => c.name) && (
          <section>
            <h2>Certifications</h2>
            {certifications.filter(c => c.name).map((cert, index) => (
              <div key={index} className="cert-item">
                <strong>{cert.name}</strong> - {cert.issuer}
                {cert.date && <span> ({cert.date})</span>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;

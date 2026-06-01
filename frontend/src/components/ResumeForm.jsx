import { useState } from 'react';
import './ResumeForm.css';

const ResumeForm = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      profileImage: ''
    },
    summary: '',
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    education: [{ school: '', degree: '', field: '', startYear: '', endYear: '' }],
    skills: '',
    certifications: [{ name: '', issuer: '', date: '' }],
    jobProfile: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            profileImage: reader.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (section, field, value) => {
    setFormState(prev => ({
      ...prev,
      [section]: field ? { ...prev[section], [field]: value } : value
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormState(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = (section) => {
    if (section === 'experience') {
      setFormState(prev => ({
        ...prev,
        experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
      }));
    } else if (section === 'education') {
      setFormState(prev => ({
        ...prev,
        education: [...prev.education, { school: '', degree: '', field: '', startYear: '', endYear: '' }]
      }));
    } else if (section === 'certifications') {
      setFormState(prev => ({
        ...prev,
        certifications: [...prev.certifications, { name: '', issuer: '', date: '' }]
      }));
    }
  };

  const removeItem = (section, index) => {
    setFormState(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="resume-form-container">
      <h1>AI Resume Builder</h1>
      <p className="subtitle">Fill in your details and let AI create your perfect resume</p>
      
      <form onSubmit={handleSubmit} className="resume-form">
        <section className="form-section">
          <h2>Personal Information</h2>
          <div className="profile-upload-section">
            <div className="profile-preview">
              {formState.personalInfo.profileImage ? (
                <img src={formState.personalInfo.profileImage} alt="Profile Preview" />
              ) : (
                <div className="placeholder-icon">
                  👤
                </div>
              )}
            </div>
            <div className="upload-controls">
              <label className="upload-btn">
                Upload Profile Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              {formState.personalInfo.profileImage && (
                <button
                  type="button"
                  className="remove-img-btn"
                  onClick={() => handleChange('personalInfo', 'profileImage', '')}
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Full Name"
              value={formState.personalInfo.name}
              onChange={(e) => handleChange('personalInfo', 'name', e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formState.personalInfo.email}
              onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formState.personalInfo.phone}
              onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={formState.personalInfo.address}
              onChange={(e) => handleChange('personalInfo', 'address', e.target.value)}
            />
            <input
              type="url"
              placeholder="LinkedIn Profile"
              value={formState.personalInfo.linkedin}
              onChange={(e) => handleChange('personalInfo', 'linkedin', e.target.value)}
            />
            <input
              type="url"
              placeholder="GitHub Profile"
              value={formState.personalInfo.github}
              onChange={(e) => handleChange('personalInfo', 'github', e.target.value)}
            />
          </div>
        </section>

        <section className="form-section">
          <h2>Professional Summary</h2>
          <textarea
            placeholder="Write a brief professional summary..."
            rows={4}
            value={formState.summary}
            onChange={(e) => handleChange('summary', null, e.target.value)}
          />
        </section>

        <section className="form-section">
          <h2>Target Job Profile</h2>
          <input
            type="text"
            placeholder="e.g., Software Engineer, Marketing Manager, Data Analyst"
            value={formState.jobProfile}
            onChange={(e) => handleChange('jobProfile', null, e.target.value)}
            required
          />
        </section>

        <section className="form-section">
          <div className="section-header">
            <h2>Work Experience</h2>
            <button type="button" className="add-btn" onClick={() => addItem('experience')}>+ Add Experience</button>
          </div>
          {formState.experience.map((exp, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
              />
              <div className="date-inputs">
                <input
                  type="text"
                  placeholder="Start Date (MM/YYYY)"
                  value={exp.startDate}
                  onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="End Date (MM/YYYY or Present)"
                  value={exp.endDate}
                  onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                />
              </div>
              <textarea
                placeholder="Job Description"
                rows={3}
                value={exp.description}
                onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
              />
              {formState.experience.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('experience', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>

        <section className="form-section">
          <div className="section-header">
            <h2>Education</h2>
            <button type="button" className="add-btn" onClick={() => addItem('education')}>+ Add Education</button>
          </div>
          {formState.education.map((edu, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                placeholder="School/University"
                value={edu.school}
                onChange={(e) => handleArrayChange('education', index, 'school', e.target.value)}
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
              />
              <input
                type="text"
                placeholder="Field of Study"
                value={edu.field}
                onChange={(e) => handleArrayChange('education', index, 'field', e.target.value)}
              />
              <div className="date-inputs">
                <input
                  type="number"
                  placeholder="Start Year"
                  value={edu.startYear}
                  onChange={(e) => handleArrayChange('education', index, 'startYear', e.target.value)}
                  min="1900"
                  max="2100"
                />
                <input
                  type="number"
                  placeholder="End Year"
                  value={edu.endYear}
                  onChange={(e) => handleArrayChange('education', index, 'endYear', e.target.value)}
                  min="1900"
                  max="2100"
                />
              </div>
              {formState.education.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('education', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>

        <section className="form-section">
          <h2>Skills</h2>
          <textarea
            placeholder="Enter your skills (comma-separated)..."
            rows={3}
            value={formState.skills}
            onChange={(e) => handleChange('skills', null, e.target.value)}
          />
        </section>

        <section className="form-section">
          <div className="section-header">
            <h2>Certifications</h2>
            <button type="button" className="add-btn" onClick={() => addItem('certifications')}>+ Add Certification</button>
          </div>
          {formState.certifications.map((cert, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                placeholder="Certification Name"
                value={cert.name}
                onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Issuing Organization"
                value={cert.issuer}
                onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
              />
              <input
                type="text"
                placeholder="Date Issued"
                value={cert.date}
                onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)}
              />
              {formState.certifications.length > 1 && (
                <button type="button" className="remove-btn" onClick={() => removeItem('certifications', index)}>Remove</button>
              )}
            </div>
          ))}
        </section>

        <button type="submit" className="submit-btn">Generate Resume & CV</button>
      </form>
    </div>
  );
};

export default ResumeForm;

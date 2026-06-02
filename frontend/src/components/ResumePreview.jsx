import { useState, useRef } from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalistAITemplate from './templates/MinimalistAITemplate';
import ElegantExecutiveTemplate from './templates/ElegantExecutiveTemplate';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './ResumePreview.css';

const ResumePreview = ({ data, template, color, onTemplateChange, onColorChange, onReset }) => {
  const [type, setType] = useState('resume');
  const [isDownloading, setIsDownloading] = useState(false);
  const templateRef = useRef(null);

  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'creative', name: 'Creative' },
    { id: 'minimalist-ai', name: 'Minimalist AI' },
    { id: 'elegant-executive', name: 'Elegant Executive' }
  ];

  const colors = [
    { id: 'blue', primary: '#667eea', secondary: '#764ba2', name: 'Blue/Purple' },
    { id: 'green', primary: '#11998e', secondary: '#38ef7d', name: 'Green' },
    { id: 'red', primary: '#eb3349', secondary: '#f45c43', name: 'Red' },
    { id: 'pink-orange', primary: '#f093fb', secondary: '#f5576c', name: 'Pink/Orange' },
    { id: 'teal', primary: '#4facfe', secondary: '#00f2fe', name: 'Teal' },
    { id: 'midnight', primary: '#2c3e50', secondary: '#4ca1af', name: 'Midnight Blue' },
    { id: 'gold', primary: '#f2994a', secondary: '#f2c94c', name: 'Golden' },
    { id: 'forest', primary: '#134e5e', secondary: '#71b280', name: 'Forest' },
    { id: 'lavender', primary: '#a18cd1', secondary: '#fbc2eb', name: 'Lavender' },
    { id: 'sunset', primary: '#ff9a9e', secondary: '#fecfef', name: 'Sunset' }
  ];

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={data} color={colors.find(c => c.id === color)} type={type} />;
      case 'creative':
        return <CreativeTemplate data={data} color={colors.find(c => c.id === color)} type={type} />;
      case 'minimalist-ai':
        return <MinimalistAITemplate data={data} color={colors.find(c => c.id === color)} type={type} />;
      case 'elegant-executive':
        return <ElegantExecutiveTemplate data={data} color={colors.find(c => c.id === color)} type={type} />;
      default:
        return <ModernTemplate data={data} color={colors.find(c => c.id === color)} type={type} />;
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const element = templateRef.current;
      if (!element) {
        throw new Error('Template element not found');
      }
      
      // Wait for DOM to settle
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
      
      const userName = data.personalInfo?.name || 'Resume';
      const fileName = `${userName.replace(/\s+/g, '_')}_${type}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Error generating PDF: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="resume-preview-container">
      <div className="controls">
        <div className="control-group">
          <label>Document Type:</label>
          <div className="type-buttons">
            <button 
              className={type === 'resume' ? 'active' : ''} 
              onClick={() => setType('resume')}
            >
              Resume
            </button>
            <button 
              className={type === 'cv' ? 'active' : ''} 
              onClick={() => setType('cv')}
            >
              CV
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Template:</label>
          <div className="template-buttons">
            {templates.map(t => (
              <button 
                key={t.id}
                className={template === t.id ? 'active' : ''} 
                onClick={() => onTemplateChange(t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Color Scheme:</label>
          <div className="color-buttons">
            {colors.map(c => (
              <button
                key={c.id}
                className={`color-btn ${color === c.id ? 'active' : ''}`}
                style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})` }}
                onClick={() => onColorChange(c.id)}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button className="reset-btn" onClick={onReset}>Edit Details</button>
          <button 
            className="download-btn" 
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="preview-wrapper">
        <div ref={templateRef}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

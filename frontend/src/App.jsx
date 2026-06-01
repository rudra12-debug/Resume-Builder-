import { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import './App.css';

function App() {
  const [formData, setFormData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const handleReset = () => {
    setFormData(null);
  };

  return (
    <div className="app">
      {!formData ? (
        <ResumeForm onSubmit={handleFormSubmit} />
      ) : (
        <ResumePreview 
          data={formData} 
          template={selectedTemplate}
          color={selectedColor}
          onTemplateChange={setSelectedTemplate}
          onColorChange={setSelectedColor}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;

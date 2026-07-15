import React from 'react';


const TestSection: React.FC = () => (
  <div className="container">
    <div className="image-section">
      <div className="orange-frame"></div>
      <div className="image-border">
        <img src="/images/test.jpg" alt="Test Icon" />
      </div>
    </div>
    <div className="text-section">
      <h1>Notre Test</h1>
      <p>
        
        Lorem Ipsum is simply dummy text of the printing and typesetting industry...
      </p>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="my-button">Passer le test <span>⟶</span></button>
      </div>
    </div>
  </div>
);

export default TestSection;

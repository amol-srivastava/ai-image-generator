import React, { useState } from 'react';
import './App.css'; // Ensure this line is included if not already

const App = () => {
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);

  const surpriseOptions = [
    'A beautiful sunset over the ocean',
    'A futuristic cityscape',
    'A serene mountain landscape',
    'A magical forest',
    'A bustling market scene'
  ];

  const getImages = async (isSurprise = false) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ prompt: isSurprise ? surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)] : input }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const response = await fetch('http://localhost:3000/images', options);
      const data = await response.json();
      console.log('Backend response:', data); // Log the backend response
      if (response.ok) {
        setImages(data); // Assuming backend sends back the image data or URLs
      } else {
        throw new Error(data.error || 'Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSurpriseMe = () => {
    getImages(true);
  };

  return (
    <div className="App">
      <header className="header">
        <span className="creator">Made by Amol :p</span>
      </header>
      <section className="search-section">
        <div className="title-box">AI-Image Generator</div>
        <div className="input-container">
          <input 
            placeholder="Whatever You Can Imagine"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className="button-group">
            <button onClick={() => getImages(false)}>Generate</button>
            <button className="surprise" onClick={handleSurpriseMe}>Surprise Me</button>
          </div>
        </div>
      </section>
      <section className="image-section">
        {images.map((img, index) => (
          <img key={index} src={img.url} alt={`Generated Content ${index}`} className="generated-image" />
        ))}
      </section>
    </div>
  );
};

export default App;

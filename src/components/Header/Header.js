import React from 'react';
import './Header.css'; 
import Moon from '../../assets/Moon.png';

const Header = () => {
  // Handle dark mode toggle
  const toggleDarkMode = () => {
    
  };

  return (
    <div>
    <header className="header">
      <div className="left-align-header-title">
        <span>PDF24</span>
        <span style={{ color: '#4A94EE' }}>&nbsp;Tools</span> 
      </div>
      <div className="right-align">
        <span className="desktop-version">Desktop Version</span>
        <span className="contact">&nbsp;Contact</span>
        <span className="dark-mode-icon" onClick={toggleDarkMode}>
        &nbsp;
        <img src={Moon} alt='Moon'></img>
        </span>
        <button className="all-pdf-tools-btn">&nbsp; All PDF Tools</button>
      </div>
    </header>
  
    <div className="content-container">
    <div className="left-align">
        <span style={{ color: 'yellow' }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <span style={{ color: 'white' }}>4,9 (8,381 votes)</span>
  </div>

  <div className="right-align">
        <span className="tick">&#x2713;</span> <span className="feature-text"> Free </span>
        <span className="tick">&#x2713;</span> <span className="feature-text"> Online </span>
        <span className="tick">&#x2713;</span> <span className="feature-text"> No Limits </span>
   </div>
  </div>

  </div>
  
  );
};

export default Header;

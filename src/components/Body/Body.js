import './Body.css'; 
import logo from '../../assets/logo.png';
import ads from '../../assets/ads.png';
import vector from '../../assets/Vector.png';
import Adjust from '../../assets/Adjust.png';
import Star from '../../assets/Star.png';
import Computer from '../../assets/Computer.png';
import Cloud from '../../assets/Cloud.png';
import Lock from '../../assets/Lock.png';
import Check from '../../assets/Check.png';
import React, { useState } from 'react';
import FileUpload from '../FileUpload';
import StarVector from '../../assets/star-vector.png';

const Body = () => {
    
  return (
    <div>
    <div className="body-container">
    <div className="left-align">
      <div>
        <span className='compress-title'>Compress PDF</span>
        <br />
        <span className='compress-text'>PDF compressor to reduce the size of PDF files quickly and easily</span>
      </div>
      <div className="center-align">
        <img src={logo} alt="Icon" />
      </div>
    </div>
    </div><br/>


     {/* ************start file compress section*************** */}
     <FileUpload /> 
     {/* ************end file compress section*************** */}
  
    <div class="ads">
        <img src={ads} alt="ads"></img>
    </div><br/><br/>

    <div class='bg-class'><br/>
    <div class="title-info">
       <h2>Information</h2>
       <div class="container-check">
    <div class="check-item">
        <img src={Check} alt='Check'></img>
        <span>Window</span>
    </div>
    <div class="check-item">
        <img src={Check} alt='Check'></img>
        <span>Linux</span>
    </div>
    <div class="check-item">
        <img src={Check} alt='Check'></img>
        <span>MAC</span>
    </div>
    <div class="check-item">
        <img src={Check} alt='Check'></img>
        <span>iPhone</span>
    </div>
    <div class="check-item">
        <img src={Check} alt='Check'></img>
        <span>Android</span>
    </div>
</div>
    </div><br/><br/>

    <div className="container">
      <div className="textBox">
        <div className="textBoxHeader">
          <h3 className="title">How to compress PDF files</h3>
          <img src={vector} alt='vector'></img>
        </div>
        <p className="paragraph">Select your PDF files which you would like to compress or drop them into the file box and start the compression. A few seconds later you can download your compressed PDF files.</p>
      </div>
      <div className="textBox">
        <div className="textBoxHeader">
          <h3 className="title">Adjustable quality</h3>
          <img src={Adjust} alt='Adjust'></img>
        </div>
        <p className="paragraph">You can adjust the compression quality so that you can tune the compression algorithm in order to get a perfect result. PDF files with images can be compressed better than PDF files with text only.</p>
      </div>
      <div className="textBox">
        <div className="textBoxHeader">
          <h3 className="title">Easy to use</h3>
          <img src={StarVector} alt='Star'></img>
        </div>
        <p className="paragraph">PDF24 makes it as easy and fast as possible for you to compress your files. You don't need to install any software, you only have to select your files and start the compression.</p>
      </div>
    </div><br/>


    <div className="container">
      <div className="textBox">
        <div className="textBoxHeader">
          <h3 className="title">Runs on your system</h3>
          <img src={Computer} alt='Computer'></img>
        </div>
        <p className="paragraph">The compression tool does not need any special system in order to compress your PDF files. The app is browser based and works under all operating systems.</p>
      </div>
      <div className="textBox">
        <div className="textBoxHeader">
          <h3 className="title">No installation required</h3>
          <img src={Cloud} alt='Cloud'></img>
        </div>
        <p className="paragraph">You do not need to download and install any software. PDF files are compressed in the cloud on our servers. The app does not consume your system resources.</p>
      </div>
      <div className="textBox">
        <div className="textBoxHeader">
          <h3 className="title">Secure online compression</h3>
          <img src={Lock} alt='Lock'></img>
        </div>
        <p className="paragraph">The compression tool does not keep your files longer than necessary on our server. Your files and results will be deleted from our server after a short period of time.</p>
      </div>
    </div><br/><br/>
    </div><br/><br/>

    <div className="container-dropdown">
      <select className="faqDropdown">
        <option value="1">FAQ</option>
        <option value="2">FAQ</option>
        <option value="3">FAQ</option>
      </select>
    </div><br/><br/><br/><br/>

    <div className="divider"></div>

    <div class="all-tools">
       <h3>All Tools</h3>

       <div class="container-tools">
        <div class="column">
            <div class="text">Merge PDF</div>
            <div class="text">Split PDF</div>
            <div class="text">Compress PDF</div>
            <div class="text">Edit PDF</div>
            <div class="text">Sign PDF</div>
            <div class="text">PDF Converter</div>
            <div class="text">Convert to PDF</div>
        </div>

        <div class="divider-tools"></div>

        <div class="column">
            <div class="text">Images to PDF</div>
            <div class="text">PDF to Images</div>
            <div class="text">Extract PDF Images</div>
            <div class="text">Protect PDF</div>
            <div class="text">Unlock PDF</div>
            <div class="text">Rotate PDF pages</div>
            <div class="text">Remove PDF pages</div>
        </div>

        <div class="divider-tools"></div>

        <div class="column">
            <div class="text">Extract PDF pages</div>
            <div class="text">Sort PDF pages</div>
            <div class="text">Webpage to PDF</div>
            <div class="text">Create PDF job application</div>
            <div class="text">Create PDF with camera</div>
            <div class="text">PDF OCR</div>
            <div class="text">Add watermark</div>
        </div>


        <div class="divider-tools"></div>

        <div class="column">
            <div class="text">Add page numbers</div>
            <div class="text">View as PDF</div>
            <div class="text">PDF Overlay</div>
            <div class="text">Compare PDFs</div>
            <div class="text">Web optimize PDF</div>
            <div class="text">Annotate PDF</div>
            <div class="text">Redact PDF</div>
        </div>


        <div class="divider-tools"></div>

        <div class="column">
            <div class="text">Create PDF</div>
            <div class="text">PDF 24 Creator</div>
            <div class="text">PDF Printer</div>
            <div class="text">PDF Reader</div>
            <div class="text">Create invoice</div>
            <div class="text">Remove PDF metadata</div>
            <div class="text">Flatten PDF</div>
        </div>


        <div class="divider-tools"></div>

        <div class="column">
            <div class="text">Crop PDF</div>
        </div>
  </div>

  </div><br/><br/>



<div class="container-footer">
<a href="https://tools.pdf24.org/en">About Us</a>
<a href="https://tools.pdf24.org/en">Help</a>
<a href="https://tools.pdf24.org/en">Contact</a>
</div>

<div class="container-footer">
<a href="https://tools.pdf24.org/en">Legal notice</a>
<a href="https://tools.pdf24.org/en">Terms of use</a>
<a href="https://tools.pdf24.org/en">Privacy policy</a>
<a href="https://tools.pdf24.org/en">Privacy Settings</a>
</div>


<div class="footer">
  <span>© 2022 Geek Software GmbH — WE love PDF</span>
</div>


  </div>
  
  );
};

export default Body;

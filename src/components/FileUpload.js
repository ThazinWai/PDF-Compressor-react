import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DropboxIcon from '../assets/dropbox-icon.png';
import GoogleDriveIcon from '../assets/google-drive-icon.png';
import DownloadIcon from '../assets/Download.png';
import TrashIcon from '../assets/Trash.png';
import RestartIcon from '../assets/Restart.png';
import compressPDFlogo from '../assets/compress-pdf-logo.png';
import star from '../assets/Star.png'; 

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [dpi, setDPI] = useState(144);
    const [imageQuality, setImageQuality] = useState(75);
    const [colorModel, setColorModel] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [compressedFile, setCompressedFile] = useState(null);
    const [reductionPercentage,setReductionPercentage] = useState(null);
    const [showTools,setShowTools] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jobID, setJobID] = useState(null);

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    }, [selectedFile]);


    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        setCurrentStep(2); // Move to the next step when a file is selected
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        setCurrentStep(2); // Move to the next step when a file is selected
    };

    const handleCompression = async () => {
        try {

            setLoading(true); // Set loading state to true when compression starts

            // Upload file to the server
            const formData = new FormData();
            formData.append('file', selectedFile);

            const uploadResponse = await axios.post('https://filetools13.pdf24.org/client.php?action=upload', formData);

            // Check if the response status is in the 2xx range (indicating success)
            if (uploadResponse.status >= 200 && uploadResponse.status < 300) {
                const uploadedFileInfo = uploadResponse.data[0];
                console.log('File upload successful:', uploadedFileInfo);

                const dpi = 144;
                const imageQuality = 75;
                const colorModel = '';

                // Start compression
                const compressionPayload = {
                    files: [{
                        file: uploadedFileInfo.file,
                        size: uploadedFileInfo.size,
                        name: uploadedFileInfo.name,
                        ctime: uploadedFileInfo.ctime,
                        host: uploadedFileInfo.host,
                        dpi: dpi,
                        imageQuality: imageQuality,
                        mode: "normal",
                        colorModel: colorModel,
                    }]
                };

                const compressionResponse = await axios.post('https://filetools13.pdf24.org/client.php?action=compressPdf', compressionPayload);
                const jobID = compressionResponse.data.jobId;
                console.log('Compression job ID:', jobID);

                // Set the jobID state
                setJobID(jobID);

                // Wait for job completion
                let status = '';
                while (status !== 'done') {
                    const statusResponse = await axios.get(`https://filetools13.pdf24.org/client.php?action=getStatus&jobId=${jobID}`);
                    status = statusResponse.data.status;

                    // Check if the compression job is done
        if (status === 'done') {
        // Once the compression job is done, you can calculate the reduction in size
        const originalFileSize = parseInt(statusResponse.data.job['0.in.size']);
        const compressedFileSize = parseInt(statusResponse.data.job['0.out.size']);
        const reductionPercentage = ((originalFileSize - compressedFileSize) / originalFileSize) * 100;

        // Save the reduction percentage to state or perform any other action as needed
        setReductionPercentage(reductionPercentage.toFixed(2)); 

        console.log(`Reduction in size: ${reductionPercentage.toFixed(2)}%`);
    } else {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
                    if (status !== 'done') {
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Polling interval
                    }
                }

                // Job completed successfully
                console.log('Job completed successfully.');

                // Change to currentState3
                setCurrentStep(3);

            } else {
                console.error('File upload failed with status:', uploadResponse.status);
            }

            setLoading(false); // Set loading state to false when compression is completed successfully
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error uploading file:', error);
        }
    };

    //Function to handle the preview button click
    const handlePreview = async () => {
        try {
            // Construct the URL for previewing the compressed file
            const previewUrl = `https://filetools13.pdf24.org/client.php?mode=inline&action=downloadJobResult&jobId=${jobID}`;
    
            // Set the URL for previewing the compressed file to the state
            setCompressedFile(previewUrl);
            setShowTools(false);
        } catch (error) {
            console.error('Error while setting compressed file preview URL:', error);
        }
    };

    const handleShowTools = () => {
        setShowTools(true); // Show the tools section
        setCompressedFile(false);
    };
    
    // Function to handle the download action
    const handleDownload = () => {
        if (jobID) {
            const downloadUrl = `https://filetools13.pdf24.org/client.php?mode=download&action=downloadJobResult&jobId=${jobID}`;
           
            // Create a hidden anchor element
            const anchor = document.createElement('a');
            anchor.href = downloadUrl;
            anchor.download = ''; // Add a value if you want to specify the filename
    
            // Append the anchor to the document body
            document.body.appendChild(anchor);
    
            // Programmatically trigger a click event on the anchor
            anchor.click();
    
            // Remove the anchor from the document body after the download starts
            anchor.remove();

            setCurrentStep(4);
        } else {
            console.error('Job ID is not available yet.'); // Handle the case where jobID is not available
            // Implement error handling here, such as displaying a message to the user
        }
    };
    
    return (
        <div id="fileZone" className="file-zone" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="section">
            <div className="current-state-label">
                <div className="section-title" style={{ color: currentStep >= 1 ? '#327FDE' : '#C1C1C1' }}>
                    {currentStep > 1 && <span style={{ marginRight: '5px' }}>&#10003;</span>}
                    1. Upload your PDFs
                </div>
                </div>
            </div>

            <div className="section">
            <div className="current-state-label">
                <div className="section-title" style={{ color: currentStep >= 2 ? '#327FDE' : '#C1C1C1' }}>
                    {currentStep > 2 && <span style={{ marginRight: '5px' }}>&#10003;</span>}
                    2. Choose compression
                </div>
                </div>
            </div>


            <div className="section">
            <div className="current-state-label">
                <div className="section-title" style={{ color: currentStep >= 3 ? '#327FDE' : '#C1C1C1' }}>
                    {currentStep > 3 && <span style={{ marginRight: '5px' }}>&#10003;</span>}
                    3. Done
                </div>
                </div>
            </div>

            {/* currentStep-1 */}
            <div style={{ display: currentStep === 1 ? 'block' : 'none' }}><br/>
                <div className="center-align">
                    <input id="fileInput" type="file" onChange={handleFileChange} style={{display:'none'}}/>
                    <button onClick={() => document.getElementById('fileInput').click()}>Select File</button>
                </div>
                <div className="center-align">
                    <p className="small-text">or drag and drop files into this area</p>
                </div>
                <div className="icon-group">
                    <img className="icon" src={DropboxIcon} alt="DropboxIcon" />
                    <span>Dropbox</span>
                    <img className="icon google-drive-icon" src={GoogleDriveIcon} alt="GoogleDriveIcon" />
                    <span>Google Drive</span>
                </div>
            </div>

            {/* currentStep-2 */}
            <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                <div className="center-align">
                    <br />
                    <div className="center-align">
                        <iframe src={filePreview} title="PDF Preview" style={{ width: '200px', border: 'none', backgroundColor:'transparent' }}></iframe><br/>
                        <span>{selectedFile ? selectedFile.name : ''}</span><br /><br />
                        {loading && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="loader"></div>
                        <p>Compressing...</p>
                    </div>
                </div>
            )}
            <button onClick={handleCompression} disabled={loading}>Compress</button>
            <br />
                    </div>
                </div><br/><br/>

          <div style={{border: '1px dotted #73B2FF', paddingTop: '20px',backgroundColor:'#EFF6FF',display:'inline-block', paddingLeft:'20px',paddingRight:'20px'}}>
          {/* DPI Input */}
          <label htmlFor="dpi" style={{marginRight:'10px'}}>DPI</label>
            <input type="number" id="dpi" min="10" max="300" value={dpi} onChange={(e) => setDPI(e.target.value)} style={{ marginRight: '10px' }} />
            
            {/* Image Quality Input */}
            <label htmlFor="imageQuality" style={{marginRight:'10px'}}>Image Quality</label>
            <input type="number" id="imageQuality" min="1" max="100" value={imageQuality} onChange={(e) => setImageQuality(e.target.value)} style={{ marginRight: '10px' }} />
            

           {/* Grayscale Color Toggle */}
           <label htmlFor="grayscaleToggle" style={{marginRight:'10px'}}>Gray</label>
            <input type="checkbox" id="grayscaleToggle" checked={colorModel === 'gray'} onChange={() => setColorModel(colorModel === 'gray' ? 'no change' : 'gray')} style={{ marginRight: '10px' }} />
            <br /><br />
            </div>
                   

            </div>

            {/* currentStep-3 */}
            <div style={{ display: currentStep === 3 ? 'block' : 'none' }}><br/>
            <img src={DownloadIcon} className='download-icon' alt='DownloadIcon'></img><br/>
                <div className="center-align">
                    <br />
                    <div className="center-align">
                        
                        <span className='file-text'>Your files are ready.</span><br/>
                        <span>{selectedFile ? selectedFile.name : ''}</span><br /><br/>

                        <span className='label-name'>DPI: </span><span style={{marginRight:'16px'}}>{dpi}</span>
                        <span className='label-name'>Image Quality: </span><span style={{marginRight:'16px'}}>{imageQuality}</span>
                        <span className='label-name'>Color: </span><span style={{marginRight:'16px'}}>{colorModel === '' ? 'No Change' : colorModel}</span><br/><br/>

                        <span>PDF24 has processed your job. The size has been reduced by </span><span style={{color:'#327FDE'}}>{reductionPercentage}%</span><br/><br/>

                        <button className='button-class' onClick={handleDownload}>Download</button>

                        <button className='preview-button' onClick={handlePreview}>Preview</button>
         
                        <button className='button-class' onClick={handleShowTools}>Another tools</button><br/><br/>
                    </div>
                </div>

                <img src={TrashIcon} className='trash-icon' alt='TrashIcon'></img><span className='delete-button'>Delete</span>
                <img src={RestartIcon} className='restart-icon' alt='RestartIcon'></img><span className='restart-button'>Restart</span>
            
                {compressedFile && (
                <iframe src={compressedFile} width="100%" height="500px" title="Compressed File Preview"></iframe>
            )}


            {/* Show the tools section only if showTools is true */}
            {showTools && (
            <div>
            <div className="container-toolBox">
                <div className="toolBox">
                    <div className="toolBoxHeader">
                        <img src={compressPDFlogo} alt='compressPDFlogo' style={{width:'50px',height:'50px'}}></img>
                        <span style={{color:'white'}}>Merge PDF</span>
                        <img src={star} alt='star'></img>
                    </div>
                </div>
                <div className="toolBox">
                    <div className="toolBoxHeader">
                        <img src={compressPDFlogo} alt='compressPDFlogo' style={{width:'50px',height:'50px'}}></img>
                        <span style={{color:'white'}}>Extract PDF images</span>
                        <img src={star} alt='star'></img>
                    </div>
                </div>
                <div className="toolBox">
                    <div className="toolBoxHeader">
                        <img src={compressPDFlogo} alt='compressPDFlogo' style={{width:'50px',height:'50px'}}></img>
                        <span style={{color:'white'}}>Add page numbers</span>
                        <img src={star} alt='star'></img>
                    </div>
                </div>
                <div className="toolBox">
                    <div className="toolBoxHeader">
                        <img src={compressPDFlogo} alt='compressPDFlogo' style={{width:'50px',height:'50px'}}></img>
                        <span style={{color:'white'}}>Add page numbers</span>
                        <img src={star} alt='star'></img>
                    </div>
                </div>
                <div className="toolBox">
                    <div className="toolBoxHeader">
                        <img src={compressPDFlogo} alt='compressPDFlogo' style={{width:'50px',height:'50px'}}></img>
                        <span style={{color:'white'}}>Add watermark</span>
                        <img src={star} alt='star'></img>
                    </div>
                </div>

            </div>

        
            {/* See all tools link */}
                <div className="see-all-tools">
                    <a href="#" style={{color:'#327FDE',fontSize:'16px'}}>See all tools</a>
                </div>

            </div>
            )}
            </div><br/><br/>

            


            {/* currentStep-4 */}
            <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
                <h3>Download successful! Your PDF has been compressed.</h3>
                <h5>Thank you for using our service.</h5>
                <button onClick={() => setCurrentStep(1)}>Restart</button>
            </div>

        </div>
    );
};

export default FileUpload;

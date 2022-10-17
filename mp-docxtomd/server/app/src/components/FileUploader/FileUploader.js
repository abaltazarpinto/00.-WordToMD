//TO save the data
import axios from 'axios';
import { useState } from 'react';
import React, { Fragment } from 'react';
import Axios from "axios";
import FileDownload from "js-file-download";
import Markdown from './Markdown/Markdown';
import Message from './Message';
import Progress from './Progress';



export const FileUploader = ({}) => {


  //_------UPLOAD THE USERs FILE --------- b 
    const [file, setFile] = useState([]);
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [filename, setFilename] = useState('Choose File');


    const onInputChange = (e) => {
        console.log(e.target.files)
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
      e.preventDefault();
      const data = new FormData();
      data.append('file', file);
  
      try {
        const res = await axios.post('//localhost:8000/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progress => {
            setUploadPercentage(
              parseInt(
                Math.round((progress.loaded * 100) / progress.total)
              )
            );
          }
        });
        
        // Clear percentage
        setTimeout(() => setUploadPercentage(0), 10000);
  
        const { fileName, filePath } = res.data;
  
        setUploadedFile({ fileName, filePath });
  

        setMessage('File Uploaded');
      } catch (err) {
        if (err.response.status === 500) {
          setMessage('There was a problem with the server');
        } else {
          setMessage(err.response.data.msg);
        }
        setUploadPercentage(0)
      }
    };

    const download= (e) => {
        e.preventDefault()
        Axios({
          url:"http://localhost:8000/download",
          method:"GET", 
          responseType:"blob"
        }).then((res)=>{
          console.log(res)
          FileDownload(res.data,"markdown.md")
        })
      }
      

      function refreshPage() {
         window.location.reload(false);
      }

  return (
        <div>
          <div className='container mt-4'>
            <h4 className='display-4 text-center mb-4'>
              <i className='' /> Docx to mD converter
            </h4>
 
          <Fragment>
            {message ? <Message msg={message} /> : null}
              <form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                   <input
                      type='file'
                      className="form-control" 
                      id='customFile'
                      onChange={onInputChange}
                    />
                  <label className='custom-file-label' htmlFor='customFile'>
                   {filename}
                  </label>
                </div>

                    <Progress percentage={uploadPercentage} />

                  <input
                    type='submit'
                    value='Convert'
                    className='btn btn-primary btn-block mt-4'
                  />
              </form>
                  <input
                      type='submit'
                      value='Download'
                      className='btn btn-primary btn-block mt-4'
                      onClick={(e)=>download(e)}
                    />
                      {uploadedFile ? (
                        <div className='row mt-5'>
                          <div className='col-md-6 m-auto'>
                            <h3 className='text-center'>{uploadedFile.fileName}</h3>
                            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
                          </div>
                        </div>
                      ) : null}
            </Fragment>


        
        
            <Markdown />
        </div>

      </div>
 
    )
};
import React, { useRef } from "react";
import AWS from 'aws-sdk'

function Upload() {

  const fileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    AWS.config.update({
      accessKeyId: 'AKIAZSE2BSIWWF7I2Z4T',
      secretAccessKey: 'qUofFIsj+73ZTQoVUFt9Uad/sEPHg4Iwu+5hVYBn',
    })
    const myBucket = new AWS.S3({
      params: { Bucket: 'testsubha/test'},
      region: 'us-east-1',
    })
    const params = {
        ACL: 'public-read',
        Key: newFileName,
        ContentType: file.type,
        Body: file,
      }
    myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
          // that's how you can keep track of your upload progress
          this.setState({
            progress: Math.round((evt.loaded / evt.total) * 100),
          })
        })
        .send((err) => {
           if (err) {
             // handle the error here
           }
        });
  };
  return (
    <>
      <form className='upload-steps' onSubmit={handleClick}>
        <label>
          Upload file:
          <input type='file' ref={fileInput} />
        </label>
        <br />
        <button type='submit'>Upload</button>
      </form>
    </>
  );
}

export default Upload;

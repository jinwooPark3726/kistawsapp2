import React, { useState } from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET = 'kistawsbucket';
const REGION = 'ap-northeast-2';


AWS.config.update({
    accessKeyId: 'AKIAZSQZBZDAINMAO6GK',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const UploadImage = () => {

    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div className='App'>
        <h2>기능 1. 등록 </h2>
        <p>Image File Upload Progress {progress}%</p>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile(selectedFile)}> Upload</button>
        <h1></h1>
        <input
            type="text"
            name="message"
            placeholder="return value"
            onChange={
                (e) => {
                    console.log(e)
                }
            }
        />


        <br></br>
        <br></br>

        <h2>기능 2. 인증(1:1) </h2>
        <p>Image File Upload Progress {progress}%</p>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile(selectedFile)}> Upload</button>
        <h1></h1>
        <input
            type="text"
            name="message"
            placeholder="return value"
            onChange={
                (e) => {
                    console.log(e)
                }
            }
        />


        <br></br><br></br>
        <h2>기능 3. 인식(1:N)</h2>
        <p>Image File Upload Progress {progress}%</p>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile(selectedFile)}> Upload</button>
        <h1></h1>
        <input
            type="text"
            name="message"
            placeholder="return value"
            onChange={
                (e) => {
                    console.log(e)
                }
            }
        />
    </div>

}

export default UploadImage;

import React, { useState } from 'react';
import AWS from 'aws-sdk'
import axios from 'axios';


const S3_BUCKET = 'mykistawsbucket';
const REGION = 'ap-northeast-2';


AWS.config.update({
    accessKeyId: 'AKIAWSF5CQBTX7DBTSFT',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const UploadImage = () => {

    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);

    const [id1, setID1] = useState(null);
    const [id2, setID2] = useState(null);

    const [retValue1, setRetValue1] = useState(0);
    const [retValue2, setRetValue2] = useState(0);
    const [retValue3, setRetValue3] = useState(0);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setProgress1('0');
        setRetValue1('')
       // setProgress2 = 0;
       // setProgress3 = 0;
    }

    const uploadFile1 = (file) => {
      
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var hours = ('0' + today.getHours()).slice(-2); 
      var minutes = ('0' + today.getMinutes()).slice(-2);
      var seconds = ('0' + today.getSeconds()).slice(-2); 
      var dateString = year+ month  + day +'_' + hours + minutes + seconds;
      
      console.log(dateString.slice(2));
        // const formData = new FormData();
        // formData.append(
        //     "test file",
        //      file,
        //      file.name
        // )

        // axios.post("https://5fr3l0eib2.execute-api.ap-northeast-2.amazonaws.com/prod/file-upload", formData).then(() => {
        // axios.post("https://5fr3l0eib2.execute-api.ap-northeast-2.amazonaws.com/prod/file-upload", formData).then( (res) => console.log() );
        //this.setState({selectedFile: null});
        // this.setState({fileUploadedSuccessfully: true});
       // file.name = id1 + '/' + file.name

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: 'images/' + id1 + '/'+ dateString.slice(2) + '_' + file.name
        };

        console.log(params.Key)
      
       
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress1(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) {
                    console.log(err)
                    setRetValue1('upload failed')
                }
            })
            setRetValue1('upload completed')
    }

    const uploadFile2 = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress2(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }
    const uploadFile3 = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress3(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
                
            })
    }

    
    return <div className='KistMain'>
        <h2>기능 1. 등록 </h2>
        <p>Image File Upload Progress {progress1}%</p>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile1(selectedFile)}> Upload</button>
        <p>
       
        <input
            type="text"
            name="id1"
            placeholder="ID"
            onChange={
                (e) =>  {
                    console.log(e)
                    setID1(e.target.value)
                    console.log(id1)


                    var today = new Date();

                    var year = today.getFullYear();
                    var month = ('0' + (today.getMonth() + 1)).slice(-2);
                    var day = ('0' + today.getDate()).slice(-2);
                    var hours = ('0' + today.getHours()).slice(-2); 
                    var minutes = ('0' + today.getMinutes()).slice(-2);
                    var seconds = ('0' + today.getSeconds()).slice(-2); 
                    var dateString = year+ month  + day +'_' + hours + minutes + seconds;
                    
                    console.log(dateString.slice(2));
                }
            }
        
        />
         <div>  
            <b>리턴값  : </b>
            {retValue1}
        </div>
       
        </p>
        <hr/>
        <br></br>
        <br></br>

        <h2>기능 2. 인증(1:1) </h2>
        <p>Image File Upload Progress {progress2}%</p>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile2(selectedFile)}> Upload</button>
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
        <hr/>


        <br></br><br></br>
        <h2>기능 3. 인식(1:N)</h2>
        <p>Image File Upload Progress {progress3}%</p>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile3(selectedFile)}> Upload</button>
        <h1></h1>
        <input
            type="text"
            name="message"
            placeholder="return value"
            onChange={
                (e) => {
                    console.log(e)
                    setID1(e.target.value)
                    console.log(id1)
                }
            }
        />
        <hr/>
    </div>

}

export default UploadImage;

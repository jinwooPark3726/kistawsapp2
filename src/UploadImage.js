import React, { useState } from 'react';
import AWS from 'aws-sdk'
import axios from 'axios';


const S3_BUCKET = 'kistawsbucket-kr'
const S3_BUCKET_VECTOR = 'kistawsbucket-vector-kr'
const S3_BUCKET_TMP2 = 'kisttmp2-kr'
const S3_BUCKET_TMP2_OUTPUT = 'kisttmp2-vector-kr'
const S3_BUCKET_TMP3 = 'kisttmp3-kr'
const S3_BUCKET_TMP3_OUTPUT = 'kisttmp3-vector-kr'
const REGION = 'ap-northeast-2'

// 
AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY
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
    const [id3, setID3] = useState(null);

    const [retValue1, setRetValue1] = useState(0);
    const [retValue2, setRetValue2] = useState(0);
    const [retValue3, setRetValue3] = useState(0);

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setProgress1('0');
        setRetValue1('')
    }

    const handleFileInput2 = (e) => {
        setSelectedFile2(e.target.files[0]);
        setProgress2('0');
        setRetValue2('')
    }

    const handleFileInput3 = (e) => {
        setSelectedFile3(e.target.files[0]);
        setProgress3('0');
        setRetValue3('')
    }

    const uploadFile1 = (file) => {

        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var hours = ('0' + today.getHours()).slice(-2);
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2);
        var dateString = year + month + day + '_' + hours + minutes + seconds;

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: id1 + '/' + dateString.slice(2) + '_' + file.name
        };

        const params_output = {
            Bucket: S3_BUCKET_VECTOR,
            Prefix: id1 + '/' + dateString.slice(2)

        };
        console.log(params.Key);

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress1(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) {
                    console.log(err)
                }
            })

        setTimeout(() => {
            myBucket.listObjects(params_output, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    setRetValue1('Upload Failed');
                } else {
                    console.log("Upload Success")
                    if (data.Contents.length)
                        setRetValue1('Upload completed');
                    console.log("Image & vector upload Success");

                }

            })
        }, 60000);

    }

    const uploadFile2 = (file) => {


        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var hours = ('0' + today.getHours()).slice(-2);
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2);
        var dateString = year + month + day + '_' + hours + minutes + seconds;

        console.log(dateString.slice(2));

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET_TMP2,
            Key: id2 + '/' + dateString.slice(2) + '_' + file.name
        };

        const params_list = {
            Bucket: S3_BUCKET_TMP2_OUTPUT,
            Prefix: id2 + '/' + dateString.slice(2)

        };
        var fileNameArr = file.name.split(".");
        console.log(fileNameArr[0], fileNameArr[1]);

        const params_output = {
            Bucket: S3_BUCKET_TMP2_OUTPUT,
            Key: id2 + '/' + dateString.slice(2) + '_' + fileNameArr[0] + ".txt"

        };

        console.log(params.Key);
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress2(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log("Upload Error", err)
                else
                    console.log("Upload Success")
            })


        setTimeout(() => {
            myBucket.listObjects(params_list, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    setRetValue2('Upload Failed');
                } else {

                    if (data.Contents.length) {
                        myBucket.getObject(params_output, function (err, data) {

                            if (err) {
                                console.log("Error", err);
                            }
                            setRetValue2(data.Body.toString());
                            console.log(data.Body.toString());
                        })


                    }
                    else {
                        setRetValue2('No comparison ID');
                        console.log('No comparison ID');
                    }


                }

            })
        }, 60000);

    }

    const uploadFile3 = (file) => {
        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var hours = ('0' + today.getHours()).slice(-2);
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2);
        var dateString = year + month + day + '_' + hours + minutes + seconds;

        console.log(dateString.slice(2));

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET_TMP3,
            Key: '/' + dateString.slice(2) + '_' + file.name
        };

        const params_list = {
            Bucket: S3_BUCKET_TMP3_OUTPUT,
            Prefix: '/' + dateString.slice(2)

        };

        var fileNameArr = file.name.split(".");
        console.log(fileNameArr[0], fileNameArr[1]);
        //console.log(fileNameWithoutExt)


        const params_output = {
            Bucket: S3_BUCKET_TMP3_OUTPUT,
            Key: '/' + dateString.slice(2) + '_' + fileNameArr[0] + ".txt"

        };

        console.log(params.Key);
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress3(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)

            })

        setTimeout(() => {
            myBucket.listObjects(params_list, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    setRetValue3('Upload Failed');
                } else {

                    if (data.Contents.length) {
                        myBucket.getObject(params_output, function (err, data) {

                            if (err) {
                                console.log("Error", err);
                            }
                            setRetValue3(data.Body.toString());
                            console.log(data.Body.toString());
                        })

                        console.log("listobject 1 over")
                    }
                    else {
                        setRetValue3('Error timeout or output Value');
                        console.log('Error timeout or output Value');
                    }


                }

            })
        }, 15000);


    }


    return <div className='KistMain'>
        <h2>등록 </h2>
        <p>Image File Upload Progress {progress1}%</p>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile1(selectedFile)}> Upload</button>
        <p>

            <input
                type="text"
                name="id1"
                placeholder="ID"
                onChange={
                    (e) => {
                        setID1(e.target.value)
                        console.log("e", e)
                    }
                }

            />
            <div>
                <b>리턴값  : </b>
                {retValue1}
            </div>

        </p>
        <hr />
        <br></br>
        <br></br>

        <h2>인증(1:1) </h2>
        <p>Image File Upload Progress {progress2}%</p>
        <input type="file" onChange={handleFileInput2} />
        <button onClick={() => uploadFile2(selectedFile2)}> Upload</button>
        <p>
            <input
                type="text"
                name="id2"
                placeholder="ID"
                onChange={
                    (e) => {
                        setID2(e.target.value)
                        console.log("e", e)
                    }
                }

            />
        </p>
        <div>
            <b>리턴값  : </b>
            {retValue2}
        </div>
        
        <hr></hr>
        {/* <hr />
        <br></br><br></br>
        <h2>기능 3. 인식(1:N)</h2>
        <p>Image File Upload Progress {progress3}%</p>
        <input type="file" onChange={handleFileInput3} />
        <button onClick={() => uploadFile3(selectedFile3)}> Upload</button>
        <h1></h1>
        <p>
        </p>
        <div>
            <b>리턴값  : </b>
            {retValue3}
        </div>
        <hr /> */}
        
    </div>

}

export default UploadImage;

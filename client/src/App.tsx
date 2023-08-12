import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Audio } from 'react-loader-spinner'
import Expand from "./assets/Expand.png";
import Collapse from './assets/Collapse.png';
import './App.css'

function App() {

  const [file, setFile] = useState();
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080');
  const [loading, setLoading] = useState(false);


  const qualities = [
    "480",
    "720",
    "1080",
    "2048",
  ]


  const handleSubmit = async () => {
    if (!fileUploaded) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('video', file);
      let quality;
      if (selectedQuality === "2048" || selectedQuality === "4096") {
        quality = selectedQuality + "x" + Math.ceil((parseInt(selectedQuality) / 1.77777777)).toString();
      } else {
        quality = Math.ceil((parseInt(selectedQuality) * 1.77777777)).toString() + "x" + selectedQuality;
      }

      formData.append('quality', quality);
      const transcodedVideo = await axios.post("http://localhost:3000/transcodeVideo",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob'
        }
      )
      console.log(transcodedVideo);
      console.log(transcodedVideo.data);
      setLoading(false);
      // const blob = new Blob([transcodedVideo.data], { type: 'video/mp4' });
      // saveAs(blob, `${file.name}-${selectedQuality}p.mp4`);

    } catch (err) {
      setLoading(false);
      console.log(err);
    }

  }

  const fileChange = (e: any) => {
    console.log(e.target.files[0].name)
    setFile(e.target.files[0]);
    setFileUploaded(true);
  }

  const handleShowQualityMenu = () => {
    setShowQualityMenu(!showQualityMenu);
  }

  const handleQualityChange = (quality) => {
    console.log(quality);
    setSelectedQuality(quality);
    setShowQualityMenu(false);
  }

  return (
    <>
      <div className='h-screen'>
        {
          loading && <div className='h-screen w-screen absolute z-10 bg-[#0D1B2A] opacity-80'>
            <div className='absolute left-[47%] top-[80%]'>
              <Audio
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          </div>}
        <div className="bg-[#0D1B2A]
        flex py-4 justify-items-center align-middle">
          <p className="text-center self-center flex px-4 font-['Pacifico'] text-3xl text-[#E0E1DD]">Transcode It</p>
        </div>
        <div className="bg-[#1B263B] h-full text-[#E0E1DD] font-['Poppins'] text-center text-xl">
          <div className='pt-40 pb-10'>Upload a video file and get it in multiple resolutions!</div>
          <div className='justify-center'>
            <div>
              <input type="file" accept="video/*" className='w-80' onChange={fileChange} />
            </div>
          </div>
          <div>
            <div
              onClick={handleShowQualityMenu}
              className='flex border border-[#0D1B2A] justify-center mt-10 w-1/2 mx-auto bg-[#E0E1DD]  text-[#1B263B] rounded-t-xl'
            >
              <div className='rounded-l-lg p-2 px-4'>
                Select Resolution (Current: {selectedQuality}p)
              </div>
              <div className='rounded-r-lg py-2'>
                <img src={showQualityMenu ? Collapse : Expand} alt={showQualityMenu ? "Collapse" : "Expand"} width={30} />
              </div>
            </div>
            <div className='w-1/2 mx-auto bg-[#E0E1DD]  text-[#1B263B] rounded-b-xl'>
              {
                showQualityMenu && qualities.map((quality, index) => <div
                  key={index}
                  onClick={() => handleQualityChange(quality)}
                  className={`py-2 border border-[#0D1B2A] ${index == qualities.length - 1 ? "rounded-b-xl" : ""}`}
                >
                  {quality}p
                </div>)
              }
            </div>
          </div>
          <div className='flex justify-center my-12'>
            <div
              className="flex p-3 rounded-lg bg-[#E0E1DD]  text-[#1B263B] font-bold"
              onClick={handleSubmit}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

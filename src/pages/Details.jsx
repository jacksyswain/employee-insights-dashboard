import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {

  const { id } = useParams();

  const videoRef = useRef(null);

  const [photo, setPhoto] = useState(null);

  useEffect(() => {

    async function startCamera() {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      videoRef.current.srcObject = stream;

    }

    startCamera();

  }, []);

  const capturePhoto = () => {

    const video = videoRef.current;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    setPhoto(image);

  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Employee Verification</h2>

      <video
        ref={videoRef}
        autoPlay
        style={{ width: 400 }}
      />

      <br /><br />

      <button onClick={capturePhoto}>
        Capture Photo
      </button>

      {photo && (
        <div>

          <h3>Captured Photo</h3>

          <img src={photo} width="400" />

        </div>
      )}

    </div>
  );
}
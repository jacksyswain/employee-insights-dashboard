import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function Details() {

  const { id } = useParams();

  const videoRef = useRef(null);

  useEffect(() => {

    async function startCamera() {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      videoRef.current.srcObject = stream;

    }

    startCamera();

  }, []);

  return (
    <div style={{ padding: 20 }}>

      <h2>Employee Verification</h2>

      <p>Employee ID: {id}</p>

      <video
        ref={videoRef}
        autoPlay
        style={{ width: 400 }}
      />

    </div>
  );
}
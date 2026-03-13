import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {

  const { id } = useParams();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  const drawing = useRef(false);

  // Start Camera
  useEffect(() => {

    async function startCamera() {
      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (err) {
        console.error("Camera error:", err);
      }
    }

    startCamera();

  }, []);

  // Capture Photo
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

  // Start drawing signature
  const startDraw = (e) => {

    drawing.current = true;

    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  // Draw signature
  const draw = (e) => {

    if (!drawing.current) return;

    const ctx = canvasRef.current.getContext("2d");

    ctx.lineWidth = 2;

    ctx.lineCap = "round";

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctx.stroke();
  };

  // Stop drawing
  const stopDraw = () => {
    drawing.current = false;
  };

  // Merge photo + signature
  const mergeImages = () => {

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw photo
      ctx.drawImage(img, 0, 0);

      // Draw signature
      ctx.drawImage(canvasRef.current, 0, 0);

      const merged = canvas.toDataURL("image/png");

      setFinalImage(merged);
    };

    img.src = photo;
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Employee Identity Verification</h2>

      <p>Employee ID: {id}</p>

      {/* Camera Feed */}
      {!photo && (
        <div>

          <video
            ref={videoRef}
            autoPlay
            style={{ width: 400, border: "1px solid gray" }}
          />

          <br /><br />

          <button onClick={capturePhoto}>
            Capture Photo
          </button>

        </div>
      )}

      {/* Photo + Signature */}
      {photo && !finalImage && (

        <div>

          <h3>Sign Below</h3>

          <div
            style={{
              position: "relative",
              width: 400
            }}
          >

            <img
              src={photo}
              width="400"
              alt="captured"
            />

            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              style={{
                position: "absolute",
                left: 0,
                top: 0
              }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
            />

          </div>

          <br />

          <button onClick={mergeImages}>
            Merge Photo + Signature
          </button>

        </div>

      )}

      {/* Final Image */}
      {finalImage && (

        <div>

          <h3>Final Audit Image</h3>

          <img
            src={finalImage}
            width="400"
            alt="final"
          />

        </div>

      )}

    </div>
  );
}
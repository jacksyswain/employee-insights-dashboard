import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {

  const { id } = useParams();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  const drawing = useRef(false);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (err) {
        console.error("Camera error:", err);
      }
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

  const startDraw = (e) => {

    drawing.current = true;

    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {

    if (!drawing.current) return;

    const ctx = canvasRef.current.getContext("2d");

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctx.stroke();
  };

  const stopDraw = () => {
    drawing.current = false;
  };

  const mergeImages = () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      ctx.drawImage(canvasRef.current, 0, 0);

      const merged = canvas.toDataURL("image/png");

      setFinalImage(merged);
    };

    img.src = photo;
  };

  return (
    <div style={{
      background: "#f4f6f9",
      minHeight: "100vh",
      padding: 40,
      fontFamily: "Arial"
    }}>

      <div style={{
        maxWidth: 500,
        margin: "auto",
        background: "white",
        padding: 30,
        borderRadius: 10,
        boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ textAlign: "center", marginBottom: 10 }}>
          Identity Verification
        </h2>

        <p style={{
          textAlign: "center",
          color: "#666",
          marginBottom: 30
        }}>
          Employee ID: {id}
        </p>

        {/* Camera */}

        {!photo && (

          <div style={{ textAlign: "center" }}>

            <video
              ref={videoRef}
              autoPlay
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #ddd"
              }}
            />

            <button
              onClick={capturePhoto}
              style={{
                marginTop: 20,
                padding: "10px 20px",
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Capture Photo
            </button>

          </div>

        )}

        {/* Signature */}

        {photo && !finalImage && (

          <div>

            <h3 style={{ marginBottom: 10 }}>Draw Signature</h3>

            <p style={{ color: "#777", fontSize: 14 }}>
              Sign inside the box to verify identity
            </p>

            <div
              style={{
                position: "relative",
                width: "100%",
                marginTop: 10
              }}
            >

              <img
                src={photo}
                alt="captured"
                style={{
                  width: "100%",
                  borderRadius: 8
                }}
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

            <button
              onClick={mergeImages}
              style={{
                marginTop: 20,
                width: "100%",
                padding: "10px",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Generate Audit Image
            </button>

          </div>

        )}

        {/* Final Image */}

        {finalImage && (

          <div style={{ textAlign: "center" }}>

            <h3 style={{ marginBottom: 15 }}>Verification Complete</h3>

            <img
              src={finalImage}
              alt="final"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #ddd"
              }}
            />

          </div>

        )}

      </div>

    </div>
  );
}
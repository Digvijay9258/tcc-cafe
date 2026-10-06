import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

const PDF_URL = "/menu.pdf";

function App() {
  const [fullscreen, setFullscreen] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleFullscreen = () => {
    const viewer = document.getElementById("pdf-viewer");

    if (!document.fullscreenElement) {
      viewer?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = PDF_URL;
    link.download = "menu.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open(PDF_URL, "_blank");

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const websiteURL = window.location.href;

  return (
    <div className="app">

      {/* Header */}
      <header className="header">

        <div className="brand">
          <div className="logo">M</div>

          <div>
            <h1>TCC Cafe</h1>
            <p>Digital Menu</p>
          </div>
        </div>

        <button
          className="qr-button"
          onClick={() => setShowQR(!showQR)}
        >
          📱 QR
        </button>

      </header>


      {/* QR Popup */}
      {showQR && (
        <div className="qr-overlay">

          <div className="qr-card">

            <button
              className="close-button"
              onClick={() => setShowQR(false)}
            >
              ×
            </button>

            <h2>Scan to View Menu</h2>

            <p>
              Scan this QR code with your phone camera
            </p>

            <div className="qr-code">
              <QRCodeCanvas
                value={websiteURL}
                size={220}
                level="H"
              />
            </div>

            <span className="qr-url">
              {websiteURL}
            </span>

          </div>

        </div>
      )}


      {/* Controls */}
      <div className="toolbar">

        <button onClick={handleDownload}>
          ⬇️ <span>Download</span>
        </button>

        <button onClick={handlePrint}>
          🖨️ <span>Print</span>
        </button>

        <button onClick={handleFullscreen}>
          {fullscreen ? "⛶ Exit" : "⛶ Fullscreen"}
        </button>

      </div>


      {/* PDF Viewer */}
      <main className="viewer-wrapper">

        <div
          id="pdf-viewer"
          className="pdf-viewer"
        >

          <iframe
            src={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=1`}
            title="Digital Menu"
          />

        </div>

      </main>


      {/* Footer */}
      <footer className="footer">
        <p>© 2026 TCC Cafe • Digital Menu</p>
      </footer>

    </div>
  );
}

export default App;
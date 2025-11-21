// src/components/VideoPanel.jsx

export default function VideoPanel({ title = "Camera", streamUrl }) {
  const hasStream = Boolean(streamUrl);

  return (
    <div className="video-panel">
      <div className="video-header">
        <h2>{title}</h2>
        <div className="video-status">
          <span className={`status-dot ${hasStream ? "online" : "offline"}`} />
          <span className="status-text">
            {hasStream ? "LIVE" : "NO STREAM"}
          </span>
        </div>
      </div>

      {hasStream ? (
        <div className="video-wrapper">
          {/* MJPEG / simple HTTP stream: use <img> */}
          <img src={streamUrl} alt={title} className="video-frame" />
        </div>
      ) : (
        <div className="video-placeholder">
          No stream URL configured
        </div>
      )}
    </div>
  );
}

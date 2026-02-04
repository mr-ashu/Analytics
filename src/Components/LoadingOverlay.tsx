const LoadingOverlay = ({ text = "Loading data..." }) => (
  <div className="dashboard-loading-overlay">
    <div className="dashboard-loading-spinner"></div>
    <span className="dashboard-loading-text">{text}</span>
  </div>
);

export default LoadingOverlay;

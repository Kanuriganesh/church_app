import "../styles/main.css"

const JesusLoader = () => {
  return (
    <div className="jesus-loader-overlay">
      <div className="loader-content">
        {/* Modern CSS Cross Silhouette Layout */}
        <div className="holy-cross">
          <div className="cross-beam vertical"></div>
          <div className="cross-beam horizontal"></div>
        </div>
        <p className="loader-text">Loading spiritual assets...</p>
      </div>
    </div>
  );
};

export default JesusLoader;
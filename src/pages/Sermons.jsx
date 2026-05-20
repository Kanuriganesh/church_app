import { useState, useEffect } from "react";
import styles from "./Sermons.module.css";
import { getSermons } from "../services/api"
import { FaVideo } from "react-icons/fa";
import JesusLoader from "../components/JesusLoader";


export default function Sermons() {
  const [Video_data, setVideo_data] = useState([])
  const [loading, setLoading] = useState(true); // 1. Set loading to true initially    
  const getEmbedUrl = (url) => {
    let videoId = "";
    if (url.includes("youtu.be/")) {
      // Handles https://youtu.be/YIftyBgCC-U?si=...
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      // Handles https://www.youtube.com/watch?v=YIftyBgCC-U
      videoId = url.split("v=")[1].split("&")[0];
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // 2. Turn loader on when tab switches or requests data
        const response = await getSermons();
        // Map through data to create valid embed URLs
        const formattedData = response.data.map(each => ({
          ...each,
          embedUrl: getEmbedUrl(each.youtube_url)
        }));

        setVideo_data(formattedData);
      } catch (err) {
        console.error("Sermon fetch error:", err);
      } finally {
        setLoading(false); // 3. Turn loader off when data arrives safely!
      }
    }
    fetchData();
  }, []);
  return (
    <div style={{ position: 'relative', minHeight: '300px' }}>
      {/* 4. Overlay the loader if loading state is active */}
      {loading && <JesusLoader />}

      {/* Your regular tab layout rows and content */}
      {!loading && (
        <div className={`container ${styles.sermonsPage}`}>
          <div className={styles.pageHeader}>
            <h1>Sermons</h1>
            <p>
              Watch recent sermons, worship sessions, and special church messages.
            </p>
          </div>

          <div className={styles.cardGrid}>
            {Video_data.map((video, index) => (
              <div
                key={video.id}
                className={`${styles.card} ${styles[`cardVariant${(index % 4) + 1}`]}`}
              >
                <div className={styles.videoWrapper}>
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.titleRow}>
                    <FaVideo className={styles.titleIcon} />
                    <h2>{video.title}</h2>
                  </div>
                  <p>Watch directly here on the page.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

  );
}
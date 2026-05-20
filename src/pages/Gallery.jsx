import { useState,useEffect } from "react";
import { FaSearchPlus, FaTimes } from "react-icons/fa";
import styles from "./Gallery.module.css";
import {getGallery} from "../services/api"   
import JesusLoader  from "../components/JesusLoader";   

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);   
  const [galleryImages,setGalleryImages] = useState([])   
  const [loading, setLoading] = useState(true);
   useEffect(()=>{

     async function fetchData() {    
        try{
                 setLoading(true); // 2. Turn loader on when tab switches or requests data
                // You can await here
                const response = await getGallery()
                // ...
                
                setGalleryImages(response.data)
        }   
        catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false); // 3. Turn loader off when data arrives safely!
      }
    }
    fetchData();
   },[])   

   
  const openImage = (image) => setSelectedImage(image);
  const closeImage = () => setSelectedImage(null);

  return (   
    <div style={{ position: 'relative', minHeight: '300px' }}>
      {/* 4. Overlay the loader if loading state is active */}
      {loading && <JesusLoader />}

      {/* Your regular tab layout rows and content */}
      {!loading && (
       
        <div className={`container ${styles.galleryPage}`}>
      <div className={styles.pageHeader}>
        <h1>Gallery</h1>
        <p>
          Explore beautiful moments from our church gatherings, worship services,
          fellowship, and special events.
        </p>
      </div>

      <div className={styles.galleryGrid}>
        {galleryImages.map(each => (
          <button
            key={each.id}
            type="button"
            className={styles.galleryCard}
            onClick={() => openImage(`${each.gallery_url}`)}
          >
            <img
              src={`${each.gallery_url}`}
              alt={`Church Gallery ${each.id + 1}`}
              className={styles.galleryImage}
            />

            <div className={styles.overlay}>
              <div className={styles.zoomIcon}>
                <FaSearchPlus />
              </div>
            </div>
          </button>
        ))}
      </div>
      {selectedImage && (
        <div className={styles.modalBackdrop} onClick={closeImage}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeImage}
              aria-label="Close image preview"
            >
              <FaTimes />
            </button>

            <img
              src={selectedImage}
              alt="Selected church gallery"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </div>
      )}
    </div>
    
  );
}

import styles from "./Announcements.module.css";
import {useState,useEffect} from "react"
import {getAnnouncements} from "../services/api"
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";     
import JesusLoader from "../components/JesusLoader";


export default function Announcements() {
  const [announcements,setAnnouncements] = useState([])     
  const [loading, setLoading] = useState(true); // 1. Set loading to true initially 
   useEffect(()=>{
       async function fetchData() {
        try {
               setLoading(true); // 2. Turn loader on when tab switches or requests data
               const res = await getAnnouncements();
               setAnnouncements(res.data);
             } catch (err) {
               console.error("Announcement loading events tab:", err);
             } finally {
               setLoading(false); // 3. Turn loader off when data arrives safely!
             }
      }
      fetchData();
     },[])   

     const formatTime12Hour = (time24) => {
  if (!time24) return "";
  
  // Split "19:00" into ["19", "00"]
  const [hours, minutes] = time24.split(':');
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  
  // Convert 24 to 12 format
  hour = hour % 12;
  hour = hour ? hour : 12; // if hour is 0, make it 12
  
  return `${hour}:${minutes} ${ampm}`;
};
  
  const isUpcoming = (eventDate) => {
    //console.log(new Date(eventDate) >= today, "upcoming date", new Date(eventDate), "today", today)
    //return new Date(eventDate) >= today;   
    const today = new Date();
    const event = new Date(eventDate);

    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);

    return event >= today;
  };
  return (    

    <div style={{ position: 'relative', minHeight: '300px' }}>
      {/* 4. Overlay the loader if loading state is active */}
      {loading && <JesusLoader />}

      {/* Your regular tab layout rows and content */}
      {!loading && (
        <div className={`container ${styles.announcementsPage}`}>
      <div className={styles.pageHeader}>
        <h1>Announcements</h1>
        <p>
          Stay updated with the latest church meetings, services, and special gatherings.
        </p>
      </div>

      <div className={styles.cardGrid}>
        {announcements.map((item) => (
          <div key={item.id} className={`${styles.card} ${isUpcoming(item.date) ? styles.upcoming : ""
            }`}>
            <h2>{item.title}</h2>

            <div className={styles.metaList}>
              <div className={styles.metaItem}>
                <FaCalendarAlt className={styles.icon} />
                <span>{item.date}</span>
              </div>

              <div className={styles.metaItem}>
                <FaClock className={styles.icon} />
                <span>{formatTime12Hour(item.time)}</span>
              </div>

              <div className={styles.metaItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{item.location}</span>
              </div>
            </div>

            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
      )}
    </div>
    
  );
}
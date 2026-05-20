import styles from "./About.module.css";   
import { useState } from "react";
import { FaBullseye, FaClock } from "react-icons/fa";

export default function About() {   
  const [toggleChurch,setToggleChurch] = useState("ipc");  
    return (
    <div className={`container ${styles.aboutPage}`}>
      <h1 className={styles.pageTitle}>About Us</h1>

      <section className={styles.pastorSection}>
        <div className={styles.card}>
          <img
            className={styles.pastorImage}
            alt="Pastor"
            src="/paster.jpeg"
          />
               <h3 className={styles.pastorName}>B. Steven Pastor</h3>
          <p className={styles.quote}>
            "దేవుని ఆవరణములలో ఒక దినము గడుపుట వెయ్యి దినములకంటె శ్రేష్ఠము."
          </p>
          <span className={styles.quoteReference}>— కీర్తనలు 84:10</span>
        </div>
      </section>
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <FaBullseye className={styles.icon} />
            <h2>Mission and Purpose</h2>
          </div>

          <p>
            IPC Church of God exists to help people grow in faith, experience
            the love of Jesus Christ, and live with hope, peace, and purpose.
          </p>

          <p>
            We are committed to building a welcoming spiritual family where
            people can worship together, receive encouragement, and find
            strength for everyday life through God’s Word.
          </p>

          <p>
            Our mission is to serve the community with prayer, compassion,
            fellowship, and the message of Christ.
          </p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoHeader}>
            <FaClock className={styles.icon} />
            <h2>Timings :</h2>    
          </div>   
          <div className={styles.toggleStyling}>
               <h3  onClick={()=> setToggleChurch("ipc")} className={toggleChurch ==="ipc"?styles.specailStyling:""}>SURYANARAYANA COLONY</h3>   
               <h3 onClick={()=> setToggleChurch("sub")} className={toggleChurch !=="ipc"?styles.specailStyling:""}>SUBRAHMANYAM COLONY</h3>
          </div>
          {
              toggleChurch === "ipc"  ?   

               (<div className={styles.timingList}>
            <div className={styles.timingItem}>
              <span className={styles.timingLabel}>Friday service</span>
              <strong>11:00 AM - 12:30pm </strong>
            </div>
            <div className={styles.timingItem}>
              <span className={styles.timingLabel}>Saturday Service</span>
              <strong>7:30PM - 9:00PM</strong>
            </div>
             <div className={styles.timingItem}>
              <span className={styles.timingLabel}>Sunday Service</span>
              <strong>7:00 AM – 9:00 AM</strong>
            </div>
          </div> ):  
           <div className={styles.timingList}>
            <div className={styles.timingItem}>
              <span className={styles.timingLabel}>Friday service</span>
              <strong>10:30 AM - 12:00pm </strong>
            </div>
            <div className={styles.timingItem}>
              <span className={styles.timingLabel}>Youth meeting</span>
              <strong>9:00AM - 10:00AM</strong>
            </div>
             <div className={styles.timingItem}>
              <span className={styles.timingLabel}>Sunday Service</span>
              <strong>9:00 AM – 10:00 AM</strong>
            </div>
          </div>
          }
        </div>
      </section>
    </div>
  );
}


// src/pages/Home.jsx   
import { useState,useEffect } from "react"
import "../styles/main.css"
import img1 from "../assets/churchImage1.jpg"
import img2 from "../assets/churchImage2.jpg"
import img3 from "../assets/churchImage3.jpg"
import img4 from "../assets/churchImage4.jpg"
import { FaCalendarAlt } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp, FaFacebook, FaShareAlt, FaCopy, FaQuoteLeft,FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";     
import { getEvents, getAnnouncements } from "../services/api"     
import JesusLoader from "../components/JesusLoader" 


export default function Home() {
  const [verse, setVerse] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null)   
  const [events, setEvents] = useState([]); // Create state for events    
  const [announ,setAnnoun] = useState([])     
  const [loading, setLoading] = useState(true);  

  
  const SITE_URL = "https://church-app-flax.vercel.app/"; // 🔁 Replace with your real URL

const handleShare = (platform) => {
  if (!verse) return;

  const verseText = verse.verse_te;
  const reference = verse.reference_te;

 const shareText = 
`🙏 నేటి వాగ్దానం 🙏

"${verseText}"

📖 ${reference}

మరిన్ని వివరాలకు సందర్శించండి:
${SITE_URL}`;
  if (platform === 'whatsapp') {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      '_blank'
    );

  } else if (platform === 'facebook') {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
      '_blank'
    );

  } else if (platform === 'instagram') {
    // Instagram has no direct web share API — copy to clipboard instead
    navigator.clipboard.writeText(shareText).then(() => {
      alert("వాగ్దానం కాపీ అయింది! Instagram లో పేస్ట్ చేయండి. 📋");
    });

  } else if (platform === 'copy') {
    // General share or clipboard fallback
    if (navigator.share) {
      navigator.share({
        title: 'నేటి వాగ్దానం',
        text: shareText,
        url: SITE_URL,
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert("వాగ్దానం కాపీ అయింది! ✅");
      });
    }
  }
};    
const formatEventTime = (timeString) => {
  if (!timeString) return "";

  // If the string includes the date, let's just get the time part
  const timePart = timeString.includes(' ') ? timeString.split(' ')[1] : timeString;
  
  let [hours, minutes] = timePart.split(':');
  hours = parseInt(hours);

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  
  return `${hours}:${minutes} ${ampm}`;
};
  useEffect(() => {
    // Fetch from your live Render API
    fetch('https://telugu-bible-api.onrender.com/api/verse/today')
      .then(res => res.json())
      .then(data => setVerse(data))
      .catch(err => console.error("Error fetching verse:", err));        
      async function fetchData() {
          try{
                   // You can await here
            const response = await getEvents()
              // console.log(response.data,"this is event response")   
                setEvents(response.data[0])       
            const response1 = await getAnnouncements()    
            console.log('this is announc',response1.data)  
              setAnnoun(response1.data[0])
          }  
          catch(err){
              console.log("Error while fetching the apis",err)
          }  
          finally {
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
          <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h1>IPC Church of God</h1>
          <p>Welcome to Our Church</p>
        </div>
      </section>
      <div className="container">
        {/* NEATI VAKDHANAM (VERSE OF THE DAY) */}
        {verse && (
          <div className="card verse-card">
            <div className="verse-header">
              <FaQuoteLeft className="quote-icon" />
              <h2>నేటి వాగ్దానం</h2>
              <p className="english-sub">Verse of the Day</p>
            </div>
            <div className="verse-content">
              <p className="telugu-verse">{verse.verse_te}</p>
              <p className="verse-ref">- {verse.reference_te}</p>
            </div>
            <div className="share-section">
              <p>ఈ వాగ్దానాన్ని ఇతరులతో పంచుకోండి:</p>
              <div className="share-buttons">
                <button onClick={() => handleShare('whatsapp')} className="s-btn wa" title="Share on WhatsApp">
                  <FaWhatsapp />
                </button>
                <button onClick={() => handleShare('facebook')} className="s-btn fb" title="Share on Facebook">
                  <FaFacebook />
                </button>
                <button onClick={() => handleShare('instagram')} className="s-btn ig" title="Instagram">
                   <FaInstagram />
                </button>
                <button onClick={() => handleShare('copy')} className="s-btn cp" title="Copy & Share">
                  <FaShareAlt />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="miniContainer">
          <div className="card info-card event-card">
            <div className="card-icon">  <FaCalendarAlt /></div>
            <div>
              <p className="card-label">Upcoming Event</p>
              <h3 className="card-title">{events.title}</h3>
              <p className="card-text">{events.date} | {formatEventTime(events.time)}</p>
            </div>
          </div>

          <div className="card info-card announcement-card">
            <div className="card-icon">  <FaBullhorn /></div>
            <div>
              <p className="card-label">Latest Announcement</p>
              <h3 className="card-title">{announ.title}</h3>
              <p className="card-text">{announ.description}</p>   
               <p className="card-text">{announ.date} | {formatEventTime(announ.time)}</p>
            </div>
          </div>
        </div>

        {/* SERMON */}
        <div className="card">
          <span className="title-icon">
            <MdOutlineOndemandVideo />
          </span>
          <h2>Latest Sermon</h2>
          <iframe
            width="100%"
            height="450"
            alt='About Jesus'
            src="https://www.youtube.com/embed/jtXrtgvC2A4"
            title="Sermon"
            allowFullScreen
          />
        </div>

        {/* GALLERY PREVIEW */}
        <div className="section">
          <h2>Gallery</h2>

          <div className="grid">
            {[img1, img2, img3, img4].map((img, i) => (
              <img
                key={i}
                src={img}
                className="gallery-img"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* IMAGE MODAL */}
          {selectedImage && (
            <div className="modal" onClick={() => setSelectedImage(null)}>
              <img src={selectedImage} className="modal-img" />

            </div>
          )}
        </div>

        {/* ABOUT PREVIEW */}
        <div className="card about">
          <h2>About Us</h2>

          <p className="about-highlight">
            “You don’t have to walk alone.”
          </p>

          <p className="about-text">
            No matter what you are walking through today, you don’t have to walk it alone.
            If you find yourself in a difficult season—facing hardships in your life, health,
            or spirit—know that Jesus is standing right there with you.
          </p>

          <p className="about-text">
            Our mission is simple: to show that Jesus is the ultimate source of Good.
            Come as you are, and discover a life-changing love that never lets go.
          </p>
        </div>

        {/* CONTACT */}
        <div className="contactWrapper">
          <div className="card contact-card">
            <div className="contact-top">
              <h2>Contact</h2>
              <p className="contact-subtitle">
                Reach out to us for prayer, fellowship, and church service details.
              </p>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon-box">
                  <FaPhoneAlt className="contact-icon" />
                </div>
                <div>
                  <span className="contact-label">Phone</span>
                  <a href="tel:+919963165089" className="contact-value">
                    +91 9963165089
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <MdEmail className="contact-icon" />
                </div>
                <div>
                  <span className="contact-label">Email</span>
                  <a href="mailto:enoshburla@gmail.com" className="contact-value">
                    enoshburla@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-buttons">
              <a
                href="https://wa.me/919640212697"
                target="_blank"
                rel="noreferrer"
                className="contact-btn whatsapp"
              >
                <FaWhatsapp className="btn-icon" />
                Chat on WhatsApp
              </a>

              <a href="tel:+919640212697" className="contact-btn call">
                <FaPhoneAlt className="btn-icon" />
                Call Now
              </a>

              <a href="mailto:enoshburla@gmail.com" className="contact-btn email">
                <MdEmail className="btn-icon" />
                Send Email
              </a>
            </div>

            <div className="contact-bottom">
              <h3>We’re Here for You</h3>
              <p>
                Whether you need prayer, directions, or service timing details, feel free
                to contact us anytime. We’ll be glad to help you.
              </p>
            </div>
          </div>
          <div className="card address-card">
            <div className="address-header">
              <h2>Church Addresses</h2>
              <p className="address-subtitle">
                Visit us at either of our church locations in Eluru.
              </p>
            </div>

            <div className="address-layout">
              <div className="address-row">
                <div className="address-item">
                  <span className="address-badge">Location 1</span>
                  <h3>IPC Church of God</h3>
                  <p>
                    Jute Mill, near Kothuru, Sai Nagar,
                    Ramakrishnapuram, Eluru Rural, Andhra Pradesh 534001
                  </p>
                </div>

                <div className="map-box">
                  <iframe
                    title="IPC Church of God Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d428.5774597603935!2d81.0925068!3d16.6898128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a361493fb2d82dd%3A0x378fc87a4b83dac4!2sIPC%20CHURCH%20OF%20GOD!5e1!3m2!1sen!2sin!4v1776740131203!5m2!1sen!2sin"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="address-row">
                <div className="address-item">
                  <span className="address-badge">Location 2</span>
                  <h3>IPC Church Subrahmanyam Colony</h3>
                  <p>
                    Vangayagudem Center, Subrahmanyam Colony,
                    Ramakrishnapuram, Eluru, Andhra Pradesh 534001
                  </p>
                </div>

                <div className="map-box">
                  <iframe
                    title="IPC Church Subrahmanyam Colony Location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d462.71449431581226!2d81.0928250303541!3d16.70070092960537!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a361500682ac4b9%3A0x107e526fd31d19fb!2sIPC%20CHURCH%20SUBRAMANYAM%20COLONY!5e1!3m2!1sen!2sin!4v1776740326011!5m2!1sen!2sin"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}
    </div>
    
  )
}
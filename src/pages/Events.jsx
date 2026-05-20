import { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { getEvents } from "../services/api"
import styles from "./Events.module.css";
import JesusLoader from "../components/JesusLoader";
export default function Events() {
  const [expandedCards, setExpandedCards] = useState({});
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true); // 1. Set loading to true initially
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true); // 2. Turn loader on when tab switches or requests data
        const res = await getEvents();
        setEvents(res.data);
      } catch (err) {
        console.error("Error loading events tab:", err);
      } finally {
        setLoading(false); // 3. Turn loader off when data arrives safely!
      }
    };

    fetchEventsData();
  }, []);



  const toggleReadMore = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div style={{ position: 'relative', minHeight: '300px' }}>
      {/* 4. Overlay the loader if loading state is active */}
      {loading && <JesusLoader />}

      {/* Your regular tab layout rows and content */}
      {!loading && (
        <div className={`container ${styles.eventsPage}`}>
          <div className={styles.pageHeader}>
            <h1>Events</h1>
            <p>
              Stay connected with our upcoming church gatherings, special services,
              and fellowship events.
            </p>
          </div>

          <div className={styles.eventsGrid}>
            {events.map((event) => {
              const isExpanded = expandedCards[event.id];
              return (
                <article key={event.id} className={styles.eventCard}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className={styles.eventImage}
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <h2 className={styles.eventTitle}>{event.title}</h2>

                    <div className={styles.metaList}>
                      <div className={styles.metaItem}>
                        <FaCalendarAlt className={styles.metaIcon} />
                        <span>{event.date}</span>
                      </div>

                      <div className={styles.metaItem}>
                        <FaClock className={styles.metaIcon} />
                        <span>{event.time}</span>
                      </div>

                      <div className={styles.metaItem}>
                        <FaMapMarkerAlt className={styles.metaIcon} />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p
                      className={`${styles.description} ${isExpanded ? styles.expanded : styles.clamped
                        }`}
                    >
                      {event.description}
                    </p>

                    <button
                      type="button"
                      className={styles.readMoreBtn}
                      onClick={() => toggleReadMore(event.id)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>

  );
}
import styles from "./Contact.module.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const subject = e.target.subject.value.trim();
    const message = e.target.message.value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const whatsappMessage =
      `Name: ${name}%0A` +
      `Email: ${email}%0A` +
      `Subject: ${subject}%0A` +
      `Message: ${message}`;

    const whatsappUrl = `https://wa.me/919640212697?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");

    e.target.reset();
  };

  return (
    <div className={`container ${styles.contactPage}`}>
      <div className={styles.contactGrid}>
        <div className={styles.leftSection}>
          <div className={styles.mapCard}>
            <iframe
              title="IPC Church of God Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d428.5774597603935!2d81.0925068!3d16.6898128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a361493fb2d82dd%3A0x378fc87a4b83dac4!2sIPC%20CHURCH%20OF%20GOD!5e1!3m2!1sen!2sin!4v1776740131203!5m2!1sen!2sin"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <FaMapMarkerAlt className={styles.icon} />
              <h3>Eluru</h3>
              <p>
                Jute Mill, near Kothuru, Sai Nagar,
                Ramakrishnapuram, Eluru Rural, Andhra Pradesh 534001
              </p>
            </div>

            <div className={styles.infoCard}>
              <FaMapMarkerAlt className={styles.iconGreen} />
              <h3>Subrahmanyam Colony</h3>
              <p>
                Vangayagudem Center, Subrahmanyam Colony,
                Ramakrishnapuram, Eluru, Andhra Pradesh 534001
              </p>
            </div>

            <div className={styles.infoCard}>
              <FaPhoneAlt className={styles.iconBlue} />
              <h3>Call Us</h3>
              <p>+91 9963165089</p>
            </div>

            <div className={styles.infoCard}>
              <FaEnvelope className={styles.iconPink} />
              <h3>Email Us</h3>
              <p>enoshburla@gmail.com</p>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <h2>Send us a Message</h2>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <input name="name" type="text" placeholder="Your Name" />
              <input name="email" type="email" placeholder="Email Address" />
            </div>

            <input name="subject" type="text" placeholder="Subject" />

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
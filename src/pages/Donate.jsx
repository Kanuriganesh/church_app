import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; // Import Toast   
import Confetti from 'react-confetti-boom';
import "../styles/main.css"
import { paymentOrder, paymentVerify } from "../services/api"

const Donate = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const { name, email, phone, amount } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    // --- UX: Validation with Toasts ---
    if (phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (amount < 10) {
      toast.error("Minimum donation is ₹10");
      return;
    }

    setLoading(true);
    const loadToast = toast.loading("Preparing secure payment...");
    const res = await loadScript(import.meta.env.VITE_RAZORPAY_SDK_URL);
    if (!res) {
      toast.error("Razorpay failed to load. Check your internet.", { id: loadToast });
      setLoading(false);
      return;
    }
    try {
      const response = await paymentOrder({ amount: Number(amount) });
      // 2. FIXED: Axios handles parsing automatically, read from .data
      const order = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "IPC Church of God",
        description: "Church Mission Donation",
        order_id: order.id,
        handler: async function (response) {
          // 1. Show the "Processing" state
          toast.loading("Saving donation details...", { id: loadToast });

          try {
            // 2. FIXED: Pass a clean, flat object to your Axios paymentVerify function
            const verifyRes = await paymentVerify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              amount: order.amount / 100, // Pass the clean rupee amount (derived securely from order payload)
            });

            // 3. FIXED: Axios automatically parses JSON, grab data from .data
            const result = verifyRes.data;

            if (result.success) {
              // 4. Show success notifications and drop confetti
              toast.success(`God bless you, ${formData.name}! Donation recorded.`, { id: loadToast });
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);

              // 5. Clear the form
              setFormData({ name: '', email: '', phone: '', amount: '' });
            } else {
              toast.error("Payment verified but failed to save. Please contact us.", { id: loadToast });
            }
          } catch (error) {
            console.error("Verification Error:", error.response?.data || error.message);
            toast.error("Network error. Please check your connection.", { id: loadToast });
          } finally {
            setLoading(false);
          }
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#d4af37" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.dismiss(loadToast);
          }
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
      toast.dismiss(loadToast);
    } catch (error) {
      toast.error("Server connection failed.", { id: loadToast, error: error });
      setLoading(false);
    }
  };

  return (
    <div className="donate-container">
      {/* The Toaster component must be present to show notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* Confetti will render on top of everything when active */}
      {
        showConfetti &&
        <div className="confetti-wrapper">
          <Confetti
            mode="fall"           // Changes from explosion to raining effect
            particleCount={1000}
            x={0.5}
            y={0.3}
            deg={270}                // Starts exactly at the top edge
            shapeSize={10}
          />
        </div>
      }
      <div className="donate-glass-card">
        <div className='subDonate'>
          <div className="donate-header">
            <h1>Support Our Mission</h1>
            <p>Your contribution helps us serve the community better.</p>
          </div>
          <form className="compact-form" onSubmit={handlePayment}>
            <div className="form-grid">
              <div className="input-box">
                <label>Full Name</label>
                <input type="text" name="name" value={name} onChange={onChange} placeholder="Enosh" required />
              </div>
              <div className="input-box">
                <label>Email Address</label>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="enoshburla@gmail.com" required />
              </div>
              <div className="input-box">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={phone} onChange={onChange} placeholder="9640212697" required maxLength="10" />
              </div>
              <div className="input-box">
                <label>Amount (₹)</label>
                <input type="number" name="amount" value={amount} onChange={onChange} placeholder="500" required min="10" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="pay-btn">
              {loading ? "Processing..." : `Donate ₹${amount || '0'}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Donate;
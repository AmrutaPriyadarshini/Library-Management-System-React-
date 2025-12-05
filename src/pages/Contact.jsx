import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send the form data to backend API here
    console.log("Form submitted:", formData);
    alert("Message sent!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-warning text-dark text-center py-4">
        <div className="container">
          <h3 className="mb-1">Contact Us</h3>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-7">
              <h3>Get in Touch</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success px-4">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="col-lg-5">
              <h3>Contact Information</h3>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <strong>Address:</strong> Bhubaneswar, Odisha
                </li>
                <li className="mb-3">
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+918356784038">+91 8356784038</a>
                </li>
                <li className="mb-3">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:xyz@gmail.com">xyz@gmail.com</a>
                </li>
              </ul>

              {/* Google Map */}
              <div className="ratio ratio-4x3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.469309820717!2d85.8129201150681!3d20.2959847133167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33fa8!2sBhubaneswar!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Bhubaneswar Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

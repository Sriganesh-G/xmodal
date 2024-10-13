import React, { useState } from "react";
import "./ModalComponent.css";
const ModalComponent = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email.includes("@"))
      newErrors.email = "Invalid email. Please check your email address.";
    if (formData.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    if (new Date(formData.dob) > new Date())
      newErrors.dob = "Date of birth cannot be in the future.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Form submitted successfully!");
      closeModal(false);
      setFormData({ username: "", email: "", phone: "", dob: "" });
      setErrors({});
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="modalContainer">
      <h3>Fill Details</h3>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <br />

        <label>Email Address:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <br />

        <label>Phone Number:</label>
        <br />
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <br />

        <label>Date of Birth:</label>
        <br />
        <input
          type="date"
          name="dob"
          id="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        {errors.dob && <p className="error">{errors.dob}</p>}
        <br />

        <button
          className="submit-button"
          style={{
            backgroundColor: "#009dff",
            color: "white",
            maxWidth: "5rem",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ModalComponent;

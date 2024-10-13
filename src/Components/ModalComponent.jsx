import React, { useState } from "react";
import "./ModalComponent.css";

const ModalComponent = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePhoneNumber() && validateDate()) {
      alert("Form submitted successfully!");
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhoneNumber = () => {
    if (formData.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false;
    }
    return true;
  };

  const validateDate = () => {
    const selectedDate = new Date(formData.dob);
    const today = new Date();
    if (selectedDate >= today) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return false;
    }
    return true;
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
        <br />

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ModalComponent;

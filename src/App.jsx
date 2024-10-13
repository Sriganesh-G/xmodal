import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const clickHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeHandler);
    } else {
      document.removeEventListener("mousedown", closeHandler);
    }

    return () => {
      document.removeEventListener("mousedown", closeHandler);
    };
  }, [isOpen]);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const phoneNo = e.target.phone.value;
    const dob = new Date(e.target.dob.value);

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
    } else if (phoneNo.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (dob > new Date()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      // Reset form and close modal
      e.target.reset();
      setIsOpen(false);
    }
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={clickHandler}>Open Form</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <form onSubmit={submitHandler}>
              <h2>Fill Details</h2>
              <div className="input-group">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" required />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" name="email" id="email" required />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" name="phone" id="phone" required />
              </div>
              <div className="input-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" name="dob" id="dob" required />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

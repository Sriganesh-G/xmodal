import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const clickHandler = () => {
    setIsOpen(true);
  };

  // Close the modal if clicked outside the modal content
  const closeHandler = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener when modal opens to detect outside clicks
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeHandler);
    } else {
      document.removeEventListener("mousedown", closeHandler);
    }

    // Cleanup the event listener when modal closes or component unmounts
    return () => {
      document.removeEventListener("mousedown", closeHandler);
    };
  }, [isOpen]);

  // Handle form submission and validation
  const submitHandler = (e) => {
    e.preventDefault();
    const phone = e.target.phoneNo.value;
    const dob = new Date(e.target.dob.value);

    if (phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (dob.getTime() > Date.now()) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
    } else {
      e.target.username.value = "";
      e.target.email.value = "";
      e.target.phoneNo.value = "";
      e.target.dob.value = "";
      setIsOpen(false); // Close the modal after successful submission
    }
  };

  return (
    <div className="App">
      <div>
        <h1>User Details Modal</h1>
        <button onClick={clickHandler}>Open Form</button>
        {isOpen && (
          <div className="modal">
            <div className="modal-content" ref={modalRef} style={{}}>
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
                  <label htmlFor="phoneNo">Phone Number:</label>
                  <input type="number" name="phoneNo" id="phone" required />
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
    </div>
  );
}

export default App;

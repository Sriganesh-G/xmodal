import { useRef, useState, useEffect } from "react";
import "./App.css";
import ModalComponent from "./Components/ModalComponent";

function App() {
  const [data, setData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    dateofbirth: "",
  });
  const dataRef = useRef(null); // Ref for the modal content
  const [vali, setVali] = useState(false); // State to manage modal open/close

  // Handle form data
  function handleData(e) {
    const { name, value } = e.target;
    setData((d) => ({
      ...d,
      [name]: value,
    }));
  }

  // Handle clicking outside the modal to close it
  const handleClickOutside = (event) => {
    if (dataRef.current && !dataRef.current.contains(event.target)) {
      setVali(false); // Close modal if outside is clicked
    }
  };

  // UseEffect to add/remove event listener on modal open/close
  useEffect(() => {
    if (vali) {
      // Add event listener when modal is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [vali]);

  // Validate phone number (ensure 10 digits)
  function ValidateNumber() {
    if (data.phonenumber.length !== 10) {
      alert("Invalid Phone Number. Please Enter a 10-digit Phone Number.");
      return false;
    }
    return true;
  }

  // Validate date of birth (ensure it's not a future date)
  function ValidateDate() {
    const selecteddate = new Date(data.dateofbirth);
    const today = new Date();
    selecteddate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (selecteddate >= today) {
      alert("Invalid Date of Birth. Date of Birth cannot be in Future.");
      return false;
    }
    return true;
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (ValidateNumber() && ValidateDate()) {
      setVali(false); // Close the modal on successful submission
    }
  }

  return (
    <div>
      {/* Display the button to open modal */}
      {!vali && (
        <div>
          <h1>User Details Modal</h1>
          <button onClick={() => setVali(true)}>Open Form</button>
        </div>
      )}

      {/* Modal section */}
      {vali && (
        <div className="modal">
          {/* Pass ref to the modal content for outside click detection */}
          <div className="modal-content" ref={dataRef}>
            {/* Modal form */}
            <form className="form" onSubmit={handleSubmit}>
              <h2>Fill Details</h2>
              <label>Username:</label>
              <input
                type="text"
                id="username"
                value={data.username}
                onChange={handleData}
                name="username"
                required
              />
              <label>Email Address:</label>
              <input
                type="email"
                id="email"
                value={data.email}
                name="email"
                onChange={handleData}
                required
              />
              <label>Phone number:</label>
              <input
                type="number"
                id="phone"
                value={data.phonenumber}
                name="phonenumber"
                onChange={handleData}
                required
              />
              <label>Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={data.dateofbirth}
                name="dateofbirth"
                onChange={handleData}
                required
              />
              <button className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

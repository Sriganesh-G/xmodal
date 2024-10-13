import { useRef, useState } from "react";
import "./App.css";
import ModalComponent from "./Components/ModalComponent";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.className === "modal") {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="mainContainer">
      <h1>User Details Modal</h1>
      <button
        style={{ backgroundColor: "#0073ff", color: "white" }}
        onClick={openModal}
      >
        Open Form
      </button>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <ModalComponent closeModal={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

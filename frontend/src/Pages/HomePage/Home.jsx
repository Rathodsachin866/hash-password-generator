import React, { useState } from "react";
import "./home.css"; // Import the CSS file

export default function Home() {
  const [tab, setTab] = useState("generate");
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [decodedPassword, setDecodedPassword] = useState("");
  const [hashToDecode, setHashToDecode] = useState("");

  const generateHash = (password) => btoa(password);

  const handleGenerateHash = () => {
    const generatedHash = generateHash(password);
    setHash(generatedHash);
  };

  const handleAddPassword = () => {
    if (fieldName && hash) {
      setPasswords([...passwords, { fieldName, hash }]);
      setFieldName("");
      setHash("");
    }
  };

  const handleDeletePassword = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this field?"
    );
    if (confirmDelete) {
      const newPasswords = passwords.filter((_, i) => i !== index);
      setPasswords(newPasswords);
    }
  };

  const handleDecodeHash = () => {
    const decoded = atob(hashToDecode);
    setDecodedPassword(decoded);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <button onClick={() => setTab("generate")}>Generate Password</button>
        <button onClick={() => setTab("myPasswords")}>My Passwords</button>
        <button onClick={() => setTab("decode")}>Decode Passwords</button>
        <button onClick={() => setTab("assistance")}>Assistance</button>
        <button onClick={() => setTab("about")}>About</button>
      </nav>

      <div className="content">
        {tab === "generate" && (
          <div className="generate-section">
            <h2>Generate Password</h2>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
            <button onClick={handleGenerateHash}>Generate Hash</button>
            <textarea value={hash} readOnly placeholder="Generated Hash Code" />
          </div>
        )}

        {tab === "myPasswords" && (
          <div className="my-passwords-section">
            <h2>My Passwords</h2>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              placeholder="Enter Field Name"
            />
            <textarea value={hash} readOnly placeholder="Hash Code" />
            <button onClick={handleAddPassword}>Add Password</button>
            <h3>Stored Passwords:</h3>
            <ul>
              {passwords.map((p, index) => (
                <li key={index}>
                  {p.fieldName}: {p.hash}
                  <button onClick={() => handleDeletePassword(index)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "decode" && (
          <div className="decode-section">
            <h2>Decode Password</h2>
            <input
              type="text"
              value={hashToDecode}
              onChange={(e) => setHashToDecode(e.target.value)}
              placeholder="Enter Hash Code"
            />
            <button onClick={handleDecodeHash}>Decode</button>
            {decodedPassword && <p>Decoded Password: {decodedPassword}</p>}
          </div>
        )}

        {tab === "assistance" && (
          <div className="assistance-section">
            <h2>Assistance</h2>
            <p>How can I help you today?</p>
          </div>
        )}

        {tab === "about" && (
          <div className="about-section">
            <h2>About</h2>
            <p>This is a simple password manager application.</p>
          </div>
        )}
      </div>
    </div>
  );
}

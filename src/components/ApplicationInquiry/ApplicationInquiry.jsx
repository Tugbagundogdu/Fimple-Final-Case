// ApplicationInquiry.js
import { useState } from "react";

const ApplicationInquiry = () => {
  const [inputCode, setInputCode] = useState(""); // Kullanıcının girdiği kod




  const handleFormSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div>
      <h2>Application Inquiry</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit">Inquire Application</button>
      </form>
    </div>
  );
};

export default ApplicationInquiry;

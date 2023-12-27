// ApplicationInquiry.js
import { useState } from "react";

const ApplicationInquiry = () => {
  const [inputCode, setInputCode] = useState(""); // Kullanıcının girdiği kod


  return (
    <div>
      <h2>Application Inquiry</h2>
      <form>
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

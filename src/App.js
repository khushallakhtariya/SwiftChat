import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Contacts from "./components/Contacts";
import History from "./components/History";
import MainForm from "./components/MainForm";

function App() {
  const [contactHistory, setContactHistory] = useState([]);
  const [yourContacts, setYourContacts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("history")) {
      setContactHistory(JSON.parse(localStorage.getItem("history")));
    }
    if (localStorage.getItem("savedContacts")) {
      setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              WhatsApp Direct Messenger
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chat with anyone on WhatsApp without saving their contact first.
              Simply enter their number, start chatting, and optionally save
              contacts for future use.
            </p>
          </div>

          <MainForm
            setContactHistory={setContactHistory}
            setYourContacts={setYourContacts}
          />

          <div className="flex flex-col md:flex-row gap-6">
            <History
              contactHistory={contactHistory}
              setContactHistory={setContactHistory}
            />
            <Contacts
              yourContacts={yourContacts}
              setYourContacts={setYourContacts}
              setContactHistory={setContactHistory}
            />
          </div>

          <footer className="mt-12 text-center text-gray-500 text-sm py-4">
            <p>WhatsApp Direct Messenger • Chat without saving contacts</p>
            <p className="mt-1">
              Made with <span className="text-red-500">♥</span> for easier
              messaging
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;

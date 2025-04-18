import React, { useState } from "react";
import swal from "sweetalert";
import { saveHistory } from "../utils/contactUtils";

const Contacts = ({ yourContacts, setYourContacts, setContactHistory }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter contacts based on search term
  const filteredContacts = yourContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.number.includes(searchTerm)
  );

  const deleteContact = (event) => {
    let contactName = event.currentTarget.value;
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this contact?",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        let allContacts = localStorage.getItem("savedContacts");
        allContacts = JSON.parse(allContacts);

        let remainingContacts = allContacts.filter((contact) => {
          return contact.name !== contactName;
        });

        localStorage.setItem(
          "savedContacts",
          JSON.stringify(remainingContacts)
        );

        setYourContacts(JSON.parse(localStorage.getItem("savedContacts")));

        swal({
          title: "Deleted Successfully!",
          icon: "success",
        });
      } else {
        swal({
          title: "Contact Not deleted.",
        });
      }
    });
  };

  const deleteAllContacts = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete all the contacts?",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.setItem("savedContacts", "[]");
        setYourContacts([]);
        swal("Deleted!", "Deleted all Contacts.", "success");
      } else {
        swal({
          title: "Contacts are safe!",
        });
      }
    });
  };

  function now() {
    const now = new Date();
    const formattedString = `Contacted on: ${now.toUTCString()}`;
    return formattedString;
  }

  function handleCopyToClipboard(value) {
    // Extract only the phone number without country code (after the first 2 digits)
    const phoneNumberWithoutCountryCode = value.slice(2);

    navigator?.clipboard
      .writeText(phoneNumberWithoutCountryCode)
      .then((val) => swal("Copied!", phoneNumberWithoutCountryCode, "success"))
      .catch((err) => swal("Oops!", "something went wrong", "error"));
  }

  return (
    <div className="w-full md:w-1/2 p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold text-gray-800 flex items-center">
          <i className="bi bi-person-lines-fill mr-2 text-green-600"></i>
          My Contacts
        </span>
        {yourContacts.length > 0 && (
          <button
            onClick={deleteAllContacts}
            className="p-2 border border-red-300 rounded-lg hover:bg-red-50 transition duration-300 flex items-center text-red-500 hover:text-red-600"
            title="Delete All Contacts"
          >
            <i className="bi bi-trash3"></i>
          </button>
        )}
      </div>

      {yourContacts.length > 0 && (
        <div className="mb-4 relative">
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="Search contacts by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition duration-300"
            />
            <i className="bi bi-search absolute left-3 text-gray-500"></i>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
                title="Clear search"
              >
                <i className="bi bi-x-circle"></i>
              </button>
            )}
          </div>
        </div>
      )}

      {yourContacts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <i className="bi bi-person-plus text-4xl mb-2 block"></i>
          <p>No saved contacts yet</p>
          <p className="text-sm mt-1">Add contacts using the form above</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <i className="bi bi-search text-4xl mb-2 block"></i>
          <p>No matching contacts found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      ) : (
        <div
          className={`grid gap-3 ${
            filteredContacts.length >= 3
              ? "max-h-[400px] overflow-y-auto pr-1"
              : ""
          }`}
        >
          {filteredContacts
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((element, index) => {
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg w-full p-3 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                >
                  <div className="flex justify-between items-center bg-gray-50 p-2.5 font-medium rounded-lg mb-2">
                    <p className="text-gray-800 flex items-center">
                      <i className="bi bi-person-circle mr-2 text-green-500"></i>
                      <span className="font-semibold">{element.name}</span>
                    </p>
                    <button
                      onClick={deleteContact}
                      value={element.name}
                      className="p-1.5 text-red-500 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition duration-300"
                      title="Delete Contact"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                  <div className="p-2">
                    <div className="flex justify-between items-center">
                      <h5 className="text-gray-700 flex items-center">
                        <i className="bi bi-telephone mr-2 text-gray-500"></i>
                        {element.number.slice(0, 2)}-
                        {element.number.slice(2, 12)}
                      </h5>
                      <button
                        onClick={() => handleCopyToClipboard(element?.number)}
                        className="p-1.5 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
                        title="Copy Number"
                      >
                        <i className="bi bi-clipboard"></i>
                      </button>
                    </div>
                  </div>
                  <a
                    onClick={(e) => {
                      saveHistory(element.number, now());
                      setContactHistory(
                        JSON.parse(localStorage.getItem("history"))
                      );
                    }}
                    target="_blank"
                    rel="noreferrer"
                    href={`http://wa.me/${element.number}`}
                    className="flex items-center justify-center py-2.5 mt-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    <i className="bi bi-whatsapp mr-2 text-lg"></i>
                    Chat on WhatsApp
                  </a>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Contacts;

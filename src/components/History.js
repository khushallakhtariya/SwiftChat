import React, { useState } from "react";
import swal from "sweetalert";

const History = ({ contactHistory, setContactHistory }) => {
  const [showAllHistory, setShowAllHistory] = useState(false);
  let limitedContactHistory = contactHistory;
  let loadMoreButton = null;

  const clearHistory = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete the history?",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Yes"],
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.setItem("history", "[]");
        setContactHistory([]);
        swal("Deleted!", "Deleted Contact History!", "success");
      } else {
        swal({
          title: "History is safe!",
        });
      }
    });
  };

  const clearIndividualChatHistory = (individual) => {
    let modifiedHistory = contactHistory.filter((history) => {
      return history.timedate !== individual.timedate;
    });
    localStorage.setItem("history", JSON.stringify(modifiedHistory));
    setContactHistory(JSON.parse(localStorage.getItem("history")));
  };

  if (!showAllHistory) {
    limitedContactHistory = contactHistory.slice(0, 5);

    if (contactHistory.length > 5) {
      loadMoreButton = (
        <button
          onClick={() => {
            setShowAllHistory(true);
          }}
          className="w-full my-3 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Load More History
        </button>
      );
    }
  }

  return (
    <div className="w-full md:w-1/2 p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-xl text-gray-800 flex items-center">
          <i className="bi bi-clock-history mr-2 text-green-600"></i>
          Recent History
        </span>
        {contactHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="p-2 border border-red-300 rounded-lg hover:bg-red-50 transition duration-300 flex items-center text-red-500 hover:text-red-600"
            title="Clear All History"
          >
            <i className="bi bi-trash3"></i>
          </button>
        )}
      </div>

      {contactHistory.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <i className="bi bi-inbox text-4xl mb-2 block"></i>
          <p>No chat history yet</p>
        </div>
      ) : (
        <div
          className={`space-y-3 ${
            contactHistory.length > 5
              ? "max-h-[400px] overflow-y-auto pr-1"
              : ""
          }`}
        >
          {contactHistory.map((element, index) => {
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg w-full p-3 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow"
              >
                <div className="flex justify-between items-center">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`http://wa.me/${element.number}`}
                    className="inline-flex items-center group w-3/4 py-1 text-green-600 hover:text-green-800 transition duration-300 font-medium"
                  >
                    <i className="bi bi-whatsapp text-lg mr-2"></i>
                    <span className="truncate group-hover:underline">
                      {element.name ? element.name : element.number}
                    </span>
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearIndividualChatHistory(element);
                    }}
                    value={element}
                    className="flex items-center justify-center w-8 h-8 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition duration-300"
                    title="Remove from history"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
                <time className="text-xs text-gray-500 block mt-1">
                  <i className="bi bi-calendar-event mr-1"></i>
                  {element.timedate}
                </time>
              </div>
            );
          })}
          {loadMoreButton}
        </div>
      )}
    </div>
  );
};

export default History;

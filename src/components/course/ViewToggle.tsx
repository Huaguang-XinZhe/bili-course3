import React from "react";

interface ViewToggleProps {
  listView: boolean;
  onToggle: () => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ listView, onToggle }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-xs text-neutral-500">视图：</span>
      <div className="flex border border-neutral-300 rounded-md overflow-hidden">
        <button
          className={`px-2 py-1 ${
            !listView ? "bg-teal-500 text-white" : "bg-white text-neutral-500"
          }`}
          onClick={() => !listView || onToggle()}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className={`px-2 py-1 ${
            listView ? "bg-teal-500 text-white" : "bg-white text-neutral-500"
          }`}
          onClick={() => listView || onToggle()}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM3 14H10V21H3V14ZM14 14H21V21H14V14Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;

import React, { useState } from 'react';

const Modal = ({ closeModal, children }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative h-2/3 overflow-y-scroll bg-white rounded-lg p-8 max-w-3xl w-full no-scrollbar">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {React.Children.map(children, (child) => 
            React.cloneElement(child, { onClick: () => openImage(child.props.image) })
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative bg-white rounded-lg p-8 max-w-lg w-full">
            <button
              onClick={closeImage}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              className="w-full h-auto object-cover rounded mb-4"
              src={`http://localhost:8000${selectedImage.url}`}
              alt="Selected"
            />
            <div>
              <p><strong>Sub Prompt:</strong> {selectedImage.sub_prompt_text}</p>
              <p><strong>Number of Images:</strong> {selectedImage.num_images}</p>
              <p><strong>Created At:</strong> {new Date(selectedImage.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

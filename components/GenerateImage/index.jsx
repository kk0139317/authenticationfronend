// components/GenerateImages.jsx
import React, { useState, useEffect } from 'react';
import useAuthRedirect from '@/utils/useAuthRedirect';
import { useAuth } from '@/utils/auth';
import LoadingSpinner from 'react-loading'; // Example: import a loading spinner component

const GenerateImages = ({ prompt }) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [imageGroups, setImageGroups] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const { token } = useAuthRedirect();
  const { username, logout } = useAuth();

  useEffect(() => {
    if (prompt) {
      setInputPrompt(prompt.prompt);
      fetchImages(prompt.id);
    }
  }, [prompt]);

  const fetchImages = async (promptId) => {
    try {
      setLoading(true); // Set loading state to true while fetching
      const response = await fetch(`http://localhost:8000/api/fetch-images/?prompt=${promptId}`);
      if (!response.ok) {
        console.error('Failed to fetch images');
        return;
      }
      const data = await response.json();
      groupImagesBySubPrompt(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  const groupImagesBySubPrompt = (images) => {
    // Group images by sub_prompt_id
    const groupedImages = images.reduce((groups, image) => {
      const key = image.sub_prompt_id;
      if (!groups[key]) {
        groups[key] = {
          sub_prompt_id: image.sub_prompt_id,
          sub_prompt_text: image.sub_prompt_text,
          created_at: image.created_at,
          images: [],
        };
      }
      groups[key].images.push({
        id: image.id,
        url: image.url,
      });
      return groups;
    }, {});

    // Convert object to array of groups
    const groupsArray = Object.values(groupedImages);
    setImageGroups(groupsArray);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading state to true while generating

    // Call the Django backend API to generate images
    try {
      const response = await fetch('http://localhost:8000/api/generate-images/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputPrompt, numImages, username }), // Include username in the request
      });

      if (!response.ok) {
        console.error('Failed to generate images');
        return;
      }

      const data = await response.json();
      groupImagesBySubPrompt(data.images);
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false); // Set loading state to false after generating
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-0 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          {/* Display loading spinner or skeleton UI */}
          <div role="status" className="max-w-sm p-4 border mx-4 border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
            {/* Example loading spinner */}
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4">
              <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <section className="w-full max-w-6xl mb-16 h-2/3 overflow-y-scroll absolute p-8">
          {/* Render image groups */}
          {imageGroups.map((group) => (
            <div key={group.sub_prompt_id} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{group.sub_prompt_text}</h2>
              <p className="text-gray-500 mb-2">Created at: {new Date(group.created_at).toLocaleString()}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {group.images.map((image, index) => (
                  <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                    <img className="w-full h-40 object-cover" src={`http://localhost:8000${image.url}`} alt={`Generated from prompt: ${group.sub_prompt_text}`} />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      {/* Optional overlay */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
      {/* Form for generating new images */}
      <section className="flex flex-col items-center w-full mb-0 animate-fade-in fixed bottom-0 p-4">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-2/3">
          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="sm:col-span-2">
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Enter your prompt..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div>
              <input
                type="number"
                value={numImages}
                onChange={(e) => setNumImages(e.target.value)}
                placeholder="Num Images"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                min="1"
                max="10"
                required
              />
            </div>
            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Generate Images
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default GenerateImages;

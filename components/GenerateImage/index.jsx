// components/GenerateImages.jsx
'use client'
import React, { useState, useEffect } from 'react';
import useAuthRedirect from '@/utils/useAuthRedirect';
import { useAuth } from '@/utils/auth';
import LoadingSpinner from 'react-loading'; // Example: import a loading spinner component

const GenerateImages = ({ prompt }) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [images, setImages] = useState([]);
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
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
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
      setImages(data.images);
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false); // Set loading state to false after generating
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in-down">Image Generator</h1>
        <p className="text-lg text-gray-700 animate-fade-in-up">Unleash your creativity with AI-powered image generation. Provide a prompt, and let the AI generate stunning images for you.</p>
      </header>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner type="spin" color="#4F46E5" height={80} width={80} /> {/* Example: Loading spinner */}
        </div>
      ) : (
        <section className="w-full max-w-6xl mb-16 h-2/3 overflow-y-scroll absolute p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up">
            {images.map((image, index) => (
              <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                <img className="w-full h-40 object-cover" src={`http://localhost:8000${image.url}`} alt={`Generated from prompt: ${image.prompt}`} />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  {/* <p className="text-white text-lg font-bold text-center px-4">{image.prompt}</p> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="flex flex-col items-center w-full mb-0 animate-fade-in fixed bottom-0 p-4">
        <div className="bg-white rounded-lg shadow-2xl p-6 w-2/3">
          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <input
                type="text"
                id="inputPrompt"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                disabled={loading} // Disable input while loading
                required
                className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                placeholder="Enter your prompt here...  e.g. 'a cute cat'"
              />
            </div>
            <div>
              <input
                type="number"
                id="numImages"
                value={numImages}
                onChange={(e) => setNumImages(e.target.value)}
                min="1"
                placeholder="No of Images"
                max="100"
                required
                className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                disabled={loading} // Disable input while loading
              />
            </div>
            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default GenerateImages;

import React, { useState, useEffect } from 'react';
import useAuthRedirect from '@/utils/useAuthRedirect';
import { useAuth } from '@/utils/auth';
import Modal from '../Model';

const GenerateImages = ({ prompt }) => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [imageGroups, setImageGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthRedirect();
  const { username, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer visibility

  useEffect(() => {
    if (prompt) {
      setInputPrompt(prompt.prompt);
      fetchImages(prompt.id);
    }
  }, [prompt]);

  const fetchImages = async (promptId) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const groupImagesBySubPrompt = (images) => {
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

    const groupsArray = Object.values(groupedImages);
    setImageGroups(groupsArray);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/generate-images/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputPrompt, numImages, username }),
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
      setLoading(false);
    }
  };

  const openModal = (images) => {
    setCurrentImages(images);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImages([]);
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      {/* Sidebar Section */}
      <aside
  id="logo-sidebar"
  className="fixed top-0 left-0 z-40 min-w-64 max-w-96 w-1/4 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 shadow-lg"
  aria-label="Sidebar"
>
<div className="h-full px-4 py-4 overflow-y-auto bg-white">
        <form onSubmit={handleGenerate} className="space-y-4">
          <textarea
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full p-2 border min-h-40 border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input
            type="number"
            value={numImages}
            onChange={(e) => setNumImages(e.target.value)}
            placeholder="Number of Images"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            min="1"
            max="10"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Generate Images
          </button>
        </form>
      </div>
      </aside>

      {/* Main Content Section */}
      <main className="flex-1 py-4 px-0 sm:px-6 lg:px-8">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div role="status" className="max-w-sm p-4 border mx-4 border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
              {/* Loading indicator */}
            </div>
          </div>
        ) : (
          <section className="w-full max-w-6xl mb-16 h-auto py-8 sm:px-0">
            {imageGroups.map((group) => (
              <div key={group.sub_prompt_id} className="mb-8 mx-4 sm:ml-[8vw] shadow-lg p-4 sm:p-10 border rounded-2xl">
                <div className="cursor-pointer" onClick={() => openModal(group.images)}>
                  <div className="text-2xl font-bold mb-4">{group.sub_prompt_text}</div>
                  <p className="text-gray-500 mb-2">
                    Created at: {new Date(group.created_at).toLocaleString()}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {group.images.slice(0, 4).map((image, index) => (
                      <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <img className="w-full min-w-48 h-40 object-cover" src={`http://localhost:8000${image.url}`} alt={`Generated from prompt: ${group.sub_prompt_text}`} />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                          {/* Overlay content */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {modalOpen && (
          <Modal closeModal={closeModal}>
  {currentImages.map((image) => (
    <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105" image={image}>
      <img className="w-full h-40 object-cover" src={`http://localhost:8000${image.url}`} alt="Generated Image" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
      </div>
    </div>
  ))}
</Modal>

        )}
      </main>

      {/* Toggle Button for Drawer (Mobile) */}
      <button
  className="fixed w-full right-0 bottom-0 sm:hidden bg-gray-500 bg-opacity-50 text-white p-4 rounded-tl-lg focus:outline-none"
  onClick={() => setDrawerOpen(prevState => !prevState)} // Toggle drawerOpen state
>
  {/* Arrow icon based on drawer state */}
  {drawerOpen ? (
    <svg className="w-6 h-6 transform rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  ) : (
    <svg className="w-6 mx-auto h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
    </svg>
  )}
</button>

      {/* Bottom Drawer Section (Mobile) */}
      
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-md sm:hidden transform transition duration-300 ${drawerOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <button
  className="sm:hidden bg-gray-500 w-full bg-opacity-50 text-white p-4 rounded-tl-lg focus:outline-none"
  onClick={() => setDrawerOpen(prevState => !prevState)} // Toggle drawerOpen state
>
  {/* Arrow icon based on drawer state */}
  {drawerOpen ? (
    <svg className="w-6 h-6 mx-auto  transform " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  ) : (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
    </svg>
  )}
</button>
        <div className="py-4 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <textarea
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="w-full p-2 border min-h-40 border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <input
            type="number"
            value={numImages}
            onChange={(e) => setNumImages(e.target.value)}
            placeholder="Number of Images"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            min="1"
            max="10"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Generate Images
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default GenerateImages;

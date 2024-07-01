// components/Drawer.js
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/auth';
import axios from 'axios';

const Drawer = ({ selectedPrompt, setSelectedPrompt, handleSubPromptSelect }) => {
  const { username } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/prompts/${username}`);
        setPrompts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching prompts:', error);
      }
    };

    fetchPrompts();
  }, [username]);

  return (
    <>
      <button 
        className="fixed top-4 right-4 z-50 bg-blue-500 text-white p-2 rounded"
        onClick={toggleDrawer}
      >
        {isOpen ? 'Close Drawer' : 'Open Drawer'}
      </button>
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg p-4 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-40 w-80`}>
        <div className="h-full overflow-y-auto">
          <ul className="space-y-4">
            <a href="#">
              <li className="flex justify-center items-center py-2 text-gray-600 text-xs uppercase font-semibold mb-2 hover:bg-gray-100 transition-colors duration-300">
                New Prompts
              </li>
            </a>
            {prompts.map((prompt, index) => (
              <li
                key={prompt.id}
                className={`group flex flex-col items-start px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300 ${
                  index === 0 ? 'border-t border-gray-200' : ''
                }`}
              >
                <button
                  onClick={() => setSelectedPrompt(prompt)}
                  className="flex items-center space-x-3 w-full text-base font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </div>
                  <span className="truncate text-sm">{prompt.unique_id}</span>
                </button>
                <div className="flex w-full mt-1">
                  <small className="text-xs font-light text-gray-500">
                    {new Date(prompt.created_at).toLocaleString([], {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </small>
                </div>
                <select
                  className="mt-2 w-full border rounded-md py-1 px-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => handleSubPromptSelect(parseInt(e.target.value))}
                >
                  <option value="">Select a subprompt</option>
                  {prompt.sub_prompts.map((subPrompt) => (
                    <option key={subPrompt.id} value={subPrompt.id}>
                      {subPrompt.prompt_text}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;

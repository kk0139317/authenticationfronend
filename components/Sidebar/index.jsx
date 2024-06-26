'use client'
import React, { useState, useEffect } from 'react';
import GenerateImages from '../GenerateImage';
import useAuthRedirect from '@/utils/useAuthRedirect';
import { useAuth } from '@/utils/auth';
import axios from 'axios';
import ChatIcon from '@/Icons/ChatIcon';

const Sidebar = () => {
  const { token } = useAuthRedirect();
  const { username, logout } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

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
  }, []);

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
  };

  return (
    <section className='' >
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start rtl:justify-end">
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns=""
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <a href="/" className="flex ms-2 md:me-24 items-center">
          <img
            src="https://img.freepik.com/free-vector/head-with-ai-chip_78370-3672.jpg"
            className="h-8 me-3"
            alt="Logo"
          />
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
            Logo
          </span>
        </a>
      </div>
      <div className="flex items-center">
        <div className="flex items-center ms-3 relative">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
          </button>
          <div
            className="z-50 hidden my-4 text-base bg-white divide-y divide-gray-100 rounded shadow absolute right-0 top-10"
            id="dropdown-user"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900">Bonnie Green</span>
              <span className="block text-sm text-gray-500 truncate">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-1">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
          <button
            onClick={logout}
            className="text-gray-800 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 ms-2"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>

<aside
  id="logo-sidebar"
  className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 shadow-lg"
  aria-label="Sidebar"
>
  <div className="h-full px-4 pb-4 overflow-y-auto bg-white">

    <ul className="space-y-4">
      <a href="">
         
      <li className="flex justify-center items-center py-2 text-gray-600 text-xs uppercase font-semibold mb-2">
New Prompts
      </li>
      </a>
      {prompts.map((prompt, index) => (
        <li
          key={prompt.id}
          onClick={() => handlePromptClick(prompt)}
          className={`group flex flex-col items-start px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300 ${index === 0 ? 'border-t border-gray-200' : ''}`}
        >
          <button
            // onClick={() => handlePromptClick(prompt)}
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
            <span className="truncate text-sm ">{prompt.prompt}</span>
          </button>
          <div className='flex w-full mt-1'>
          <small className="text-xs font-light text-gray-500">{new Date(prompt.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</small>
            <span className="text-xs text-gray-500 font-light ml-auto">({prompt.num_images})</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
</aside>




      <div className="p-4 sm:ml-64 mt-10 h-100 overflow-hidden transition duration-300">
        <GenerateImages prompt={selectedPrompt} />
      </div>
    </section>
  );
};

export default Sidebar;

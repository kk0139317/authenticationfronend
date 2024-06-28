'use client'
import React from 'react'
import useAuthRedirect from '@/utils/useAuthRedirect';
import { useAuth } from '@/utils/auth';
const NavBar = () => {
    const { token } = useAuthRedirect();
    const { username, logout } = useAuth();
  return (
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
          <a href="profile">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-user"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://img.freepik.com/free-vector/man-profile-account-picture_24908-81754.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1719273600&semt=ais_user"
                alt="user photo"
              />
            </button>
                         
            </a>
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
  
  )
}

export default NavBar
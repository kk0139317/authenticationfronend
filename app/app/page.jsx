// pages/index.js
'use client'
import React, { useState } from 'react';
import GenerateImages from '@/components/GenerateImage';
import useAuthRedirect from '@/utils/useAuthRedirect';
import Drawer from '@/components/Drawer';
import NavBar from '@/components/Navbar';

const Sidebar = () => {
  useAuthRedirect();
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const handleSubPromptSelect = (subPromptId) => {
    // Find the selected subprompt based on subPromptId
    const foundPrompt = prompts.find(prompt => prompt.sub_prompts.some(sub => sub.id === subPromptId));
    if (foundPrompt) {
      setSelectedPrompt(foundPrompt);
    }
  };

  return (
    <section className=''>
      <NavBar />
      <Drawer 
        selectedPrompt={selectedPrompt}
        setSelectedPrompt={setSelectedPrompt}
        handleSubPromptSelect={handleSubPromptSelect}
      />
      <div className="p-4 sm:ml-64 mt-10 h-100 overflow-hidden transition duration-300">
        <GenerateImages prompt={selectedPrompt} />
      </div>
    </section>
  );
};

export default Sidebar;
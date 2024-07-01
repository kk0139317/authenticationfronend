import React from 'react';

const Sidebar = ({
  inputPrompt,
  setInputPrompt,
  numImages,
  setNumImages,
  handleGenerate,
  handleFileChange,
  imagePreview,
  negetiveInputPrompt,
  setNegetiveInputPrompt
}) => {
  // Function to count the number of commas in a sentence
  function countCommas(sentence) {
    try{
      return sentence.split(',').length - 1;
    }
    catch(e){
      console.error('Error counting commas:', e);
      return 0;
    }
  }

  const numberOfCommas = countCommas(inputPrompt);
  const number_of_prompt = inputPrompt === '' ||inputPrompt=== undefined ? 0 : numberOfCommas + 1;
  const credit = (number_of_prompt * numImages) / 4;

  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 min-w-64 max-w-96 w-1/4 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 shadow-lg" aria-label="Sidebar">
      <div className="h-full px-4 py-4 overflow-y-auto bg-white">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="border px-4 py-2 bg-white shadow-md rounded-lg overflow-hidden">
            <label htmlFor="">Prompt</label>
            <textarea
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full p-2 mt-2 border min-h-28 border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="border px-4 py-2 bg-white shadow-md rounded-lg overflow-hidden">
            <label htmlFor="">Negative Prompt</label>
            <textarea
              type="text"
              value={negetiveInputPrompt}
              onChange={(e) => setNegetiveInputPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className="w-full p-2 mt-2 border min-h-20 border-gray-300 bg-gray-50 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="border bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-2 sm:px-6">
              <h2 className="text-lg font-semibold text-gray-800">Upload Image</h2>
              <p className="mt-1 text-sm text-gray-600">Select an image file from your computer.</p>
            </div>
            <div className="px-4 py-2 sm:px-6 sm:py-4">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-white text-sm font-medium shadow-md inline-block w-full text-center">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-300 group-hover:text-blue-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 2a6 6 0 00-5.83 7.75L2 11a8 8 0 1116 0h-.085l-.086-.003c-.386-.014-.77-.045-1.15-.1a5.98 5.98 0 00-1.81 1.42l-.01.01a1 1 0 01-1.33.09l-4-3a1 1 0 01-.3-.71V7a1 1 0 011-1h2a1 1 0 01.3.71l.27.33 2.83 2.12a1 1 0 01.11 1.57l-2.67 3.33a1 1 0 01-1.5.14l-.09-.1-3-3.75A3.97 3.97 0 018 7a4 4 0 010-8 3.97 3.97 0 013.75 2.75l1.25 3.74A5.97 5.97 0 0010 2zm0 6a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </span>
                Choose a file
                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
              </label>
            </div>
            {imagePreview && (
              <div className="px-4 py-2 sm:px-6 sm:py-2">
                <img src={imagePreview} alt="Uploaded Preview" className="mt-2 rounded-lg shadow-md" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              </div>
            )}
          </div>
          {/* <input
            type="number"
            value={numImages}
            onChange={(e) => setNumImages(e.target.value)}
            placeholder="Number of Images"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
            min="1"
            max="10"
            required
          /> */}
          <div className="border px-4 py-2 bg-white shadow-md rounded-lg overflow-hidden">
  <label htmlFor="numImages" className="block text-sm font-medium text-gray-700">
    Number of Images
  </label>
  <input
    type="range"
    id="numImages"
    value={numImages}
    onChange={(e) => setNumImages(e.target.value)}
    min="1"
    max="10"
    className="w-full mt-2"
  />
  <div className="flex justify-between text-sm text-gray-500 mt-2">
    <span>1</span>
    <span>{numImages}</span>
    <span>10</span>
  </div>
</div>

<button
  type="submit"
  className="w-full bg-blue-500 text-white p-3 rounded-lg flex justify-center items-center hover:bg-blue-600 transition duration-200 relative"
>
  <span>Generate Images</span>
  <span className="absolute right-4 bg-white text-blue-500 ml-2 px-5 py-1 rounded-lg text-sm font-semibold">
    {credit}
  </span>
</button>

        </form>
      </div>
    </aside>
  );
};

export default Sidebar;

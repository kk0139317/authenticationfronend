'use client'
// components/GenerateImages.jsx
import { useState } from 'react';

const GenerateImages = () => {
  const [prompt, setPrompt] = useState('');
  const [numImages, setNumImages] = useState(1);
  const [images, setImages] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    // Replace this with your API call to generate images
    const generatedImages = Array.from({ length: numImages }, (_, i) => ({
      id: i,
      url: `https://via.placeholder.com/300?text=Image+${i+1}`,
      prompt,
    }));

    setImages(generatedImages);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in-down">Generate AI Images</h1>
        <p className="text-lg text-gray-700 animate-fade-in-up">Unleash your creativity with AI-powered image generation. Provide a prompt, and let the AI generate stunning images for you.</p>
      </header>
      
      <section className="flex flex-col items-center w-full mb-16 animate-fade-in">
        
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg">
          <form onSubmit={handleGenerate}>
            <div className="mb-6">
              <label htmlFor="prompt" className="block text-gray-700 text-lg font-medium mb-2">
                Enter a prompt:
              </label>
              <input
                type="text"
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                placeholder="E.g., A sunset over the mountains"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="numImages" className="block text-gray-700 text-lg font-medium mb-2">
                Number of images:
              </label>
              <input
                type="number"
                id="numImages"
                value={numImages}
                onChange={(e) => setNumImages(e.target.value)}
                min="1"
                max="10"
                required
                className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Generate
            </button>
          </form>
        </div>
      </section>

      <section className="w-full max-w-6xl mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in-up">
          {images.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
              <img className="w-full h-64 object-cover" src={image.url} alt={`Generated from prompt: ${image.prompt}`} />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <p className="text-white text-lg font-bold text-center px-4">{image.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center mb-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-down">What is Generative AI?</h2>
        <p className="text-lg text-gray-700 mb-8 animate-fade-in-up">
          Generative AI is a type of artificial intelligence that can create new content, such as images, text, and music. Using advanced algorithms, generative AI can produce unique and creative outputs based on the input it receives.
        </p>
        <img src="https://imageio.forbes.com/specials-images/imageserve/650945e2810848cde5016621/What-Is-Generative-AI--A-super-Simple-Explanation-Anyone-Can-Understand/960x0.jpg?height=399&width=711&fit=bounds" alt="Generative AI" className="w-full max-w-3xl mx-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105 animate-fade-in" />
      </section>

    </div>
  );
};

export default GenerateImages;

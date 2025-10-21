import React, { useState } from 'react';

// Helper component for Video Cards to keep the main component cleaner
const VideoCard = ({ video }) => (
    <div className="group">
        <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
            <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">{video.duration}</span>
        </div>
        <div className="mt-2">
            <h3 className="text-base font-semibold text-white truncate group-hover:text-gray-300">{video.title}</h3>
            <p className="text-sm text-gray-400">{video.views} &bull; {video.posted}</p>
        </div>
    </div>
);

// Main App component
export default function ChannelProfile() {
    // State to manage the active navigation tab
    const [activeTab, setActiveTab] = useState('VIDEOS');

    // Data for the channel and videos
    const channelData = {
        name: 'Awesome Creators',
        handle: '@awesomecreators',
        subscribers: '2.1M',
        videoCount: 450,
        description: 'Welcome to the official channel! We create amazing content about tech, design, and more. Join us on this journey!',
        avatar: 'https://placehold.co/160x160/333333/ffffff?text=Logo',
        banner: 'https://placehold.co/1920x480/1a1a1a/ffffff?text=Channel+Banner'
    };

    const navItems = ['HOME', 'VIDEOS', 'PLAYLISTS', 'COMMUNITY', 'ABOUT'];

    return (
        <>
            {/* We include the styles directly here for a single-file component approach. */}
            <style>{`
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #0f0f0f;
                    color: #f1f1f1;
                }
                .tab-active {
                    border-bottom: 3px solid #f1f1f1;
                    color: #f1f1f1;
                    font-weight: 600;
                }
                .tab {
                    transition: color 0.2s ease-in-out;
                }
                .tab:hover {
                    color: #f1f1f1;
                }
            `}</style>
            <div className="w-full max-w-screen-2xl h-[81vh] overflow-scroll mx-auto">
                {/* Cover Photo */}
                <div className="h-40 md:h-64 lg:h-80 w-full overflow-hidden">
                    <img src={"/Gemini_Generated_Image_9y60we9y60we9y60__1_-removebg-preview.png"} alt="Channel Cover" className="w-full h-full object-cover" />
                </div>

                {/* Channel Info & Header */}
                <div className="px-4 md:px-8 lg:px-16 bg-[#181818]">
                    <div className="flex flex-col md:flex-row items-center md:items-end py-6 gap-6">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0">
                            <img src={"/WhatsApp Image 2025-02-18 at 22.06.14_eb632e0b.jpg"} alt="Channel Profile" className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-[#181818] -mt-16 md:-mt-20 shadow-lg" />
                        </div>

                        {/* Channel Details */}
                        <div className="flex-1 flex flex-col md:flex-row justify-between items-center w-full text-center md:text-left">
                            <div className="mb-4 md:mb-0">
                                <h1 className="text-3xl md:text-4xl font-bold">{channelData.name}</h1>
                                <p className="text-gray-400 mt-1">{channelData.handle} &bull; {channelData.subscribers} Subscribers &bull; {channelData.videoCount} Videos</p>
                                <p className="text-gray-300 mt-2 text-sm max-w-lg">
                                    {channelData.description}
                                </p>
                            </div>

                            {/* Subscribe Button */}
                            <div className="flex-shrink-0">
                                <button className="bg-white text-black font-semibold py-2 px-5 rounded-full hover:bg-gray-200 transition-colors duration-300 ease-in-out flex items-center gap-2">
                                    <i className="fas fa-bell"></i>
                                    Subscribed
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="border-b border-gray-700">
                        <ul className="flex items-center gap-4 md:gap-8 text-gray-400 font-medium text-sm md:text-base overflow-x-auto whitespace-nowrap">
                            {navItems.map(item => (
                                <li key={item}>
                                    <a href="#" 
                                       onClick={(e) => { e.preventDefault(); setActiveTab(item); }}
                                       className={`py-3 px-1 block tab ${activeTab === item ? 'tab-active' : ''}`}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Content Section based on active tab */}
                <main className="px-4 md:px-8 lg:px-16 py-8">
                    {activeTab === 'VIDEOS' && (
                        <div>
                             <h2 className="text-xl font-bold mb-4">Latest Uploads</h2>
                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
                            </div>
                        </div>
                    )}
                    {/* You can add content for other tabs here */}
                    {activeTab !== 'VIDEOS' && (
                        <div className="text-center text-gray-400 py-20">
                            <h2 className="text-2xl font-bold">Content for {activeTab}</h2>
                            <p>This section is under construction.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Loader from "@/components/shared/Loader"; // Assuming you have a Loader

const VideoDetails = () => {
    // ✨ FIX 1: Select the status and error, not just the video.
    const { video, status, error } = useSelector(state => state.video);

    console.log(video)

    const [subscribed, setSubscribed] = useState(false);
    const [likes, setLikes] = useState(0); // Initialize with 0
    const [dislikes, setDislikes] = useState(0); // Initialize with 0
    const [likeStatus, setLikeStatus] = useState('none'); // 'liked', 'disliked', 'none'
    const [isExpanded, setIsExpanded] = useState(false);

    // --- SVG Icons (Your code is perfect here) ---
    const ThumbsUp = ({ size = 24, fill = 'none', ...props }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M7 10v12" /><path d="M17 10V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6h10l-2 8z" />
        </svg>
    );
    const MoreHorizontal = ({ size = 24, ...props }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
        </svg>
    );
    const Bell = ({ size = 24, ...props }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    );
    // --- End SVG Icons ---


    // --- Your handler functions (no changes needed) ---
    const handleLike = () => { /* ... */ };
    const handleDislike = () => { /* ... */ };
    const formatNumber = (num) => { /* ... */ };


    // ✨ FIX 2: Add Guard Clauses to handle loading/error/null states
    // This stops the component from crashing.
    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Loader />
            </div>
        );
    }

    if (status === 'failed') {
        return <p className="text-red-500">Error loading video: {error}</p>;
    }

    // This catches the 'succeeded' state where video is still null
    if (!video) {
        return <p>Video not found.</p>;
    }
    
    // --- If all checks pass, render the component ---
    return (
        <div className="mt-4">
            {/* ✨ FIX 3: Access properties that actually exist (e.g., video.title) */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">{video.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">
                
                {/* Channel Info */}
                <div className="flex items-center gap-3">
                    {/* ✨ FIX 4: Use `video.owner.avatar` and add optional chaining (?) for safety */}
                    <img 
                        src={video.ownerDetailes?.avatar || 'https://placehold.co/48x48/000000/FFFFFF?text=U'} 
                        alt={video.ownerDetailes?.username} 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" 
                    />
                    <div>
                        <div className="font-semibold text-base sm:text-lg">{video.ownerDetailes?.username || 'Unknown Channel'}</div>
                    </div>
                    <button
                        onClick={() => setSubscribed(!subscribed)}
                        className={`ml-auto sm:ml-4 px-3 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 ${
                            subscribed 
                                ? 'bg-gray-700 hover:bg-gray-600' 
                                : 'bg-foreground text-card hover:bg-gray-200'
                        }`}
                    >
                        {subscribed ? (
                            <span className="flex items-center gap-2"><Bell size={16} /> <span className="hidden sm:inline">Subscribed</span></span>
                        ) : 'Subscribe'}
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {/* ... your buttons ... */}
                </div>
            </div>

            {/* Description Box */}
            <div 
                className="mt-4 bg-ring hover:bg-gray-700 p-4 rounded-xl cursor-pointer transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4 font-semibold text-sm sm:text-base">
                    {/* ✨ FIX 6: Use `video.view` (not views) */}
                    <span>{video.view} views</span>
                    {/* ✨ FIX 7: Format the date */}
                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={`mt-2 text-sm sm:text-base text-gray-300 whitespace-pre-wrap ${!isExpanded ? 'line-clamp-2' : ''}`}>
                    {video.description}
                </div>
                <div className="font-semibold mt-2 text-sm sm:text-base text-gray-200">
                    {isExpanded ? 'Show less' : '...more'}
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;

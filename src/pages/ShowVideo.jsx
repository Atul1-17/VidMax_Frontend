import React, { useState, useRef } from 'react';

// SVG Icons (formerly from lucide-react)
const ThumbsUp = ({ size = 24, fill = 'none', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 10v12" />
        <path d="M17 10V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6h10l-2 8z" />
    </svg>
);

const MoreHorizontal = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
);

const Bell = ({ size = 24, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);


// Mock Data for the page
const mainVideoData = {
  id: 'v1',
  title: 'Building a UI that Inspires: The Art of Modern Web Design',
//   videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
     videoUrl: 'public/WIN_20251007_19_54_04_Pro.mp4',

  channel: {
    name: 'Design Masters',
    avatar: 'https://placehold.co/48x48/7c3aed/FFFFFF?text=DM',
    subscribers: '1.2M',
  },
  views: '2,345,678 views',
  uploadDate: 'Oct 8, 2025',
  initialLikes: 115000,
  initialDislikes: 2100,
  description: `Join us in this deep dive into the principles of modern web design. We'll explore color theory, typography, layout, and the little details that make a user interface not just functional, but delightful. Whether you're a beginner or a seasoned pro, there's something here for everyone. \n\nTopics covered:\n- The Psychology of Color\n- Creating a Scalable Typography System\n- Responsive Design for All Devices\n- Micro-interactions that Matter`
};


const initialCommentsData = [
    { id: 'c1', user: { name: 'Alex Wright', avatar: 'https://placehold.co/40x40/4d7c0f/FFFFFF?text=A' }, text: 'This is exactly what I was looking for. The explanation on typography systems was a game-changer for my projects!', likes: 256, replies: 5 },
    { id: 'c2', user: { name: 'Brenda Smith', avatar: 'https://placehold.co/40x40/be185d/FFFFFF?text=B' }, text: 'Incredible content! Subscribed immediately. Can you do a video on accessibility in design next?', likes: 189, replies: 12 },
    { id: 'c3', user: { name: 'Carlos Diaz', avatar: 'https://placehold.co/40x40/1d4ed8/FFFFFF?text=C' }, text: 'Great overview, but I wish it went deeper into the psychology of micro-interactions. Still, very useful!', likes: 72, replies: 2 },
];


// Main App Component
export default function ShowVideo() {
  return (
    <div className="bg-card max-h-[81vh] overflow-scroll font-sans">
      <div className="container mx-auto max-w-screen-2xl p-2 sm:p-4 lg:p-6 lg:flex lg:gap-6">
        <div className="lg:w-[65%] w-full">
          <VideoPlayer video={mainVideoData} />
          <VideoDetails video={mainVideoData} />
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

// Sub-components for better structure

const VideoPlayer = ({ video }) => (
  <div className="aspect-video bg-black rounded-lg md:rounded-xl overflow-hidden shadow-2xl">
    <video src={video.videoUrl} controls className="w-full h-full object-cover" />
  </div>
);

const VideoDetails = ({ video }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [likes, setLikes] = useState(video.initialLikes);
  const [dislikes, setDislikes] = useState(video.initialDislikes);
  const [likeStatus, setLikeStatus] = useState('none'); // 'liked', 'disliked', 'none'
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = () => {
    if (likeStatus === 'liked') {
      setLikeStatus('none');
      setLikes(likes - 1);
    } else {
      setLikeStatus('liked');
      setLikes(likes + 1);
      if (likeStatus === 'disliked') {
        setDislikes(dislikes - 1);
      }
    }
  };

  const handleDislike = () => {
    if (likeStatus === 'disliked') {
      setLikeStatus('none');
    } else {
      setLikeStatus('disliked');
      if (likeStatus === 'liked') {
        setLikes(likes - 1);
      }
    }
  };
  
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };


  return (
    <div className="mt-4">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">{video.title}</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">
        {/* Channel Info */}
        <div className="flex items-center gap-3">
          <img src={video.channel.avatar} alt={video.channel.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
          <div>
            <div className="font-semibold text-base sm:text-lg">{video.channel.name}</div>
            <div className="text-xs sm:text-sm text-gray-400">{video.channel.subscribers} subscribers</div>
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
          <div className="flex items-center bg-ring rounded-full flex-shrink-0">
            <button onClick={handleLike} className="flex items-center gap-2 px-3 sm:px-4 py-2 hover:bg-gray-700 rounded-l-full transition-colors">
              <ThumbsUp size={20} fill={likeStatus === 'liked' ? 'white' : 'none'} />
              <span className="text-sm font-semibold">{formatNumber(likes)}</span>
            </button>
          </div>
          <button className="p-2 bg-ring hover:bg-gray-700 rounded-full transition-colors flex-shrink-0">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Description Box */}
      <div 
        className="mt-4 bg-ring hover:bg-gray-700 p-4 rounded-xl cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4 font-semibold text-sm sm:text-base">
          <span>{video.views}</span>
          <span>{video.uploadDate}</span>
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

const CommentSection = () => {
    const [comments, setComments] = useState(initialCommentsData);
    const [newComment, setNewComment] = useState('');
    const commentInputRef = useRef(null);

    const handleAddComment = () => {
        if (newComment.trim() === '') return;
        
        const newCommentObj = {
            id: `c${comments.length + 1}`,
            user: { name: 'CurrentUser', avatar: 'https://placehold.co/40x40/9333ea/FFFFFF?text=ME' },
            text: newComment,
            likes: 0,
            replies: 0
        };

        setComments([newCommentObj, ...comments]);
        setNewComment('');
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">{comments.length} Comments</h2>

            {/* Add Comment */}
            <div className="flex items-start gap-4 mb-6">
                <img src="https://placehold.co/40x40/9333ea/FFFFFF?text=ME" alt="Your Avatar" className="w-10 h-10 rounded-full" />
                <div className="w-full">
                    <input 
                        ref={commentInputRef}
                        type="text" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..." 
                        className="w-full bg-transparent border-b-2 border-gray-600 focus:border-white outline-none pb-1 transition-colors text-sm sm:text-base"
                    />
                    {newComment && (
                        <div className="flex justify-end gap-3 mt-2">
                           <button onClick={() => setNewComment('')} className="px-4 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors text-sm">Cancel</button>
                           <button onClick={handleAddComment} className="px-4 py-2 rounded-full font-semibold bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 transition-colors text-sm" disabled={!newComment.trim()}>Comment</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Comment List */}
            <div className="flex flex-col gap-6">
                {comments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-4">
                        <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{comment.user.name}</p>
                            <p className="mt-1 text-sm sm:text-base">{comment.text}</p>
                            <div className="flex items-center gap-4 mt-2 text-gray-400">
                                <button className="flex items-center gap-1 hover:text-white"><ThumbsUp size={16} /> {comment.likes > 0 && <span>{comment.likes}</span>}</button>
                                <button className="text-xs sm:text-sm font-semibold hover:text-white">Reply</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};




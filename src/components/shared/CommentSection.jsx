import { useState, useRef } from "react";

const initialCommentsData = [
    { id: 'c1', user: { name: 'Alex Wright', avatar: 'https://placehold.co/40x40/4d7c0f/FFFFFF?text=A' }, text: 'This is exactly what I was looking for. The explanation on typography systems was a game-changer for my projects!', likes: 256, replies: 5 },
    { id: 'c2', user: { name: 'Brenda Smith', avatar: 'https://placehold.co/40x40/be185d/FFFFFF?text=B' }, text: 'Incredible content! Subscribed immediately. Can you do a video on accessibility in design next?', likes: 189, replies: 12 },
    { id: 'c3', user: { name: 'Carlos Diaz', avatar: 'https://placehold.co/40x40/1d4ed8/FFFFFF?text=C' }, text: 'Great overview, but I wish it went deeper into the psychology of micro-interactions. Still, very useful!', likes: 72, replies: 2 },
];

const ThumbsUp = ({ size = 24, fill = 'none', ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M7 10v12" />
        <path d="M17 10V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6h10l-2 8z" />
    </svg>
);

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

export default CommentSection
import React, { useState, useRef } from 'react';
import VideoPlayer from "../components/shared/VideoPlayer"
import VideoDetails from "../components/shared/VideoDetails"
import CommentSection from '@/components/shared/CommentSection';


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


// Main App Component
export default function ShowVideo() {
  return (
    <div className="bg-card max-h-[81vh] overflow-scroll font-sans">
      <div className="container mx-auto max-w-screen-2xl p-2 sm:p-4 lg:p-6 lg:flex lg:gap-6">
        <div className="lg:w-[65%] w-full">
          <VideoPlayer />
          <VideoDetails video={mainVideoData} />
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

// Sub-components for better structure
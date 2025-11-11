import React, { useState, useRef } from 'react';
import VideoPlayer from "../components/shared/VideoPlayer"
import VideoDetails from "../components/shared/VideoDetails"
import CommentSection from '@/components/shared/CommentSection';



// Main App Component
export default function ShowVideo() {
  return (
    <div className="bg-card h-[81vh] lg:h-[100vh] font-sans">
      <div className="container mx-auto max-w-screen-2xl p-2 sm:p-4 lg:p-6 lg:flex lg:gap-6">
        <div className="lg:w-[100%] lg:flex gap-5 w-full">
          <div>
            <VideoPlayer />
            <VideoDetails />  
          </div>
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

// Sub-components for better structure
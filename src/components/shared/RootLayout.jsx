import React from 'react'
import Header from "./Header";
import Footer from "./Footer";
import ResponsiveSidebar from "./ResponsiveSidebar";
import { Outlet } from "react-router";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

function RootLayout() {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      {!isMobile && <ResponsiveSidebar />}
      
      {/* Main content area */}
      <div className={cn(
        "flex flex-col min-h-screen",
        !isMobile && "md:ml-64" // Add left margin on desktop to account for sidebar
      )}>
        {/* Header - only show on mobile */}
        {<Header />}
        
        {/* Main content */}
        <main className="flex-1">
          <Outlet />
        </main>
        
        {/* Footer - only show on mobile */}
        {isMobile && <Footer />}
      </div>
    </div>
  )
}

export default RootLayout


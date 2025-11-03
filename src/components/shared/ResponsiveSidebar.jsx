import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { 
  Home, 
  Heart, 
  Users, 
  Upload, 
  User, 
  Settings,
  Video,
  BarChart3,
  Menu,
  X,
  HistoryIcon,
  PlayCircleIcon
} from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    title: "Discover",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
      },
      {
        title: "Liked Videos",
        url: "/like",
        icon: Heart,
      },
      {
        title: "Subscriptions",
        url: "/subscription",
        icon: Users,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Upload Video",
        url: "/upload",
        icon: Upload,
      },
      {
        title: "History",
        url: "/watchHistory",
        icon: HistoryIcon,
      },
      {
        title: "Playlist",
        url: "/playlist",
        icon: PlayCircleIcon,
      },
      {
        title: "My Channel",
        url: "/userdashbord",
        icon: Video,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/channelProfile",
        icon: User,
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
]

function ResponsiveSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleNavigation = (url) => {
    navigate(url)
    if (isMobile) {
      setIsOpen(false)
    }
  }

  // Mobile sidebar overlay
  if (isMobile) {
    return (
      <>
        {/* Mobile menu button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-background border border-border shadow-lg md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Mobile sidebar overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="fixed inset-0 bg-black/50" 
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full w-80 bg-background border-r border-border shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Video className="h-4 w-4" />
                  </div>
                  <span className="font-semibold">VidMax</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4 space-y-6">
                {navigationItems.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      {group.title}
                    </h3>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleNavigation(item.url)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                            location.pathname === item.url
                              ? "bg-accent text-accent-foreground"
                              : "hover:bg-accent/50"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span className="text-sm">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:z-40">
      <div className="flex flex-col flex-grow bg-background border-r border-border">
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Video className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">VidMax</span>
            <span className="truncate text-xs text-muted-foreground">Video Platform</span>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationItems.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleNavigation(item.url)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                      location.pathname === item.url
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            VidMax © 2024
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveSidebar

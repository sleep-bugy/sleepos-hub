import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Smartphone, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Download,
  MessageSquare
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const sidebarItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      path: "/admin" 
    },
    { 
      icon: Smartphone, 
      label: "Devices", 
      path: "/admin/devices" 
    },
    { 
      icon: Download, 
      label: "ROMs", 
      path: "/admin/roms" 
    },
    { 
      icon: Users, 
      label: "Team Applications", 
      path: "/admin/applications" 
    },
    { 
      icon: FileText, 
      label: "Changelogs", 
      path: "/admin/changelogs" 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/admin/settings" 
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`fixed md:static z-40 h-full bg-card border-r w-64 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">PS</span>
            </div>
            <span className="font-bold text-xl">Project Sleep Admin</span>
          </Link>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-full justify-start"
            >
              <span className="mr-2">
                {theme === "light" ? "🌙" : "☀️"}
              </span>
              {theme === "light" ? "Dark" : "Light"} Mode
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="h-full">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};
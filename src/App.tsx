import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminLayout } from "@/components/AdminLayout";
import StartupLoader from "@/components/StartupLoader";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Download from "./pages/Download";
import DownloadTest from "./pages/DownloadTest";
import Team from "./pages/Team";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DeviceDownload from "./pages/download/DeviceDownload";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDevices from "./pages/admin/Devices";
import AdminRoms from "./pages/admin/Roms";
import AdminApplications from "./pages/admin/Applications";
import AdminChangelogs from "./pages/admin/Changelogs";
import AdminSettings from "./pages/admin/Settings";
import AdminUserProfile from "./pages/admin/UserProfile";
import "./i18n";

const queryClient = new QueryClient();

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
  };

  if (!loadingComplete) {
    return <StartupLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="project-sleep-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/download" element={<Download />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/download/:deviceCodename" element={<DeviceDownload />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminDashboard />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/devices" element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminDevices />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/roms" element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminRoms />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/applications" element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminApplications />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/changelogs" element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminChangelogs />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/settings" element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminSettings />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/profile" element={
                    <ProtectedRoute>
                      <AdminLayout>
                        <AdminUserProfile />
                      </AdminLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

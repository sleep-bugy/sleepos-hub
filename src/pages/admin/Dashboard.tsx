import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Users, Download, Smartphone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { t } = useTranslation();

  // Mock data for dashboard
  const stats = [
    { title: "Total Users", value: "12,345", icon: Users, change: "+12%", color: "from-blue-500 to-cyan-500" },
    { title: "Downloads", value: "45,678", icon: Download, change: "+8%", color: "from-green-500 to-emerald-500" },
    { title: "Supported Devices", value: "42", icon: Smartphone, change: "+3", color: "from-purple-500 to-pink-500" },
    { title: "Team Applications", value: "15", icon: MessageSquare, change: "+5", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-500">{stat.change}</span>
                </CardHeader>
                <CardContent>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Downloads */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Downloads</CardTitle>
                <CardDescription>Latest ROM downloads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: "Xiaomi Mi 9", rom: "SleepOS v2.3.1", user: "user@example.com", time: "2 mins ago" },
                    { device: "OnePlus 7 Pro", rom: "AOSP v1.5.0", user: "user2@example.com", time: "15 mins ago" },
                    { device: "Samsung Galaxy S10", rom: "Port v3.0.2", user: "user3@example.com", time: "1 hour ago" },
                    { device: "Google Pixel 4", rom: "SleepOS v2.2.8", user: "user4@example.com", time: "3 hours ago" },
                  ].map((download, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{download.device}</p>
                        <p className="text-sm text-muted-foreground">{download.rom}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{download.time}</p>
                        <p className="text-xs text-muted-foreground">{download.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Applications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>New team applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", role: "Developer", email: "john@example.com", time: "5 mins ago" },
                    { name: "Jane Smith", role: "Designer", email: "jane@example.com", time: "25 mins ago" },
                    { name: "Alex Johnson", role: "Maintainer", email: "alex@example.com", time: "1 hour ago" },
                    { name: "Maria Garcia", role: "Tester", email: "maria@example.com", time: "3 hours ago" },
                  ].map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{app.time}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
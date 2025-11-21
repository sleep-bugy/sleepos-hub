import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Cpu, Lock, Palette, Smartphone, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Battery,
      title: "Battery Optimization",
      description: "Advanced battery management for all-day usage",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Cpu,
      title: "Performance Tuning",
      description: "Optimized kernel and system for peak performance",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      description: "Enhanced security features and privacy controls",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: "Customization",
      description: "Extensive theming and customization options",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Smartphone,
      title: "Modern UI",
      description: "Clean, intuitive interface with smooth animations",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Wifi,
      title: "Connectivity",
      description: "Improved WiFi and Bluetooth stability",
      color: "from-teal-500 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("features.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full">
                <CardHeader>
                  <div className={`h-14 w-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Experience the best of Android with our carefully crafted features
                    designed to enhance your daily usage.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-card/50 rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Regular Updates</h3>
              <p className="text-muted-foreground">
                We provide frequent updates with the latest security patches and features
                to keep your device secure and up-to-date.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Active Community</h3>
              <p className="text-muted-foreground">
                Join thousands of users in our Discord and Telegram communities for
                support, tips, and ROM development discussions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Open Source</h3>
              <p className="text-muted-foreground">
                Our ROMs are built on open-source foundations, ensuring transparency
                and community collaboration.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Device Support</h3>
              <p className="text-muted-foreground">
                We support a wide range of devices from various manufacturers, ensuring
                more users can experience Project Sleep.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

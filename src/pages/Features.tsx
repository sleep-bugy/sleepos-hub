import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Cpu, Lock, Palette, Smartphone, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Battery,
      title: t("features.battery.title"),
      description: t("features.battery.description"),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Cpu,
      title: t("features.performance.title"),
      description: t("features.performance.description"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lock,
      title: t("features.security.title"),
      description: t("features.security.description"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: t("features.customization.title"),
      description: t("features.customization.description"),
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Smartphone,
      title: t("features.ui.title"),
      description: t("features.ui.description"),
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Wifi,
      title: t("features.connectivity.title"),
      description: t("features.connectivity.description"),
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
                    {t("features.description")}
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
          <h2 className="text-3xl font-bold mb-8 text-center">{t("features.difference.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("features.difference.updates.title")}</h3>
              <p className="text-muted-foreground">
                {t("features.difference.updates.description")}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("features.difference.community.title")}</h3>
              <p className="text-muted-foreground">
                {t("features.difference.community.description")}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("features.difference.opensource.title")}</h3>
              <p className="text-muted-foreground">
                {t("features.difference.opensource.description")}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">{t("features.difference.devicesupport.title")}</h3>
              <p className="text-muted-foreground">
                {t("features.difference.devicesupport.description")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

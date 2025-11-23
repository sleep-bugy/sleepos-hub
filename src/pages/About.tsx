import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Users, Heart, Code, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Users,
      title: t("about.values.community.title"),
      description: t("about.values.community.description"),
    },
    {
      icon: Heart,
      title: t("about.values.opensource.title"),
      description: t("about.values.opensource.description"),
    },
    {
      icon: Code,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.description"),
    },
    {
      icon: Zap,
      title: t("about.values.performance.title"),
      description: t("about.values.performance.description"),
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
            {t("about.title")}
          </h1>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{t("about.mission")}</CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-muted-foreground">
              <p className="mb-4">
                {t("about.missionText")}
              </p>
              <p>
                {t("about.description")}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover text-center h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card/50 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">{t("about.community")}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("about.community.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.open("https://discord.gg/projectsleep", "_blank")}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {t("about.discord")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://t.me/projectsleep", "_blank")}
            >
              <Send className="h-5 w-5 mr-2" />
              {t("about.telegram")}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

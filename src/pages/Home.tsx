import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Smartphone, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useTranslation();

  const flavors = [
    {
      title: t("home.flavors.sleepos"),
      description: t("home.flavors.sleeposDesc"),
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t("home.flavors.aosp"),
      description: t("home.flavors.aospDesc"),
      icon: Smartphone,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: t("home.flavors.port"),
      description: t("home.flavors.portDesc"),
      icon: Shield,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">{t("home.hero.title")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {t("home.hero.subtitle")}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {t("home.hero.description")}
            </p>
            <Link to="/download">
              <Button size="lg" className="text-lg px-8 py-6">
                {t("home.hero.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Flavors Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("home.flavors.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flavors.map((flavor, index) => (
                <motion.div
                  key={flavor.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="card-hover h-full">
                    <CardHeader>
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${flavor.color} flex items-center justify-center mb-4`}>
                        <flavor.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{flavor.title}</CardTitle>
                      <CardDescription>{flavor.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to="/download">
                        <Button variant="outline" className="w-full">
                          {t("common.viewMore")}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Devices Supported", value: "50+" },
              { label: "Downloads", value: "100K+" },
              { label: "Team Members", value: "15+" },
              { label: "Active Users", value: "25K+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

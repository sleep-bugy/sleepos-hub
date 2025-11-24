import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Smartphone, SmartphoneIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useTranslation();

  // Devices organized by brand
  const brands = [
    {
      name: t("home.brands.xiaomi"),
      title: "Xiaomi Devices",
      description: t("home.brands.xiaomiDesc"),
      icon: Smartphone,
      color: "from-red-500 to-pink-500",
      devices: [
        { name: "Xiaomi Mi 11", codename: "venus" },
        { name: "Xiaomi Redmi Note 10", codename: "sweet" },
        { name: "Xiaomi POCO X3", codename: "surya" },
      ],
    },
    {
      name: t("home.brands.poco"),
      title: "POCO Devices",
      description: t("home.brands.pocoDesc"),
      icon: Smartphone,
      color: "from-blue-500 to-cyan-500",
      devices: [
        { name: "POCO F3", codename: "alioth" },
        { name: "POCO X3 Pro", codename: "vayu" },
        { name: "POCO M3", codename: "citrus" },
      ],
    },
    {
      name: t("home.brands.redmi"),
      title: "Redmi Devices",
      description: t("home.brands.redmiDesc"),
      icon: Smartphone,
      color: "from-green-500 to-emerald-500",
      devices: [
        { name: "Redmi Note 11", codename: "rosemary" },
        { name: "Redmi K40", codename: "alioth" },
        { name: "Redmi 10", codename: "fog" },
      ],
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

      {/* Brands Section - Display as vertical rectangular cards */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t("home.brands.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="card-hover h-full flex flex-col">
                    <CardHeader className="pb-3">
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${brand.color} flex items-center justify-center mb-4`}>
                        <brand.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{brand.title}</CardTitle>
                      <CardDescription>{brand.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-2 mb-4 flex-1">
                        {brand.devices.map((device, idx) => (
                          <div key={idx} className="text-sm p-2 bg-muted rounded">
                            {device.name} ({device.codename})
                          </div>
                        ))}
                      </div>
                      <Link to={`/download?brand=${brand.name.toLowerCase()}`}>
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

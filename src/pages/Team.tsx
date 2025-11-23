import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { GB, ID, IN, RU } from "country-flag-icons/react/3x2";
import { addApplication } from "@/dataService";
import { Application } from "@/types";

const teamMembers = [
  {
    name: "John Doe",
    role: "Lead Developer",
    country: GB,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  {
    name: "Jane Smith",
    role: "UI/UX Designer",
    country: ID,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  },
  {
    name: "Alex Kumar",
    role: "Kernel Developer",
    country: IN,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  {
    name: "Dmitri Ivanov",
    role: "Device Maintainer",
    country: RU,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dmitri",
  },
];

export default function Team() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    role: "",
    message: "",
    cv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newApplication: Omit<Application, 'id' | 'date' | 'status'> = {
        name: formData.name,
        email: formData.email,
        portfolio: formData.portfolio,
        role: formData.role,
        message: formData.message,
        cv: formData.cv || undefined,
      };

      addApplication(newApplication);

      toast({
        title: t("team.apply.success"),
        description: "We'll review your application and get back to you soon!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        portfolio: "",
        role: "",
        message: "",
        cv: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            {t("team.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("team.subtitle")}
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-3"
                    />
                    <member.country className="w-8 h-6 mx-auto" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("team.apply.title")}</CardTitle>
              <CardDescription>
                Want to contribute to Project Sleep? Fill out the form below!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("team.apply.name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("team.apply.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">{t("team.apply.portfolio")}</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">{t("team.apply.role")}</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g., Developer, Designer, Maintainer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cv">{t("team.apply.cv")}</Label>
                  <Input
                    id="cv"
                    name="cv"
                    type="url"
                    value={formData.cv}
                    onChange={handleChange}
                    placeholder="https://example.com/cv.pdf (Optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("team.apply.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  {t("team.apply.submit")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

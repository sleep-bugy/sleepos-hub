import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { SiteSettings } from "@/types";
import { getSettings, updateSettings } from "@/dataService";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SiteSettings>({
    siteName: "Project Sleep",
    siteDescription: "Custom ROMs crafted with care for the community.",
    contactEmail: "contact@projectsleep.com",
    discordLink: "https://discord.gg/sK433E4jq",
    telegramLink: "https://t.me/SleepOsUser",
    downloadServer: "https://downloads.projectsleep.com",
    enableDownloads: true,
    enableTeamApplications: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const settings = getSettings();
    setFormData(settings);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: keyof SiteSettings, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      updateSettings(formData);
      toast({
        title: "Success",
        description: "Settings saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-muted-foreground">Configure site settings and preferences</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Site Information */}
            <Card>
              <CardHeader>
                <CardTitle>Site Information</CardTitle>
                <CardDescription>Configure basic site information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={formData.siteDescription}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>Connect your social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="discordLink">Discord Server</Label>
                  <Input
                    id="discordLink"
                    name="discordLink"
                    type="url"
                    value={formData.discordLink}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="telegramLink">Telegram Channel</Label>
                  <Input
                    id="telegramLink"
                    name="telegramLink"
                    type="url"
                    value={formData.telegramLink}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Download Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Download Settings</CardTitle>
                <CardDescription>Configure download functionality</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="downloadServer">Download Server URL</Label>
                  <Input
                    id="downloadServer"
                    name="downloadServer"
                    type="url"
                    value={formData.downloadServer}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableDownloads" className="text-base">
                      Enable Downloads
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to download ROMs
                    </p>
                  </div>
                  <Switch
                    id="enableDownloads"
                    checked={formData.enableDownloads}
                    onCheckedChange={(checked) => handleSwitchChange('enableDownloads', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Application Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Configure team application features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableTeamApplications" className="text-base">
                      Enable Team Applications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to apply for the team
                    </p>
                  </div>
                  <Switch
                    id="enableTeamApplications"
                    checked={formData.enableTeamApplications}
                    onCheckedChange={(checked) => handleSwitchChange('enableTeamApplications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
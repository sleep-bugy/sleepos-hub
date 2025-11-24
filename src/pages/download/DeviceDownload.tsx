import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, HardDrive, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Device } from "@/types";
import { getActiveDevices, getRomsForDevice, updateDownloadCount } from "@/dataService";

export default function DeviceDownload() {
  const { deviceCodename } = useParams<{ deviceCodename: string }>();
  const { t } = useTranslation();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevice = async () => {
      if (deviceCodename) {
        const devices = await getActiveDevices();
        const foundDevice = devices.find(d => d.codename === deviceCodename);

        if (foundDevice) {
          // Load ROMs for the device
          const roms = await getRomsForDevice(deviceCodename);
          setDevice({ ...foundDevice, roms });
        }

        setLoading(false);
      }
    };

    fetchDevice();
  }, [deviceCodename]);

  const handleDownload = async (romId: number, downloadUrl: string) => {
    await updateDownloadCount(romId);

    // In a real app, you might want to use a more secure download tracking
    // For now, we'll just redirect to the download URL
    window.open(downloadUrl, '_blank');
  };

  const getOsTypeBadge = (osType: string) => {
    const colors = {
      "SleepOS": "bg-blue-500",
      "AOSP": "bg-green-500",
      "Port": "bg-purple-500",
    };
    return colors[osType as keyof typeof colors] || "bg-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">{t("common.loading")}...</p>
        </div>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t("common.error")}</h2>
          <p className="text-lg text-muted-foreground">{t("deviceDownload.deviceNotFound")}</p>
          <Link to="/download">
            <Button variant="outline" className="mt-4">
              {t("deviceDownload.backToDownload")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const activeRoms = device.roms?.filter(rom => rom.status === 'Active') || [];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            {t("deviceDownload.title", { device: device.name })}
          </h1>
          <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
            {t("deviceDownload.description")}
          </p>
          <div className="flex justify-center mt-4">
            <Card className="p-4">
              <CardDescription>
                <span className="font-medium">Codename:</span> {device.codename}
              </CardDescription>
            </Card>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {activeRoms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground">{t("deviceDownload.noRoms", { device: device.name })}</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {activeRoms.map((rom, index) => (
                <motion.div
                  id={`rom-${rom.id}`} // Added ID for scrolling from Download page
                  key={rom.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border transition-all duration-300 hover:shadow-md">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <CardTitle className="text-2xl">{rom.version}</CardTitle>
                            <Badge className={`${getOsTypeBadge(rom.romType)} text-white`}>
                              {rom.romType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center">
                          <Download className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span className="text-sm">{t("deviceDownload.downloads", { count: rom.downloads })}</span>
                        </div>
                        <div className="flex items-center">
                          <HardDrive className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span className="text-sm">{t("deviceDownload.size")}: {rom.size}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span className="text-sm">{t("deviceDownload.date")}: {new Date(rom.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Maintainer Info */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-semibold">Maintainer:</span>
                          <span className="text-sm bg-muted px-2 py-1 rounded-md">{rom.maintainer}</span>
                        </div>
                      </div>

                      {/* Changelog Section */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <h3 className="font-semibold">{t("deviceDownload.changelog")}</h3>
                        </div>
                        <div className="bg-muted rounded-lg p-4 max-h-60 overflow-y-auto border">
                          <pre className="whitespace-pre-wrap text-sm font-mono">
                            {rom.changelog}
                          </pre>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          onClick={() => handleDownload(rom.id, rom.downloadUrl)}
                          className="flex-1 min-w-[180px]"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {t("deviceDownload.download")}
                          <span className="ml-2">({rom.size})</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="flex-1 min-w-[180px]"
                          onClick={() => {
                            // In a real app, you might want to show more detailed information in a modal
                            const notes = rom.notes || t("deviceDownload.noNotes");
                            alert(`Additional info about ${rom.version}:\n\n${notes}`);
                          }}
                        >
                          {t("deviceDownload.details")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link to="/download">
            <Button variant="outline">
              {t("deviceDownload.backToDownload")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
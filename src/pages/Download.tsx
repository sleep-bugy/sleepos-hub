import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Download as DownloadIcon, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Rom } from "@/types";
import { getRoms } from "@/dataService";

export default function Download() {
  const { t } = useTranslation();
  const [roms, setRoms] = useState<Rom[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedRom, setSelectedRom] = useState<Rom | null>(null);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);

  useEffect(() => {
    setRoms(getRoms().filter(rom => rom.status === "Active"));
  }, []);

  const filters = [
    { value: "all", label: t("download.filter.all") },
    { value: "SleepOS", label: t("download.filter.sleepos") },
    { value: "AOSP", label: t("download.filter.aosp") },
    { value: "Port", label: t("download.filter.port") },
  ];

  const filteredRoms = roms.filter((rom) => {
    const matchesSearch = rom.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rom.deviceCodename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || rom.romType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getOsTypeBadge = (osType: string) => {
    const colors = {
      "SleepOS": "bg-blue-500",
      "AOSP": "bg-green-500",
      "Port": "bg-purple-500",
    };
    return colors[osType as keyof typeof colors] || "bg-gray-500";
  };

  const handleDownload = (rom: Rom) => {
    if (rom.downloadUrl) {
      window.open(rom.downloadUrl, "_blank");
    }
  };

  const viewChangelog = (rom: Rom) => {
    setSelectedRom(rom);
    setIsChangelogOpen(true);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {t("download.title")}
          </h1>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4 mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t("download.search")}
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ROM Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoms.map((rom, index) => (
            <motion.div
              key={rom.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-xl mb-1">{rom.device}</CardTitle>
                      <CardDescription className="text-sm">{rom.deviceCodename}</CardDescription>
                    </div>
                    <Badge className={`${getOsTypeBadge(rom.romType)} text-white`}>
                      {rom.romType}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("download.version")}:</span>
                      <span className="font-medium">{rom.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("download.fileSize")}:</span>
                      <span className="font-medium">{rom.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("download.downloads")}:</span>
                      <span className="font-medium">{rom.downloads.toLocaleString()}</span>
                    </div>
                    {rom.notes && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("download.notes")}:</span>
                        <span className="font-medium">{rom.notes}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => handleDownload(rom)}
                    >
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      {t("download.download")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => viewChangelog(rom)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {t("download.changelog")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredRoms.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">{t("common.noResults")}</p>
          </div>
        )}

        {/* Changelog Dialog */}
        <Dialog open={isChangelogOpen} onOpenChange={setIsChangelogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedRom?.device} - {selectedRom?.version} {t("download.changelog")}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedRom && (
                <div>
                  <h3 className="font-medium mb-2">{t("download.changelog")}</h3>
                  <div className="bg-muted p-4 rounded-md max-h-96 overflow-y-auto whitespace-pre-wrap">
                    {selectedRom.changelog || t("common.noResults")}
                  </div>
                </div>
              )}
              {selectedRom?.notes && (
                <div>
                  <h3 className="font-medium mb-2">{t("download.notes")}</h3>
                  <div className="bg-muted p-4 rounded-md">
                    {selectedRom.notes}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

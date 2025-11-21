import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download as DownloadIcon, FileText } from "lucide-react";
import { motion } from "framer-motion";

// Mock ROM data
const mockRoms = [
  {
    id: 1,
    device: "Xiaomi Mi 9",
    model: "cepheus",
    osType: "sleepos",
    version: "v2.3.1",
    downloads: 1234,
    uploadDate: "2025-11-15",
    fileSize: "1.2 GB",
    changelog: "# v2.3.1\n- Fixed battery drain\n- Improved performance\n- Updated security patches",
  },
  {
    id: 2,
    device: "OnePlus 7 Pro",
    model: "guacamole",
    osType: "aosp",
    version: "v1.5.0",
    downloads: 892,
    uploadDate: "2025-11-10",
    fileSize: "980 MB",
    changelog: "# v1.5.0\n- Pure AOSP experience\n- Latest Android updates",
  },
  {
    id: 3,
    device: "Samsung Galaxy S10",
    model: "beyond1lte",
    osType: "port",
    version: "v3.0.2",
    downloads: 567,
    uploadDate: "2025-11-12",
    fileSize: "1.4 GB",
    changelog: "# v3.0.2\n- Ported OneUI features\n- Camera improvements",
  },
];

export default function Download() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filters = [
    { value: "all", label: t("download.filter.all") },
    { value: "sleepos", label: t("download.filter.sleepos") },
    { value: "aosp", label: t("download.filter.aosp") },
    { value: "port", label: t("download.filter.port") },
  ];

  const filteredRoms = mockRoms.filter((rom) => {
    const matchesSearch = rom.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rom.model.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || rom.osType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getOsTypeBadge = (osType: string) => {
    const colors = {
      sleepos: "bg-blue-500",
      aosp: "bg-green-500",
      port: "bg-purple-500",
    };
    return colors[osType as keyof typeof colors] || "bg-gray-500";
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
                      <CardDescription className="text-sm">{rom.model}</CardDescription>
                    </div>
                    <Badge className={`${getOsTypeBadge(rom.osType)} text-white`}>
                      {rom.osType.toUpperCase()}
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
                      <span className="font-medium">{rom.fileSize}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("download.downloads")}:</span>
                      <span className="font-medium">{rom.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      {t("download.download")}
                    </Button>
                    <Button variant="outline" className="w-full">
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
      </div>
    </div>
  );
}

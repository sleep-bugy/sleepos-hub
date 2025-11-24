import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Smartphone, Download } from "lucide-react";
import { motion } from "framer-motion";
import { Device } from "@/types";
import { getActiveDevices } from "@/dataService";

// ROM type filter state
type RomTypeFilter = 'ALL' | 'SleepOS' | 'AOSP' | 'Port';

export default function DownloadTest() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null); // null means all brands
  const [selectedRomType, setSelectedRomType] = useState<RomTypeFilter>('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const brandFromUrl = searchParams.get('brand');
      if (brandFromUrl) {
        setSelectedBrand(brandFromUrl);
      } else {
        setSelectedBrand(null);
      }
    } catch (err) {
      console.error('Error getting search params:', err);
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      let allDevices = getActiveDevices();
      console.log('All devices from getActiveDevices:', allDevices); // Debug log

      // Filter by brand if selected
      if (selectedBrand) {
        if (selectedBrand === 'xiaomi') {
          allDevices = allDevices.filter(device =>
            device.name.toLowerCase().includes('xiaomi') ||
            device.name.toLowerCase().includes('redmi') ||
            device.name.toLowerCase().includes('poco')
          );
        } else if (selectedBrand === 'poco') {
          allDevices = allDevices.filter(device => device.name.toLowerCase().includes('poco'));
        } else if (selectedBrand === 'redmi') {
          allDevices = allDevices.filter(device => device.name.toLowerCase().includes('redmi'));
        }
      }

      // Filter by ROM type if not 'ALL'
      if (selectedRomType !== 'ALL') {
        allDevices = allDevices.filter(device =>
          device.roms && device.roms.some(rom => rom.romType === selectedRomType && rom.status === 'Active')
        );
      }

      setDevices(allDevices);
      setLoading(false);
    } catch (err) {
      console.error('Error in main useEffect:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, [selectedBrand, selectedRomType]);

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error</h2>
          <p className="text-lg">{error}</p>
          <pre>{JSON.stringify(devices, null, 2)}</pre>
        </div>
      </div>
    );
  }

  const filteredDevices = devices.filter(device => {
    return device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           device.codename.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getOsTypeBadge = (osType: string) => {
    const colors = {
      "SleepOS": "bg-blue-500",
      "AOSP": "bg-green-500",
      "Port": "bg-purple-500",
    };
    return colors[osType as keyof typeof colors] || "bg-gray-500";
  };

  // Filter buttons for brands
  const brandFilters = [
    { id: null, label: t("download.allBrands"), active: selectedBrand === null },
    { id: "xiaomi", label: t("download.xiaomi"), active: selectedBrand === "xiaomi" },
    { id: "poco", label: t("download.poco"), active: selectedBrand === "poco" },
    { id: "redmi", label: t("download.redmi"), active: selectedBrand === "redmi" },
  ];

  // Filter buttons for ROM types
  const romTypeFilters: { id: RomTypeFilter, label: string, active: boolean }[] = [
    { id: 'ALL', label: t("download.filter.all"), active: selectedRomType === 'ALL' },
    { id: 'SleepOS', label: t("download.filter.sleepos"), active: selectedRomType === 'SleepOS' },
    { id: 'AOSP', label: t("download.filter.aosp"), active: selectedRomType === 'AOSP' },
    { id: 'Port', label: t("download.filter.port"), active: selectedRomType === 'Port' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              {t("download.title")}
            </h1>
          </motion.div>

          {/* ROM Type Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {romTypeFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={filter.active ? "default" : "outline"}
                  onClick={() => setSelectedRomType(filter.id)}
                  className="px-5 py-2 capitalize"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Brand Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {brandFilters.map((filter) => (
                <Button
                  key={filter.id || 'all'}
                  variant={filter.active ? "default" : "outline"}
                  onClick={() => setSelectedBrand(filter.id)}
                  className="px-6 py-2 capitalize"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="max-w-2xl mx-auto mb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t("download.search")}
                  className="pl-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Device List */}
        <div className="space-y-6">
          {filteredDevices.length > 0 ? (
            filteredDevices.map((device, index) => {
              // Get only active ROMs for this device
              const activeRoms = device.roms?.filter(rom => rom.status === 'Active') || [];
              
              // If a specific ROM type is selected, only show ROMs of that type
              const filteredRoms = selectedRomType === 'ALL' 
                ? activeRoms 
                : activeRoms.filter(rom => rom.romType === selectedRomType);

              return (
                <motion.div
                  key={device.codename}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                              <Smartphone className="h-7 w-7 text-white" />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <CardTitle className="text-xl mb-1">{device.name}</CardTitle>
                            <CardDescription className="text-sm">
                              <span className="font-medium">Codename:</span> {device.codename} • 
                              <span className="font-medium ml-1">Maintainer:</span> {device.maintainer}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* ROM List */}
                      <div className="space-y-4">
                        {filteredRoms.length > 0 ? (
                          filteredRoms.map((rom, romIndex) => (
                            <div 
                              key={rom.id} 
                              className={`p-4 rounded-lg border ${
                                romIndex !== filteredRoms.length - 1 ? 'mb-4' : ''
                              }`}
                            >
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h3 className="text-lg font-semibold">{rom.version}</h3>
                                    <Badge className={`${getOsTypeBadge(rom.romType)} text-white`}>
                                      {rom.romType}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <Download className="h-4 w-4 mr-2" />
                                      <span>{t("download.downloads")}: {rom.downloads}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span>{t("download.fileSize")}: {rom.size}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span>{t("download.uploadDate")}: {new Date(rom.uploadDate).toLocaleDateString()}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <Link to={`/download/${device.codename}#rom-${rom.id}`}>
                                    <Button size="sm">
                                      <Download className="h-4 w-4 mr-2" />
                                      {t("download.download")}
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">
                            {t("download.noRomsForType", { 
                              romType: selectedRomType === 'ALL' ? t("download.filter.all").toLowerCase() : selectedRomType 
                            })}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">{t("common.noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
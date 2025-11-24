import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
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

export default function Download() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedRomType, setSelectedRomType] = useState<RomTypeFilter>('ALL');

  useEffect(() => {
    const brandFromUrl = searchParams.get('brand');
    if (brandFromUrl) {
      setSelectedBrand(brandFromUrl);
    } else {
      setSelectedBrand(null);
    }
  }, [searchParams]);

  useEffect(() => {
    let allDevices = getActiveDevices();

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
        device.roms && Array.isArray(device.roms) && device.roms.some(rom => rom.romType === selectedRomType && rom.status === 'Active')
      );
    }

    setDevices(allDevices);
  }, [selectedBrand, selectedRomType]);

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
    <div className="min-h-screen py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {t("download.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your device to download the latest builds
            </p>
          </motion.div>
        </div>

        {/* Filters Bar */}
        <div className="bg-card/70 backdrop-blur-sm rounded-xl p-6 mb-8 border shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ROM Type Filters */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">ROM Type</h3>
              <div className="flex flex-wrap gap-2">
                {romTypeFilters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={filter.active ? "default" : "outline"}
                    onClick={() => setSelectedRomType(filter.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                      filter.active 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'border-muted-foreground/30'
                    }`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Brand Filters */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Device Brands</h3>
              <div className="flex flex-wrap gap-2">
                {brandFilters.map((filter) => (
                  <Button
                    key={filter.id || 'all'}
                    variant={filter.active ? "default" : "outline"}
                    onClick={() => setSelectedBrand(filter.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                      filter.active 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'border-muted-foreground/30'
                    }`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("download.search")}
                  className="pl-10 h-10 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Device Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDevices.map((device, index) => {
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
                className="h-full"
              >
                <Link to={`/download/${device.codename}`} className="block h-full">
                  <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/70 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl font-bold truncate">{device.name}</CardTitle>
                          <CardDescription className="mt-1">
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <span className="font-medium">Codename:</span> {device.codename}
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">{filteredRoms.length}</span> 
                          <span className="text-muted-foreground ml-1">ROM{filteredRoms.length !== 1 ? 's' : ''} available</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                      
                      {/* Preview of available ROMs */}
                      {filteredRoms.slice(0, 2).map((rom, romIndex) => (
                        <div key={rom.id} className="mt-3 flex items-center justify-between pt-3 border-t border-border/30">
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getOsTypeBadge(rom.romType)} text-white text-xs`}>
                              {rom.romType}
                            </Badge>
                            <span className="text-sm font-medium">{rom.version}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-muted-foreground">{rom.size}</span>
                            <span className="text-xs text-muted-foreground">by {rom.maintainer}</span>
                          </div>
                        </div>
                      ))}
                      {filteredRoms.length > 2 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          +{filteredRoms.length - 2} more ROM{filteredRoms.length - 2 !== 1 ? 's' : ''}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-20">
            <Smartphone className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No devices found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t("common.noResults")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
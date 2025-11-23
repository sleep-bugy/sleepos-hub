import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download,
  Search,
  FileText,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { Rom, Device } from "@/types";
import { getRoms, addRom, updateRom, deleteRom, getDevices } from "@/dataService";
import { useToast } from "@/hooks/use-toast";

export default function AdminRoms() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [roms, setRoms] = useState<Rom[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRom, setEditingRom] = useState<Rom | null>(null);
  const [formData, setFormData] = useState({
    deviceCodename: "",
    romType: "SleepOS" as "SleepOS" | "AOSP" | "Port",
    version: "",
    size: "",
    downloadUrl: "",
    changelog: "",
    notes: "",
    status: "Active" as "Active" | "Inactive",
  });

  useEffect(() => {
    setRoms(getRoms());
    setDevices(getDevices());
  }, []);

  const filteredRoms = roms.filter(rom => 
    rom.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rom.romType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rom.version.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRom = () => {
    try {
      const device = devices.find(d => d.codename === formData.deviceCodename);
      if (!device) {
        throw new Error("Invalid device selected");
      }
      
      const newRom = addRom({
        device: device.name,
        deviceCodename: formData.deviceCodename,
        romType: formData.romType,
        version: formData.version,
        size: formData.size,
        downloadUrl: formData.downloadUrl,
        changelog: formData.changelog,
        notes: formData.notes,
        status: formData.status,
      });
      
      setRoms([...roms, newRom]);
      toast({
        title: "Success",
        description: "ROM added successfully!",
      });
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add ROM. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateRom = () => {
    if (!editingRom) return;
    
    try {
      const updatedRom = updateRom({
        ...editingRom,
        deviceCodename: formData.deviceCodename,
        romType: formData.romType,
        version: formData.version,
        size: formData.size,
        downloadUrl: formData.downloadUrl,
        changelog: formData.changelog,
        notes: formData.notes,
        status: formData.status,
      });
      
      setRoms(roms.map(r => r.id === updatedRom.id ? updatedRom : r));
      toast({
        title: "Success",
        description: "ROM updated successfully!",
      });
      setIsDialogOpen(false);
      resetForm();
      setEditingRom(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update ROM. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRom = (id: number) => {
    try {
      const success = deleteRom(id);
      if (success) {
        setRoms(roms.filter(rom => rom.id !== id));
        toast({
          title: "Success",
          description: "ROM deleted successfully!",
        });
      } else {
        throw new Error("Failed to delete ROM");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete ROM. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (rom: Rom) => {
    setEditingRom(rom);
    setFormData({
      deviceCodename: rom.deviceCodename,
      romType: rom.romType,
      version: rom.version,
      size: rom.size,
      downloadUrl: rom.downloadUrl || "",
      changelog: rom.changelog,
      notes: rom.notes || "",
      status: rom.status,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      deviceCodename: "",
      romType: "SleepOS",
      version: "",
      size: "",
      downloadUrl: "",
      changelog: "",
      notes: "",
      status: "Active",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRom) {
      handleUpdateRom();
    } else {
      handleAddRom();
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage ROMs</h1>
            <p className="text-muted-foreground">Add, edit, and manage ROM releases</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                resetForm();
                setEditingRom(null);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add ROM
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingRom ? "Edit ROM" : "Add New ROM"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="deviceCodename" className="text-right">Device</label>
                    <select 
                      id="deviceCodename" 
                      name="deviceCodename"
                      className="col-span-3 bg-background border border-input rounded-md p-2"
                      value={formData.deviceCodename}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select a device</option>
                      {devices.map(device => (
                        <option key={device.codename} value={device.codename}>{device.name} ({device.codename})</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="romType" className="text-right">ROM Type</label>
                    <select 
                      id="romType" 
                      name="romType"
                      className="col-span-3 bg-background border border-input rounded-md p-2"
                      value={formData.romType}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="SleepOS">SleepOS</option>
                      <option value="AOSP">AOSP</option>
                      <option value="Port">Port</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="version" className="text-right">Version</label>
                    <Input 
                      id="version" 
                      name="version"
                      className="col-span-3" 
                      placeholder="e.g., v2.3.1" 
                      value={formData.version}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="size" className="text-right">File Size</label>
                    <Input 
                      id="size" 
                      name="size"
                      className="col-span-3" 
                      placeholder="e.g., 1.2 GB" 
                      value={formData.size}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="downloadUrl" className="text-right">Download URL</label>
                    <Input 
                      id="downloadUrl" 
                      name="downloadUrl"
                      className="col-span-3" 
                      placeholder="https://..." 
                      value={formData.downloadUrl}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="changelog" className="text-right pt-2">Changelog</label>
                    <Textarea 
                      id="changelog" 
                      name="changelog"
                      className="col-span-3 h-32" 
                      placeholder="# Changelog..."
                      value={formData.changelog}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="notes" className="text-right pt-2">Notes</label>
                    <Textarea 
                      id="notes" 
                      name="notes"
                      className="col-span-3 h-20" 
                      placeholder="Additional notes..."
                      value={formData.notes}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="status" className="text-right">Status</label>
                    <select 
                      id="status" 
                      name="status"
                      className="col-span-3 bg-background border border-input rounded-md p-2"
                      value={formData.status}
                      onChange={handleFormChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <Button type="submit">{editingRom ? "Update ROM" : "Add ROM"}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search ROMs..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ROM Table */}
        <Card>
          <CardHeader>
            <CardTitle>ROM Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoms.map((rom) => (
                  <TableRow key={rom.id}>
                    <TableCell className="font-medium">{rom.device}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rom.romType === "SleepOS" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
                          : rom.romType === "AOSP"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      }`}>
                        {rom.romType}
                      </span>
                    </TableCell>
                    <TableCell>{rom.version}</TableCell>
                    <TableCell>{rom.size}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      {rom.downloads.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        rom.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {rom.status}
                      </span>
                    </TableCell>
                    <TableCell>{rom.uploadDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClick(rom)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteRom(rom.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
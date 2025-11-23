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
  FileText,
  Search,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";
import { Changelog, Device } from "@/types";
import { getChangelogs, addChangelog, updateChangelog, deleteChangelog, getDevices } from "@/dataService";
import { useToast } from "@/hooks/use-toast";

export default function AdminChangelogs() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingChangelog, setEditingChangelog] = useState<Changelog | null>(null);
  const [formData, setFormData] = useState({
    device: "",
    romType: "SleepOS" as "SleepOS" | "AOSP" | "Port",
    version: "",
    date: new Date().toISOString().split('T')[0],
    changelog: "",
    status: "Draft" as "Draft" | "Published",
  });

  useEffect(() => {
    setChangelogs(getChangelogs());
    setDevices(getDevices());
  }, []);

  const filteredChangelogs = changelogs.filter(changelog => 
    changelog.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
    changelog.romType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    changelog.version.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddChangelog = () => {
    try {
      const device = devices.find(d => d.codename === formData.device);
      if (!device) {
        throw new Error("Invalid device selected");
      }
      
      const newChangelog = addChangelog({
        device: device.name,
        romType: formData.romType,
        version: formData.version,
        date: formData.date,
        changelog: formData.changelog,
        status: formData.status,
      });
      
      setChangelogs([...changelogs, newChangelog]);
      toast({
        title: "Success",
        description: "Changelog added successfully!",
      });
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add changelog. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateChangelog = () => {
    if (!editingChangelog) return;
    
    try {
      const updatedChangelog = updateChangelog({
        ...editingChangelog,
        device: formData.device,
        romType: formData.romType,
        version: formData.version,
        date: formData.date,
        changelog: formData.changelog,
        status: formData.status,
      });
      
      setChangelogs(changelogs.map(c => c.id === updatedChangelog.id ? updatedChangelog : c));
      toast({
        title: "Success",
        description: "Changelog updated successfully!",
      });
      setIsDialogOpen(false);
      resetForm();
      setEditingChangelog(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update changelog. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteChangelog = (id: number) => {
    try {
      const success = deleteChangelog(id);
      if (success) {
        setChangelogs(changelogs.filter(changelog => changelog.id !== id));
        toast({
          title: "Success",
          description: "Changelog deleted successfully!",
        });
      } else {
        throw new Error("Failed to delete changelog");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete changelog. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (changelog: Changelog) => {
    setEditingChangelog(changelog);
    setFormData({
      device: changelog.device,
      romType: changelog.romType,
      version: changelog.version,
      date: changelog.date,
      changelog: changelog.changelog,
      status: changelog.status,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      device: "",
      romType: "SleepOS",
      version: "",
      date: new Date().toISOString().split('T')[0],
      changelog: "",
      status: "Draft",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingChangelog) {
      handleUpdateChangelog();
    } else {
      handleAddChangelog();
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
            <h1 className="text-3xl font-bold">Manage Changelogs</h1>
            <p className="text-muted-foreground">Add, edit, and manage ROM changelogs</p>
          </div>
          
          <Dialog 
            open={isDialogOpen} 
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                resetForm();
                setEditingChangelog(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={() => {
                resetForm();
                setEditingChangelog(null);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Changelog
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{editingChangelog ? "Edit Changelog" : "Add New Changelog"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="device" className="text-right">Device</label>
                    <select 
                      id="device" 
                      name="device"
                      className="col-span-3 bg-background border border-input rounded-md p-2"
                      value={formData.device}
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
                    <label htmlFor="date" className="text-right">Date</label>
                    <Input 
                      id="date" 
                      name="date"
                      type="date" 
                      className="col-span-3" 
                      value={formData.date}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <label htmlFor="changelog" className="text-right pt-2">Changelog</label>
                    <Textarea 
                      id="changelog" 
                      name="changelog"
                      className="col-span-3 h-40" 
                      placeholder="# Changelog..."
                      value={formData.changelog}
                      onChange={handleFormChange}
                      required
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
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
                <Button type="submit">{editingChangelog ? "Update Changelog" : "Add Changelog"}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search changelogs..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Changelog Table */}
        <Card>
          <CardHeader>
            <CardTitle>Changelogs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChangelogs.map((changelog) => (
                  <TableRow key={changelog.id}>
                    <TableCell className="font-medium">{changelog.device}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        changelog.romType === "SleepOS" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
                          : changelog.romType === "AOSP"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      }`}>
                        {changelog.romType}
                      </span>
                    </TableCell>
                    <TableCell>{changelog.version}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {changelog.date}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        changelog.status === "Published" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                        {changelog.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClick(changelog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteChangelog(changelog.id)}
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
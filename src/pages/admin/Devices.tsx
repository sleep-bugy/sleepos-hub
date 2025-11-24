import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Smartphone,
  Search,
  Download
} from "lucide-react";
import { motion } from "framer-motion";
import { Device } from "@/types";
import { getDevices, addDevice, updateDevice, deleteDevice } from "@/dataService";
import { useToast } from "@/hooks/use-toast";

export default function AdminDevices() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    codename: "",
    status: "Active" as "Active" | "Inactive",
  });

  useEffect(() => {
    setDevices(getDevices());
  }, []);

  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.codename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDevice = () => {
    try {
      const newDevice = addDevice({
        name: formData.name,
        codename: formData.codename,
        status: formData.status as "Active" | "Inactive",
      });
      setDevices([...devices, newDevice]);
      toast({
        title: "Success",
        description: "Device added successfully!",
      });
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add device. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateDevice = () => {
    if (!editingDevice) return;
    
    try {
      const updatedDevice = updateDevice({
        ...editingDevice,
        name: formData.name,
        codename: formData.codename,
        status: formData.status as "Active" | "Inactive",
      });
      
      setDevices(devices.map(d => d.id === updatedDevice.id ? updatedDevice : d));
      toast({
        title: "Success",
        description: "Device updated successfully!",
      });
      setIsDialogOpen(false);
      resetForm();
      setEditingDevice(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update device. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDevice = (id: number) => {
    try {
      const success = deleteDevice(id);
      if (success) {
        setDevices(devices.filter(device => device.id !== id));
        toast({
          title: "Success",
          description: "Device deleted successfully!",
        });
      } else {
        throw new Error("Failed to delete device");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete device. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (device: Device) => {
    setEditingDevice(device);
    setFormData({
      name: device.name,
      codename: device.codename,
      status: device.status,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      codename: "",
      status: "Active",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDevice) {
      handleUpdateDevice();
    } else {
      handleAddDevice();
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
            <h1 className="text-3xl font-bold">Manage Devices</h1>
            <p className="text-muted-foreground">Add, edit, and manage supported devices</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                resetForm();
                setEditingDevice(null);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDevice ? "Edit Device" : "Add New Device"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">Device Name</label>
                    <Input 
                      id="name" 
                      name="name"
                      className="col-span-3" 
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="codename" className="text-right">Codename</label>
                    <Input 
                      id="codename" 
                      name="codename"
                      className="col-span-3" 
                      value={formData.codename}
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
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <Button type="submit">{editingDevice ? "Update Device" : "Add Device"}</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Device Table */}
        <Card>
          <CardHeader>
            <CardTitle>Supported Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>Codename</TableHead>
                  <TableHead>ROMs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        {device.name}
                      </div>
                    </TableCell>
                    <TableCell>{device.codename}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      {Array.isArray(device.roms) ? device.roms.length : 0}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        device.status === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {device.status}
                      </span>
                    </TableCell>
                    <TableCell>{device.lastUpdate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClick(device)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteDevice(device.id)}
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
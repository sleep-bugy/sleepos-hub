import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Mail, 
  User, 
  MessageSquare, 
  FileText,
  Check,
  X,
  Download,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { Application } from "@/types";
import { getApplications, updateApplication } from "@/dataService";
import { useToast } from "@/hooks/use-toast";

export default function AdminApplications() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const handleAcceptApplication = (id: number) => {
    try {
      const app = applications.find(a => a.id === id);
      if (!app) return;
      
      const updatedApp = updateApplication({
        ...app,
        status: "Accepted"
      });
      
      setApplications(applications.map(a => a.id === id ? updatedApp : a));
      toast({
        title: "Success",
        description: "Application accepted successfully!",
      });
      
      // Close dialog if viewing this application
      if (selectedApplication?.id === id) {
        setSelectedApplication(updatedApp);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRejectApplication = (id: number) => {
    try {
      const app = applications.find(a => a.id === id);
      if (!app) return;
      
      const updatedApp = updateApplication({
        ...app,
        status: "Rejected"
      });
      
      setApplications(applications.map(a => a.id === id ? updatedApp : a));
      toast({
        title: "Success",
        description: "Application rejected successfully!",
      });
      
      // Close dialog if viewing this application
      if (selectedApplication?.id === id) {
        setSelectedApplication(updatedApp);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Team Applications</h1>
          <p className="text-muted-foreground">Review and manage team applications</p>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applications ({applications.filter(a => a.status === 'Pending').length} pending)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Portfolio</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{app.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {app.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{app.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <a 
                        href={`https://${app.portfolio}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {app.portfolio}
                      </a>
                    </TableCell>
                    <TableCell>{app.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          app.status === "Accepted" ? "default" : 
                          app.status === "Rejected" ? "destructive" : 
                          app.status === "Reviewed" ? "secondary" :
                          "secondary"
                        }
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewApplication(app)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        {app.status === "Pending" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAcceptApplication(app.id)}
                              className="border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRejectApplication(app.id)}
                              className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Application Detail Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Name</h3>
                    <p>{selectedApplication.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p>{selectedApplication.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Role</h3>
                    <p>{selectedApplication.role}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Date</h3>
                    <p>{selectedApplication.date}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium">Portfolio</h3>
                  <a 
                    href={`https://${selectedApplication.portfolio}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {selectedApplication.portfolio}
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium">Application Message</h3>
                  <p className="mt-2 p-4 bg-muted rounded-md">{selectedApplication.message}</p>
                </div>
                
                {selectedApplication.cv && (
                  <div>
                    <h3 className="font-medium">CV/Resume</h3>
                    <a 
                      href={selectedApplication.cv} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Download CV
                    </a>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2 pt-4">
                  {selectedApplication.status === "Pending" && (
                    <>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          handleRejectApplication(selectedApplication.id);
                          setIsDialogOpen(false);
                        }}
                        className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Reject
                      </Button>
                      <Button 
                        onClick={() => {
                          handleAcceptApplication(selectedApplication.id);
                          setIsDialogOpen(false);
                        }}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Accept Application
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
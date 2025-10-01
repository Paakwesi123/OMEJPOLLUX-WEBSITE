import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, RotateCcw, AlertTriangle } from "lucide-react";

interface RecentlyDeletedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onItemRestored: () => void;
}

export const RecentlyDeletedDialog = ({ isOpen, onClose, onItemRestored }: RecentlyDeletedDialogProps) => {
  const [deletedItems, setDeletedItems] = useState({
    projects: [],
    events: [],
    services: [],
    products: [],
    form_submissions: []
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadDeletedItems = async () => {
    setLoading(true);
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const results: any = {};

      // Projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .not('deleted_at', 'is', null)
        .gte('deleted_at', thirtyDaysAgo.toISOString());
      if (projectsError) throw projectsError;
      results.projects = projectsData || [];

      // Events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .not('deleted_at', 'is', null)
        .gte('deleted_at', thirtyDaysAgo.toISOString());
      if (eventsError) throw eventsError;
      results.events = eventsData || [];

      // Services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .not('deleted_at', 'is', null)
        .gte('deleted_at', thirtyDaysAgo.toISOString());
      if (servicesError) throw servicesError;
      results.services = servicesData || [];

      // Products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .not('deleted_at', 'is', null)
        .gte('deleted_at', thirtyDaysAgo.toISOString());
      if (productsError) throw productsError;
      results.products = productsData || [];

      // Form Submissions (skip since they don't have deleted_at column)
      results.form_submissions = [];

      setDeletedItems(results);
    } catch (error) {
      console.error('Error loading deleted items:', error);
      toast({
        title: "Error",
        description: "Failed to load deleted items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadDeletedItems();
    }
  }, [isOpen]);

  const handleRestore = async (table: string, id: string) => {
    try {
      let error;
      
      if (table === 'projects') {
        ({ error } = await supabase.from('projects').update({ deleted_at: null }).eq('id', id));
      } else if (table === 'events') {
        ({ error } = await supabase.from('events').update({ deleted_at: null }).eq('id', id));
      } else if (table === 'services') {
        ({ error } = await supabase.from('services').update({ deleted_at: null }).eq('id', id));
      } else if (table === 'products') {
        ({ error } = await supabase.from('products').update({ deleted_at: null }).eq('id', id));
      } else if (table === 'form_submissions') {
        // Note: form_submissions table doesn't have deleted_at column, skip for now
        toast({
          title: "Info",
          description: "Form submissions cannot be restored",
          variant: "default"
        });
        return;
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item restored successfully"
      });

      loadDeletedItems();
      onItemRestored();
    } catch (error) {
      console.error('Error restoring item:', error);
      toast({
        title: "Error",
        description: "Failed to restore item",
        variant: "destructive"
      });
    }
  };

  const handlePermanentDelete = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to permanently delete this item? This action cannot be undone.')) {
      return;
    }

    try {
      let error;
      
      if (table === 'projects') {
        ({ error } = await supabase.from('projects').delete().eq('id', id));
      } else if (table === 'events') {
        ({ error } = await supabase.from('events').delete().eq('id', id));
      } else if (table === 'services') {
        ({ error } = await supabase.from('services').delete().eq('id', id));
      } else if (table === 'products') {
        ({ error } = await supabase.from('products').delete().eq('id', id));
      } else if (table === 'form_submissions') {
        ({ error } = await supabase.from('form_submissions').delete().eq('id', id));
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item permanently deleted"
      });

      loadDeletedItems();
    } catch (error) {
      console.error('Error permanently deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to permanently delete item",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderItems = (items: any[], table: string) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No recently deleted items
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="border-destructive/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.title || item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description && item.description.substring(0, 100)}
                    {item.description && item.description.length > 100 && '...'}
                  </p>
                </div>
                <Badge variant="destructive" className="ml-2">
                  <Trash2 className="w-3 h-3 mr-1" />
                  Deleted
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <p>Deleted: {formatDate(item.deleted_at)}</p>
                  {item.form_type && <p>Type: {item.form_type.replace('_', ' ')}</p>}
                  {item.category && <p>Category: {item.category}</p>}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRestore(table, item.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Restore
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handlePermanentDelete(table, item.id)}
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Delete Forever
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Recently Deleted Items</DialogTitle>
          <DialogDescription>
            Items deleted within the last 30 days. You can restore them or permanently delete them.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="projects">
                Projects ({deletedItems.projects.length})
              </TabsTrigger>
              <TabsTrigger value="events">
                Events ({deletedItems.events.length})
              </TabsTrigger>
              <TabsTrigger value="services">
                Services ({deletedItems.services.length})
              </TabsTrigger>
              <TabsTrigger value="products">
                Products ({deletedItems.products.length})
              </TabsTrigger>
              <TabsTrigger value="form_submissions">
                Forms ({deletedItems.form_submissions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="mt-4">
              {renderItems(deletedItems.projects, 'projects')}
            </TabsContent>

            <TabsContent value="events" className="mt-4">
              {renderItems(deletedItems.events, 'events')}
            </TabsContent>

            <TabsContent value="services" className="mt-4">
              {renderItems(deletedItems.services, 'services')}
            </TabsContent>

            <TabsContent value="products" className="mt-4">
              {renderItems(deletedItems.products, 'products')}
            </TabsContent>

            <TabsContent value="form_submissions" className="mt-4">
              {renderItems(deletedItems.form_submissions, 'form_submissions')}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ShoppingCart, Star, X, Package, CheckCircle2, Phone, Mail, MapPin, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ContactForm from "@/components/forms/ContactForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser'; // ADD THIS IMPORT

const CataloguePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const { toast } = useToast();

  const categories = ["All", "Office Supplies", "Electronics", "Stationery", "Furniture", "Technology"];

  // ADD THIS: Initialize EmailJS when component mounts
  useEffect(() => {
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('QgnM5HrjhUEhBLIe4');
  }, []);

  // Check if Paystack is loaded
  useEffect(() => {
    const checkPaystack = () => {
      if ((window as any).PaystackPop) {
        setPaystackLoaded(true);
        return true;
      }
      return false;
    };

    if (checkPaystack()) return;

    const interval = setInterval(() => {
      if (checkPaystack()) {
        clearInterval(interval);
      }
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!(window as any).PaystackPop) {
        console.error("Paystack failed to load");
        toast({
          title: "Payment Service Error",
          description: "Payment service failed to load. Please refresh the page.",
          variant: "destructive"
        });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [toast]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleOrderClick = (product: any) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!orderForm.name.trim()) {
      toast({ title: "Error", description: "Please enter your name", variant: "destructive" });
      return false;
    }
    if (!orderForm.phone.trim() || orderForm.phone.length < 10) {
      toast({ title: "Error", description: "Please enter a valid phone number", variant: "destructive" });
      return false;
    }
    if (!orderForm.email.trim() || !orderForm.email.includes("@")) {
      toast({ title: "Error", description: "Please enter a valid email address", variant: "destructive" });
      return false;
    }
    if (!orderForm.address.trim()) {
      toast({ title: "Error", description: "Please enter your address", variant: "destructive" });
      return false;
    }
    return true;
  };

  // ADD THIS: Function to send receipt email
  const sendReceiptEmail = async (orderData: {
    reference: string;
    productName: string;
    productCategory: string;
    productPrice: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
  }) => {
    try {
      const templateParams = {
        order_reference: orderData.reference,
        order_date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        product_name: orderData.productName,
        product_category: orderData.productCategory,
        product_price: orderData.productPrice.toFixed(2),
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        customer_address: orderData.customerAddress,
        payment_reference: orderData.reference
      };

      // Replace these with your actual EmailJS credentials
      const response = await emailjs.send(
        'service_00v0eu2',      // e.g., 'service_abc123'
        'template_1giyouk',     // e.g., 'template_xyz789'
        templateParams
      );

      console.log('Receipt email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send receipt email:', error);
      return false;
    }
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    if (!(window as any).PaystackPop) {
      toast({
        title: "Payment Error",
        description: "Payment service is not available. Please refresh the page and try again.",
        variant: "destructive"
      });
      return;
    }

    setProcessingPayment(true);

    try {
      const paymentCallback = (response: any) => {
        const saveOrder = async () => {
          try {
            const { error } = await supabase.from('orders').insert([{
              product_id: selectedProduct.id,
              product_name: selectedProduct.name,
              customer_name: orderForm.name,
              customer_email: orderForm.email,
              customer_phone: orderForm.phone,
              customer_address: orderForm.address,
              amount: selectedProduct.price,
              payment_reference: response.reference,
              payment_status: 'completed'
            }]);

            if (error) {
              console.error('Error saving order:', error);
              toast({ 
                title: "Payment Successful", 
                description: "Your payment was successful but order saving failed. Ref: " + response.reference,
                variant: "default"
              });
            } else {
              // ADD THIS: Send receipt email after successful order save
              const emailSent = await sendReceiptEmail({
                reference: response.reference,
                productName: selectedProduct.name,
                productCategory: selectedProduct.category,
                productPrice: selectedProduct.price,
                customerName: orderForm.name,
                customerEmail: orderForm.email,
                customerPhone: orderForm.phone,
                customerAddress: orderForm.address
              });

              toast({ 
                title: "Order Successful!", 
                description: emailSent 
                  ? "Payment processed and receipt sent to your email."
                  : "Payment processed. You'll receive a confirmation email shortly.",
                variant: "default"
              });
              
              setOrderForm({ name: "", phone: "", email: "", address: "" });
              setShowOrderForm(false);
              setSelectedProduct(null);
            }
          } catch (err) {
            console.error('Unexpected error:', err);
            toast({ 
              title: "Error", 
              description: "Unexpected error. Please contact support.",
              variant: "destructive"
            });
          }
          setProcessingPayment(false);
        };
        saveOrder();

        document.body.style.pointerEvents = "";
        document.body.style.overflow = "";
      };

      const paymentClose = () => {
        setProcessingPayment(false);
        toast({
          title: "Payment Cancelled",
          description: "You cancelled the payment.",
          variant: "destructive"
        });

        document.body.style.pointerEvents = "";
        document.body.style.overflow = "";
      };

      document.body.style.pointerEvents = "auto";
      document.body.style.overflow = "auto";

      const handler = (window as any).PaystackPop.setup({
        key: 'pk_live_f99ce79da6efbe6db9d958b9c4239049ad2021e3',
        email: orderForm.email,
        amount: selectedProduct.price * 100,
        currency: 'GHS',
        ref: 'ORD_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
          custom_fields: [
            { display_name: "Product Name", variable_name: "product_name", value: selectedProduct.name },
            { display_name: "Customer Name", variable_name: "customer_name", value: orderForm.name },
            { display_name: "Phone Number", variable_name: "phone_number", value: orderForm.phone }
          ]
        },
        callback: paymentCallback,
        onClose: paymentClose
      });

      handler.openIframe();
    } catch (error) {
      console.error('Error initializing Paystack:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive"
      });
      setProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Product Catalogue
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our comprehensive range of office supplies, electronics, and business equipment 
              to support your professional needs
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading products...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image_url || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                    {product.in_stock && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500">In Stock</Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">
                        {product.price ? `GHS ${product.price}` : "N/A"}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-muted-foreground">4.5</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      disabled={!product.in_stock}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(product);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.in_stock ? "Order Now" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct && !showOrderForm} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <Badge variant="outline">{selectedProduct.category}</Badge>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative h-80 rounded-lg overflow-hidden">
                    <img
                      src={selectedProduct.image_url || "/placeholder.png"}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-3xl font-bold text-primary">
                        GHS {selectedProduct.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold">4.5</span>
                      <span className="text-sm text-muted-foreground">(127 reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
  {/* Product Overview */}
  <div className="prose prose-slate max-w-none">
    <h3 className="text-2xl font-semibold text-foreground mb-4 border-b pb-2">
      Product Overview
    </h3>
    <p className="text-base text-muted-foreground leading-relaxed">
      {selectedProduct.description}
    </p>
  </div>

  {/* Key Features */}
  <div>
    <h3 className="text-2xl font-semibold text-foreground mb-4 border-b pb-2">
      Key Features & Benefits
    </h3>
    <div className="grid gap-3">
      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 transition-colors hover:bg-muted/50">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium text-foreground">Premium Quality</span>
          <p className="text-sm text-muted-foreground mt-0.5">
            Constructed with high-grade, durable materials for long-lasting performance
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 transition-colors hover:bg-muted/50">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium text-foreground">Professional Grade</span>
          <p className="text-sm text-muted-foreground mt-0.5">
            Engineered to meet demanding professional standards and requirements
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 transition-colors hover:bg-muted/50">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium text-foreground">Express Delivery</span>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fast shipping options available to get your order quickly
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 transition-colors hover:bg-muted/50">
        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <span className="font-medium text-foreground">Comprehensive Warranty</span>
          <p className="text-sm text-muted-foreground mt-0.5">
            Protected by manufacturer warranty for your peace of mind
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Product Information */}
  <div className="border rounded-lg p-4 bg-card">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Package className="w-5 h-5 text-muted-foreground" />
        <span className="font-medium text-foreground">Availability Status:</span>
      </div>
      <Badge 
        variant={selectedProduct.in_stock ? "default" : "destructive"}
        className="font-medium"
      >
        {selectedProduct.in_stock ? "In Stock" : "Out of Stock"}
      </Badge>
    </div>
  </div>

  {/* Call to Action */}
  <Button
    size="lg"
    className="w-full h-12 text-base font-semibold"
    disabled={!selectedProduct.in_stock}
    onClick={() => setShowOrderForm(true)}
  >
    <ShoppingCart className="w-5 h-5 mr-2" />
    {selectedProduct.in_stock ? "Proceed to Order" : "Currently Unavailable"}
  </Button>
</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Form Modal */}
      <Dialog open={showOrderForm} onOpenChange={(open) => !open && setShowOrderForm(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Complete Your Order</DialogTitle>
            <DialogDescription>
              Fill in your details and proceed to payment to complete your order for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold">{selectedProduct?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedProduct?.category}</p>
              </div>
              <p className="text-2xl font-bold text-primary">GHS {selectedProduct?.price}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={orderForm.name}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Active Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g., 0241234567"
                  value={orderForm.phone}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={orderForm.email}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address *
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your full delivery address"
                  value={orderForm.address}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">
                By clicking "Proceed to Payment", you will be redirected to Paystack to complete your payment securely.
                Your order will only be submitted after successful payment.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowOrderForm(false)}
                disabled={processingPayment}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1" 
                onClick={handlePayment}
                disabled={processingPayment || !paystackLoaded}
              >
                {processingPayment ? "Processing..." : `Pay GHS ${selectedProduct?.price}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary-foreground mb-4">
            Need Custom Solutions?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? We offer custom procurement services 
            and can source specific products to meet your unique requirements.
          </p>
          <ContactForm
            trigger={
              <Button size="lg" variant="secondary">
                Contact Our Team
              </Button>
            }
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CataloguePage;
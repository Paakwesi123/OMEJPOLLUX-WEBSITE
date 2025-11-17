import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Smartphone, ArrowLeft, Loader2 } from "lucide-react";

interface DonationFormProps {
  trigger: React.ReactNode;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

const DonationForm = ({ trigger }: DonationFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showMomoDetails, setShowMomoDetails] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    momoNumber: "",
    momoProvider: ""
  });
  const { toast } = useToast();

  const PAYSTACK_PUBLIC_KEY = "pk_live_f99ce79da6efbe6db9d958b9c4239049ad2021e3";

  // Load Paystack
  useEffect(() => {
    const checkPaystack = setInterval(() => {
      if (window.PaystackPop) {
        setPaystackLoaded(true);
        clearInterval(checkPaystack);
      }
    }, 100);
    return () => clearInterval(checkPaystack);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('form_submissions').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        form_type: 'support_donation',
        submission_category: 'project_donation',
        additional_data: { amount: formData.amount }
      }]);
      if (error) throw error;

      setShowPayment(true);
    } catch (error) {
      console.error('Error submitting donation form:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const initializePaystack = (channel: 'card' | 'mobile_money') => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }

    if (channel === 'mobile_money' && !showMomoDetails) {
      setShowMomoDetails(true);
      return;
    }

    if (!paystackLoaded) {
      toast({
        title: "Payment System Loading",
        description: "Please wait a moment and try again.",
        variant: "destructive"
      });
      return;
    }

    setPaymentLoading(true);

    const amountInPesewas = Math.round(parseFloat(formData.amount) * 100);

    const paymentConfig = {
      key: PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: amountInPesewas,
      currency: 'GHS',
      ref: 'DON-' + Date.now() + '-' + Math.floor(Math.random() * 1000000),
      channels: [channel],
      metadata: {
        custom_fields: [
          { display_name: "Donor Name", variable_name: "donor_name", value: formData.name },
          { display_name: "Phone Number", variable_name: "phone_number", value: formData.phone },
          { display_name: "Mobile Money Number", variable_name: "momo_number", value: formData.momoNumber || "N/A" },
          { display_name: "Mobile Money Provider", variable_name: "momo_provider", value: formData.momoProvider || "N/A" }
        ]
      },
      callback: function(response: any) {
        setPaymentLoading(false);
        toast({
          title: "Payment Successful!",
          description: `Thank you for your donation of GHS ${formData.amount}!`,
        });

        supabase.from('form_submissions').update({
          additional_data: {
            amount: formData.amount,
            payment_reference: response.reference,
            payment_status: 'success',
            momo_number: formData.momoNumber,
            momo_provider: formData.momoProvider
          }
        }).eq('email', formData.email)
          .eq('form_type', 'support_donation')
          .order('created_at', { ascending: false })
          .limit(1)
          .then(() => console.log('Payment reference saved'));

        // Reset form
        setFormData({ name: "", email: "", phone: "", amount: "", momoNumber: "", momoProvider: "" });
        setShowPayment(false);
        setShowMomoDetails(false);
      },
      onClose: function() {
        setPaymentLoading(false);
        toast({
          title: "Payment Cancelled",
          description: "You closed the payment window. You can try again when ready.",
        });
      }
    };

    try {
      // Close the Dialog before opening Paystack iframe
      setOpen(false);
      setTimeout(() => { // small timeout to ensure Dialog is closed
        const handler = window.PaystackPop.setup(paymentConfig);
        handler.openIframe();
      }, 100);
    } catch (error) {
      console.error('Paystack error:', error);
      setPaymentLoading(false);
      toast({
        title: "Payment Error",
        description: "Could not initialize payment. Please try again or contact support.",
        variant: "destructive"
      });
    }
  };

  const handleBack = () => {
    if (showMomoDetails) setShowMomoDetails(false);
    else setShowPayment(false);
  };

  const handleDialogChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setShowPayment(false);
      setShowMomoDetails(false);
      setFormData({ name: "", email: "", phone: "", amount: "", momoNumber: "", momoProvider: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-describedby="donation-form-description" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {showPayment ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="p-0 h-auto hover:bg-transparent"
                  disabled={paymentLoading}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                {showMomoDetails ? "Mobile Money Details" : "Complete Payment"}
              </div>
            ) : "Support Our Projects"}
          </DialogTitle>
        </DialogHeader>

        <p id="donation-form-description" className="sr-only">
          Donation form for supporting our projects.
        </p>

        {!showPayment ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input id="phone" type="tel" placeholder="+233 XX XXX XXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="amount">Donation Amount (GHS) *</Label>
              <Input id="amount" type="number" step="0.01" min="1" placeholder="e.g., 100" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required />
            </div>
            <Button onClick={handleSubmit} className="w-full" disabled={loading || !formData.name || !formData.email || !formData.phone || !formData.amount}>
              {loading ? "Submitting..." : "Continue to Payment"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {showMomoDetails ? (
              <>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Donor:</span>
                    <span className="text-sm font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Amount:</span>
                    <span className="text-lg font-bold text-green-600">GHS {formData.amount}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="momoProvider">Select Mobile Money Provider *</Label>
                    <select id="momoProvider" value={formData.momoProvider} onChange={e => setFormData({ ...formData, momoProvider: e.target.value })} className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400" required>
                      <option value="">Choose provider...</option>
                      <option value="mtn">MTN Mobile Money</option>
                      <option value="vodafone">Vodafone Cash</option>
                      <option value="airteltigo">AirtelTigo Money</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="momoNumber">Mobile Money Number *</Label>
                    <Input id="momoNumber" type="tel" placeholder="024XXXXXXX" value={formData.momoNumber} onChange={e => setFormData({ ...formData, momoNumber: e.target.value })} required />
                    <p className="text-xs text-slate-500 mt-1">Enter the number registered with your mobile money account</p>
                  </div>

                  <Button onClick={() => initializePaystack('mobile_money')} disabled={paymentLoading || !paystackLoaded || !formData.momoProvider || !formData.momoNumber} className="w-full">
                    {paymentLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2"/>Processing...</> : 'Confirm & Pay'}
                  </Button>
                </div>

                <p className="text-xs text-center text-slate-500">You will receive a prompt on your phone to approve the payment</p>
              </>
            ) : (
              <>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Donor:</span>
                    <span className="text-sm font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Amount:</span>
                    <span className="text-lg font-bold text-green-600">GHS {formData.amount}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-slate-600 text-center">Choose your payment method:</p>

                  <Button onClick={() => initializePaystack('card')} disabled={paymentLoading || !paystackLoaded} className="w-full h-auto py-4 flex items-center justify-center gap-3" variant="outline">
                    {paymentLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><CreditCard className="h-5 w-5"/>Pay with Card</>}
                  </Button>

                  <Button onClick={() => initializePaystack('mobile_money')} disabled={paymentLoading || !paystackLoaded} className="w-full h-auto py-4 flex items-center justify-center gap-3" variant="outline">
                    {paymentLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Smartphone className="h-5 w-5"/>Pay with Mobile Money</>}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonationForm;

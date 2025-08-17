import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: '',
  });

  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const deliveryCompanies = [
    { id: 'express', name: 'Express Delivery', time: '15-25 mins', fee: 3.99 },
    { id: 'standard', name: 'Standard Delivery', time: '30-45 mins', fee: 1.99 },
    { id: 'premium', name: 'Premium Delivery', time: '10-15 mins', fee: 7.99 },
  ];

  const selectedDeliveryCompany = deliveryCompanies.find(d => d.id === selectedDelivery);
  const subtotal = getTotalPrice();
  const deliveryFee = selectedDeliveryCompany?.fee || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleAddressChange = (field: string, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to place an order.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    if (!address.street || !address.city || !address.state || !address.zipCode) {
      toast({
        title: "Address required",
        description: "Please fill in all address fields.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDelivery) {
      toast({
        title: "Delivery option required",
        description: "Please select a delivery option.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      clearCart();
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${orderId} has been placed and will be delivered soon.`,
      });

      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some delicious items to your cart first!</p>
          <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Delivery Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      placeholder="State"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={address.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    placeholder="12345"
                  />
                </div>
                <div>
                  <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                  <Input
                    id="instructions"
                    value={address.instructions}
                    onChange={(e) => handleAddressChange('instructions', e.target.value)}
                    placeholder="Ring doorbell, leave at door, etc."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Delivery Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedDelivery} onValueChange={setSelectedDelivery}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery option" />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryCompanies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{company.name}</span>
                          <div className="text-right ml-4">
                            <div className="font-medium">${company.fee.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">{company.time}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="cash">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
                {paymentMethod === 'card' && (
                  <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Payment processing will be handled securely by our payment provider.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing this order, you agree to our terms and conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
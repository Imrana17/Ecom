import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Package, Truck, CheckCircle2, Eye } from 'lucide-react';

const Orders = () => {
  // Mock order data - would come from API
  const orders = [
    {
      id: 'ORD123456',
      date: '2024-01-15',
      status: 'delivered',
      total: 45.99,
      items: [
        { name: 'Truffle Pasta', quantity: 1, price: 24.99 },
        { name: 'Caesar Salad', quantity: 1, price: 14.99 },
      ],
      deliveryCompany: 'Express Delivery',
      estimatedDelivery: '25-30 mins',
    },
    {
      id: 'ORD123457',
      date: '2024-01-14',
      status: 'in_transit',
      total: 32.99,
      items: [
        { name: 'Wagyu Burger', quantity: 1, price: 32.99 },
      ],
      deliveryCompany: 'Standard Delivery',
      estimatedDelivery: '15 mins',
    },
    {
      id: 'ORD123458',
      date: '2024-01-12',
      status: 'preparing',
      total: 58.97,
      items: [
        { name: 'Grilled Salmon', quantity: 2, price: 28.99 },
      ],
      deliveryCompany: 'Premium Delivery',
      estimatedDelivery: '20 mins',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'in_transit':
        return 'warning';
      case 'preparing':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'in_transit':
        return <Truck className="h-4 w-4" />;
      case 'preparing':
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in_transit':
        return 'In Transit';
      case 'preparing':
        return 'Preparing';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Button asChild>
            <Link to="/menu">Order Again</Link>
          </Button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders yet. Start by browsing our delicious menu!
            </p>
            <Button asChild>
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="shadow-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={getStatusColor(order.status) as any}
                        className="flex items-center space-x-1"
                      >
                        {getStatusIcon(order.status)}
                        <span>{getStatusText(order.status)}</span>
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="flex justify-between items-center text-sm text-muted-foreground border-t pt-4">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4" />
                        <span>{order.deliveryCompany}</span>
                      </div>
                      {order.status !== 'delivered' && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>ETA: {order.estimatedDelivery}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/orders/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      {(order.status === 'in_transit' || order.status === 'preparing') && (
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/track/${order.id}`}>
                            <Truck className="h-4 w-4 mr-2" />
                            Track Order
                          </Link>
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
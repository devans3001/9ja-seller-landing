import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingAddress: string;
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      items: [
        { name: 'Premium Widget', quantity: 2, price: 49.99 }
      ],
      total: 99.98,
      status: 'pending',
      orderDate: '2024-01-15',
      shippingAddress: '123 Main St, City, State 12345'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      },
      items: [
        { name: 'Deluxe Gadget', quantity: 1, price: 79.99 },
        { name: 'Standard Tool', quantity: 2, price: 29.99 }
      ],
      total: 139.97,
      status: 'shipped',
      orderDate: '2024-01-14',
      shippingAddress: '456 Oak Ave, City, State 12345'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike@example.com'
      },
      items: [
        { name: 'Standard Tool', quantity: 3, price: 29.99 }
      ],
      total: 89.97,
      status: 'delivered',
      orderDate: '2024-01-13',
      shippingAddress: '789 Pine Rd, City, State 12345'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Handle status update logic here
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage your customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div>
                  <h3 className="font-semibold text-foreground">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.orderDate}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">${order.total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Customer</h4>
                <p className="text-sm text-foreground">{order.customer.name}</p>
                <p className="text-sm text-muted-foreground">{order.customer.email}</p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Shipping Address</h4>
                <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-foreground mb-2">Items</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-muted-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                to={`/orders/${order.id}`}
                className="px-4 py-2 text-center border border-border rounded-md text-foreground hover:bg-secondary transition-colors"
              >
                View Details
              </Link>
              {order.status === 'pending' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'processing')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Mark as Processing
                </button>
              )}
              {order.status === 'processing' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'shipped')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Mark as Shipped
                </button>
              )}
              {order.status === 'shipped' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'delivered')}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Orders will appear here when customers make purchases'
            }
          </p>
        </div>
      )}
    </div>
  );
}
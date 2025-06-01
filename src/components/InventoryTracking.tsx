
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ArrowRight, Clock } from 'lucide-react';

const InventoryTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const inventoryItems = [
    {
      id: 'INV001',
      name: 'Organic Bananas',
      category: 'Fruits',
      quantity: 45,
      location: 'Warehouse A-1',
      status: 'In Stock',
      expiryDate: '2024-01-20',
      lastMoved: '2024-01-15',
      supplier: 'Fresh Farms Ltd',
      batchNumber: 'BN001',
    },
    {
      id: 'INV002',
      name: 'Whole Milk',
      category: 'Dairy',
      quantity: 8,
      location: 'Cold Storage B',
      status: 'Low Stock',
      expiryDate: '2024-01-18',
      lastMoved: '2024-01-14',
      supplier: 'Daily Fresh Co',
      batchNumber: 'ML002',
    },
    {
      id: 'INV003',
      name: 'Fresh Bread',
      category: 'Bakery',
      quantity: 25,
      location: 'Shelf C-3',
      status: 'In Stock',
      expiryDate: '2024-01-17',
      lastMoved: '2024-01-16',
      supplier: 'Baker\'s Best',
      batchNumber: 'BR003',
    },
    {
      id: 'INV004',
      name: 'Chicken Breast',
      category: 'Meat',
      quantity: 0,
      location: 'Cold Storage A',
      status: 'Out of Stock',
      expiryDate: '2024-01-19',
      lastMoved: '2024-01-13',
      supplier: 'Prime Meats',
      batchNumber: 'CB004',
    },
  ];

  const movementHistory = [
    {
      id: 1,
      item: 'Organic Bananas',
      action: 'Moved',
      from: 'Warehouse A-1',
      to: 'Shelf B-2',
      quantity: 20,
      user: 'John Doe',
      timestamp: '2024-01-16 14:30',
    },
    {
      id: 2,
      item: 'Whole Milk',
      action: 'Added',
      from: 'Supplier',
      to: 'Cold Storage B',
      quantity: 50,
      user: 'Jane Smith',
      timestamp: '2024-01-16 09:15',
    },
    {
      id: 3,
      item: 'Fresh Bread',
      action: 'Sold',
      from: 'Shelf C-3',
      to: 'Customer',
      quantity: 10,
      user: 'System',
      timestamp: '2024-01-16 11:45',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return { text: 'Expired', color: 'bg-red-100 text-red-800' };
    if (diffDays <= 2) return { text: `${diffDays}d left`, color: 'bg-red-100 text-red-800' };
    if (diffDays <= 7) return { text: `${diffDays}d left`, color: 'bg-yellow-100 text-yellow-800' };
    return { text: `${diffDays}d left`, color: 'bg-green-100 text-green-800' };
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Tracking</h2>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in stock">In Stock</SelectItem>
                  <SelectItem value="low stock">Low Stock</SelectItem>
                  <SelectItem value="out of stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Items */}
        <Card>
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const expiryStatus = getExpiryStatus(item.expiryDate);
                
                return (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.category} • ID: {item.id}</p>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-medium">{item.quantity} units</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-medium">{item.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Supplier</p>
                        <p className="font-medium">{item.supplier}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Batch</p>
                        <p className="font-medium">{item.batchNumber}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <Badge className={expiryStatus.color}>
                        {expiryStatus.text}
                      </Badge>
                      <p className="text-xs text-gray-500">
                        Last moved: {item.lastMoved}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Movement History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Movement History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movementHistory.map((movement) => (
                <div key={movement.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{movement.item}</h4>
                    <Badge variant="outline">{movement.action}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <span>{movement.from}</span>
                    <ArrowRight className="w-4 h-4" />
                    <span>{movement.to}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Quantity: <strong>{movement.quantity}</strong></span>
                    <span className="text-gray-500">by {movement.user}</span>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-1">{movement.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryTracking;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Upload, Plus, FileText } from 'lucide-react';

interface InventoryEntryProps {
  userRole: string;
}

const InventoryEntry: React.FC<InventoryEntryProps> = ({ userRole }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    quantity: '',
    location: '',
    supplier: '',
    expiryDate: '',
    batchNumber: '',
    costPrice: '',
    sellingPrice: '',
    description: '',
  });

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      itemName: 'Organic Bananas',
      quantity: '100 kg',
      submittedBy: 'John Doe',
      submittedAt: '2024-01-15 10:30 AM',
      status: 'pending',
    },
    {
      id: 2,
      itemName: 'Fresh Milk',
      quantity: '50 liters',
      submittedBy: 'Jane Smith',
      submittedAt: '2024-01-15 09:15 AM',
      status: 'pending',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemName || !formData.category || !formData.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: userRole === 'maker' 
        ? "Inventory entry submitted for approval" 
        : "Inventory entry added successfully",
    });

    // Reset form
    setFormData({
      itemName: '',
      category: '',
      quantity: '',
      location: '',
      supplier: '',
      expiryDate: '',
      batchNumber: '',
      costPrice: '',
      sellingPrice: '',
      description: '',
    });
  };

  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    setPendingApprovals(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' } : item
      )
    );
    
    toast({
      title: "Success",
      description: `Item ${action}d successfully`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Entry</h2>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entry Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add New Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <Input
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="meat">Meat & Poultry</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                  </label>
                  <Input
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g., 50 kg, 100 units"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="shelf">Shelf</SelectItem>
                      <SelectItem value="cold-storage">Cold Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                  </label>
                  <Input
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    placeholder="Supplier name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <Input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Batch Number
                  </label>
                  <Input
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    placeholder="Batch/Lot number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Price
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional notes or description"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                {userRole === 'maker' ? 'Submit for Approval' : 'Add Item'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Pending Approvals (for Checkers) */}
        {userRole === 'checker' && (
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingApprovals
                  .filter(item => item.status === 'pending')
                  .map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium">{item.itemName}</h4>
                      <p className="text-sm text-gray-600">{item.quantity}</p>
                      <p className="text-xs text-gray-500">
                        by {item.submittedBy} at {item.submittedAt}
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(item.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleApproval(item.id, 'reject')}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                
                {pendingApprovals.filter(item => item.status === 'pending').length === 0 && (
                  <p className="text-gray-500 text-center py-4">No pending approvals</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Entries */}
        {userRole !== 'checker' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Organic Apples', status: 'approved', time: '1 hour ago' },
                  { name: 'Fresh Lettuce', status: 'pending', time: '2 hours ago' },
                  { name: 'Chicken Breast', status: 'approved', time: '3 hours ago' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                    <Badge variant={item.status === 'approved' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InventoryEntry;

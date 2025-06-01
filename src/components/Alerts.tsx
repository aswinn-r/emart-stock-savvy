
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Package, Mail, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Alerts: React.FC = () => {
  const alerts = [
    {
      id: 1,
      type: 'expiry',
      title: 'Items Expiring Soon',
      message: 'Organic Yogurt (12 units) expires in 1 day',
      priority: 'high',
      timestamp: '2024-01-16 09:30',
      status: 'active',
    },
    {
      id: 2,
      type: 'low_stock',
      title: 'Low Stock Alert',
      message: 'Whole Milk has only 5 units remaining',
      priority: 'medium',
      timestamp: '2024-01-16 08:15',
      status: 'active',
    },
    {
      id: 3,
      type: 'expiry',
      title: 'Expired Items',
      message: 'Fresh Berries (8 units) have expired',
      priority: 'critical',
      timestamp: '2024-01-16 07:00',
      status: 'active',
    },
    {
      id: 4,
      type: 'damaged',
      title: 'Damaged Goods',
      message: 'Broken glass bottles reported in Aisle 3',
      priority: 'high',
      timestamp: '2024-01-15 16:45',
      status: 'resolved',
    },
    {
      id: 5,
      type: 'low_stock',
      title: 'Out of Stock',
      message: 'Chicken Breast is completely out of stock',
      priority: 'critical',
      timestamp: '2024-01-15 14:20',
      status: 'active',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'expiry': return Clock;
      case 'low_stock': return Package;
      case 'damaged': return AlertTriangle;
      default: return Bell;
    }
  };

  const handleResolve = (alertId: number) => {
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved",
    });
  };

  const handleSendEmail = (alertId: number) => {
    toast({
      title: "Email Sent",
      description: "Alert notification has been sent via email",
    });
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Email All
          </Button>
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-900">
                  {activeAlerts.filter(a => a.priority === 'critical').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">High Priority</p>
                <p className="text-2xl font-bold text-orange-900">
                  {activeAlerts.filter(a => a.priority === 'high').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Resolved Today</p>
                <p className="text-2xl font-bold text-green-900">{resolvedAlerts.length}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Active Alerts ({activeAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                
                return (
                  <div key={alert.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <h4 className="font-medium">{alert.title}</h4>
                      </div>
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendEmail(alert.id)}
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {activeAlerts.length === 0 && (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No active alerts</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Resolved Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-green-600" />
              Recently Resolved ({resolvedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resolvedAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                
                return (
                  <div key={alert.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-gray-400" />
                        <h4 className="font-medium text-gray-700">{alert.title}</h4>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Resolved
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium">Expiry Warnings</h4>
              <p className="text-sm text-gray-600">Alert when items expire within:</p>
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">1 day</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">3 days</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">1 week</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Stock Levels</h4>
              <p className="text-sm text-gray-600">Alert when stock falls below:</p>
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">10 units</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">5 units</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Out of stock</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Notification Methods</h4>
              <p className="text-sm text-gray-600">Send alerts via:</p>
              <div className="space-y-1">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">SMS</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">In-app notifications</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;

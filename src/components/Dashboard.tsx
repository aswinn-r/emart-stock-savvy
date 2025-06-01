
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, AlertTriangle, TrendingUp, Clock } from 'lucide-react';

interface DashboardProps {
  userRole: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const stockData = [
    { category: 'Fruits', warehouse: 450, shelf: 120 },
    { category: 'Vegetables', warehouse: 380, shelf: 95 },
    { category: 'Dairy', warehouse: 250, shelf: 80 },
    { category: 'Meat', warehouse: 180, shelf: 45 },
    { category: 'Beverages', warehouse: 320, shelf: 110 },
  ];

  const expiryData = [
    { name: 'Today', value: 12, color: '#ef4444' },
    { name: 'Tomorrow', value: 8, color: '#f97316' },
    { name: '3 Days', value: 15, color: '#eab308' },
    { name: 'Week+', value: 165, color: '#22c55e' },
  ];

  const metrics = [
    {
      title: 'Total Items',
      value: '2,847',
      change: '+12%',
      icon: Package,
      color: 'blue',
    },
    {
      title: 'Low Stock Alerts',
      value: '23',
      change: '-5%',
      icon: AlertTriangle,
      color: 'orange',
    },
    {
      title: 'Expiring Soon',
      value: '35',
      change: '+8%',
      icon: Clock,
      color: 'red',
    },
    {
      title: 'Monthly Growth',
      value: '15.7%',
      change: '+3.2%',
      icon: TrendingUp,
      color: 'green',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
        <p className="text-blue-100">Here's what's happening with your inventory today.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <Badge variant={metric.change.startsWith('+') ? 'default' : 'secondary'} className="mt-1">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg bg-${metric.color}-100`}>
                    <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Levels Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Levels by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Bar dataKey="warehouse" fill="#3b82f6" name="Warehouse" />
                <Bar dataKey="shelf" fill="#93c5fd" name="Shelf" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expiry Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Items by Expiry Date</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expiryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {expiryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expiryData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Stock Added', item: 'Organic Apples', quantity: '50 kg', time: '2 hours ago', user: 'John Doe' },
              { action: 'Low Stock Alert', item: 'Whole Milk', quantity: '5 units left', time: '4 hours ago', user: 'System' },
              { action: 'Inventory Check', item: 'Fresh Bread', quantity: '25 loaves', time: '6 hours ago', user: 'Jane Smith' },
              { action: 'Expiry Warning', item: 'Yogurt Cups', quantity: '12 units', time: '8 hours ago', user: 'System' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item} - {activity.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <p className="text-xs text-gray-400">by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

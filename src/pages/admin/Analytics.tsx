import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, DollarSign, Clock, TrendingUp } from 'lucide-react';

const revenueData = [
  { date: '2024-01', revenue: 4800, bookings: 65 },
  { date: '2024-02', revenue: 5600, bookings: 78 },
  { date: '2024-03', revenue: 6200, bookings: 82 },
];

const spaceUtilization = [
  { name: 'Meeting Rooms', value: 35 },
  { name: 'Private Offices', value: 25 },
  { name: 'Hot Desks', value: 20 },
  { name: 'Event Spaces', value: 20 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

function AnalyticCard({ title, value, change, icon: Icon, details }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}% vs last month
        </p>
        {details && <p className="text-sm text-gray-500">{details}</p>}
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-1">Comprehensive overview of your business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticCard
          title="Total Revenue"
          value="$16,600"
          change={10.7}
          icon={DollarSign}
          details="Last 3 months"
        />
        <AnalyticCard
          title="Total Bookings"
          value="225"
          change={5.1}
          icon={Users}
          details="Last 3 months"
        />
        <AnalyticCard
          title="Average Occupancy"
          value="75%"
          change={9.3}
          icon={Clock}
          details="This month"
        />
        <AnalyticCard
          title="Growth Rate"
          value="12.5%"
          change={2.4}
          icon={TrendingUp}
          details="Year over year"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue & Bookings Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" name="Revenue ($)" />
                <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#10B981" name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Space Utilization</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spaceUtilization}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value}%)`}
                >
                  {spaceUtilization.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Time Slots</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { time: '9-11', bookings: 45 },
                { time: '11-13', bookings: 65 },
                { time: '13-15', bookings: 85 },
                { time: '15-17', bookings: 70 },
                { time: '17-19', bookings: 40 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Member Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { month: 'Jan', members: 120 },
                { month: 'Feb', members: 135 },
                { month: 'Mar', members: 156 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="members" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
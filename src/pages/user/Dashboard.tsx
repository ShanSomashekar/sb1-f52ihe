import { useState } from 'react';
import { Calendar, Clock, CreditCard } from 'lucide-react';

interface Booking {
  id: number;
  space_name: string;
  start_time: string;
  end_time: string;
  status: string;
}

function Dashboard() {
  const [upcomingBookings] = useState<Booking[]>([
    {
      id: 1,
      space_name: 'Conference Room A',
      start_time: '2024-03-15T09:00:00',
      end_time: '2024-03-15T11:00:00',
      status: 'confirmed',
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-500 mt-1">Here's an overview of your workspace activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Upcoming Bookings</p>
              <h3 className="text-xl font-semibold mt-1">3</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Hours Used</p>
              <h3 className="text-xl font-semibold mt-1">24h</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-50 p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Outstanding Balance</p>
              <h3 className="text-xl font-semibold mt-1">$120</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Bookings</h2>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Space
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.space_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.start_time).toLocaleString()} - {new Date(booking.end_time).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
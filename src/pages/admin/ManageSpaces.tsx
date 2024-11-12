import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import api from '@/api/axios';
import { Space } from '@/types/space';
// import SpaceCard from '@/components/spaces/SpaceCard';

function ManageSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await api.get('/spaces');
        const spacesData = response.data.map((space: any) => ({
          ...space,
          Amenities: typeof space.Amenities === 'string' ? 
            JSON.parse(space.Amenities) : 
            (Array.isArray(space.Amenities) ? space.Amenities : []),
          price_plans: typeof space.price_plans === 'string' ? 
            JSON.parse(space.price_plans) : 
            (Array.isArray(space.price_plans) ? space.price_plans : [])
        }));
        setSpaces(spacesData);
      } catch (error: any) {
        console.error('Error fetching spaces:', error);
        setError(error.response?.data?.message || 'Failed to load spaces. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const handleEdit = (space: Space) => {
    // TODO: Implement edit functionality
    console.log('Edit space:', space);
  };

  const handleDelete = async (spaceId: number) => {
    if (!window.confirm('Are you sure you want to delete this space?')) {
      return;
    }

    try {
      await api.delete(`/spaces/${spaceId}`);
      setSpaces(spaces.filter(space => space.SpaceID !== spaceId));
    } catch (error: any) {
      console.error('Error deleting space:', error);
      alert(error.response?.data?.message || 'Failed to delete space. Please try again later.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Spaces</h1>
          <p className="text-gray-500 mt-1">Add and manage your coworking spaces</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Space
        </button>
      </div>

      {spaces.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No spaces available. Add your first space to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <SpaceCard
              key={space.SpaceID}
              space={space}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageSpaces;
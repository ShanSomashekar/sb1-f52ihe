import { Pencil, Trash2 } from 'lucide-react';
import { Space } from '@/types/space';
import SpaceAmenities from './SpaceAmenities';
import SpacePricePlans from './SpacePricePlans';

interface SpaceCardProps {
  space: Space;
  onEdit: (space: Space) => void;
  onDelete: (spaceId: number) => void;
}

function SpaceCard({ space, onEdit, onDelete }: SpaceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img 
          src={`https://source.unsplash.com/featured/?office,${space.Type}`}
          alt={space.Name}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
          space.OccupationStatus ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {space.OccupationStatus ? 'Occupied' : 'Available'}
        </span>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{space.Name}</h3>
            <p className="text-sm text-gray-500 mt-1">{space.Location}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(space)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onDelete(space.SpaceID)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Type:</span>
            <span className="ml-2">{space.Type}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Capacity:</span>
            <span className="ml-2">{space.Capacity} people</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Floor:</span>
            <span className="ml-2">{space.FloorPlan}</span>
          </div>
        </div>

        <SpacePricePlans plans={space.price_plans} />
        <SpaceAmenities amenities={space.Amenities} />
      </div>
    </div>
  );
}
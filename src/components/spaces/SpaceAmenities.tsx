import { Wifi, Coffee, Printer, Video } from 'lucide-react';

const amenityIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Coffee': Coffee,
  'Printer': Printer,
  'Video Conference': Video,
};

interface SpaceAmenitiesProps {
  amenities: string[];
}

function SpaceAmenities({ amenities }: SpaceAmenitiesProps) {
  if (!Array.isArray(amenities) || amenities.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Amenities</p>
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity) => {
          const Icon = amenityIcons[amenity];
          return (
            <div 
              key={amenity}
              className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
            >
              {Icon && <Icon className="w-4 h-4 mr-1" />}
              {amenity}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpaceAmenities;
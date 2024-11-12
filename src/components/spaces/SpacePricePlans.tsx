import { PricePlan } from '@/types/space';

interface SpacePricePlansProps {
  plans: PricePlan[];
}

function SpacePricePlans({ plans }: SpacePricePlansProps) {
  if (!Array.isArray(plans) || plans.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Price Plans</p>
      <div className="space-y-2">
        {plans.map((plan, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{plan.duration}</span>
            <span className="font-medium">${plan.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpacePricePlans;
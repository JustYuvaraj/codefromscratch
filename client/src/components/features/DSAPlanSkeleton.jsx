import Shimmer from '../ui/Shimmer';

export default function DSAPlanSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <Shimmer className="w-3/4 sm:w-1/2 h-10 mb-4 sm:mb-8 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Shimmer key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <Shimmer className="w-2/3 sm:w-1/3 h-8 mb-6 rounded-lg" />
        <div className="grid gap-4 sm:gap-6">
          {[...Array(5)].map((_, i) => (
            <Shimmer key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
} 
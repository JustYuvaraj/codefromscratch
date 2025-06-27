import Shimmer from '../components/ui/Shimmer';

export default function LeaderboardSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-8 py-8">
      <Shimmer className="w-3/4 sm:w-1/2 h-10 mb-6 sm:mb-8 rounded-xl" />
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-center gap-4">
            <Shimmer className="w-10 h-10 rounded-full" />
            <Shimmer className="w-2/3 sm:w-1/4 h-6 rounded-lg" />
            <Shimmer className="w-1/2 sm:w-1/6 h-6 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
} 
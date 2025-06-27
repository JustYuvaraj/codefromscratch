import Shimmer from '../components/ui/Shimmer';

export default function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-8 py-8 flex flex-col gap-8">
      {/* User Stats & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Stats Block */}
        <div className="bg-white/5 rounded-2xl shadow-lg border border-white/10 p-6 flex flex-col gap-4">
          <Shimmer className="w-1/2 h-7 mb-2 rounded-lg" />
          <div className="flex flex-wrap gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Shimmer className="w-10 h-8 rounded" />
                <Shimmer className="w-8 h-3 rounded" />
              </div>
            ))}
          </div>
        </div>
        {/* Recommendations Block */}
        <div className="bg-white/5 rounded-2xl shadow-lg border border-white/10 p-6 flex flex-col gap-4">
          <Shimmer className="w-1/2 h-7 mb-2 rounded-lg" />
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <Shimmer className="w-32 h-5 rounded" />
                <Shimmer className="w-16 h-4 rounded" />
                <Shimmer className="w-16 h-4 rounded" />
                <Shimmer className="w-40 h-4 rounded" />
                <Shimmer className="w-full sm:w-32 h-2 rounded-full mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Daily Challenge */}
      <div className="bg-white/5 rounded-2xl shadow-lg border border-white/10 p-6 flex flex-col gap-3 max-w-2xl mx-auto">
        <Shimmer className="w-1/3 h-7 mb-2 rounded-lg" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <Shimmer className="w-32 h-5 rounded" />
          <Shimmer className="w-16 h-4 rounded" />
          <Shimmer className="w-16 h-4 rounded" />
          <Shimmer className="w-40 h-4 rounded" />
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          <Shimmer className="w-20 h-4 rounded" />
          <Shimmer className="w-24 h-4 rounded" />
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
          <Shimmer className="w-1/3 h-7 rounded-lg" />
          <Shimmer className="w-20 h-4 rounded" />
        </div>
        <div className="grid gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <Shimmer className="w-32 h-5 rounded" />
              <Shimmer className="w-16 h-4 rounded" />
              <Shimmer className="w-16 h-4 rounded" />
              <Shimmer className="w-24 h-4 rounded" />
              <Shimmer className="w-16 h-4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
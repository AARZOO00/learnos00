import { SkeletonCard } from '@/components/ui/SkeletonCard'

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      {/* Sidebar skeleton */}
      <div
        className="hidden md:flex fixed left-0 top-0 h-full w-[240px] flex-col gap-2 p-4 border-r"
        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
      >
        <div className="h-8 w-32 rounded-lg mb-6 animate-pulse" style={{ backgroundColor: '#1e1e2e' }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-full rounded-xl animate-pulse" style={{ backgroundColor: '#1e1e2e' }} />
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 md:ml-[240px] p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Hero tile skeleton */}
            <div
              className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl p-6 animate-pulse"
              style={{ backgroundColor: '#111118', border: '1px solid #1e1e2e', minHeight: '180px' }}
            >
              <div className="h-8 w-64 rounded-lg mb-3" style={{ backgroundColor: '#1e1e2e' }} />
              <div className="h-4 w-80 rounded-lg mb-6" style={{ backgroundColor: '#1e1e2e' }} />
              <div className="flex gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 w-36 rounded-xl" style={{ backgroundColor: '#1e1e2e' }} />
                ))}
              </div>
            </div>

            {/* Course tile skeletons */}
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}

            {/* Activity tile skeleton */}
            <div
              className="col-span-1 md:col-span-2 rounded-2xl p-6 animate-pulse"
              style={{ backgroundColor: '#111118', border: '1px solid #1e1e2e', minHeight: '200px' }}
            >
              <div className="h-6 w-40 rounded-lg mb-4" style={{ backgroundColor: '#1e1e2e' }} />
              <div className="grid grid-cols-7 gap-2">
                {[...Array(28)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-md" style={{ backgroundColor: '#1e1e2e' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

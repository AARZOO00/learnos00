import { SkeletonCard } from '@/components/ui/SkeletonCard'

export default function LoadingPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-5">
      {/* Hero skeleton */}
      <div style={{ background: '#0b1120', border: '1px solid #1a2540', borderRadius: '16px', padding: '32px', height: '180px' }} />
      {/* Course skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[0,1,2,3].map(i => <SkeletonCard key={i} />)}
      </div>
      {/* Activity skeleton */}
      <div style={{ background: '#0b1120', border: '1px solid #1a2540', borderRadius: '16px', padding: '24px', height: '220px' }} />
    </div>
  )
}

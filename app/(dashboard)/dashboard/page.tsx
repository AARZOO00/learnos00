import { Suspense } from 'react'
import { BentoGrid } from '@/components/ui/BentoGrid'
import { SkeletonCard } from '@/components/ui/SkeletonCard'
import { Course } from '@/lib/types'
import { supabase } from '@/lib/supabase'

async function getCourses(): Promise<{ courses: Course[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      return { courses: [], error: error.message }
    }

    return { courses: (data as Course[]) || [], error: null }
  } catch (e: unknown) {
    return {
      courses: [],
      error: e instanceof Error ? e.message : 'Unknown error',
    }
  }
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div
        style={{
          background: '#0b1120',
          border: '1px solid #1a2540',
          borderRadius: '16px',
          height: '200px',
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      <div
        style={{
          background: '#0b1120',
          border: '1px solid #1a2540',
          borderRadius: '16px',
          height: '240px',
        }}
      />
    </div>
  )
}

async function DashboardContent() {
  const { courses, error } = await getCourses()

  return <BentoGrid courses={courses} error={error} />
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase'
import { Course } from '@/lib/types'
import { BentoGrid } from '@/components/ui/BentoGrid'
import { Sidebar } from '@/components/dashboard/Sidebar'
import LoadingPage from './loading'

export default async function DashboardPage() {
  let courses: Course[] = []
  let fetchError: string | null = null

  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at')

    if (error) {
      fetchError = error.message
    } else {
      courses = data ?? []
    }
  } catch (err) {
    fetchError = err instanceof Error ? err.message : 'Failed to connect to database'
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <Suspense fallback={<LoadingPage />}>
        <BentoGrid courses={courses} error={fetchError} />
      </Suspense>
    </div>
  )
}

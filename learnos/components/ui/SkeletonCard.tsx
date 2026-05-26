export function SkeletonCard() {
  return (
    <div
      className="rounded-2xl p-6 animate-pulse"
      style={{
        backgroundColor: '#111118',
        border: '1px solid #1e1e2e',
      }}
    >
      {/* Icon circle */}
      <div
        className="w-10 h-10 rounded-xl mb-4"
        style={{ backgroundColor: '#252535' }}
      />

      {/* Title bar */}
      <div
        className="h-5 w-3/4 rounded-lg mb-2"
        style={{ backgroundColor: '#252535' }}
      />

      {/* Subtitle bar */}
      <div
        className="h-3 w-1/2 rounded-lg mb-6"
        style={{ backgroundColor: '#1e1e2e' }}
      />

      {/* Progress track */}
      <div
        className="h-1.5 w-full rounded-full mb-2"
        style={{ backgroundColor: '#1e1e2e' }}
      >
        <div
          className="h-full w-2/3 rounded-full"
          style={{ backgroundColor: '#252535' }}
        />
      </div>

      {/* Progress label */}
      <div
        className="h-3 w-12 rounded-lg mt-3"
        style={{ backgroundColor: '#1e1e2e' }}
      />
    </div>
  )
}

export default SkeletonCard

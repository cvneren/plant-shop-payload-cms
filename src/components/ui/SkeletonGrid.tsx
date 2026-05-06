import React from 'react'

const SkeletonCard = () => (
  <div className="flex flex-col w-full">
    {/* Image Container Skeleton */}
    <div className="relative aspect-square mb-4 overflow-hidden rounded-xl animate-shimmer shadow-ambient" />
    
    {/* Info Skeletons */}
    <div className="px-1 flex-grow flex flex-col gap-2">
      {/* Title */}
      <div className="h-6 w-3/4 animate-shimmer rounded-md" />
      
      {/* Scientific Name */}
      <div className="h-4 w-1/2 animate-shimmer rounded-md mb-2" />
      
      {/* Pill Tags */}
      <div className="flex gap-2 mb-2">
        <div className="h-6 w-20 animate-shimmer rounded-full" />
        <div className="h-6 w-24 animate-shimmer rounded-full" />
      </div>
      
      {/* Price */}
      <div className="h-5 w-16 animate-shimmer rounded-md mt-auto" />
    </div>
  </div>
)

interface SkeletonGridProps {
  count?: number
  cols?: number
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 6, cols = 3 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-10`}>
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default SkeletonGrid

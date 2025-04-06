"use client"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50">
      <video
        className="w-full h-full object-cover"
        src="/videos/intro3.mp4"
        autoPlay
        loop
        muted
      />
    </div>
  )
}

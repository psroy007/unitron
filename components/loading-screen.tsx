"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Video for desktop view */}
      <video
        className="hidden sm:block w-auto h-auto max-w-full max-h-full object-cover sm:scale-100"
        src="/videos/spider_load.mp4"
        autoPlay
        loop
        muted
        preload="auto" // Preload the video
      />
      {/* Video for mobile view */}
      <video
        className="block sm:hidden w-auto h-auto max-w-full max-h-full object-cover scale-125"
        src="/videos/loading_vishal.mp4"
        autoPlay
        loop
        muted
        preload="auto" // Preload the video
      />
    </div>
  );
}

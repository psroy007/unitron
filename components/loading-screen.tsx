"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Video for desktop view */}
      <video
        className="hidden sm:block w-auto h-auto max-w-full max-h-full object-cover sm:scale-100"
        src="/videos/intro3.mp4"
        autoPlay
        loop
        muted
      />
      {/* Video for mobile view */}
      <video
        className="block sm:hidden w-auto h-auto max-w-full max-h-full object-cover scale-125"
        src="/videos/loading-mobile.mp4"
        autoPlay
        loop
        muted
      />
    </div>
  );
}

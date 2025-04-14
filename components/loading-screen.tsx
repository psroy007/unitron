"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <video
        className="w-auto h-auto max-w-full max-h-full object-cover sm:scale-100 scale-125" // Adjusted scaling and added constraints
        src="/videos/loading-mobile.mp4"
        autoPlay
        loop
        muted
      />
    </div>
  );
}

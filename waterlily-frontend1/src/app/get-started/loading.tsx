export default function Loading() {
  return (
    <div className="min-h-screen bg-[#e3f0fa] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-lg font-semibold text-gray-900">Creating your account...</p>
      </div>
    </div>
  );
}

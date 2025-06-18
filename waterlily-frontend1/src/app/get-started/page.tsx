import { handleCreateUser } from "./actions";

export default async function GetStartedPage({ searchParams }: { searchParams?: { error?: string } }) {
  const error = searchParams?.error;
  return (
    <div className="min-h-screen bg-[#e3f0fa] flex flex-col items-center justify-center">
      <main className="bg-white rounded-xl shadow-md p-8 sm:p-12 max-w-md w-full flex flex-col items-center border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center font-sans text-gray-900">Get Started</h2>
        <p className="text-base text-center mb-6 font-sans text-gray-900">
          Enter your email to begin your Waterlily survey journey.
        </p>
        <form action={handleCreateUser} className="w-full flex flex-col gap-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#339cf1] text-gray-900"
          />
          <button
            type="submit"
            className="w-full bg-[#339cf1] hover:bg-[#2176c7] text-white text-lg font-mono py-3 rounded-md shadow transition-colors"
          >
            Get Started
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-4">{decodeURIComponent(error)}</p>}
      </main>
    </div>
  );
}

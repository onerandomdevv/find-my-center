import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-center">
      <div className="max-w-md space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Find Your JAMB Exam Centre in Seconds
        </h1>
        <p className="text-lg text-gray-600">
          Locate your official exam centre quickly and reliably. Works offline and
          on slow networks. No maps required to start.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button href="/find" variant="primary" fullWidth className="sm:w-auto">
            Find My Center
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 text-center text-sm text-gray-500 sm:grid-cols-3">
          <div className="p-4">
            <span className="block font-semibold text-gray-900">Fast</span>
            Loads in &lt; 2s
          </div>
          <div className="p-4">
            <span className="block font-semibold text-gray-900">Reliable</span>
            Official Data
          </div>
          <div className="p-4">
            <span className="block font-semibold text-gray-900">Offline</span>
            Works w/o Data
          </div>
        </div>
      </div>
    </main>
  );
}

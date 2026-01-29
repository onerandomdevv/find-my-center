export default function CenterCard() {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        Center Name
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 mt-2">
        123 Example Street, Town Name, State
      </p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
          Landmark: Nearby Hotel
        </span>
        <button className="text-blue-600 font-semibold hover:underline">
          View Map
        </button>
      </div>
    </div>
  );
}

export default function SearchBar() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent">
          <option>Select State</option>
        </select>
        <select className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent">
          <option>Select Town</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search for your center name..."
        className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
        Find Center
      </button>
    </div>
  );
}

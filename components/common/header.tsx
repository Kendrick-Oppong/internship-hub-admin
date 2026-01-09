export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-medium">Dashboard</h2>
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Notifications
        </button>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>
    </header>
  );
}

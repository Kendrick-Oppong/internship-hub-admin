export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-medium">Dashboard</h2>
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Notifications
        </button>
        <div className="w-8 h-8 rounded-full">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="size-full rounded-full object-cover object-top"
          />
        </div>
      </div>
    </header>
  );
}

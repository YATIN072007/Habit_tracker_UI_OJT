import Logo from "../../components/Logo";

const navItems = [
  { label: "Dashboard", icon: "▢", active: true },
  { label: "My Habits", icon: "☰" },
  { label: "Analytics", icon: "📊" },
  { label: "Community", icon: "👥" },
  { label: "Settings", icon: "⚙" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white/95 backdrop-blur border-r border-slate-100 dark:bg-slate-900/95 dark:border-slate-800 transition-transform duration-200 ease-out md:static md:translate-x-0 md:flex-shrink-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Habitrix
          </span>
        </div>
        <button
          type="button"
          className="rounded-md p-1 text-slate-500 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <div className="flex h-full flex-col">
        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3 text-sm">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left font-medium transition-colors ${
                item.active
                  ? "bg-sky-50 text-sky-700 dark:bg-sky-900/60 dark:text-sky-100"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

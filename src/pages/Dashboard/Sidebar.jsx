import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

const navItems = [
  { label: "Dashboard", icon: "▢", path: "/dashboard" },
  { label: "My Habits", icon: "☰", path: "/habits" },
  { label: "Analytics", icon: "📊", path: null },
  { label: "Community", icon: "👥", path: null },
  { label: "Settings", icon: "⚙", path: null },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
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
          {navItems.map((item) => {
            const isActive = item.path && location.pathname.startsWith(item.path);
            const baseClasses = "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors";
            const activeClasses =
              "bg-sky-50 text-sky-700 dark:bg-sky-900/60 dark:text-sky-100";
            const inactiveClasses =
              "text-slate-400 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800";

            return (
              <button
                key={item.label}
                type="button"
                disabled={!item.path}
                onClick={() => item.path && navigate(item.path)}
                className={`${baseClasses} ${
                  isActive ? activeClasses : inactiveClasses
                } ${!item.path ? "cursor-default opacity-60" : ""}`}
              >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

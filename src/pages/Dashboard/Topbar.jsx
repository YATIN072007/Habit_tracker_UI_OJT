import { useState } from "react";

export default function Topbar({ username, handle, avatar, completion, onToggleSidebar, onNewHabit, onManageProfile, onLogout }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((open) => !open);
  };

  const handleManageClick = () => {
    setIsProfileMenuOpen(false);
    if (onManageProfile) onManageProfile();
  };

  const handleLogoutClick = () => {
    setIsProfileMenuOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <button
          type="button"
          className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          onClick={onToggleSidebar}
          aria-label="Open sidebar"
        >
          ☰
        </button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 md:text-3xl">
            Welcome back, {username}!
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            You&apos;ve completed {completion}% of your habits today. Keep it up!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Notifications"
        >
          🔔
        </button>
        <button
          type="button"
          onClick={() => onNewHabit && onNewHabit()}
          className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
        >
          + New Habit
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={toggleProfileMenu}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-50 shadow-sm hover:bg-slate-800 dark:border-slate-700"
          >
            {avatar ? (
              <img
                src={avatar}
                alt={username || "Profile avatar"}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-[11px] font-semibold text-slate-50">
                {username ? username.charAt(0).toUpperCase() : "?"}
              </span>
            )}
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs font-semibold text-slate-50">
                {username || "Profile"}
              </span>
              {handle && (
                <span className="text-[10px] text-slate-300">@{handle}</span>
              )}
            </div>
            <span className="text-xs text-slate-300">▾</span>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white py-1 text-sm text-slate-800 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50">
              <button
                type="button"
                onClick={handleManageClick}
                className="flex w-full items-center px-4 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Manage / edit profile
              </button>
              <button
                type="button"
                onClick={handleLogoutClick}
                className="flex w-full items-center px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_CONFIG = {
  resident: {
    eyebrow: 'Resident Portal',
    title: 'Home Command Center',
    description: 'Manage visitor passes, community updates, and service requests from one focused view.',
    accent: 'from-emerald-400 to-cyan-400',
    icon: 'home',
    status: ['Pass-ready account', 'Resident alerts enabled', 'Flat linked'],
    actions: [
      { label: 'Open Mobile App', detail: 'Create QR visitor passes and approve entry requests.', icon: 'qr_code_2' },
      { label: 'Community Notices', detail: 'Track important updates from society admins.', icon: 'campaign' },
      { label: 'Service Requests', detail: 'Raise and follow maintenance complaints.', icon: 'construction' },
    ],
  },
  security: {
    eyebrow: 'Security Portal',
    title: 'Gate Control Center',
    description: 'Keep entry decisions, scans, and visitor movement visible during every shift.',
    accent: 'from-lime-300 to-emerald-400',
    icon: 'shield',
    status: ['Gate console active', 'QR scanner ready', 'Live alerts enabled'],
    actions: [
      { label: 'Scan Visitor QR', detail: 'Use the guard app to verify passes at the gate.', icon: 'document_scanner' },
      { label: 'Review Entry Log', detail: 'Monitor who entered, exited, or is still inside.', icon: 'receipt_long' },
      { label: 'Respond to Alerts', detail: 'Handle pending resident approvals quickly.', icon: 'notifications_active' },
    ],
  },
  service: {
    eyebrow: 'Service Portal',
    title: 'Maintenance Workbench',
    description: 'Track assigned complaints, update job progress, and keep residents informed.',
    accent: 'from-violet-400 to-fuchsia-400',
    icon: 'engineering',
    status: ['Task queue synced', 'Updates visible to admins', 'Mobile workflow ready'],
    actions: [
      { label: 'View Assignments', detail: 'Open assigned complaints and start work from mobile.', icon: 'assignment' },
      { label: 'Update Progress', detail: 'Move jobs from assigned to in-progress and resolved.', icon: 'published_with_changes' },
      { label: 'Review History', detail: 'Check completed work and recent activity.', icon: 'history' },
    ],
  },
};

export default function RoleDashboard({ role }) {
  const { user, logout } = useAuth();
  const config = ROLE_CONFIG[role] ?? ROLE_CONFIG.resident;
  const displayName = user?.name || user?.id?.slice(0, 8) || 'there';

  return (
    <main className="min-h-screen bg-[#090b10] text-white selection:bg-white/20">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-gradient-to-br ${config.accent} opacity-20 blur-3xl`} />
        <div className="absolute bottom-[-15%] left-[-10%] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 md:px-10">
        <nav className="mb-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className={`material-symbols-outlined grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${config.accent} text-black shadow-lg`}>
              {config.icon}
            </span>
            <div>
              <p className="text-sm font-bold tracking-[0.24em] text-white/80 uppercase">GateWise</p>
              <p className="text-xs text-slate-500">{config.eyebrow}</p>
            </div>
          </Link>
          <button
            onClick={logout}
            className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-red-400/40 hover:text-red-300"
          >
            Logout
          </button>
        </nav>

        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={`mb-4 bg-gradient-to-r ${config.accent} bg-clip-text text-xs font-black tracking-[0.32em] text-transparent uppercase`}>
              {config.eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl">
              Welcome, {displayName}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              {config.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {config.status.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className={`material-symbols-outlined mb-3 text-xl bg-gradient-to-r ${config.accent} bg-clip-text text-transparent`}>
                    check_circle
                  </span>
                  <p className="text-sm font-semibold text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.24em] text-slate-500 uppercase">Next Actions</p>
                <h2 className="mt-1 text-2xl font-black text-white">{config.title}</h2>
              </div>
              <span className={`material-symbols-outlined rounded-2xl bg-gradient-to-br ${config.accent} p-3 text-black`}>
                apps
              </span>
            </div>

            <div className="space-y-3">
              {config.actions.map((action) => (
                <article
                  key={action.label}
                  className="group rounded-2xl border border-white/10 bg-[#0d111a]/80 p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] text-slate-300 transition group-hover:text-white">
                      {action.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{action.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{action.detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

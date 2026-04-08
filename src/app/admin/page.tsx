import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";
import { LogOut, LayoutDashboard, Mail } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Validate user one more time and get their data
  const { data: { user } } = await supabase.auth.getUser();

  // Since RLS is enabled, the authenticated user can ONLY fetch rows if 
  // you create a specific SELECT policy.
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5]">
      {/* Admin Navbar */}
      <nav className="border-b border-[rgba(255,255,255,0.06)] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <LayoutDashboard className="w-5 h-5 text-[#a855f7]" />
            Arcaisys <span className="text-[#71717a] font-normal">Workspace</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-[#71717a] hidden sm:block">
              {user?.email}
            </span>
            <form action={logout}>
              <button 
                type="submit"
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors font-medium hover:bg-red-400/10 px-3 py-1.5 rounded-lg"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#7c3aed]" />
            Incoming Operations
          </h1>
          <p className="text-[#71717a] mt-2">Manage all contact submissions safely from this secure portal.</p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8">
            <b>Database Error:</b> {error.message} (Note: You may need to create a SELECT policy for authenticated users)
          </div>
        )}

        <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.06)]">
                  <th className="px-6 py-4 font-semibold text-sm text-[#a855f7]">Date</th>
                  <th className="px-6 py-4 font-semibold text-sm text-[#a855f7]">Name</th>
                  <th className="px-6 py-4 font-semibold text-sm text-[#a855f7]">Company</th>
                  <th className="px-6 py-4 font-semibold text-sm text-[#a855f7]">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                {messages?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-[#71717a]">
                      No messages received yet.
                    </td>
                  </tr>
                ) : (
                  messages?.map((msg) => (
                    <tr key={msg.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#71717a]">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{msg.name}</div>
                        <div className="text-xs text-[#71717a]">{msg.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#f4f4f5]">
                        {msg.company || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#71717a] max-w-xs truncate group-hover:whitespace-normal group-hover:bg-[#0f0f0f] rounded relative z-10 transition-all">
                        {msg.message}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

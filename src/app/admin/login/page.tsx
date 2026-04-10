import { login } from "../actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center text-white p-6 relative overflow-hidden">
      {/* Background styling for consistency */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FF6B00]/10 blur-[150px] -z-10 rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#E63000]/10 blur-[120px] -z-10 rounded-full mix-blend-screen pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl z-10 border-[rgba(255,255,255,0.06)] bg-[#0a0a0a]/80">
        <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
        <p className="text-[#71717a] mb-8">Sign in to manage incoming operations.</p>

        <form action={login} className="space-y-6 flex flex-col">
          <div className="relative group">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="peer w-full bg-transparent border-b border-[rgba(255,255,255,0.1)] py-3 text-white focus:outline-none focus:border-[#FF6B00] transition-colors placeholder-transparent"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-xs font-semibold text-[#E63000] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#71717a] peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#E63000] peer-focus:font-semibold"
            >
              Email Strategy
            </label>
          </div>
          
          <div className="relative group">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="peer w-full bg-transparent border-b border-[rgba(255,255,255,0.1)] py-3 text-white focus:outline-none focus:border-[#FF6B00] transition-colors placeholder-transparent"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-xs font-semibold text-[#E63000] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#71717a] peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#E63000] peer-focus:font-semibold"
            >
              Authorization Key
            </label>
          </div>

          {searchParams?.error && (
            <div className="text-red-400 text-sm mt-2 font-medium bg-red-400/10 p-3 rounded-lg border border-red-500/20">
              {searchParams.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#FF6B00] hover:bg-[#8B0000] text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_40px_rgba(255,107,0,0.4)] mt-4"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}

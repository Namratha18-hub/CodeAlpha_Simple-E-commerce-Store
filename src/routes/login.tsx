import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in · Lumen" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Welcome back!");
      setLoading(false);
      navigate({ to: "/" });
    }, 800);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <h1 className="font-display text-4xl font-semibold">Welcome back</h1>
      <p className="mt-2 text-muted-foreground">Sign in to your Lumen account.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input type="email" required className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <input type="password" required className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-ring" />
        </label>
        <button disabled={loading} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />}
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link to="/register" className="font-medium text-primary hover:underline">Create an account</Link>
      </p>
    </div>
  );
}

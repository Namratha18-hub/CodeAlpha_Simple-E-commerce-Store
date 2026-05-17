export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Lumen Store. Crafted in India.</p>
        <p>Free shipping over ₹999 · 7-day returns</p>
      </div>
    </footer>
  );
}

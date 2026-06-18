export default function Footer() {
  return (
    <footer className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
      <p>
        Built by{" "}
        <a
          href="https://molamikedevs.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground transition-colors hover:text-primary"
        >
          Molamike Devs
        </a>{" "}
        with <span aria-label="love">💖</span>
      </p>
      <p className="mt-1 text-[10px] text-muted-foreground/70">
        © {new Date().getFullYear()} · All rights reserved
      </p>
    </footer>
  )
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { appNavigation, publicNavigation } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">A</span>
        <span>APIVue</span>
      </Link>
      <nav aria-label="Primary navigation">
        {publicNavigation.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
        <span className="nav-divider" aria-hidden="true" />
        {appNavigation.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
      </nav>
      <Link className="header-action" href="/explore">
        Explore data <ArrowRight size={16} />
      </Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>APIVue / foundation phase</span>
      <span>Built for transparent developer analytics.</span>
    </footer>
  );
}
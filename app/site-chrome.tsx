import Link from "next/link";
import { ArrowRight, Command } from "lucide-react";
import { appNavigation, publicNavigation } from "@/config/navigation";
import { CommandPalette } from "@/components/search/command-palette";

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
      <Link className="header-action" href="/playground">
        <Command size={15} /> API Explorer <ArrowRight size={16} />
      </Link>
      <CommandPalette />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>APIVue / developer intelligence</span>
      <span>Real sources. Visible requests. Useful analysis.</span>
    </footer>
  );
}

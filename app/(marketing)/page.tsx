import Link from "next/link";
import { ArrowRight, BarChart3, Braces, GitBranch, LockKeyhole, MoveRight } from "lucide-react";
import { platforms } from "@/config/platforms";

const pillars = [
  { icon: GitBranch, title: "Connect deliberately", text: "Start with a supported developer platform and see exactly which public capabilities are available." },
  { icon: BarChart3, title: "Understand the shape", text: "Normalize source responses into platform-specific metrics, trends, and comparisons." },
  { icon: Braces, title: "Keep requests visible", text: "Inspect safe public request details and generated examples without exposing credentials." },
];

export default function MarketingPage() {
  return (
    <div className="marketing-page">
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Developer intelligence / sourced</p>
            <h1>Turn API data into a signal you can use.</h1>
            <p className="hero-lede">APIVue turns developer-platform data into understandable analytics you can inspect, compare, and learn from.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/explore">Explore platforms <ArrowRight size={17} /></Link>
              <Link className="button button-quiet" href="/playground">Open API Explorer <MoveRight size={17} /></Link>
            </div>
            <div className="hero-note"><LockKeyhole size={15} /> Public requests are explainable. Private credentials stay protected.</div>
          </div>
          <div className="hero-console" aria-label="Static preview of the APIVue data flow">
            <div className="console-top"><span className="status-dot" /> APIVue / profile workspace <span>preview</span></div>
            <div className="console-flow">
              <div className="flow-node active"><span>01 / SOURCE</span><strong>GitHub API</strong><small>public profile</small></div>
              <div className="flow-line" />
              <div className="flow-node"><span>02 / SHAPE</span><strong>Normalize</strong><small>profile model</small></div>
              <div className="flow-line" />
              <div className="flow-node"><span>03 / READ</span><strong>Insights</strong><small>metrics + trends</small></div>
            </div>
            <div className="console-insights">
              <div><small>VISIBLE SOURCE</small><strong>GET /users/:username</strong></div>
              <div><small>ANALYTICS LAYER</small><strong>Repositories · Activity · Languages</strong></div>
            </div>
            <div className="console-footer"><span>static product model</span><span className="console-code">no live request made</span></div>
          </div>
        </section>

        <section className="platform-strip">
          <div><p className="eyebrow">Supported sources</p><h2>Different platforms. Different questions.</h2></div>
          <div className="platform-list" id="platforms">{platforms.map((platform) => <Link href={`/platforms/${platform.id}`} key={platform.id}><span>{platform.name}</span><small>{platform.category} / public map</small></Link>)}</div>
        </section>

        <section className="pillars" id="capabilities">{pillars.map(({ icon: Icon, title, text }) => <article className="pillar" key={title}><Icon size={21} /><h3>{title}</h3><p>{text}</p></article>)}</section>

        <section className="architecture">
          <div><p className="eyebrow">The APIVue model</p><h2>Every insight keeps a trail back to its source.</h2><p>Platform APIs are different by design. APIVue keeps that difference visible while giving each source a consistent path from raw response to useful analysis.</p><Link className="text-link" href="/docs">Read the architecture <ArrowRight size={15} /></Link></div>
          <div className="layers"><span>01 / PLATFORM API</span><span>02 / INTEGRATION + RAW RESPONSE</span><span>03 / NORMALIZATION</span><span>04 / ANALYTICS + VISUALIZATION</span></div>
        </section>
      </main>
    </div>
  );
}

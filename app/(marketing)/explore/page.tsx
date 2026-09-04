import Link from "next/link";
import { platforms } from "@/config/platforms";

export default function ExplorePage() {
	return <main className="page-shell"><p className="eyebrow">Explore</p><h1>Choose a source, then ask better questions.</h1><p className="lede">APIVue keeps platform-specific analytics honest instead of forcing every service into one dashboard.</p><section className="platform-grid" id="platforms">{platforms.map((platform) => <Link className="platform-tile" href={`/platforms/${platform.id}`} key={platform.id}><span className="tile-kicker">{platform.category}</span><h2>{platform.name}</h2><p>{platform.description}</p><span className="tile-link">View data map &rarr;</span></Link>)}</section></main>;
}

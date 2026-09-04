import Link from "next/link";

export default function NotFound() {
	return <main className="page-shell"><p className="eyebrow">404</p><h1>This view does not exist yet.</h1><p className="lede">Return to the public explorer and choose a supported path.</p><Link className="text-link" href="/">Back to APIVue &rarr;</Link></main>;
}

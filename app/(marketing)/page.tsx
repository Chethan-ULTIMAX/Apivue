"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Zap,
  Shield,
  Code,
  Globe,
  Users,
  ArrowRight,
  CheckCircle,
  Terminal,
  Layers,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Live API Playground",
    description: "Test endpoints directly in the browser with real requests, authentication, and response visualization.",
  },
  {
    icon: Terminal,
    title: "Code Generation",
    description: "Generate client SDKs, server stubs, and integration code in 15+ languages instantly.",
  },
  {
    icon: Layers,
    title: "Interactive Specs",
    description: "OpenAPI 3.1 support with collapsible schemas, try-it-now buttons, and deep linking.",
  },
  {
    icon: Sparkles,
    title: "Smart Search",
    description: "Fuzzy search across endpoints, parameters, schemas, and examples with keyboard shortcuts.",
  },
  {
    icon: Shield,
    title: "Authentication Built-in",
    description: "OAuth 2.0, API Keys, JWT, Bearer tokens — configure once, test everywhere.",
  },
  {
    icon: Globe,
    title: "Multi-Environment",
    description: "Switch between dev, staging, production with variable substitution and environments.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Comments, reviews, version history, and shared workspaces for API teams.",
  },
  {
    icon: Rocket,
    title: "Lightning Fast",
    description: "Edge-deployed, cached globally, with instant search and sub-100ms page loads.",
  },
];

const stats = [
  { value: "50K+", label: "APIs Documented" },
  { value: "15+", label: "Languages Supported" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "2M+", label: "Requests/Month" },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-200/50 dark:border-surface-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600"
              >
                <Code className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-surface-900 dark:text-white">Apivue</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {["Features", "Docs", "Pricing", "Changelog"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href="#"
                className="btn-ghost hidden sm:inline-flex"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign in
              </motion.a>
              <motion.a
                href="#"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent dark:from-brand-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-400/10 via-transparent to-transparent dark:from-brand-400/5" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 mb-8"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-brand-500"
              />
              <span>New: Real-time collaboration & AI-powered spec generation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-surface-900 dark:text-white mb-6 text-balance"
            >
              Beautiful API Documentation{" "}
              <span className="text-brand-600 dark:text-brand-400">That Developers Love</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 mb-10 max-w-2xl mx-auto text-balance"
            >
              Transform your OpenAPI specs into interactive, searchable documentation with live
              playgrounds, code generation, and team collaboration — all in minutes, not weeks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#"
                className="btn-primary text-base px-8 py-3"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px -10px rgb(14 165 233 / 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                className="btn-secondary text-base px-8 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Demo
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-surface-500 dark:text-surface-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>OpenAPI 3.1</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>TypeScript SDKs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Self-hostable</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>SSO & RBAC</span>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="text-center p-6 card"
              >
                <div className="text-4xl sm:text-5xl font-bold text-brand-600 dark:text-brand-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-surface-600 dark:text-surface-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 bg-surface-100/50 dark:bg-surface-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="badge-primary mb-4">Everything you need for great API docs</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4">
              Features built for modern API teams
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              From spec to playground in seconds. Every feature designed to reduce friction
              between your API and the developers who use it.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 mb-4 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500"
                >
                  <feature.icon className="h-6 w-6" />
                </motion.div>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4">
              Live playground, zero config
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              Drop in your OpenAPI spec. Get an interactive playground with authentication,
              request history, and code snippets — instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-surface-200 dark:border-surface-800 pb-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-xs text-surface-500 dark:text-surface-400 font-mono">
                playground.apivue.io / api / v1 / users
              </div>
            </div>

            <div className="font-mono text-sm text-surface-200 dark:text-surface-800 bg-surface-900 dark:bg-surface-950 rounded-lg p-6 overflow-x-auto">
              <pre className="whitespace-pre-wrap">
{`GET    /api/v1/users          → List users (paginated)
POST   /api/v1/users          → Create user
GET    /api/v1/users/{id}     → Get user by ID
PATCH  /api/v1/users/{id}     → Update user
DELETE /api/v1/users/{id}     → Delete user

🔐 Auth: Bearer Token (OAuth 2.0)
📄 Spec: OpenAPI 3.1.0
⚡ Latency: ~45ms p99`}</pre>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-surface-500 dark:text-surface-400">
                <Zap className="h-4 w-4" />
                <span>Try it live →</span>
              </div>
              <motion.button
                className="btn-outline text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Import Spec
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-brand-600 dark:bg-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-400/20 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to transform your API docs?
            </h2>
            <p className="text-lg text-brand-100 mb-8 max-w-2xl mx-auto">
              Join thousands of teams shipping better developer experiences. Free for open source,
              transparent pricing for teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#"
                className="btn bg-white text-brand-600 hover:bg-brand-50 text-base px-8 py-3"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px -10px rgb(0 0 0 / 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free — No Credit Card
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#"
                className="btn border-2 border-white text-white hover:bg-white/10 text-base px-8 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Docs
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-100 dark:bg-surface-950 border-t border-surface-200 dark:border-surface-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                <span className="text-xl font-bold text-surface-900 dark:text-white">Apivue</span>
              </div>
              <p className="text-sm text-surface-600 dark:text-surface-400 max-w-xs">
                The API documentation platform developers actually enjoy using.
              </p>
            </div>
            <nav>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                {["Features", "Documentation", "Pricing", "Changelog", "API Reference"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                {["About", "Blog", "Careers", "Contact", "Press"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-surface-600 dark:text-surface-400">
                {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              © 2024 Apivue. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Twitter", "GitHub", "Discord", "LinkedIn"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-surface-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
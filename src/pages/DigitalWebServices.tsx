import { useMemo, useState, type FormEvent } from "react";

/**
 * DIGITAL & WEB SERVICES — Onepixart-style page
 * - Colors: bg #111922, text #e9c78a, card #1a2432
 * - Sections: Hero, Services, Process, Pricing, Portfolio teaser, FAQ, Contact CTA
 * - All copy in EN. Replace images/links as needed.
 */

type Service = {
  id: number;
  icon: string; // emoji or icon char
  title: string;
  description: string;
  deliverables: string[];
  startingAt?: string;
};

type Plan = {
  name: string;
  price: string; // e.g. "From $499"
  description: string;
  popular?: boolean;
  features: string[];
};

type CaseItem = {
  title: string;
  image: string;
  href: string; // internal or external
  tags?: string[];
};

type FaqItem = { q: string; a: string };
const SERVICES: Service[] = [
  {
    id: 1,
    icon: "🛠️",
    title: "Web Development",
    description:
      "Modern React/TypeScript frontends and Node/Express backends, built for speed and scalable growth.",
    deliverables: [
      "Responsive UI (React + Tailwind)",
      "API integration (REST/GraphQL)",
      "Auth, roles & permissions",
      "Performance & accessibility",
    ],
    startingAt: "From $1,500",
  },
  {
    id: 2,
    icon: "🎨",
    title: "UI/UX Design",
    description:
      "Human-centered design systems, wireframes, and clickable prototypes aligned with your brand.",
    deliverables: [
      "User flows & wireframes",
      "High‑fidelity mockups",
      "Design system tokens",
      "Interactive prototypes (Figma)",
    ],
    startingAt: "From $900",
  },
  {
    id: 3,
    icon: "🛒",
    title: "E‑commerce Solutions",
    description:
      "Sales‑ready stores with secure checkout, product catalogs, and inventory integrations.",
    deliverables: [
      "WooCommerce/Shopify or custom",
      "Checkout & payment gateways",
      "Catalog, search, filters",
      "Order management",
    ],
    startingAt: "From $1,800",
  },
  {
    id: 4,
    icon: "💡",
    title: "Branding & Identity",
    description:
      "Logos, color systems, and brand kits that feel premium and consistent across channels.",
    deliverables: [
      "Logo & favicon set",
      "Color & typography",
      "Brand guidelines",
      "Social media kit",
    ],
    startingAt: "From $700",
  },
  {
    id: 5,
    icon: "📈",
    title: "SEO & Analytics",
    description:
      "Technical SEO, on‑page optimization, and analytics to grow organic traffic and conversions.",
    deliverables: [
      "Core Web Vitals tuning",
      "Schema/JSON‑LD setup",
      "Keyword on‑page strategy",
      "GA4 & Search Console",
    ],
    startingAt: "From $600",
  },
  {
    id: 6,
    icon: "🚀",
    title: "DevOps & Hosting",
    description:
      "Secure deployments with CI/CD, SSL, and monitoring on VPS or managed platforms.",
    deliverables: [
      "Nginx/PM2 setup",
      "CI/CD pipelines",
      "Backups & monitoring",
      "Security hardening",
    ],
    startingAt: "From $500",
  },
];

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "From $499",
    description: "Launch a clean, single‑page website or landing quickly.",
    features: [
      "1–3 sections",
      "Responsive layout",
      "Basic SEO",
      "Contact form",
    ],
  },
  {
    name: "Business",
    price: "From $1,500",
    popular: true,
    description: "Multi‑page website with CMS and integrations.",
    features: [
      "5–10 pages",
      "CMS (Headless/WordPress)",
      "API integrations",
      "On‑page SEO",
    ],
  },
  {
    name: "Custom",
    price: "Let’s talk",
    description: "Tailored apps, complex dashboards, or e‑commerce.",
    features: [
      "Bespoke UX/UI",
      "Custom backend",
      "Scalable infra",
      "A/B testing",
    ],
  },
];

const CASES: CaseItem[] = [
  {
    title: "Retro İnşaat – Marketing site",
    image: "/images/cases/retroinsaat.jpg",
    href: "/case-study/retro-insaat",
    tags: ["Next.js", "Tailwind", "SEO"],
  },
  {
    title: "Kombim.az – Service Platform",
    image: "/images/cases/kombim.jpg",
    href: "/case-study/kombim",
    tags: ["React", "Node", "MongoDB"],
  },
  {
    title: "Restaurant Menu – Multilingual",
    image: "/images/cases/menu.jpg",
    href: "/case-study/restaurant-menu",
    tags: ["i18n", "Vite", "Admin"],
  },
];

const FAQS: FaqItem[] = [
  {
    q: "How long does a typical project take?",
    a: "Landing pages in ~2 weeks, business sites in 3–6 weeks. Complex apps depend on scope.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. We offer monthly care plans for updates, backups, security, and small improvements.",
  },
  {
    q: "Can you integrate payments or third‑party APIs?",
    a: "Absolutely. We’ve integrated gateways (ABB/WooCommerce) and APIs (Twilio, Google, etc.).",
  },
];

export default function DigitalWebServicesPage() {
  // Contact form state
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "Web Development",
    budget: "$1k–$3k",
    message: "",
  });

  const endpoint = useMemo(() => {
    const base = (import.meta as any)?.env?.VITE_API_URL;
    return base ? `${base}/api/contact` : "/api/contact"; // adjust to your backend
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill name, email and message.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "service-inquiry",
          ...form,
          source: "digital-web-services",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", service: "Web Development", budget: "$1k–$3k", message: "" });
      } else throw new Error("Failed");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <section className="bg-[#111922] text-[#e9c78a] min-h-screen">
      {/* Hero */}
      <div className="px-5 md:px-10 pt-10">
        <div className="max-w-[1448px] mx-auto border-b border-[#d9b8801a] pb-8">
          <h1 className="text-3xl md:text-5xl font-bold">Digital & Web Services</h1>
          <p className="opacity-80 mt-3 max-w-3xl">
            We build fast, beautiful, and reliable digital experiences—from landing pages and e‑commerce stores to
            custom dashboards and integrations.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#contact" className="underline hover:opacity-80">Request a Quote</a>
            <a href="#portfolio" className="underline hover:opacity-80">See Portfolio</a>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="px-5 md:px-10 py-10">
        <div className="max-w-[1448px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
            {SERVICES.map((s) => (
              <article key={s.id} className="bg-[#1a2432] rounded-2xl p-6">
                <div className="text-2xl" aria-hidden>{s.icon}</div>
                <h3 className="text-lg font-semibold mt-3">{s.title}</h3>
                <p className="opacity-80 mt-2">{s.description}</p>
                <ul className="mt-4 space-y-2 text-sm opacity-90 list-disc pl-5">
                  {s.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {s.startingAt && (
                  <p className="mt-4 text-sm opacity-80">{s.startingAt}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="px-5 md:px-10 pb-10">
        <div className="max-w-[1448px] mx-auto bg-[#1a2432] rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-1">Process</h2>
          <p className="opacity-80 mb-6">Clear steps to ship on time and on budget.</p>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: 1, t: "Discovery", d: "Goals, scope, and success metrics." },
              { n: 2, t: "Wireframes", d: "Flows & structure before visuals." },
              { n: 3, t: "Design", d: "High‑fidelity UI & design system." },
              { n: 4, t: "Development", d: "Frontend + backend integrations." },
              { n: 5, t: "QA & Launch", d: "Testing, performance, SEO, deploy." },
              { n: 6, t: "Support", d: "Monitoring and iterative improvements." },
            ].map((step) => (
              <li key={step.n} className="rounded-xl border border-[#e9c78a]/20 p-4">
                <div className="text-sm opacity-70">Step {step.n}</div>
                <div className="font-semibold">{step.t}</div>
                <p className="text-sm opacity-80 mt-1">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-5 md:px-10 pb-10">
        <div className="max-w-[1448px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {PLANS.map((p) => (
              <div key={p.name} className={`bg-[#1a2432] rounded-2xl p-6 border ${p.popular ? "border-[#e9c78a]/40" : "border-transparent"}`}>
                {p.popular && (
                  <div className="text-xs mb-2 inline-block px-2 py-1 rounded-full bg-[#111922] border border-[#e9c78a]/30">Most popular</div>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <div className="text-sm opacity-80">{p.price}</div>
                </div>
                <p className="opacity-80 mt-2">{p.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span aria-hidden>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="inline-block mt-5 underline hover:opacity-80">Get started</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio teaser */}
      <div className="px-5 md:px-10 pb-10" id="portfolio">
        <div className="max-w-[1448px] mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold">Selected Work</h2>
            {/* <Link to="#" className="underline hover:opacity-80">View all →</Link> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {CASES.map((c) => (
              <article key={c.title} className="bg-[#1a2432] rounded-2xl overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-56 object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold">{c.title}</h3>
                  {c.tags?.length ? (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {c.tags.map((t) => (
                        <span key={t} className="text-xs px-2 py-1 rounded-full bg-[#111922] border border-[#e9c78a]/20">#{t}</span>
                      ))}
                    </div>
                  ) : null}
                  {c.href.startsWith("/") ? (
                    <a href={'#contact'} className="inline-block mt-4 underline hover:opacity-80">See case →</a>
                  ) : (
                    <a href={c.href} target="_blank" rel="noreferrer" className="inline-block mt-4 underline hover:opacity-80">Open site →</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="px-5 md:px-10 pb-10">
        <div className="max-w-[1448px] mx-auto bg-[#1a2432] rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          {FAQS.map((f) => (
            <details key={f.q} className="mb-3">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 opacity-80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div id="contact" className="px-5 md:px-10 pb-16">
        <div className="max-w-[1448px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#1a2432] rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-2">Let’s build your project</h2>
            <p className="opacity-80 mb-4">Tell us about your goals and we’ll propose a plan within 24–48h.</p>

            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm opacity-80">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full bg-[#111922] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm opacity-80">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full bg-[#111922] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm opacity-80">Company (optional)</label>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="mt-1 w-full bg-[#111922] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
                  placeholder="Company name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm opacity-80">Service</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="mt-1 w-full bg-[#111922] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm opacity-80">Budget</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="mt-1 w-full bg-[#111922] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
                  >
                    {["<$1k", "$1k–$3k", "$3k–$7k", "$7k–$15k", "> $15k"].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm opacity-80">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full bg-[#111922] text-[#e9c78a] rounded-xl px-4 py-2 outline-none border border-transparent focus:border-[#e9c78a]/30"
                  placeholder="Briefly describe your project, goals, and deadline."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-2 inline-flex items-center gap-2 underline hover:opacity-80 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send request"}
              </button>

              {status === "success" && (
                <p className="text-sm text-green-400">Thanks! We’ll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          <div className="bg-[#1a2432] rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-3">Why choose us?</h3>
            <ul className="space-y-2">
              <li className="flex gap-2"><span>⚡</span><span>Fast, accessible, SEO‑friendly builds</span></li>
              <li className="flex gap-2"><span>🔒</span><span>Security‑first & privacy‑minded</span></li>
              <li className="flex gap-2"><span>📱</span><span>Mobile‑responsive, pixel‑perfect UIs</span></li>
              <li className="flex gap-2"><span>📊</span><span>Analytics & A/B testing ready</span></li>
              <li className="flex gap-2"><span>🤝</span><span>Collaborative & transparent process</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Onepixart Digital & Web Services",
            url: typeof window !== "undefined" ? window.location.href : undefined,
            areaServed: "Global",
            serviceType: SERVICES.map((s) => s.title),
          }),
        }}
      />
    </section>
  );
}

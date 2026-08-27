import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Github,
  Layers3,
  Mail,
  MapPin,
  Menu,
  PenTool,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const emailAddress = 'abdullahfekry007@gmail.com';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

const projects = [
  {
    id: 'signal',
    number: '01',
    title: 'Signal / field notes',
    description:
      'A considered place for collecting fragments, questions, and small observations before they become something larger.',
    tags: ['Interface', 'Writing', 'In progress'],
    art: 'green',
    focus: 'all',
  },
  {
    id: 'atlas',
    number: '02',
    title: 'Atlas of small wins',
    description:
      'A gentle progress tracker concept for people who want momentum without turning their life into a dashboard.',
    tags: ['Product', 'Prototype', 'Concept'],
    art: 'coral',
    focus: 'product',
  },
  {
    id: 'relay',
    number: '03',
    title: 'Relay / clear handoffs',
    description:
      'An early exploration of making collaborative work feel less like passing tickets and more like passing context.',
    tags: ['Systems', 'Frontend', 'Exploration'],
    art: 'ink',
    focus: 'frontend',
  },
];

const tools = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Figma', 'Git', 'CSS', 'PostgreSQL'];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}

function Navigation({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-30">
      <div className="container-wide flex items-center justify-between py-6">
        <a
          href="#top"
          data-testid="link-logo"
          className="group flex items-center gap-3 text-sm font-bold tracking-tight text-[hsl(var(--secondary))]"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center bg-[hsl(var(--secondary))] font-mono-ui text-xs text-[hsl(var(--accent))] transition-transform duration-300 group-hover:rotate-12">
            AF
          </span>
          <span>Abdullah Fekry</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
              className={`font-mono-ui text-[0.65rem] uppercase tracking-[0.14em] transition-colors hover:text-[hsl(var(--primary))] ${
                activeSection === item.href.slice(1)
                  ? 'text-[hsl(var(--primary))]'
                  : 'text-[hsl(var(--muted-foreground))]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${emailAddress}`}
          data-testid="link-header-contact"
          className="hidden items-center gap-2 border-b border-[hsl(var(--secondary))] pb-1 font-mono-ui text-[0.65rem] uppercase tracking-[0.12em] text-[hsl(var(--secondary))] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] sm:flex"
        >
          Let&apos;s talk <ArrowUpRight size={14} strokeWidth={1.8} />
        </a>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          data-testid="button-mobile-menu"
          className="grid h-10 w-10 place-items-center border border-[hsl(var(--secondary))] md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="container-wide absolute right-0 left-0 top-[4.9rem] md:hidden">
          <nav
            className="border border-[hsl(var(--secondary))] bg-[hsl(var(--card))] p-5 shadow-[0.35rem_0.35rem_0_hsl(var(--secondary))]"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                  className="font-mono-ui text-xs uppercase tracking-[0.14em] text-[hsl(var(--secondary))]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`mailto:${emailAddress}`}
                data-testid="link-mobile-contact"
                className="flex items-center gap-2 font-mono-ui text-xs uppercase tracking-[0.14em] text-[hsl(var(--primary))]"
                onClick={() => setMenuOpen(false)}
              >
                Let&apos;s talk <ArrowUpRight size={14} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" data-section="top" className="relative min-h-[calc(100dvh-5rem)]">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="container-wide relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center pb-20 pt-14">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <div className="eyebrow mb-8" data-testid="text-hero-eyebrow">
                Independent developer / building in public
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h1
                className="font-display max-w-4xl text-[clamp(3.8rem,9vw,8.7rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[hsl(var(--secondary))]"
                data-testid="text-hero-title"
              >
                Building a <span className="relative whitespace-nowrap text-[hsl(var(--primary))]">clearer</span>{' '}
                digital world.
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-9 flex max-w-xl flex-col gap-8 sm:flex-row sm:items-end">
                <p className="max-w-sm text-base leading-7 text-[hsl(var(--muted-foreground))]" data-testid="text-hero-description">
                  I&apos;m Abdullah — a developer learning in public and making thoughtful interfaces for ideas that deserve room to breathe.
                </p>
                <a
                  href="#work"
                  data-testid="link-hero-work"
                  className="button-arrow w-fit text-[hsl(var(--secondary))]"
                >
                  See selected work <ArrowDown size={15} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={3} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="hero-orbit" aria-label="Abstract orbit illustration">
                <div className="orbit-dot" />
                <div className="orbit-core" />
              </div>
              <div className="floating-note">
                <div className="mb-5 flex items-center justify-between font-mono-ui text-[0.58rem] uppercase tracking-[0.13em] text-[hsl(var(--muted-foreground))]">
                  <span>Current status</span>
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                </div>
                <p className="font-display text-lg leading-tight text-[hsl(var(--secondary))]">
                  Curious, available, and shipping small things.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={4} className="mt-auto hidden items-center justify-between pt-16 sm:flex">
          <span className="font-mono-ui text-[0.62rem] uppercase tracking-[0.14em] text-[hsl(var(--muted-foreground))]">
            Scroll to explore
          </span>
          <div className="h-px w-28 bg-[hsl(var(--border))]" />
          <span className="font-mono-ui text-[0.62rem] text-[hsl(var(--muted-foreground))]">01 / 07</span>
        </Reveal>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="about" data-section="about" className="border-t border-[hsl(var(--border))] py-24 sm:py-36">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <div className="eyebrow" data-testid="text-about-eyebrow">A little context</div>
        </Reveal>
        <Reveal delay={1}>
          <div>
            <h2
              className="font-display max-w-4xl text-[clamp(2.4rem,5vw,5.2rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[hsl(var(--secondary))]"
              data-testid="text-about-title"
            >
              The best work starts with paying attention.
            </h2>
            <div className="mt-12 grid gap-8 border-t border-[hsl(var(--border))] pt-8 sm:grid-cols-2">
              <p className="text-[0.98rem] leading-7 text-[hsl(var(--muted-foreground))]" data-testid="text-about-copy-one">
                I care about the part before the pixel: the question underneath the request, the person on the other side of the screen, and the one small detail that makes a tool feel like it belongs to someone.
              </p>
              <p className="text-[0.98rem] leading-7 text-[hsl(var(--muted-foreground))]" data-testid="text-about-copy-two">
                Right now I&apos;m growing my frontend practice through experiments, open-source learning, and collaborations with people who are still figuring it out too.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 font-mono-ui text-[0.65rem] uppercase tracking-[0.12em] text-[hsl(var(--secondary))]">
              <span className="flex items-center gap-2"><MapPin size={14} className="text-[hsl(var(--destructive))]" /> Open to the world</span>
              <span className="flex items-center gap-2"><Sparkles size={14} className="text-[hsl(var(--destructive))]" /> Learning by making</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-[hsl(var(--secondary))] bg-[hsl(var(--accent))] py-4" aria-label="Areas of interest">
      <div className="marquee-track">
        {[...Array(2)].flatMap(() => ['Interfaces with intent', 'Useful over flashy', 'Always a work in progress', 'Made with care']).map((item, index) => (
          <span key={`${item}-${index}`} className="mx-5 flex items-center gap-5 whitespace-nowrap font-mono-ui text-[0.68rem] uppercase tracking-[0.12em] text-[hsl(var(--secondary))]">
            {item} <span className="text-[hsl(var(--destructive))]">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectArtwork({ type }: { type: string }) {
  if (type === 'green') {
    return (
      <div className="project-art project-art--green">
        <div className="art-window art-window--lines" />
        <span className="absolute bottom-5 left-6 z-10 font-mono-ui text-[0.62rem] uppercase tracking-[0.13em] text-[hsl(var(--secondary))]">Signal / 2024</span>
      </div>
    );
  }
  if (type === 'coral') {
    return (
      <div className="project-art project-art--coral">
        <div className="art-grid-shape art-grid-shape--one" />
        <div className="art-grid-shape art-grid-shape--two" />
        <div className="art-grid-shape art-grid-shape--three" />
        <span className="absolute bottom-5 left-6 z-10 font-mono-ui text-[0.62rem] uppercase tracking-[0.13em] text-[hsl(var(--card))]">Atlas / study 02</span>
      </div>
    );
  }
  return (
    <div className="project-art project-art--ink">
      <div className="art-window">
        <div className="art-scan" />
        <div className="absolute top-16 left-7 h-16 w-16 rounded-full border border-[hsl(var(--secondary))] bg-[hsl(var(--accent))]" />
        <div className="absolute right-7 bottom-7 h-10 w-24 border border-[hsl(var(--secondary))]" />
      </div>
      <span className="absolute bottom-5 left-6 z-10 font-mono-ui text-[0.62rem] uppercase tracking-[0.13em] text-[hsl(var(--accent))]">Relay / sketch 01</span>
    </div>
  );
}

function Work() {
  const [filter, setFilter] = useState('all');
  const visibleProjects = projects.filter((project) => filter === 'all' || project.focus === filter);

  return (
    <section id="work" data-section="work" className="bg-[hsl(var(--secondary))] py-24 text-[hsl(var(--primary-foreground))] sm:py-36">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col justify-between gap-7 border-b border-[rgba(247,241,231,0.25)] pb-8 sm:flex-row sm:items-end">
            <div>
              <div className="eyebrow mb-5" data-testid="text-work-eyebrow">Selected experiments</div>
              <h2 className="font-display text-[clamp(2.8rem,6vw,6.2rem)] font-medium leading-[0.9] tracking-[-0.065em]" data-testid="text-work-title">
                Work in progress,<br /><span className="text-[hsl(var(--accent))]">on purpose.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[rgba(247,241,231,0.64)]" data-testid="text-work-description">
              A few early concepts and learning projects. They are clearly labeled because honest beginnings are more interesting than invented case studies.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="flex flex-wrap gap-2 py-8" role="group" aria-label="Filter projects">
            {[
              { value: 'all', label: 'All experiments' },
              { value: 'frontend', label: 'Frontend' },
              { value: 'product', label: 'Product thinking' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                data-testid={`button-filter-${item.value}`}
                aria-pressed={filter === item.value}
                className={`border px-3 py-2 font-mono-ui text-[0.62rem] uppercase tracking-[0.1em] transition-colors ${
                  filter === item.value
                    ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))] text-[hsl(var(--secondary))]'
                    : 'border-[rgba(247,241,231,0.3)] text-[rgba(247,241,231,0.7)] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]'
                }`}
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index + 1, 4)}>
              <article className="project-card bg-[hsl(var(--card))] text-[hsl(var(--secondary))]" data-testid={`card-project-${project.id}`}>
                <ProjectArtwork type={project.art} />
                <div className="flex flex-col p-6 sm:p-7">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="font-mono-ui text-[0.62rem] text-[hsl(var(--muted-foreground))]">{project.number} / 03</span>
                    <span className="flex items-center gap-1.5 font-mono-ui text-[0.58rem] uppercase tracking-[0.08em] text-[hsl(var(--destructive))]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--destructive))]" /> Placeholder
                    </span>
                  </div>
                  <h3 className="font-display text-3xl leading-none tracking-[-0.045em]" data-testid={`text-project-title-${project.id}`}>{project.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-[hsl(var(--muted-foreground))]" data-testid={`text-project-description-${project.id}`}>{project.description}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="border border-[hsl(var(--border))] px-2 py-1 font-mono-ui text-[0.58rem] uppercase tracking-[0.08em] text-[hsl(var(--muted-foreground))]">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] py-20 sm:py-28">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <div className="eyebrow" data-testid="text-toolkit-eyebrow">The toolkit</div>
        </Reveal>
        <Reveal delay={1}>
          <div>
            <div className="flex items-start gap-4">
              <Code2 className="mt-1 shrink-0 text-[hsl(var(--primary))]" size={24} strokeWidth={1.5} />
              <p className="max-w-2xl font-display text-2xl leading-tight tracking-[-0.035em] text-[hsl(var(--secondary))]" data-testid="text-toolkit-intro">
                Enough range to move from a rough idea to a useful, well-made screen.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 border-t border-[hsl(var(--border))] sm:grid-cols-4">
              {tools.map((tool, index) => (
                <div key={tool} className="flex items-center gap-3 border-b border-r border-[hsl(var(--border))] py-4 text-sm text-[hsl(var(--muted-foreground))]">
                  <span className="font-mono-ui text-[0.58rem] text-[hsl(var(--destructive))]">0{index + 1}</span>{tool}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    { number: '01', icon: PenTool, title: 'Find the real question', copy: 'Before choosing a stack or a style, I make sure we know what the work is actually trying to change.' },
    { number: '02', icon: Layers3, title: 'Make the shape visible', copy: 'I turn loose thoughts into a small, testable interface — something concrete enough to react to.' },
    { number: '03', icon: BriefcaseBusiness, title: 'Leave it better', copy: 'The final pass is about clarity: accessible details, calm interactions, and a handoff someone can build on.' },
  ];

  return (
    <section id="approach" data-section="approach" className="py-24 sm:py-36">
      <div className="container-wide">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="eyebrow" data-testid="text-approach-eyebrow">How I work</div>
            <div>
              <h2 className="font-display max-w-3xl text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[0.93] tracking-[-0.06em] text-[hsl(var(--secondary))]" data-testid="text-approach-title">
                Thoughtful is a method,<br /><span className="text-[hsl(var(--primary))]">not a mood.</span>
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="process-line mt-20 grid gap-10 pt-1 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={index + 1}>
                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="process-number">{step.number}</span>
                    <Icon size={21} strokeWidth={1.5} className="text-[hsl(var(--primary))]" />
                  </div>
                  <h3 className="font-display text-2xl tracking-[-0.035em] text-[hsl(var(--secondary))]" data-testid={`text-approach-step-${step.number}`}>{step.title}</h3>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">{step.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Now() {
  return (
    <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--primary))] py-20 text-[hsl(var(--primary-foreground))] sm:py-28">
      <div className="container-wide grid items-start gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <div className="eyebrow text-[hsl(var(--accent))]" data-testid="text-now-eyebrow">Now, in the studio</div>
        </Reveal>
        <Reveal delay={1}>
          <div className="grid gap-10 sm:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] tracking-[-0.06em]" data-testid="text-now-title">
                Learning out loud.<br />Making it real.
              </h2>
              <p className="mt-7 max-w-lg text-sm leading-7 text-[rgba(247,241,231,0.72)]" data-testid="text-now-copy">
                I&apos;m deepening my frontend fundamentals, documenting the tiny decisions that usually disappear, and looking for a first team where asking good questions is considered a strength.
              </p>
            </div>
            <div className="border-l border-[rgba(247,241,231,0.3)] pl-6">
              <span className="font-mono-ui text-[0.6rem] uppercase tracking-[0.12em] text-[hsl(var(--accent))]">Open to</span>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="border-b border-[rgba(247,241,231,0.25)] pb-4">Frontend collaborations</li>
                <li className="border-b border-[rgba(247,241,231,0.25)] pb-4">Junior product roles</li>
                <li>Interesting problems</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(emailAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '');
    const message = String(form.get('message') ?? '');
    const subject = encodeURIComponent(`Hello Abdullah — ${name}`);
    const body = encodeURIComponent(message);
    setSent(true);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" data-section="contact" className="py-24 sm:py-36">
      <div className="container-wide">
        <div className="contact-panel grid gap-14 p-7 sm:p-12 lg:grid-cols-[1fr_0.85fr] lg:p-16">
          <Reveal>
            <div>
              <div className="eyebrow mb-7" data-testid="text-contact-eyebrow">Your move</div>
              <h2 className="font-display max-w-xl text-[clamp(3.1rem,7vw,7rem)] leading-[0.86] tracking-[-0.07em]" data-testid="text-contact-title">
                Have a good question?
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-7 text-[rgba(247,241,231,0.68)]" data-testid="text-contact-copy">
                I&apos;d love to hear what you&apos;re thinking about, making, or trying to untangle.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="https://github.com/abdullahfekry007-lgtm" target="_blank" rel="noreferrer" data-testid="link-contact-github" className="button-arrow text-[hsl(var(--primary-foreground))]">
                  <Github size={15} /> GitHub <ExternalLink size={13} />
                </a>
                <button type="button" data-testid="button-copy-email" className="flex items-center gap-2 font-mono-ui text-[0.62rem] uppercase tracking-[0.1em] text-[rgba(247,241,231,0.68)] transition-colors hover:text-[hsl(var(--accent))]" onClick={copyEmail}>
                  {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : emailAddress}
                </button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <form className="border-t border-[rgba(247,241,231,0.3)] pt-6 lg:mt-16" onSubmit={handleSubmit}>
              <label className="block font-mono-ui text-[0.6rem] uppercase tracking-[0.1em] text-[hsl(var(--accent))]" htmlFor="contact-name">Your name</label>
              <input id="contact-name" name="name" required className="contact-input mb-7" data-testid="input-contact-name" placeholder="What should I call you?" />
              <label className="block font-mono-ui text-[0.6rem] uppercase tracking-[0.1em] text-[hsl(var(--accent))]" htmlFor="contact-message">A few words</label>
              <textarea id="contact-message" name="message" required rows={3} className="contact-input resize-none" data-testid="input-contact-message" placeholder="Tell me about the thing..." />
              <button type="submit" data-testid="button-send-message" className="button-arrow mt-9 text-[hsl(var(--primary-foreground))]">
                <Send size={15} /> {sent ? 'Opening your email' : 'Start a conversation'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="container-wide border-t border-[hsl(var(--border))] py-8">
      <div className="flex flex-col justify-between gap-5 text-[0.63rem] text-[hsl(var(--muted-foreground))] sm:flex-row sm:items-center">
        <p data-testid="text-footer-signoff">© 2026 Abdullah Fekry. Built with attention.</p>
        <div className="flex items-center gap-5 font-mono-ui uppercase tracking-[0.1em]">
          <a href="https://github.com/abdullahfekry007-lgtm" target="_blank" rel="noreferrer" data-testid="link-footer-github" className="transition-colors hover:text-[hsl(var(--primary))]">GitHub</a>
          <a href={`mailto:${emailAddress}`} data-testid="link-footer-email" className="transition-colors hover:text-[hsl(var(--primary))]">Email</a>
          <a href="#top" data-testid="link-back-to-top" className="flex items-center gap-1 transition-colors hover:text-[hsl(var(--primary))]">Back to top <ArrowUpRight size={12} /></a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.dataset.section ?? 'top');
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.3, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="portfolio-shell min-h-[100dvh]" data-testid="page-portfolio">
      <Navigation activeSection={activeSection} />
      <Hero />
      <Intro />
      <Marquee />
      <Work />
      <Toolkit />
      <Approach />
      <Now />
      <Contact />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
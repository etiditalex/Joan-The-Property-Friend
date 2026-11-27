"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { phoneLabel, site } from "@/lib/data";

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function viewKind(path) {
  if (path === "/") return "home";
  if (path === "/for-sale" || path.startsWith("/for-sale/")) return "catalog";
  if (path.startsWith("/property/")) return "property";
  if (path === "/blog") return "blog";
  if (path.startsWith("/blog/")) return "article";
  if (path === "/contact") return "contact";
  if (path === "/about") return "about";
  return "";
}

const saleLinks = [
  ["/for-sale?type=house", "Houses"],
  ["/for-sale?type=apartment", "Apartments"],
  ["/for-sale?type=land", "Land"]
];

export function SiteShell({ children }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [top, setTop] = useState(false);
  const sale = path.startsWith("/for-sale") || path.startsWith("/property");
  const blog = path.startsWith("/blog");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 8);
      setTop(window.scrollY > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    document.body.classList.remove("menu-open");
  }, [path]);

  useEffect(() => {
    const kind = viewKind(path);
    if (!kind) return;
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, kind }),
      keepalive: true
    }).catch(() => {});
  }, [path]);

  const toggle = () => {
    setOpen((value) => {
      document.body.classList.toggle("menu-open", !value);
      return !value;
    });
  };

  const enquireHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`
    : "/contact#enquire";

  if (path.startsWith("/admin") || path.startsWith("/desk-preview")) return children;

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <header className={solid || path !== "/" ? "site-header is-solid" : "site-header"}>
        <Link className="brand" href="/">
          <img src={site.logo} alt="Joan Property Friend, your property partner" />
        </Link>
        <nav className="desk-nav" aria-label="Primary">
          <Link href="/" aria-current={path === "/" ? "page" : undefined}>Home</Link>
          <div className="drop">
            <Link href="/for-sale" aria-current={sale ? "page" : undefined}>For Sale</Link>
            <div className="drop-panel">
              {saleLinks.map(([href, label]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </div>
          </div>
          <Link href="/about" aria-current={path === "/about" ? "page" : undefined}>About</Link>
          <Link href="/blog" aria-current={blog ? "page" : undefined}>Joan&apos;s Blog</Link>
        </nav>
        <div className="header-tools">
          {site.phone ? <a className="header-phone" href={`tel:+${site.phone.replace(/\D/g, "")}`}>{phoneLabel()}</a> : null}
          <Link className="header-cta" href="/contact">Contact Us</Link>
          <button className="nav-toggle" type="button" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={toggle}>
            {open ? <Icon d="M6 6l12 12M18 6 6 18" /> : <Icon d="M4 7h16M4 12h16M4 17h16" />}
          </button>
        </div>
      </header>
      {open ? (
        <div className="mobile-panel">
          <nav aria-label="Mobile">
            <Link href="/">Home</Link>
            <Link href="/for-sale">For Sale</Link>
            <div className="sub">
              {saleLinks.map(([href, label]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </div>
            <Link href="/about">About</Link>
            <Link href="/blog">Joan&apos;s Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      ) : null}
      <main id="content">{children}</main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <p className="footer-label">Company</p>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/for-sale">For Sale</Link>
            <Link href="/contact">Get In Touch</Link>
          </div>
          <div>
            <p className="footer-label">Explore</p>
            <Link href="/for-sale?type=house">Houses</Link>
            <Link href="/for-sale?type=apartment">Apartments</Link>
            <Link href="/for-sale?type=land">Land</Link>
            <Link href="/blog">Joan&apos;s Blog</Link>
            <Link href="/contact">Arrange a viewing</Link>
          </div>
          <div>
            <p className="footer-label">Contact Us</p>
            {site.phone ? (
              <a className="footer-phone" href={`tel:+${site.phone.replace(/\D/g, "")}`}>{phoneLabel()}</a>
            ) : (
              <Link className="footer-phone" href="/contact">Send an enquiry</Link>
            )}
            <p>{site.address}</p>
            {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : null}
          </div>
          <div className="footer-brand">
            <img src={site.logo} alt="" />
            <p>{site.tagline}</p>
          </div>
        </div>
        <div className="footer-base">
          <p>Copyright © {new Date().getFullYear()} Joan Property Friend</p>
          <p>Guide prices. Ask Joan to confirm what is still available before you view.</p>
        </div>
      </footer>
      <a className={site.whatsapp ? "fab fab-wa" : "fab"} href={enquireHref}>
        <Icon d="M4 6.5h16v11H4v-11ZM5 7l7 6 7-6" />
        <span>Enquire Now!</span>
      </a>
      {top ? (
        <button className="to-top" type="button" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
      ) : null}
      <nav className="dock" aria-label="Primary mobile">
        <Link href="/" aria-current={path === "/" ? "page" : undefined}>
          <Icon d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
          <span>Home</span>
        </Link>
        <Link href="/for-sale" aria-current={sale ? "page" : undefined}>
          <Icon d="M4 20V9.5L12 4l8 5.5V20M9 20v-6h6v6" />
          <span>For Sale</span>
        </Link>
        <Link href="/about" aria-current={path === "/about" ? "page" : undefined}>
          <Icon d="m12 3.5 2.1 4.4 4.9.7-3.5 3.4.8 4.9L12 14.6 7.7 16.9l.8-4.9L5 8.6l4.9-.7L12 3.5Z" />
          <span>About Us</span>
        </Link>
        <Link href="/contact" aria-current={path === "/contact" ? "page" : undefined}>
          <Icon d="M4 6.5h16v11H4v-11ZM5 7l7 6 7-6" />
          <span>Contact Us</span>
        </Link>
      </nav>
    </>
  );
}

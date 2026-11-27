"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/data";

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const main = [
  ["/admin", "Dashboard", "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"],
  ["/admin/property", "Property", "M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"],
  ["/admin/blog", "Blog", "M6 4h12v16H6zM9 8h6M9 12h6M9 16h4"],
  ["/admin/type", "Type", "M4 7h16M4 12h10M4 17h7"],
  ["/admin/messages", "Transactions", "M6 7h12l-1 12H7L6 7Zm2 0 1-3h6l1 3"]
];

const others = [
  ["/admin", "Analytics", "M4 19V10M10 19V5M16 19v-7M22 19H2"],
  ["/admin/customers", "Customer", "M12 12a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM5 19c.8-2.6 3-4 7-4s6.2 1.4 7 4"],
  ["/admin/messages", "Messages", "M4 6h16v10H7l-3 3V6Z"],
  ["/admin/settings", "Settings", "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM12 3.5v2M12 18.5v2M4.8 6.2l1.4 1.4M17.8 16.4l1.4 1.4M3.5 12h2M18.5 12h2M4.8 17.8l1.4-1.4M17.8 7.6l1.4-1.4"]
];

export function DeskFrame({ children, counts }) {
  const path = usePathname();
  const propertyOpen = path.startsWith("/admin/property");
  const nested = path !== "/admin";

  return (
    <div className="desk-app">
      <div className="desk-shell">
        <aside className="desk-side">
          <Link className="desk-brand" href="/admin">
            <img src={site.logo} alt="" />
            <span>Joan</span>
          </Link>
          <p className="desk-label">Main Menu</p>
          <nav>
            {main.map(([href, label, icon]) => {
              const current = href === "/admin" ? path === "/admin" : path.startsWith(href);
              return (
                <Link key={label} href={href} className={current ? "is-current" : ""}>
                  <Icon d={icon} />
                  <span>{label}</span>
                  {label === "Property" ? <em aria-hidden="true">›</em> : null}
                  {label === "Transactions" && counts.enquiries ? <b>{counts.enquiries}</b> : null}
                </Link>
              );
            })}
            {propertyOpen ? (
              <div className="desk-sub">
                <Link href="/admin/property" aria-current={path === "/admin/property" ? "page" : undefined}>All properties</Link>
                <Link href="/admin/property/new">Add property</Link>
              </div>
            ) : null}
          </nav>
          <p className="desk-label">Others</p>
          <nav>
            {others.map(([href, label, icon]) => {
              const current = label === "Messages" ? path.startsWith("/admin/messages") : label === "Analytics" ? false : path === href;
              return (
                <Link key={label} href={label === "Analytics" ? "/admin" : href} className={current ? "is-current" : ""}>
                  <Icon d={icon} />
                  <span>{label}</span>
                  {label === "Messages" && counts.enquiries ? <b className="is-note">{counts.enquiries}</b> : null}
                </Link>
              );
            })}
          </nav>
          <p className="desk-foot">Joan Property Friend<br />Nyali, Mombasa</p>
        </aside>
        <div className="desk-main">
          <header className="desk-top">
            {nested ? (
              <Link className="desk-back" href={path.startsWith("/admin/property") ? "/admin/property" : "/admin"} aria-label="Back">←</Link>
            ) : <span />}
            <h1>{titleFor(path)}</h1>
            <form className="desk-search" action="/admin/property">
              <input name="q" placeholder="Search here..." aria-label="Search properties" />
              <button type="submit" aria-label="Search">
                <Icon d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-3.5-3.5" />
              </button>
            </form>
            <div className="desk-tools">
              <span title="Properties">{counts.properties}</span>
              <span title="Blog posts">{counts.posts}</span>
              <Link href="/admin/messages" title="Messages">{counts.enquiries}</Link>
            </div>
            <div className="desk-user">
              <img src={site.logo} alt="" />
              <div>
                <strong>Joan</strong>
                <small>Property Partner</small>
              </div>
            </div>
          </header>
          <div className="desk-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

function titleFor(path) {
  if (path.startsWith("/admin/property/new")) return "Add Property";
  if (path.includes("/edit")) return "Edit";
  if (path.startsWith("/admin/property/")) return "Property Detail";
  if (path.startsWith("/admin/property")) return "Property";
  if (path.startsWith("/admin/blog/new")) return "New Post";
  if (path.startsWith("/admin/blog/")) return "Edit Post";
  if (path.startsWith("/admin/blog")) return "Joan’s Blog";
  if (path.startsWith("/admin/messages")) return "Messages";
  if (path.startsWith("/admin/customers")) return "Customers";
  if (path.startsWith("/admin/type")) return "Type";
  if (path.startsWith("/admin/settings")) return "Settings";
  return "Dashboard";
}

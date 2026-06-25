"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(250,250,248,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #ECE7DE",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 48px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "block", lineHeight: 0 }}>
          <Image
            src="/logo.jpg"
            alt="The Bridge Wellness Centre"
            width={120}
            height={50}
            style={{ height: 50, width: "auto", mixBlendMode: "multiply" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 38 }}
          className="nav-desktop"
        >
          <div
            style={{
              display: "flex",
              gap: 34,
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: 13,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: isActive(href) ? "#2F5D52" : "#5A554E",
                  textDecoration: "none",
                  fontWeight: isActive(href) ? 500 : 400,
                  transition: "color 0.2s",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: 12.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#fff",
              background: "#5C8C6E",
              padding: "13px 24px",
              borderRadius: 2,
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            flexDirection: "column",
            gap: "5px",
          }}
          className="nav-mobile-btn"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "#2A2A28",
                transition: "all 0.3s",
                transformOrigin: "center",
                transform:
                  menuOpen
                    ? i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : i === 2
                      ? "translateY(-6.5px) rotate(-45deg)"
                      : "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          padding: "16px 48px 28px",
          borderTop: "1px solid #ECE7DE",
          gap: 20,
          background: "#FAFAF8",
        }}
        className="nav-mobile-menu"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: 15,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isActive(href) ? "#2F5D52" : "#5A554E",
              textDecoration: "none",
              fontWeight: isActive(href) ? 500 : 400,
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "var(--font-jost), sans-serif",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#5C8C6E",
            padding: "14px 24px",
            borderRadius: 2,
            textDecoration: "none",
            textAlign: "center",
            display: "block",
          }}
        >
          Book a Session
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

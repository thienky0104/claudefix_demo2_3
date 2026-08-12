import { forwardRef, useEffect, useState, type RefObject } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const links = [
  { label: 'LOOKBOOK', href: '#lookbook' },
  { label: 'VIDEO', href: '#video' },
  { label: 'DỊCH VỤ', href: '#services-pricing' },
  { label: 'STYLIST', href: '#stylist' },
  { label: 'LIÊN HỆ', href: '#lien-he' },
  { label: 'CÂU HỎI', href: '#faq' },
];

interface NavProps {
  heroRef: RefObject<HTMLElement | null>;
  visible: boolean;
}

const Nav = forwardRef<HTMLElement, NavProps>(({ heroRef, visible }, ref) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [insideHero, setInsideHero] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInsideHero(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroRef]);

  const setNavRef = (node: HTMLElement | null) => {
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    if (!visible) return;
    const navEl = ref && typeof ref !== 'function' ? ref.current : null;
    if (!navEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navEl,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 },
      );
    });
    return () => ctx.revert();
  }, [visible, ref]);

  return (
    <>
      <nav
        ref={setNavRef}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
        className={`fixed left-0 top-0 z-[100] flex w-full items-center justify-between px-5 py-6 transition-opacity duration-700 md:px-16 ${visible ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!visible}
      >
        <div
          className={`absolute inset-0 -z-10 border-b border-white/10 bg-[#34282D]/80 backdrop-blur-xl transition-opacity duration-500 ${insideHero ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />

        <div className="relative">
          <a
            href="#"
            className="text-white tracking-tighter transition-opacity hover:opacity-80"
            style={{ fontFamily: "'Newsreader', serif", fontSize: '20px', lineHeight: '28px', fontWeight: 400 }}
          >
            TRIỆU TÓC ĐẸP
          </a>
        </div>

        <div className="relative hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded px-3 py-2 text-[12px] font-medium uppercase tracking-[0.05em] text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="relative hidden items-center gap-4 md:flex">
          <a
            href="tel:0942777009"
            className="text-[13px] font-medium tracking-[0.05em] text-white/80 transition-colors duration-300 hover:text-white"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            094 277 70 09
          </a>
          <a
            href="https://zalo.me/0942777009"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-6 py-3 text-[12px] font-medium uppercase tracking-[0.15em] text-[#34282D] transition-colors duration-300 hover:bg-white/90 active:scale-95"
          >
            ĐẶT LỊCH
          </a>
        </div>

        <button
          className="relative text-white md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 bg-[#34282D] pt-24">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[12px] uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:0942777009"
            className="text-[14px] tracking-[0.1em] text-white/80 transition-colors hover:text-white"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            094 277 70 09
          </a>
          <a
            href="https://zalo.me/0942777009"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="bg-white px-8 py-4 text-[12px] font-medium uppercase tracking-[0.15em] text-[#34282D] transition-colors duration-300 hover:bg-white/90"
          >
            ĐẶT LỊCH
          </a>
        </div>
      )}
    </>
  );
});

Nav.displayName = 'Nav';

export default Nav;

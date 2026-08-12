import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STYLISTS = [
  {
  name: 'Phương Anh',
  role: 'Chuyên Gia Uốn & Phục Hồi',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_300/v1786085788/Phuong-_a8ysnw.jpg',
},
{
  name: 'Gia Huy',
  role: 'Chuyên Gia Balayage',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_300/v1786087019/2026-08-07_14-16-57_Lumina_1_rf8v01.jpg',
},
{
  name: 'Minh Quân',
  role: 'Creative Director',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_300/v1786085792/2026-08-07_13-49-58_Lumina_1_krtozn.jpg',
},
{
  name: 'Thanh Trà',
  role: 'Chuyên Gia Nối Tóc',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_300/v1786086989/2026-08-07_14-14-44_Lumina_1_xcpulk.jpg',
},
{
  name: 'Quốc Thịnh',
  role: 'Chuyên Gia Tóc Layer',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_300/v1786085790/THAO_t5ih68.jpg',
},
{
  name: 'Thanh Thảo',
  role: 'Chuyên Gia Nhuộm Màu',
  img: 'https://res.cloudinary.com/o5ikznlv/image/upload/f_auto,q_auto:eco,dpr_auto,c_fill,ar_3:4,w_300/v1786085789/THAO%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC_eoo5ox.jpg',
},
];

export default function Stylists() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {
      // Badge label + heading
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        },
      );

      // Each stylist card (photo + role + name)
      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stylist"
      aria-label="Meet our stylists"
      className="bg-[#F8F5F0] py-16 md:py-24"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#75656A]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Đội Ngũ
          </span>
          <h2
            className="text-[32px] leading-[1.1] tracking-tight text-[#34282D] md:text-[44px]"
            style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
          >
            Gặp Gỡ Nhà Tạo Mẫu
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          style={{ columnGap: '32px', rowGap: '56px' }}
        >
          {STYLISTS.map((stylist) => (
            <article key={stylist.name} className="group">
              <div className="aspect-square overflow-hidden rounded-xl bg-[#E8D8D5]">
                <img
                  src={stylist.img}
                  alt={stylist.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p
                className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[#B98588] md:text-[12px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {stylist.role}
              </p>
              <h3
                className="mt-2 text-[32px] leading-[1.05] tracking-tight text-[#34282D] md:text-[38px]"
                style={{ fontFamily: "'Newsreader', serif", fontWeight: 500 }}
              >
                {stylist.name}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

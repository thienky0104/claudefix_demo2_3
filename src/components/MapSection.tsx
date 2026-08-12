import { useRef, useEffect } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL =
  'https://www.google.com/maps/place/Tri%E1%BB%87u+T%C3%B3c+%C4%90%E1%BA%B9p/@10.9060435,106.7065372,19z/data=!4m6!3m5!1s0x3174d7afd28da94d:0xf34e7050a85b476b!8m2!3d10.9060803!4d106.7068671!16s%2Fg%2F11h77w378l?entry=ttu&g_ep=EgoyMDI2MDgwMy4wIKXMDSoASAFQAw%3D%3D';

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d979.4393151623274!2d106.7065372!3d10.9060435!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d7afd28da94d%3A0xf34e7050a85b476b!2zVHJp4buHdSBUw7NjIMSQ4bq5cA!5e0!3m2!1sen!2s!4v1786192469336!5m2!1sen!2s';

const CONTACT_INFO = [
  {
    label: 'Địa chỉ',
    icon: MapPin,
    content: (
      <>
        9B Đ. Lái Thiêu 51
        <br />
        Lái Thiêu, Bình Dương
      </>
    ),
  },
  {
    label: 'Điện thoại',
    icon: Phone,
    content: (
      <a
        href="tel:0942777009"
        className="text-[#34282D] transition-colors hover:text-[#B98588]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        0942 777 009
      </a>
    ),
  },
  {
    label: 'Giờ mở cửa',
    icon: Clock,
    content: '8:00 AM – 8:00 PM',
  },
];

export default function MapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactRowRef = useRef<HTMLDivElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const contactRow = contactRowRef.current;
    const mapWrap = mapWrapRef.current;
    if (!section || !header || !contactRow || !mapWrap) return;

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

      // Contact info items (address / phone / hours)
      gsap.fromTo(
        contactRow.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: contactRow, start: 'top 85%', once: true },
        },
      );

      // Map embed
      gsap.fromTo(
        mapWrap,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: mapWrap, start: 'top 88%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      aria-label="Salon location"
      className="bg-[#F8F5F0] py-16 md:py-24"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={headerRef} className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#75656A]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Địa điểm
          </span>
          <h2
            className="text-[clamp(1.75rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#34282D]"
          >
            <span className="block">Hãy đến salon của chúng tôi</span>
            <span className="mt-2 block font-display font-normal italic tracking-[-0.045em] text-[#75656A]">
              Gần chợ Lái Thiêu
            </span>
          </h2>
        </div>

        {/* Contact information row */}
        <div ref={contactRowRef} className="grid grid-cols-1 gap-10 border-y border-[#34282D]/10 py-10 sm:grid-cols-3 md:gap-8">
          {CONTACT_INFO.map((info) => {
            const Icon = info.icon;
            return (
              <div key={info.label} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Icon className="shrink-0 text-[#B98588]" size={18} />
                  <span
                    className="text-[10px] uppercase tracking-[0.28em] text-[#75656A]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {info.label}
                  </span>
                </div>
                <p
                  className="text-[16px] leading-[1.7] text-[#34282D] md:text-[17px]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {info.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Full-width Google Maps embed */}
        <div ref={mapWrapRef} className="mt-10 md:mt-14">
          <div className="group/map relative overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(52,40,45,0.06)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(52,40,45,0.12)]">
            <div className="aspect-[16/9] w-full md:aspect-[21/9]">
              <iframe
                src={MAP_EMBED_SRC}
                title="Bản đồ vị trí salon Triệu Tóc Đẹp tại Lái Thiêu, Bình Dương"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full"
              />
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-[#34282D] shadow-md backdrop-blur-sm transition-colors hover:bg-white md:right-6 md:top-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Mở Google Maps
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

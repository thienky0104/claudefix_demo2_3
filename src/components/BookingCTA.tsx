import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA_VIDEO = 'https://res.cloudinary.com/kx53fq3l/video/upload/v1786446514/cta.mp4';

export default function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    if (!section || !left) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        },
      );
      gsap.fromTo(
        videoRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Booking call to action"
      className="bg-[#F8F5F0] py-12 md:py-20"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:min-h-[88vh] md:grid-cols-2">
          {/* LEFT — Typography + CTA */}
          <div
            ref={leftRef}
            className="flex flex-col items-center justify-center py-16 text-center md:py-24"
          >
            <span
              className="text-[11px] uppercase tracking-[0.3em] text-[#75656A]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              ĐẶT LỊCH HẸN
            </span>
            <h2
  className="mt-8 text-[clamp(1.75rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#34282D]"
>
  <span className="block">MÁI TÓC MỚI.</span>
  <span className="block">DIỆN MẠO MỚI.</span>

 <span className="mt-3 block font-display text-[clamp(0.7rem,1.2vw,1.2rem)] font-normal italic leading-[1.2] tracking-[-0.035em] text-[#75656A]">
  <span className="block">Đã đến lúc</span>
  <span className="block">dành thời gian cho bạn.</span>
</span>
</h2>

<div className="mt-10">
              <a
                href="https://zalo.me/0942777009"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block whitespace-nowrap bg-[#B98588] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#A67376] active:scale-95 md:px-10 md:py-5 md:text-[12px] md:tracking-[0.15em]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ĐẶT LỊCH HẸN
              </a>
            </div>
          </div>

          {/* RIGHT — Cinematic video */}
          <div className="relative min-h-[55vh] md:min-h-full">
            <video
              ref={videoRef}
              src={CTA_VIDEO}
              muted
              loop
              playsInline
              preload="none"
              aria-label="Salon cinematic video"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

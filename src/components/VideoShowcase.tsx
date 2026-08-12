import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { videos } from '@/data/videoData';
import VideoCard from '@/components/VideoCard';
import CarouselControls from '@/components/CarouselControls';

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // No Embla, no drag-gesture library — the browser's own native scrolling
  // handles the swipe/drag entirely (overflow-x-auto + snap-x snap-mandatory
  // on the track below). This function just nudges that native scroll
  // container, the same way the arrow buttons did before.
  const scrollByDirection = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.85,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const track = trackRef.current;
    if (!section || !header || !track) return;

    const ctx = gsap.context(() => {
      // Heading + description (badge label, title, paragraph)
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

      // Video cards
      gsap.fromTo(
        track.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: track, start: 'top 85%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Video showcase"
      id="video"
      className="bg-[#F8F5F0] py-20 md:py-28"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section header */}
        <div ref={headerRef} className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-[#75656A]">
              Reel
            </span>
            <h2 className="max-w-[760px] text-[clamp(1.75rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#34282D]">
              Trải nghiệm của khách hàng
            </h2>
            <p className="max-w-[480px] pb-1 text-[15px] leading-[1.75] tracking-[-0.01em] text-[#75656A]">
              Thử những kiểu tóc được yêu thích tại salon, từ cắt, uốn, nhuộm đến tạo kiểu với giá hợp lý cho khách hàng ở khu vực chợ Lái Thiêu.
            </p>
          </div>

          {/* Carousel controls — upper right, desktop only */}
          <div className="hidden md:block">
            <CarouselControls
              scrollPrev={() => scrollByDirection(-1)}
              scrollNext={() => scrollByDirection(1)}
              canScrollPrev={true}
              canScrollNext={true}
            />
          </div>
        </div>

        {/* Video track — native horizontal scroll + snap, no JS drag library */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:gap-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
          <div aria-hidden="true" className="w-1 shrink-0 md:w-3" />
        </div>

        {/* Mobile controls */}
        <div className="mt-8 flex md:hidden">
          <CarouselControls
            scrollPrev={() => scrollByDirection(-1)}
            scrollNext={() => scrollByDirection(1)}
            canScrollPrev={true}
            canScrollNext={true}
          />
        </div>

        {/* CTA */}
        <div className="mt-20 flex justify-center">
          <a
            href="https://zalo.me/0942777009"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#B98588] px-10 py-4 text-[12px] uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#A67376] active:scale-95"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Đặt Lịch Hẹn
          </a>
        </div>
      </div>
    </section>
  );
}

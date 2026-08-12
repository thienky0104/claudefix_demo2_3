import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445442/484978316_1808479776602735_1117950820531129718_n_1.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445442/0805_3.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445442/0805_5.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445442/0805_9.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445443/0805_4.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445443/94619370_242448817109689_6951844033924694016_n.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445443/0805_10.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445444/0805_11.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445445/0805_12.jpg',
  'https://res.cloudinary.com/kx53fq3l/image/upload/v1786445445/0805.jpg',
];

const ImageGallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const track = trackRef.current;
    if (!section || !header || !track) return;

    const ctx = gsap.context(() => {
      // Heading + description
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

      // Gallery images — opacity only (no transform) so it never fights
      // with the marquee's own translateX CSS animation on the track.
      gsap.fromTo(
        track.children,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.04,
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="lookbook" className="overflow-hidden bg-[#F8F5F0] pb-4 pt-16 sm:pb-6 sm:pt-20" aria-labelledby="lookbook-heading">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.38em] text-[#75656A] sm:mb-8">
          Lookbook
        </p>

        <div ref={headerRef} className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
          <h2
            id="lookbook-heading"
            className="lg:col-span-7 max-w-[760px] text-[clamp(1.75rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#34282D]"
          >
            <span className="block">Diện mạo mới, tự tin hơn </span>
            <span className="mt-2 block font-display font-normal italic tracking-[-0.045em] text-[#75656A]">
              Cùng Triệu Salon tại Lái Thiêu
            </span>
          </h2>

          <p className="lg:col-span-5 font-body pb-1 text-[15px] leading-[1.75] tracking-[-0.01em] text-[#75656A]">
          Trải nghiệm diện mạo mới tại Triệu Salon Lái Thiêu, nơi mỗi kiểu tóc được chăm chút theo cá tính, phong cách và đường nét riêng của bạn. Từ cắt, nhuộm đến tạo kiểu, chúng tôi giúp bạn tìm thấy mái tóc phù hợp và tự tin hơn mỗi ngày.
          </p>
        </div>
      </div>

      <div
        className="gallery-marquee-viewport mt-20 overflow-hidden sm:mt-28"
        style={{ height: 'clamp(260px, 44vw, 580px)' }}
      >
        <div ref={trackRef} className="gallery-marquee-track flex h-full w-max will-change-transform gap-3">
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, i) => (
            <div
              key={i}
              className="h-full shrink-0 overflow-hidden"
              style={{ width: 'clamp(200px, 33vw, 480px)' }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
                className="h-full w-full select-none object-cover object-center"
                style={{ display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Stat = {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 4.8, decimals: 1, suffix: '★', label: 'Đánh giá từ khách hàng' },
  { value: 477, suffix: '+', label: 'Khách hàng mỗi tháng' },
  { value: 95, suffix: '%', label: 'Mức độ hài lòng' },
];

function formatValue(value: number, decimals = 0) {
  return value.toFixed(decimals);
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const animations = STATS.map((stat, index) => {
          const number = numberRefs.current[index];
          if (!number) return null;

          const counter = { value: 0 };
          return gsap.to(counter, {
            value: stat.value,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              number.textContent = formatValue(counter.value, stat.decimals);
            },
          });
        });

        observer.disconnect();
        return () => animations.forEach((animation) => animation?.kill());
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Thống kê về salon"
      className="bg-[#F8F5F0] px-6 pb-16 pt-16 md:px-12 md:pb-24 md:pt-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-2 gap-10 border-t border-[#34282D]/10 pt-12 md:grid-cols-3 md:items-end">
          {STATS.map((stat, index) => (
            <div key={stat.label} className={index === 2 ? 'col-span-2 md:col-span-1' : ''}>
              <div
                className="font-display text-5xl font-semibold leading-none tracking-tight text-[#34282D] md:text-6xl"
                aria-label={`${formatValue(stat.value, stat.decimals)}${stat.suffix}`}
              >
                <span ref={(element) => { numberRefs.current[index] = element; }}>
                  {formatValue(0, stat.decimals)}
                </span>
                <span className={stat.decimals ? 'align-top text-2xl md:text-3xl' : ''}>
                  {stat.suffix}
                </span>
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.24em] text-[#34282D]/50 md:text-[11px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

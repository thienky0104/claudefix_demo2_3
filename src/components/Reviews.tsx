const REVIEWS = [
  {
    name: 'Tố Nga',
    service: 'Nhuộm & Uốn',
    text: 'Uốn tóc từ trước tết tới giờ vẫn giữ nếp rất ok, thái độ phục vụ của tiệm cx rất tốt 👍',
  },
  {
    name: 'Trần Thanh Hằng',
    service: 'Cắt Tóc & Phục Hồi',
    text: 'Kiểu tóc cắt tỉa rất tinh tế, đúng như mình mong muốn. Liệu trình phục hồi giúp tóc mềm mại trở lại.',
  },
  {
    name: 'Khang Nguyễn',
    service: 'Nhuộm tóc',
    text: 'Đã làm tóc ở đây được 2 năm nhân viên rất hòa đồng nhiệt tình! Gotcha.',
  },
  {
    name: 'Nguyễn Hương',
    service: 'Uốn Hàn Quốc',
    text: 'Làm tóc ở tiệm cx cỡ 5 năm rồi , rất ưng ý. Uốn tóc và cắt tóc đều đúng với yêu cầu, thái độ nhiệt tình với khách hàng.',
  },
  {
    name: 'Het Cao Van',
    service: 'Cắt Layer & Style',
    text: '10đ a làm tóc hoà đồng thân thiện lắm luôn, giá tốt.',
  },
  {
    name: 'Si Bu',
    service: 'Nhuộm Balayage',
    text: 'Tiệm làm tóc tóc ưng quá chừng 😘, uốn nhuộm 1 lần luôn mà vẫn còn mượt, dịch vụ tốt, nhiệt tình lắm nhee😍😍',
  },
  {
    name: 'Phố Ngô',
    service: 'Phục Hồi Tóc',
    text: 'Anh chủ salon rất tâm , tư vấn phù hợp với từng loại tóc cỉa mình , mấy bạn nhân viên đều rất thân thiện.',
  },
  {
    name: 'Hải Yến',
    service: 'Nối Tóc',
    text: 'Trải nghiệm xứng đáng 5 sao. Không gian sang trọng, phong cách chuyên nghiệp.',
  },
];

type Review = (typeof REVIEWS)[number];

const COL_1 = [REVIEWS[0], REVIEWS[1], REVIEWS[2], REVIEWS[3], REVIEWS[4]];
const COL_2 = [REVIEWS[3], REVIEWS[4], REVIEWS[5], REVIEWS[6], REVIEWS[7]];
const COL_3 = [REVIEWS[5], REVIEWS[6], REVIEWS[7], REVIEWS[0], REVIEWS[1]];

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="mb-6 flex w-full flex-col gap-5 rounded-xl border border-[#34282D]/10 bg-white/60 p-8">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-[14px] text-[#B98588]">
            ★
          </span>
        ))}
      </div>
      <blockquote
        className="text-[15px] leading-[1.8] text-[#34282D]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        “{review.text}”
      </blockquote>
      <figcaption className="mt-auto">
        <p
          className="text-[16px] text-[#34282D]"
          style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
        >
          {review.name}
        </p>
        <p
          className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#75656A]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {review.service}
        </p>
      </figcaption>
    </figure>
  );
}

function ReviewColumn({
  reviews,
  duration,
  delay,
  className = '',
}: {
  reviews: Review[];
  duration: number;
  delay: number;
  className?: string;
}) {
  const loop = [...reviews, ...reviews];
  return (
    <div className={`h-full overflow-hidden ${className}`}>
      <div
        className="flex flex-col will-change-transform"
        style={{
          animation: `marqueeScrollUp ${duration}s linear infinite`,
          animationDelay: `-${delay}s`,
        }}
      >
        {loop.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      aria-label="Client reviews"
      className="overflow-hidden bg-[#F8F5F0] py-16 md:py-24"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#75656A]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Khách Hàng Nói Gì
          </span>
          <h2
            className="text-[32px] leading-[1.1] tracking-tight text-[#34282D] md:text-[44px]"
            style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
          >
            Cảm Nhận Khách Hàng
          </h2>
        </div>

        <div className="relative">
          <div className="grid h-[70vh] grid-cols-1 gap-6 sm:grid-cols-2 md:h-[85vh] md:grid-cols-3 md:gap-8">
            <ReviewColumn reviews={COL_1} duration={30} delay={0} />
            <ReviewColumn reviews={COL_2} duration={36} delay={12} className="hidden sm:block" />
            <ReviewColumn reviews={COL_3} duration={33} delay={6} className="hidden md:block" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F8F5F0] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8F5F0] to-transparent" />
        </div>
      </div>
    </section>
  );
}

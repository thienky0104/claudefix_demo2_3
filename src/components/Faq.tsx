import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'Tôi có thể được tư vấn miễn phí trước khi đến salon qua Zalo không?',
    a: 'Có. Bạn có thể nhắn Zalo để được tư vấn miễn phí trước khi đến salon. Chúng tôi có thể tư vấn kiểu tóc phù hợp, chi phí, thời gian thực hiện và những điều bạn muốn biết trước khi quyết định.',
  },
  {
    q: 'Tôi có cần đặt lịch trước không?',
    a: 'Không bắt buộc. Bạn vẫn có thể ghé salon trực tiếp. Nếu lúc đó salon còn chỗ, chúng tôi sẽ phục vụ ngay. Trường hợp salon đang đông khách, bạn có thể cần chờ một chút hoặc chọn thời gian khác thuận tiện hơn.',
  },
  {
    q: 'Nếu không hài lòng với mái tóc sau khi làm thì sao?',
    a: 'Có. Chúng tôi luôn muốn bạn hài lòng với mái tóc của mình. Nếu bạn chưa ưng ý, hãy trao đổi trực tiếp với chúng tôi để được kiểm tra và hỗ trợ chỉnh sửa cho đến khi bạn cảm thấy phù hợp.',
  },
  {
    q: 'Salon có nhận khách nam không?',
    a: 'Có. Salon phục vụ cả khách nữ và khách nam. Bạn cứ liên hệ hoặc đặt lịch trước nếu muốn được tư vấn kiểu tóc phù hợp.',
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#34282D]/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-7 text-left md:py-8"
        aria-expanded={isOpen}
      >
        <span
          className="text-[19px] leading-[1.4] tracking-[-0.01em] text-[#34282D] md:text-[22px]"
          style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
        >
          {faq.q}
        </span>
        <span className="shrink-0 text-[#B98588]">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <div
        className="grid transition-all duration-500 ease-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p
            className="pb-7 pr-10 text-[15px] leading-[1.8] text-[#75656A] md:pb-8 md:text-[16px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Câu hỏi thường gặp"
      className="bg-[#F8F5F0] py-16 md:py-24"
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-col gap-3 md:mb-16">
          <span
            className="text-[11px] uppercase tracking-[0.3em] text-[#75656A]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Trước Khi Đến Salon
          </span>
          <h2
            className="text-[32px] leading-[1.1] tracking-tight text-[#34282D] md:text-[44px]"
            style={{ fontFamily: "'Newsreader', serif", fontWeight: 400 }}
          >
            Những điều bạn thường muốn biết
          </h2>
        </div>

        <div className="border-t border-[#34282D]/10">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FOOTER_BG =
  'https://res.cloudinary.com/kx53fq3l/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto/v1786445904/footer.jpg';

export default function Footer() {
  const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100057353173781' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@salontrieutocdep' },
    { name: 'Zalo', href: 'https://zalo.me/0942777009' },
  ];

  return (
    <footer
      className="sticky bottom-0 z-0 w-full overflow-hidden"
      style={{
        backgroundImage: `url(${FOOTER_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark cinematic overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#34282D] via-[#34282D]/90 to-[#34282D]/80"
        aria-hidden="true"
      />

      {/* Footer content */}
      <div className="relative min-h-[420px] px-6 py-24 md:min-h-[480px] md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            {/* Logo + intro */}
            <div className="flex flex-col gap-4">
              <span
                className="text-white tracking-tight"
                style={{ fontFamily: "'Newsreader', serif", fontSize: '22px', fontWeight: 400 }}
              >
                TRIỆU TÓC ĐẸP
              </span>
              <p
                className="text-[13px] leading-[1.8] text-white/50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Salon tóc cao cấp Lái Thiêu.<br />
                Nơi mỗi mái tóc là một tác phẩm nghệ thuật.
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.3em] text-[#B98588]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Liên Hệ
              </span>
              <p
                className="text-[13px] leading-[1.8] text-white/60"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                9B, Đường Lái Thiêu 51<br />
                Thuận An, Bình Dương<br />
                Lái Thiêu, Vietnam<br />
                094 277 70 09<br />
                lienhe@trieutocdep.vn
              </p>
            </div>

            {/* Opening hours */}
            <div className="flex flex-col gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.3em] text-[#B98588]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Giờ Mở Cửa
              </span>
              <p
                className="text-[13px] leading-[1.8] text-white/60"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                08:00 – 20:00 (Thứ Hai – Thứ Bảy)<br />
                Chủ Nhật: Nghỉ
              </p>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-3">
              <span
                className="text-[11px] uppercase tracking-[0.3em] text-[#B98588]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Mạng Xã Hội
              </span>
              <div className="flex flex-col gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-white/60 transition-colors hover:text-white"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-white/10 pt-8">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-white/30"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              © 2026 Triệu Tóc Đẹp. Bảo Lưu Mọi Quyền.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

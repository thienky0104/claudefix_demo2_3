import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import FloatingContact from '@/components/FloatingContact';

const ImageGallery = lazy(() => import('@/components/ImageGallery'));
const Stats = lazy(() => import('@/components/Stats'));
const VideoShowcase = lazy(() => import('@/components/VideoShowcase'));
const ServicesPricing = lazy(() => import('@/components/ServicesPricing'));
const Stylists = lazy(() => import('@/components/Stylists'));
const BookingCTA = lazy(() => import('@/components/BookingCTA'));
const Reviews = lazy(() => import('@/components/Reviews'));
const MapSection = lazy(() => import('@/components/MapSection'));
const Faq = lazy(() => import('@/components/Faq'));
const Footer = lazy(() => import('@/components/Footer'));

function App() {
  const heroRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [heroContentVisible] = useState(true);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  useEffect(() => {
    const ric = (window as Window).requestIdleCallback;
    const ricId = ric
      ? ric(() => setBelowFoldReady(true), { timeout: 2000 })
      : window.setTimeout(() => setBelowFoldReady(true), 200);

    return () => {
      const cancel = (window as Window).cancelIdleCallback;
      if (cancel) cancel(ricId as number);
      else window.clearTimeout(ricId as number);
    };
  }, []);

  useEffect(() => {
    if (!heroContentVisible || !floatingRef.current) return;

    const el = floatingRef.current;
    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to(el, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
      });
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('mousemove', reveal);
      window.removeEventListener('click', reveal);
      window.removeEventListener('touchstart', reveal);
      window.removeEventListener('touchmove', reveal);
      window.removeEventListener('wheel', reveal);
      window.removeEventListener('keydown', reveal);
    };

    const opts: AddEventListenerOptions = { passive: true };

    window.addEventListener('scroll', reveal, opts);
    window.addEventListener('mousemove', reveal, opts);
    window.addEventListener('click', reveal, opts);
    window.addEventListener('touchstart', reveal, opts);
    window.addEventListener('touchmove', reveal, opts);
    window.addEventListener('wheel', reveal, opts);
    window.addEventListener('keydown', reveal, opts);

    return cleanup;
  }, [heroContentVisible]);

  return (
    <div className="relative min-h-screen bg-[#F8F5F0] text-[#34282D]">
      <Nav heroRef={heroRef} visible={heroContentVisible} />

      <main className="relative z-[1] bg-[#F8F5F0]">
        <Hero ref={heroRef} visible={heroContentVisible} />
        {belowFoldReady ? (
          <>
            <Suspense fallback={<div className="min-h-[50vh] bg-[#F8F5F0]" />}>
              <ImageGallery />
            </Suspense>
            <Suspense fallback={<div className="min-h-[20vh] bg-[#F8F5F0]" />}>
              <Stats />
            </Suspense>
            <Suspense fallback={<div className="min-h-[50vh] bg-[#F8F5F0]" />}>
              <VideoShowcase />
            </Suspense>
            <Suspense fallback={<div className="min-h-[50vh] bg-[#F8F5F0]" />}>
              <ServicesPricing />
              <Stylists />
              <BookingCTA />
              <Reviews />
              <MapSection />
              <Faq />
            </Suspense>
          </>
        ) : (
          <div className="min-h-[50vh] bg-[#F8F5F0]" />
        )}
      </main>

      {belowFoldReady && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}

      <FloatingContact ref={floatingRef} />
    </div>
  );
}

export default App;

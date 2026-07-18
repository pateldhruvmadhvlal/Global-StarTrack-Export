'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const heroSlides = [
    {
      id: 1,
      title: 'Premium Indian Spices Exporter for Global Markets',
      subtitle:
        'Supplying high-quality cumin seeds, turmeric whole and powder, and red chilli whole and powder for importers, wholesalers, and food businesses worldwide.',
      image: 'https://images.unsplash.com/photo-1721426022736-dba52254f398',
      alt: 'Premium Indian spices exporter Gujarat — export quality cumin, turmeric and red chilli in bulk',
      cta: 'Explore Our Spices',
      objectPosition: {
        mobile: 'center center',
        tablet: 'center center',
        desktop: 'center center',
      },
    },
    {
      id: 2,
      title: 'Bulk Cumin Seeds & Turmeric Powder Exporter from India',
      subtitle:
        'Trusted cumin seeds exporter and turmeric powder exporter from India. Carefully sourced from certified Indian farms to meet international food safety standards.',
      image: '/assets/homepage/bulk-cumin-turmeric-exporter-india.jpg',
      alt: 'Bulk cumin seeds and turmeric powder exporter from  India — export quality spices',
      cta: 'View Certifications',
      objectPosition: {
        mobile: '30% center',
        tablet: 'center center',
        desktop: 'center center',
      },
    },
    {
      id: 3,
      title: 'Wholesale Spices Supplier for Importers & Food Manufacturers',
      subtitle:
        'Reliable wholesale spices supplier from India for importers, distributors. Custom packaging, private label, and full export documentation support available.',
      image: '/assets/homepage/wholesale-spices-supplier-india.jpg',
      alt: 'Wholesale Indian spices supplier for importers — custom packaging and private label spice export',
      cta: 'Request a Quote',
      objectPosition: {
        mobile: '30% center',
        tablet: 'center center',
        desktop: 'center center',
      },
    },
  ];

  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHydrated, heroSlides.length]);

  const handleSlideChange = (index: number) => {
    if (!isHydrated) return;
    setCurrentSlide(index);
  };

  const handlePrevSlide = () => {
    if (!isHydrated) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    if (!isHydrated) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Background Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <AppImage
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              style={{
                objectPosition: slide.objectPosition?.desktop || 'center center',
              }}
              priority={index === 0} /* LCP: preload only first slide */
              fill
              sizes="100vw"
              quality={index === 0 ? 85 : 70}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />

            {/* Mobile-specific object position */}
            <style jsx>{`
              @media (max-width: 767px) {
                .object-cover {
                  object-position: ${slide.objectPosition?.mobile || 'center center'};
                }
              }
              @media (min-width: 768px) and (max-width: 1023px) {
                .object-cover {
                  object-position: ${slide.objectPosition?.tablet || 'center center'};
                }
              }
            `}</style>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto h-full flex items-center px-4 lg:px-6">
        <div className="max-w-3xl text-white">
          <div className="space-y-6 animate-fade-in">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="font-inter text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-accent text-accent-foreground font-poppins font-semibold text-base rounded-md hover:bg-accent/90 transition-all duration-300 shadow-elevation-md hover:shadow-elevation-lg inline-flex items-center space-x-2"
              >
                <span>{heroSlides[currentSlide].cta}</span>
                <Icon name="ArrowRightIcon" size={20} variant="outline" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-poppins font-semibold text-base rounded-md hover:bg-white/20 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Get Quote</span>
                <Icon name="ChatBubbleLeftRightIcon" size={20} variant="outline" />
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Icon
                  name="ShieldCheckIcon"
                  size={24}
                  variant="solid"
                  className="text-accent-foreground"
                />
              </div>
              <div>
                <p className="font-poppins font-semibold text-lg">Quality-Focused Sourcing</p>
                <p className="font-inter text-sm text-white/80">Export Standards</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Icon
                  name="GlobeAltIcon"
                  size={24}
                  variant="solid"
                  className="text-accent-foreground"
                />
              </div>
              <div>
                <p className="font-poppins font-semibold text-lg">Global Markets</p>
                <p className="font-inter text-sm text-white/80">International Trade</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Icon
                  name="TruckIcon"
                  size={24}
                  variant="solid"
                  className="text-accent-foreground"
                />
              </div>
              <div>
                <p className="font-poppins font-semibold text-lg">On-Time Shipments</p>
                <p className="font-inter text-sm text-white/80">Reliable Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {isHydrated && (
        <>
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Previous slide"
          >
            <Icon name="ChevronLeftIcon" size={24} variant="outline" className="text-white" />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
            aria-label="Next slide"
          >
            <Icon name="ChevronRightIcon" size={24} variant="outline" className="text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-accent w-8' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-20 hidden lg:flex flex-col items-center space-y-2 text-white animate-bounce">
        <span className="font-inter text-sm">Scroll Down</span>
        <Icon name="ChevronDownIcon" size={24} variant="outline" />
      </div>
    </section>
  );
};

export default HeroSection;

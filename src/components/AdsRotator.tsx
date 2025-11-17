import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, Star, Zap, TrendingUp, Eye } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  image_url?: string;
}

export default function AdsRotator() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*').limit(10);
      if (error) console.error('Error loading ads:', error);
      else setProducts(data as Product[]);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0 || !autoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [products, currentIndex, autoPlay]);

  const handleNext = () => {
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  if (products.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center h-96">
              <div className="animate-pulse space-y-4 w-full">
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const product = products[currentIndex];
  const prevProduct = products[(currentIndex - 1 + products.length) % products.length];
  const nextProduct = products[(currentIndex + 1) % products.length];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header badge */}


        <div className="max-w-6xl mx-auto">
          <div
            className="relative"
            onMouseEnter={() => {
              setAutoPlay(false);
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setAutoPlay(true);
              setIsHovered(false);
            }}
          >
            {/* Main content area */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              {/* Side preview - Previous (hidden on mobile) */}
              <div className="hidden lg:block col-span-1 opacity-40 hover:opacity-60 transition-all duration-300">
                <div className="relative group cursor-pointer" onClick={handlePrev}>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-md">
                    <img
                      src={prevProduct.image_url || '/placeholder.png'}
                      alt={prevProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                </div>
              </div>

              {/* Main product showcase */}
              <div className="col-span-1 lg:col-span-3">
                <div
                  className={`transition-all duration-700 ease-out ${
                    isTransitioning
                      ? direction === 'next'
                        ? 'opacity-0 translate-x-20 scale-95'
                        : 'opacity-0 -translate-x-20 scale-95'
                      : 'opacity-100 translate-x-0 scale-100'
                  }`}
                >
                  <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl overflow-hidden group hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                        {/* Image section */}
                        <div className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                          <div className="aspect-square relative">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            
                            <img
                              src={product.image_url || '/placeholder.png'}
                              alt={product.name}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            />
                            
                      

                            {/* View count indicator */}
                           

                            {/* Corner accent */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-600/20 to-transparent"></div>
                          </div>
                        </div>

                        {/* Content section */}
                        <div className="md:col-span-3 p-8 flex flex-col justify-between">
                          <div className="space-y-4">
                            {/* Category and counter */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 flex-wrap">
                                {product.category && (
                                  <Badge variant="outline" className="text-xs font-semibold border-blue-200 text-blue-700 bg-blue-50">
                                    {product.category}
                                  </Badge>
                                )}
                                
                              </div>
                              <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                                {currentIndex + 1} / {products.length}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                              {product.name}
                            </h3>

                            {/* Description */}
                            {product.description && (
                              <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
                                {product.description}
                              </p>
                            )}

                            {/* Features list */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                              <div className="flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-yellow-500" />
                                <span>Fast Delivery</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Star className="w-3.5 h-3.5 text-yellow-500" />
                                <span>Premium Quality</span>
                              </div>
                            </div>
                          </div>

                          {/* Price and CTA */}
                          <div className="flex items-end justify-between pt-6 border-t border-gray-100 mt-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">Price</p>
                              <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                  {product.price ? `GHS ${product.price.toFixed(2)}` : 'N/A'}
                                </p>
                                {product.price && (
                                  <span className="text-sm text-gray-400 line-through">
                                    GHS {(product.price * 1.3).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              onClick={() => (window.location.href = '/catalogue')}
                              className="gap-2 text-sm py-6 px-8 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 rounded-xl font-semibold"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              Shop Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Side preview - Next (hidden on mobile) */}
              <div className="hidden lg:block col-span-1 opacity-40 hover:opacity-60 transition-all duration-300">
                <div className="relative group cursor-pointer" onClick={handleNext}>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-md">
                    <img
                      src={nextProduct.image_url || '/placeholder.png'}
                      alt={nextProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20"></div>
                </div>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={handlePrev}
                className="group w-14 h-14 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 border border-gray-200/50 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2 justify-center px-4">
                {products.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-500 rounded-full ${
                      index === currentIndex
                        ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg'
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-125'
                    }`}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="group w-14 h-14 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 border border-gray-200/50 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50"
                aria-label="Next product"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300 ease-linear"
                  style={{
                    width: autoPlay && !isHovered ? '100%' : '0%',
                    transition: autoPlay && !isHovered ? 'width 6s linear' : 'width 0.3s ease-out'
                  }}
                  key={currentIndex}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative w-full bg-[#231f20] py-32 overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f36e21] to-transparent opacity-30" />
      
      {/* Animated images */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Верхние плавающие изображения */}
        <motion.div 
          className="absolute -top-10 left-[10%] w-24 h-24 md:w-32 md:h-32"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-full h-full relative"
          >
            <Image 
              src="/images/1.png" 
              alt="Decoration" 
              fill 
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute top-20 right-[15%] w-20 h-20 md:w-28 md:h-28"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="w-full h-full relative"
          >
            <Image 
              src="/images/2o.png" 
              alt="Decoration" 
              fill 
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
        
        {/* Центральные плавающие изображения */}
        <motion.div 
          className="absolute left-[5%] top-1/2 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            animate={{ 
              x: [0, 15, 0],
              y: [0, 10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-full h-full relative"
          >
            <Image 
              src="/images/3o.png" 
              alt="Decoration" 
              fill 
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute right-[5%] top-1/2 -translate-y-1/3 w-16 h-16 md:w-24 md:h-24"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div
            animate={{ 
              x: [0, -15, 0],
              y: [0, -10, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-full h-full relative"
          >
            <Image 
              src="/images/4o.png" 
              alt="Decoration" 
              fill 
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
        
        {/* Нижние плавающие изображения */}
        <motion.div 
          className="absolute bottom-10 left-[20%] w-16 h-16 md:w-20 md:h-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-full h-full relative"
          >
            <Image 
              src="/images/5o.png" 
              alt="Decoration" 
              fill 
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-[25%] w-16 h-16 md:w-20 md:h-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
            className="w-full h-full relative"
          >
            <Image 
              src="/images/6o.png" 
              alt="Decoration" 
              fill 
              sizes="(max-width: 768px) 100vw, 30vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Hero content overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#231f20] via-[#231f20]/80 to-[#231f20] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero content */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold text-white text-center mb-8"
        >
          {t('organizeParty.hero.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-white/70 text-center max-w-3xl mx-auto mb-8"
        >
          {t('organizeParty.hero.subtitle')}
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <motion.a
            href="#events-section"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden px-8 py-4 bg-[#f36e21] text-white font-bold rounded-lg
              transform transition-all duration-200 flex items-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="text-lg">{t('common.learnMore')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 
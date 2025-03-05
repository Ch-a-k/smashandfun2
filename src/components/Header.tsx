"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { translations } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down and not at top
      else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Control body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: translations.nav.home },
    { href: '/organizacja-imprez', label: translations.nav.organizeParty },
    { href: '/blog', label: translations.nav.blog },
    { href: '/faq', label: translations.nav.faq },
    { href: '/kontakt', label: translations.nav.contact },
  ];

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
          !isVisible ? 'translate-y-[-100%]' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative">
              <Image
                src="/images/logo.png"
                alt="Smash&Fun Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={` text-lg font-impact uppercase tracking-wide transition-colors ${
                    pathname === link.href
                      ? 'text-[#f36e21]'
                      : 'text-white hover:text-[#f36e21]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={scrollToServices}
                className="hidden md:block bg-[#f36e21] text-white px-4 py-2 rounded-lg font-impact uppercase tracking-wide hover:bg-[#f36e21]/90 transition-colors"
              >
                REZERWACJA
              </button>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative z-[120] p-2 text-white"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-current transform transition-all duration-200 origin-left ${
                      isMobileMenuOpen ? 'rotate-45 translate-x-px' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-200 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current transform transition-all duration-200 origin-left ${
                      isMobileMenuOpen ? '-rotate-45 translate-x-px' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Outside of header */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-[90]"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto"
            >
              <nav className="w-full min-h-screen px-6 py-36">
                <div className="flex flex-col items-center space-y-5">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-impact uppercase tracking-wide transition-colors ${
                          pathname === link.href
                            ? 'text-[#f36e21]'
                            : 'text-white hover:text-[#f36e21]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                  >
                    <button
                      onClick={scrollToServices}
                      className="bg-[#f36e21] text-white px-6 py-2.5 rounded-lg font-impact uppercase tracking-wide hover:bg-[#f36e21]/90 transition-colors text-lg"
                    >
                      REZERWACJA
                    </button>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4"
                  >
                    <LanguageSwitcher />
                  </motion.div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

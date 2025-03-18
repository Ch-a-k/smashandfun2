"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Clock, ChevronDown } from 'lucide-react';
import HappyHoursModal from './HappyHoursModal';

// Функция для установки куки
const setCookie = (name: string, value: string, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Функция для получения значения куки
const getCookie = (name: string) => {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let c = cookieArray[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return "";
};

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHappyHoursOpen, setIsHappyHoursOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t } = useI18n();

  // Автоматическое открытие Happy Hours при загрузке страницы
  useEffect(() => {
    // Проверка должна выполняться только на клиенте
    if (typeof window === 'undefined') return;
    
    try {
      // Проверяем, когда модальное окно было закрыто последний раз (из куки)
      const lastClosedTime = getCookie('happyHoursLastClosed');
      const shouldShowModal = !lastClosedTime || (Date.now() - parseInt(lastClosedTime)) > 24 * 60 * 60 * 1000;
      
      // Если прошло более 24 часов или пользователь еще не закрывал модальное окно
      if (shouldShowModal) {
        // Задержка для обеспечения корректной загрузки страницы
        const timer = setTimeout(() => {
          setIsHappyHoursOpen(true);
        }, 500);
        
        return () => clearTimeout(timer);
      }
    } catch {
      // Ошибка при проверке куки
      setIsHappyHoursOpen(false);
    }
  }, []);

  // Отслеживаем состояние модального окна
  useEffect(() => {
    // Состояние модального окна изменилось
  }, [isHappyHoursOpen]);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { 
      label: t('nav.organizeParty'),
      isDropdown: true,
      dropdownItems: [
        { href: '/organizacja-imprez', label: t('nav.organizePartyDropdown.b2c') },
        { href: '/organizacja-imprez-b2b', label: t('nav.organizePartyDropdown.b2b') },
      ]
    },
    { href: '/blog', label: t('nav.blog') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/kontakt', label: t('nav.contact') },
  ];

  const scrollToServices = () => {
    window.open('https://smashandfun.simplybook.it/v2/#book/count/1/', '_blank');
    setIsMobileMenuOpen(false);
  };

  const openHappyHours = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHappyHoursOpen(prev => !prev);
    setIsMobileMenuOpen(false);
  };

  // Функция закрытия модального окна с сохранением времени в куки
  const closeHappyHours = () => {
    try {
      // Сохраняем текущее время закрытия в куки (срок действия 30 дней, но проверка через 24 часа)
      const timestamp = Date.now().toString();
      setCookie('happyHoursLastClosed', timestamp, 30);
      setIsHappyHoursOpen(false);
    } catch {
      // Ошибка при сохранении куки
      setIsHappyHoursOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
          !isVisible ? 'translate-y-[-100%]' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div style={{ width: '150px', height: '40px' }}>
            <Image
                  src="/images/logo.png"
                  alt="Smash&Fun Logo"
                  width={150}
                  height={40}
                  style={{ width: '150px', height: '40px', objectFit: 'contain' }}
                  priority
                />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              link.isDropdown ? (
                <div key={`dropdown-${index}`} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-1 text-lg font-impact uppercase tracking-wide transition-colors ${
                      pathname.includes('/organizacja-imprez') ? 'text-[#f36e21]' : 'text-white hover:text-[#f36e21]'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-[#1a1718] rounded-lg overflow-hidden shadow-xl">
                      {link.dropdownItems?.map((item, itemIndex) => (
                        <Link
                          key={`dropdown-item-${itemIndex}`}
                          href={item.href as string}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`block px-4 py-3 text-sm uppercase transition-colors ${
                            pathname === item.href ? 'bg-[#2c2528] text-[#f36e21]' : 'text-white hover:bg-[#2c2528] hover:text-[#f36e21]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href as string}
                  href={link.href as string}
                  className={`text-lg font-impact uppercase tracking-wide transition-colors ${
                    pathname === link.href
                      ? 'text-[#f36e21]'
                      : 'text-white hover:text-[#f36e21]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {/* Happy Hours Button */}
            <button
              onClick={openHappyHours}
              className="p-2 rounded-lg bg-[#f36e21]/10 text-[#f36e21] hover:bg-[#f36e21]/20 transition-colors"
              aria-label="Happy Hours"
            >
              <Clock className="w-5 h-5" />
            </button>
            <button
              onClick={scrollToServices}
              className="hidden md:block bg-[#f36e21] text-white px-4 py-2 rounded-lg font-impact uppercase tracking-wide hover:bg-[#f36e21]/90 transition-colors"
            >
              {t('common.bookNow')}
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-10 md:hidden p-2"
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
      </motion.header>

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
                    link.isDropdown ? (
                      <motion.div
                        key={`mobile-dropdown-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col items-center"
                      >
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`flex items-center gap-1 text-lg font-impact uppercase tracking-wide transition-colors ${
                            pathname.includes('/organizacja-imprez') ? 'text-[#f36e21]' : 'text-white hover:text-[#f36e21]'
                          }`}
                        >
                          {link.label}
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 flex flex-col items-center space-y-3"
                            >
                              {link.dropdownItems?.map((item, itemIndex) => (
                                <Link
                                  key={`mobile-dropdown-item-${itemIndex}`}
                                  href={item.href as string}
                                  onClick={() => {
                                    setIsDropdownOpen(false);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className={`text-sm font-impact uppercase tracking-wide transition-colors ${
                                    pathname === item.href ? 'text-[#f36e21]' : 'text-gray-300 hover:text-[#f36e21]'
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={link.href as string}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href as string}
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
                    )
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
                      {t('common.bookNow')}
                    </button>
                  </motion.div>

                  {/* Happy Hours Button */}
                  <button
                    onClick={openHappyHours}
                    className="p-3 rounded-full bg-[#f36e21]/10 text-[#f36e21]"
                    aria-label="Happy Hours"
                  >
                    <Clock className="w-6 h-6" />
                  </button>

                  <LanguageSwitcher />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Happy Hours Modal */}
      <HappyHoursModal
        isOpen={isHappyHoursOpen}
        onClose={closeHappyHours}
      />
    </>
  );
}

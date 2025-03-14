"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Gift, ArrowRight, Calendar } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

interface HappyHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HappyHoursModal({ isOpen, onClose }: HappyHoursModalProps) {
  const { t } = useI18n();

  const handleBooking = () => {
    window.open('https://smashandfun.simplybook.it/v2/#book/count/1/', '_blank');
    onClose();
  };

  const benefits = t('happyHours.benefits', { returnObjects: true }) as string[];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[160] overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full max-w-md bg-[#1a1718] rounded-xl shadow-lg border border-[#f36e21]/20 relative overflow-hidden"
              >
                {/* Decorative line */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#f36e21]/30 to-transparent" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-white/60 hover:text-white bg-black/20 rounded-full p-1.5 z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="p-5">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-impact text-[#f36e21] uppercase">
                      {t('happyHours.title')}
                    </h2>
                    <p className="text-white/70 text-sm">
                      {t('happyHours.subtitle')}
                    </p>
                  </div>

                  {/* Schedule and Benefits */}
                  <div className="bg-black/20 rounded-lg p-4 mb-4">
                    {/* Schedule */}
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                      <Calendar className="text-[#f36e21] w-4 h-4 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 text-sm">{t('happyHours.schedule.weekdays')}</span>
                          <span className="text-white text-sm font-medium">{t('happyHours.schedule.time')}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-white/80 text-sm">{t('happyHours.schedule.discountname')}</span>
                          <span className="text-[#f36e21] font-impact text-lg">{t('happyHours.schedule.discount')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="flex items-start gap-2">
                      <Gift className="text-[#f36e21] w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 flex-1">
                        {benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div className="w-1 h-1 rounded-full bg-[#f36e21]" />
                            <span className="text-white/80 text-xs">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleBooking}
                    className="w-full bg-[#f36e21] text-white font-impact uppercase py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#ff7b2e] transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{t('happyHours.cta')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
} 
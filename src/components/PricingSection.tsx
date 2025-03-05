'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { 
  Hammer, 
  Users, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Shirt,
  HardHat,
  Glasses
} from 'lucide-react'
import { ReactElement } from 'react'

type Tool = 'ubranie' | 'kask' | 'rękawice'

const packages = [
  {
    name: 'BUŁKA Z MASŁEM',
    items: ['25 szklanych przedmiotów'],
    tools: ['ubranie', 'kask', 'rękawice'] as Tool[],
    people: '1-2 osoby',
    duration: 'do 30 min',
    price: '199 PLN',
    difficulty: 'ŁATWY',
  },
  {
    name: 'ŁATWY',
    items: [
      '25 szklanych przedmiotów',
      '2 meble',
      '3 sprzęty RTV i AGD'
    ],
    tools: ['ubranie', 'kask', 'rękawice'] as Tool[],
    people: '1-2 osoby',
    duration: 'do 45 min',
    price: '299 PLN',
    difficulty: 'ŚREDNI',
  },
  {
    name: 'ŚREDNI',
    items: [
      '30 szklanych przedmiotów',
      '3 meble',
      '5 sprzętów RTV i AGD'
    ],
    tools: ['ubranie', 'kask', 'rękawice'] as Tool[],
    people: '1-4 osoby',
    duration: 'do 120 min',
    price: '499 PLN',
    isBestseller: true,
    difficulty: 'TRUDNY',
  },
  {
    name: 'TRUDNY',
    items: [
      '35 szklanych przedmiotów',
      '5 meble',
      '8 sprzętów RTV i AGD',
      '10 mniejszych sprzętów RTV i AGD'
    ],
    tools: ['ubranie', 'kask', 'rękawice'] as Tool[],
    people: '1-6 osób',
    duration: 'do 180 min',
    price: '999 PLN',
    difficulty: 'EKSTREMALNY',
  },
]

const toolIcons: Record<Tool, ReactElement> = {
  'ubranie': <Shirt className="w-5 h-5" />,
  'kask': <HardHat className="w-5 h-5" />,
  'rękawice': <Glasses className="w-5 h-5" />
}

export function PricingSection() {
  const { translations } = useI18n()

  return (
    <section className="py-24 bg-[#1a1718] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#f36e21]/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-[#000000]/40 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {translations.home.pricing.title}
            </h2>
            <div className="flex justify-center mt-4">
              <div className="h-1 w-12 bg-gradient-to-r from-[#f36e21] to-[#ff9f58] rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => {
            const isSredni = pkg.name === 'ŚREDNI'
            
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className={cn(
                  "relative group",
                  isSredni && "lg:scale-110 lg:-translate-y-4 z-10"
                )}
              >
                {/* Animated border for ŚREDNI package */}
                {isSredni && (
                  <div className="absolute -inset-[2px] rounded-[20px] bg-gradient-to-r from-[#f36e21] via-[#ff9f58] to-[#f36e21] animate-border-flow" />
                )}

                <div className={cn(
                  "relative h-full rounded-[18px] p-6",
                  "bg-black/40 backdrop-blur-xl",
                  "border transition-all duration-300",
                  isSredni 
                    ? "border-transparent shadow-xl shadow-[#f36e21]/20" 
                    : "border-white/10 hover:border-white/20"
                )}>
                  {/* Package header */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={cn(
                          "text-lg font-bold",
                          isSredni ? "text-[#f36e21]" : "text-white"
                        )}>
                          {pkg.name}
                        </h3>
                        <div className="mt-1 text-xl font-bold text-white">
                          {pkg.price}
                        </div>
                      </div>
                      {isSredni && (
                        <Badge 
                          variant="featured"
                          className="flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          BESTSELLER
                        </Badge>
                      )}
                    </div>

                    {/* Package features */}
                    <div className="pt-4 space-y-4">
                      {/* Items to destroy */}
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-white/60 mb-3">
                          <Hammer className="w-4 h-4" />
                          DO ZDEMOLOWANIA
                        </div>
                        <ul className="space-y-2">
                          {pkg.items.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle2 className={cn(
                                "w-4 h-4 mt-1",
                                isSredni ? "text-[#f36e21]" : "text-white/40"
                              )} />
                              <span className="text-sm text-white/80">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Tools */}
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-white/60 mb-3">
                          NARZĘDZIA
                        </div>
                        <div className="flex gap-3">
                          {pkg.tools.map((tool) => (
                            <div 
                              key={tool}
                              className={cn(
                                "p-2 rounded-lg",
                                "bg-white/5 border border-white/10",
                                isSredni && "text-[#f36e21]"
                              )}
                            >
                              {toolIcons[tool]}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional info */}
                      <div className="flex items-center justify-between text-sm text-white/60 pt-2">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {pkg.people}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {pkg.duration}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full mt-6 py-3 px-4 rounded-lg",
                      "font-medium text-sm",
                      "transition-all duration-200",
                      isSredni
                        ? "bg-[#f36e21] text-white hover:bg-[#f36e21]/90"
                        : "bg-white/10 text-white hover:bg-white/20"
                    )}
                  >
                    {translations.home.pricing.bookNow}
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-border-flow {
          background-size: 300% 300%;
          animation: border-flow 8s ease infinite;
        }
      `}</style>
    </section>
  )
}

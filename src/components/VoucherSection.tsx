"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Gift, ArrowRight, CheckCircle2 } from 'lucide-react';

export function VoucherSection() {
  const benefits = [
    "Idealny pomysł na prezent urodzinowy",
    "Voucher ważny przez 6 miesięcy",
    "Możliwość wyboru dowolnego pakietu",
    "Natychmiastowa dostawa na email"
  ];

  return (
    <section className="relative w-full bg-[#0f0f12] py-32 ">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#f36e21]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-[#231f20]/90 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 space-y-8">
              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span className="text-xs font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#f36e21] to-[#ff9f58] mb-3 block">
                  VOUCHER PREZENTOWY
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Podaruj niezapomniane <br/>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f36e21] to-[#ff9f58]">
                    emocje
                  </span>
                </h2>
              </motion.div>

              {/* Benefits list */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f36e21]/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#f36e21]" />
                    </div>
                    <span className="text-white/70">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2 bg-[#f36e21] text-white px-8 py-4 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Gift className="w-5 h-5" />
                <span className="font-semibold">KUP VOUCHER</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right column with voucher preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden 
                          bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-sm 
                          border border-white/[0.08]">
              {/* Voucher image */}
              <Image
                src="/images/voucher.png"
                alt="Smash&Fun Voucher"
                fill
                className="object-contain p-8 transform group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />

              {/* Hover effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                            bg-gradient-to-r from-[#f36e21]/0 via-[#f36e21]/5 to-[#f36e21]/0 
                            transition-opacity duration-700" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#f36e21]/20 via-[#f36e21]/10 to-[#f36e21]/20 
                          rounded-3xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-[#f36e21] to-[#ff9f58] 
                        rounded-full blur-2xl opacity-40"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-[#551fb7] to-[#f36e21] 
                        rounded-full blur-2xl opacity-30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

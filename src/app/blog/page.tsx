"use client";

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { blogPosts } from '@/data/blogPosts';
import { BlogPost } from '@/types/blog';
import BlogPostPopup from '@/components/BlogPostPopup';
import { useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#231f20]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full bg-[#231f20] py-32">
          {/* Decorative line */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f36e21] to-transparent opacity-30"></div>
          
          {/* Decorative background images */}
          <div className="absolute top-[5%] left-[15%] w-20 h-20 opacity-90 pointer-events-none">
            <Image
              src="/images/turn-left.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-[40%] left-[8%] w-16 h-16 opacity-90 pointer-events-none">
            <Image
              src="/images/6o.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-[65%] right-[20%] w-24 h-24 opacity-90 pointer-events-none">
            <Image
              src="/images/1.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-[75%] left-[50%] w-20 h-20 opacity-90 pointer-events-none -translate-x-1/2">
            <Image
              src="/images/down.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute top-[25%] right-[12%] w-12 h-12 opacity-90 pointer-events-none">
            <Image
              src="/images/turn-right.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          
          <div className="max-w-7xl mx-auto px-4">
            {/* Hero content */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white text-center mb-8 relative z-10"
            >
              NASZ BLOG
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/70 text-center max-w-3xl mx-auto mb-8"
            >
              Poznaj najlepsze sposoby radzenia sobie ze stresem i negatywnymi emocjami. 
              Czytaj nasze artykuły i dowiedz się, jak zadbać o swoje zdrowie psychiczne.
            </motion.p>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="relative w-full bg-[#231f20] py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-24">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 }
                  }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1718] to-transparent opacity-60" />
                      <div className="absolute bottom-4 left-4 text-white/70 text-sm">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('pl-PL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <span className="mx-2">•</span>
                        <span>{post.readTime} min czytania</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 space-y-6">
                    <motion.h3 
                      variants={fadeInUp}
                      className="text-3xl font-bold text-white"
                    >
                      {post.title}
                    </motion.h3>
                    <motion.p 
                      variants={fadeInUp}
                      className="text-white/70"
                    >
                      {post.excerpt}
                    </motion.p>
                    <motion.div 
                      variants={fadeInUp}
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center text-[#f36e21] font-medium cursor-pointer group"
                    >
                      Czytaj więcej
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative w-full bg-[#f36e21] py-24">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#231f20] backdrop-blur-sm rounded-2xl p-12 relative"
            >
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-10 rounded-2xl pointer-events-none" />
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Gotowy, by wyzwolić nagromadzony stres?
              </h2>
              <p className="text-white/70 mb-8">
                Przyjdź do Smash&Fun i uwolnij się od stresu w naszym pokoju furii!
              </p>
              <a
                href="/kontakt"
                className="inline-block px-12 py-6 bg-[#f36e21] text-white font-bold rounded-lg
                  transform transition-all duration-200 hover:scale-105 hover:bg-[#ff7b2e]
                  focus:outline-none focus:ring-2 focus:ring-[#f36e21] focus:ring-opacity-50
                  text-lg"
              >
                ZAREZERWUJ TERAZ
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      
      <BlogPostPopup
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
      
      <Footer />
    </div>
  );
}

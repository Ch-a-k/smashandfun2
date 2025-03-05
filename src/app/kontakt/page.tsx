"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Send, MapPin, Phone, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation schema with zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Imię musi mieć co najmniej 2 znaki" }),
  email: z.string().email({ message: "Nieprawidłowy adres email" })
    .refine((email: string) => !email.toLowerCase().endsWith('.ru'), { 
      message: "Przepraszamy, adresy email z domeną .ru nie są akceptowane" 
    }),
  phone: z.string()
    .min(9, { message: "Nieprawidłowy numer telefonu" })
    .optional()
    .nullable()
    .or(z.literal('')),
  subject: z.string().min(3, { message: "Temat musi mieć co najmniej 3 znaki" }),
  message: z.string().min(10, { message: "Wiadomość musi mieć co najmniej 10 znaków" })
    .max(3000, { message: "Wiadomość nie może przekraczać 3000 znaków" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const messageText = watch('message') || '';
  const remainingChars = 3000 - messageText.length;

  // Send data to our API route
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Coś poszło nie tak. Spróbuj ponownie później.');
      }
      
      setSubmitStatus('success');
      reset();
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Wystąpił nieznany błąd');
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-[#0f0f12] min-h-screen">
        {/* Hero section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 mix-blend-overlay" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#f36e21]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#231f20]/90 rounded-full blur-[120px]" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
                Skontaktuj się z <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f36e21] to-[#ff9f58]">nami</span>
              </h1>
              <p className="text-white/60 text-center max-w-2xl mx-auto text-lg">
                Masz pytania dotyczące naszych usług? Chcesz zarezerwować termin? 
                Wypełnij formularz, a my odpowiemy najszybciej jak to możliwe.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Contact form section */}
        <section className="py-10 md:py-16 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Contact info */}
              <div className="order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#171717]/40 backdrop-blur-sm rounded-2xl p-8 border border-white/5 h-full"
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Informacje kontaktowe</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-[#f36e21]/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#f36e21]" />
                      </div>
                      <div>
                        <p className="text-white/80 font-medium">Adres</p>
                        <p className="text-white/60">ul. Przykładowa 123, 00-000 Warszawa</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-[#f36e21]/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-[#f36e21]" />
                      </div>
                      <div>
                        <p className="text-white/80 font-medium">Telefon</p>
                        <p className="text-white/60">+48 123 456 789</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-[#f36e21]/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#f36e21]" />
                      </div>
                      <div>
                        <p className="text-white/80 font-medium">Email</p>
                        <p className="text-white/60">kontakt@smashandfun.pl</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10">
                    <h4 className="text-xl font-semibold text-white mb-6">Godziny otwarcia</h4>
                    <ul className="space-y-2 text-white/60">
                      <li className="flex justify-between">
                        <span>Poniedziałek - Piątek</span>
                        <span>10:00 - 22:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sobota</span>
                        <span>10:00 - 23:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Niedziela</span>
                        <span>12:00 - 20:00</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
              
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 order-1 lg:order-2"
              >
                <div className="bg-[#171717]/40 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/5 relative">
                  {/* Status overlay for success */}
                  {submitStatus === 'success' && (
                    <div className="absolute inset-0 bg-[#171717]/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20 px-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                      <h3 className="text-white text-xl md:text-2xl font-bold text-center">Wiadomość wysłana!</h3>
                      <p className="text-white/70 text-center mt-2 max-w-md">
                        Dziękujemy za kontakt. Odpowiemy na Twoją wiadomość najszybciej jak to możliwe.
                      </p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name & Email (on the same row on desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-white/80 font-medium block">
                          Imię i nazwisko <span className="text-[#f36e21]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f36e21]/50 transition-colors`}
                          placeholder="Jan Kowalski"
                          {...register('name')}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-white/80 font-medium block">
                          Email <span className="text-[#f36e21]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f36e21]/50 transition-colors`}
                          placeholder="jan@example.com"
                          {...register('email')}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Phone & Subject (on the same row on desktop) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-white/80 font-medium block">
                          Telefon <span className="text-white/40">(opcjonalnie)</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f36e21]/50 transition-colors`}
                          placeholder="+48 123 456 789"
                          {...register('phone')}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-white/80 font-medium block">
                          Temat <span className="text-[#f36e21]">*</span>
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className={`w-full bg-white/5 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f36e21]/50 transition-colors`}
                          placeholder="Rezerwacja terminu"
                          {...register('subject')}
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm flex items-center mt-1">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.subject.message}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Message */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label htmlFor="message" className="text-white/80 font-medium block">
                          Wiadomość <span className="text-[#f36e21]">*</span>
                        </label>
                        <span className={`text-sm ${remainingChars < 100 ? 'text-[#f36e21]' : 'text-white/40'}`}>
                          {remainingChars} znaków pozostało
                        </span>
                      </div>
                      <textarea
                        id="message"
                        className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f36e21]/50 transition-colors h-40`}
                        placeholder="Twoja wiadomość..."
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                    
                    {/* Error message */}
                    {submitStatus === 'error' && errorMessage && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-lg flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                        <p>{errorMessage}</p>
                      </div>
                    )}
                    
                    {/* Submit button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#f36e21] hover:bg-[#f36e21]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Wyślij wiadomość
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Map section */}
        <section className="py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#171717]/40 backdrop-blur-sm rounded-2xl p-1 border border-white/5 relative overflow-hidden"
            >
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.3718927069317!2d20.996727099999998!3d52.1821125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471933267d0087ff%3A0x93741029e0bcf2d2!2sPost%C4%99pu%2019%2F4%2C%2003-676%20Warszawa!5e0!3m2!1sru!2spl!4v1741217851679!5m2!1sru!2spl" width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;

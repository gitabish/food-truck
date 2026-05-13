import React, { useState, useEffect, useRef } from 'react';
import { Truck, Instagram, Facebook, MapPin, Menu, X, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Lenis from 'lenis';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (id: string | number) => {
    if (lenisRef.current) {
      if (typeof id === 'string') {
        const element = document.getElementById(id);
        if (element) lenisRef.current.scrollTo(element);
      } else {
        lenisRef.current.scrollTo(id);
      }
    } else {
      if (typeof id === 'string') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: id, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const specials = [
    { img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop", color: "border-[#FAA307]", shadow: "shadow-[8px_8px_0px_0px_rgba(232,93,4,1)]" },
    { img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop", color: "border-[#E85D04]", shadow: "shadow-[8px_8px_0px_0px_rgba(45,27,8,1)]" },
    { img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop", color: "border-[#2D1B08]", shadow: "shadow-[8px_8px_0px_0px_rgba(250,163,7,1)]" },
    { img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop", color: "border-[#FAA307]", shadow: "shadow-[8px_8px_0px_0px_rgba(232,93,4,1)]" }
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF5] text-[#2D1B08] border-[8px] sm:border-[16px] border-[#E85D04]">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollTo(0)}
            className="fixed bottom-8 right-8 z-50 bg-[#FAA307] text-[#2D1B08] p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(45,27,8,1)] border-4 border-[#2D1B08]"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 bg-[#FAA307] border-b-[8px] sm:border-b-[16px] border-[#E85D04]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollTo('home')}
        >
          <div className="w-12 h-12 bg-[#2D1B08] rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6 text-[#FAA307]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl tracking-tighter text-[#2D1B08] uppercase">The Spudwala</span>
          </div>
        </motion.div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#2D1B08] active:scale-95 transition-transform"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-bold uppercase text-sm tracking-widest text-[#2D1B08]">
          <button onClick={() => scrollTo('home')} className="hover:border-b-4 border-[#2D1B08] pb-1 border-transparent transition-colors">Home</button>
          <button onClick={() => scrollTo('about')} className="hover:border-b-4 border-[#2D1B08] pb-1 border-transparent transition-colors">About Truck</button>
          <button onClick={() => scrollTo('menu')} className="hover:border-b-4 border-[#2D1B08] pb-1 border-transparent transition-colors">Today's Menu</button>
          <button onClick={() => scrollTo('contact')} className="hover:border-b-4 border-[#2D1B08] pb-1 border-transparent transition-colors">Contact Us</button>
          <motion.button 
            whileHover={{ y: -2, boxShadow: "2px 2px 0px 0px rgba(232,93,4,1)" }}
            whileTap={{ y: 2, boxShadow: "none" }}
            onClick={() => scrollTo('location')}
            className="bg-[#2D1B08] text-white px-6 py-2 rounded-full transition-colors shadow-[4px_4px_0px_0px_rgba(232,93,4,1)]"
          >
            Location
          </motion.button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute z-40 top-full left-[-8px] sm:left-[-16px] w-[calc(100%+16px)] sm:w-[calc(100%+32px)] bg-[#FAA307] border-b-[8px] sm:border-b-[16px] border-[#E85D04] flex flex-col items-center gap-6 py-8 font-bold uppercase text-sm tracking-widest text-[#2D1B08] md:hidden shadow-2xl overflow-hidden"
            >
              <button onClick={() => scrollTo('home')} className="hover:border-b-4 border-[#2D1B08] pb-1 border-transparent transition-colors">Home</button>
              <button onClick={() => scrollTo('about')} className="hover:border-b-4 border-[#2D1B08] pb-1 border-transparent transition-colors">About Truck</button>
              <button onClick={() => scrollTo('menu')} className="hover:border-b-4 border-[#2D1B08] pb-1 border-transparent transition-colors">Today's Menu</button>
              <button onClick={() => scrollTo('contact')} className="hover:border-b-4 border-[#2D1B08] pb-1 border-transparent transition-colors">Contact Us</button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('location')} 
                className="bg-[#2D1B08] text-white px-6 py-2 rounded-full transition-colors shadow-[4px_4px_0px_0px_rgba(232,93,4,1)]"
              >
                Location
              </motion.button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative w-full h-[80vh] min-h-[600px] border-b-[8px] sm:border-b-[16px] border-[#2D1B08] overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1567129937968-cdad8f07e2f8?q=80&w=2000&auto=format&fit=crop" 
            alt="Food Truck" 
            className="w-full h-full object-cover opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B08] via-[#2D1B08]/80 to-transparent" />
        </motion.div>
        
        <div className="relative h-full flex flex-col items-start justify-center text-white px-8 md:px-16 max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="inline-block bg-[#E85D04] text-white px-4 py-2 rounded-md font-bold mb-6 rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(250,163,7,1)] uppercase text-sm border-2 border-[#2D1B08]"
          >
            London's Original Masala Spuds
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
            className="font-black text-6xl md:text-[84px] lg:text-[100px] leading-[0.9] uppercase mb-8 text-[#FFFCF5] drop-shadow-md"
          >
            Find Your<br/><span className="text-[#FAA307]">Flavor Here.</span>
          </motion.h1>
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", bounce: 0.4 }}
            whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px rgba(250,163,7,1)" }}
            whileTap={{ y: 2, boxShadow: "none" }}
            onClick={() => scrollTo('menu')}
            className="bg-[#2D1B08] text-white px-10 py-5 rounded-2xl font-black uppercase text-lg shadow-[8px_8px_0px_0px_rgba(232,93,4,1)] border-4 border-[#E85D04] transition-colors hover:bg-[#1a0f05]"
          >
            View Today's Lineup
          </motion.button>
        </div>
      </section>

      {/* Today's Specials (Moving Marquee) */}
      <section className="py-20 max-w-[100vw] overflow-hidden bg-[#FFFCF5]">
        <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-[56px] leading-none font-black uppercase text-center mb-12 text-[#2D1B08]"
        >
          Today's <span className="text-[#E85D04]">Specials</span>
        </motion.h2>
        
        <div className="w-full relative flex items-center">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-6 px-4"
          >
            {[...specials, ...specials].map((special, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className={`flex-none w-[280px] sm:w-[320px] aspect-square rounded-3xl overflow-hidden relative border-4 ${special.color} ${special.shadow} group bg-white`}
              >
                <img src={special.img} alt="Special Items" className="w-full h-full object-cover transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Today's Menu List */}
      <section id="menu" className="py-24 px-8 max-w-[1400px] mx-auto border-t-4 sm:border-t-[8px] border-[#2D1B08] border-dashed">
        <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-[56px] leading-none font-black uppercase text-center mb-16 text-[#2D1B08]"
        >
          Full <span className="text-[#FAA307]">Menu</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[
            { img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto=format&fit=crop", name: "The OG Loaded", price: "£8", desc: "Butter, Cheese, Chutneys and signature masala dust over fresh hand-cut fries.", color: "border-[#FAA307]", shadow: "shadow-[8px_8px_0px_0px_rgba(232,93,4,1)]", priceColor: "text-[#E85D04] border-[#E85D04]" },
            { img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=300&auto=format&fit=crop", name: "Gunpowder Wedges", price: "£7", desc: "Triple fried crispy edges tossed in our secret fiery gunpowder house spice blend.", color: "border-[#E85D04]", shadow: "shadow-[8px_8px_0px_0px_rgba(45,27,8,1)]", priceColor: "text-[#FAA307] border-[#FAA307]" },
            { img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=300&auto=format&fit=crop", name: "Tikka Spud", price: "£10", desc: "Chicken tikka chunks, melted mozzarella, mint drizzle, roasted garlic mayo.", color: "border-[#2D1B08]", shadow: "shadow-[8px_8px_0px_0px_rgba(250,163,7,1)]", priceColor: "text-[#E85D04] border-[#E85D04]" },
            { img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop", name: "Paneer Volcano", price: "£9", desc: "Spicy charred paneer cubes, crispy onions, and secret street food dressing.", color: "border-[#FAA307]", shadow: "shadow-[8px_8px_0px_0px_rgba(232,93,4,1)]", priceColor: "text-[#E85D04] border-[#E85D04]" },
            { img: "https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=300&auto=format&fit=crop", name: "Mango Lassi", price: "£5", desc: "The ultimate thirst quencher. Alphonso mangoes, thick yogurt, cardamom.", color: "border-[#E85D04]", shadow: "shadow-[8px_8px_0px_0px_rgba(45,27,8,1)]", priceColor: "text-[#FAA307] border-[#FAA307]" },
            { img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=300&auto=format&fit=crop", name: "Samosa Smash", price: "£8", desc: "Crumbly Punjabi samosas smashed over hot fries, topped with tamarind glaze.", color: "border-[#2D1B08]", shadow: "shadow-[8px_8px_0px_0px_rgba(250,163,7,1)]", priceColor: "text-[#E85D04] border-[#E85D04]" },
          ].map((item, idx) => (
            <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               whileHover={{ y: -8 }}
               className={`bg-white p-6 rounded-3xl border-4 ${item.color} ${item.shadow} flex gap-6 items-center group transition-transform`}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 border-4 border-[#2D1B08]">
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black uppercase text-xl leading-tight text-[#2D1B08]">{item.name}</h4>
                  <span className={`font-black text-lg border-b-2 ${item.priceColor}`}>{item.price}</span>
                </div>
                <p className="text-sm font-medium text-[#2D1B08]/70 line-clamp-3 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet our Regulars / About Truck equivalent */}
      <section id="about" className="py-24 px-8 max-w-[1200px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[56px] leading-none font-black uppercase text-center mb-16 text-[#2D1B08]"
        >
          About The <span className="text-[#FAA307]">Truck</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "🌯", title: "Fresh Ingredients", desc: "Local sourcing.", bg: "bg-white", border: "border-[#FAA307]", shadow: "shadow-[8px_8px_0px_0px_rgba(250,163,7,1)]", text: "text-[#2D1B08]", inner: "bg-[#FFFCF5] border-[#2D1B08]", bar: "bg-[#FAA307]" },
            { icon: "🌮", title: "Handcrafted", desc: "Made with love.", bg: "bg-[#E85D04]", border: "border-[#2D1B08]", shadow: "shadow-[8px_8px_0px_0px_rgba(45,27,8,1)]", text: "text-white", inner: "bg-[#2D1B08] border-[#FFFCF5]", bar: "bg-[#2D1B08]" },
            { icon: "🍔", title: "Street Style", desc: "Authentic vibes.", bg: "bg-[#2D1B08]", border: "border-[#FAA307]", shadow: "shadow-[8px_8px_0px_0px_rgba(250,163,7,1)]", text: "text-white", inner: "bg-[#FAA307] border-[#2D1B08]", bar: "bg-[#FAA307]" },
            { icon: "🧁", title: "Guilt Free", desc: "Deliciously good.", bg: "bg-[#FAA307]", border: "border-[#2D1B08]", shadow: "shadow-[8px_8px_0px_0px_rgba(45,27,8,1)]", text: "text-[#2D1B08]", inner: "bg-[#FFFCF5] border-[#2D1B08]", bar: "bg-[#2D1B08]" }
          ].map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`${card.bg} rounded-[40px] p-8 flex flex-col items-center text-center border-4 ${card.border} ${card.shadow} relative overflow-hidden group transition-transform`}
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${card.bar}`}></div>
              <div className={`w-20 h-20 ${card.inner} rounded-3xl border-4 mb-6 flex items-center justify-center transition-transform group-hover:scale-110`}>
                <span className="text-4xl">{card.icon}</span>
              </div>
              <h3 className={`font-black text-2xl uppercase mb-4 leading-tight ${card.text}`}>{card.title}</h3>
              <p className={`text-sm font-medium mb-6 flex-grow ${card.text}/70`}>{card.desc}</p>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('menu')} 
                className={`${card.bg === 'bg-[#2D1B08]' ? 'bg-[#E85D04]' : card.bg === 'bg-[#E85D04]' ? 'bg-white text-[#2D1B08]' : 'bg-[#2D1B08] text-white'} rounded-xl px-6 py-3 font-bold uppercase text-xs tracking-wider border-2 border-transparent transition-all`}
              >
                View Menu
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience the Vibe */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto border-t-4 sm:border-t-[8px] border-[#2D1B08] border-dashed overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-[40px] border-8 border-[#2D1B08] shadow-[16px_16px_0px_0px_rgba(250,163,7,1)] overflow-hidden aspect-[4/5] sm:aspect-square bg-[#2D1B08]">
              <img 
                src="/spudwala-truck.jpeg" 
                alt="The Spudwala Food Truck" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2D1B08]/40 to-transparent" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-start text-left"
          >
            <h2 className="text-5xl md:text-[84px] leading-none font-black uppercase mb-8 text-[#2D1B08]">
              Experience<br />the <span className="text-[#E85D04]">Vibe</span>
            </h2>
            <p className="text-lg md:text-xl font-bold mb-10 text-[#2D1B08]/80 leading-relaxed border-l-4 border-[#FAA307] pl-6 py-2">
              We bring the hottest flavors of the street to your neighborhood. Real stories, real food, and a crazy amount of passion folded into every dish we serve.
            </p>
            <motion.button 
              whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px rgba(45,27,8,1)" }}
              whileTap={{ y: 2, boxShadow: "none" }}
              onClick={() => scrollTo('menu')}
              className="bg-[#FAA307] text-[#2D1B08] px-10 py-5 rounded-2xl font-black uppercase text-lg shadow-[8px_8px_0px_0px_rgba(45,27,8,1)] border-4 border-[#2D1B08] transition-all hover:bg-white"
            >
              Open Menu
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact / Location */}
      <footer id="contact" className="bg-[#2D1B08] text-white py-20 px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Social Media */}
          <div>
            <h4 className="font-black text-xl mb-6 uppercase tracking-widest text-[#FAA307]">Connect</h4>
            <div className="space-y-4 font-bold text-sm uppercase">
              <a href="#" className="flex items-center gap-4 hover:text-[#E85D04] transition-colors group">
                <div className="bg-white text-[#2D1B08] p-2 rounded-full border-2 border-[#2D1B08] group-hover:border-[#E85D04]"><Instagram className="w-5 h-5" /></div>
                <span>Instagram Feed</span>
              </a>
              <a href="#" className="flex items-center gap-4 hover:text-[#E85D04] transition-colors group">
                <div className="bg-white text-[#2D1B08] p-2 rounded-full border-2 border-[#2D1B08] group-hover:border-[#E85D04]"><Facebook className="w-5 h-5" /></div>
                <span>Facebook Feed</span>
              </a>
            </div>
          </div>

          {/* How to Find Us - Location ID */}
          <div id="location">
            <h4 className="font-black text-xl mb-6 uppercase tracking-widest text-[#FAA307]">Location</h4>
            <div className="flex gap-4 items-start">
              <div className="w-24 h-24 bg-gray-300 xl:w-28 xl:h-28 rounded-2xl overflow-hidden flex-shrink-0 relative border-4 border-[#E85D04] shadow-[4px_4px_0px_0px_rgba(232,93,4,1)] group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center text-[#E85D04]">
                   <MapPin className="w-8 h-8 drop-shadow-md group-hover:scale-125 transition-transform" />
                </div>
              </div>
              <div className="mt-2 text-white/90 font-bold text-sm uppercase leading-relaxed">
                1967 Staunton<br/>Road East<br/>
                <span className="text-[#FAA307] text-xs">Open 11AM - 9PM</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-12 font-bold text-sm uppercase">
            <div>
              <h4 className="font-black text-xl mb-6 tracking-widest text-[#FAA307]">Links</h4>
              <ul className="space-y-3 text-white/80">
                <li><button onClick={() => scrollTo('home')} className="hover:text-[#E85D04] transition-colors">Home</button></li>
                <li><button onClick={() => scrollTo('about')} className="hover:text-[#E85D04] transition-colors">About Truck</button></li>
                <li><button onClick={() => scrollTo('menu')} className="hover:text-[#E85D04] transition-colors">Menu</button></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-[#E85D04] transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>

          {/* Newsletter / Contact Form */}
          <div>
            <h4 className="font-black text-xl mb-6 uppercase tracking-widest text-[#FAA307]">Get Notified</h4>
            <p className="mb-6 text-white/70 font-medium text-sm leading-relaxed">
              Sign up to receive updates on our locations and exclusive treats.
            </p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-white/10 uppercase font-bold text-sm border-2 border-white/20 px-4 py-3 rounded-xl focus:outline-none focus:border-[#FAA307] transition-colors text-white placeholder-white/50"
                required
              />
              <motion.button 
                whileHover={{ y: -2, boxShadow: "2px 2px 0px 0px rgba(250,163,7,1)" }}
                whileTap={{ y: 2, boxShadow: "none" }}
                type="submit" 
                className="bg-[#E85D04] text-white px-8 py-3 rounded-xl font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(250,163,7,1)] border-2 border-[#2D1B08] w-max"
              >
                Sign Up
              </motion.button>
            </form>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t-4 border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black uppercase tracking-widest text-white/50">
          <p>© 2026 The Spudwala Street Food Ltd.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#FAA307] cursor-pointer transition-colors">Instagram</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

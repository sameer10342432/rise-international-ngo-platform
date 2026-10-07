import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FloatingImpactCard } from './FloatingImpactCard';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-primary-container text-on-primary">
      {/* Hero Background Layer with subtle slow zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          initial={{ scale: 1.08, opacity: 0.2 }}
          animate={{ scale: 1.02, opacity: 0.3 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          src="/images/rise-home-hero-community.webp"
          alt="Wide documentary photograph of diverse community members gathering with local NGO facilitators at sunset in an African village, planning clean water and schooling initiatives with hope and unity"
          className="w-full h-full object-cover object-center"
          loading="eager"
          width={1344}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/90 to-primary-container/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-12 pb-24 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Vision & Primary Calls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col gap-5 sm:gap-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md self-start text-secondary-fixed border border-secondary-fixed/20"
            >
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
              <span className="font-label-sm text-xs sm:text-label-sm uppercase tracking-wider font-bold">
                RISE INTERNATIONAL
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="font-display-hero text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Empowering Communities. <br />
              <span className="text-secondary-fixed">Transforming Lives.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="font-body-xl text-base sm:text-lg lg:text-xl text-surface-container-high/90 max-w-2xl leading-relaxed"
            >
              RISE International works to create opportunities, strengthen communities and support sustainable change through people-centred programmes and partnerships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
            >
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-secondary text-white font-label-lg text-sm sm:text-label-lg shadow-lg hover:bg-secondary/90 transition-all hover:-translate-y-0.5 active:translate-y-0 font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                <span>Donate Now</span>
              </Link>
              <Link
                to="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-surface-container-lowest/10 backdrop-blur-md text-white font-label-lg text-sm sm:text-label-lg hover:bg-surface-container-lowest/20 transition-all border border-white/10 font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">group_add</span>
                <span>Become a Volunteer</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2.5 pt-2 text-surface-container-high/85 text-xs sm:text-sm"
            >
              <span className="material-symbols-outlined text-secondary-fixed text-[18px] sm:text-[20px] flex-shrink-0">
                verified
              </span>
              <span>People-centred programmes, local leadership, and transparent accountability.</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Quick Action Deck */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <FloatingImpactCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

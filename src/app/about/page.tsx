"use client";

import React from "react";
import { personalInfo, timeline } from "@/data/personal";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 bg-[#111111] text-[#EAEAEA]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Breadcrumb */}
        <div className="mb-16 md:mb-24 text-sm text-[#888888]">
          About / {personalInfo.name}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-32">
          
          {/* Left Column: Text Content */}
          <div className="w-full lg:col-span-7 flex flex-col">
            
            <motion.h1 
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] tracking-tight text-white mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {personalInfo.title} <span className="text-[#999999]">crafting high-converting content and scaling online communities.</span>
            </motion.h1>

            <motion.div 
              className="flex flex-wrap items-center gap-8 md:gap-12 mb-20 md:mb-32 text-sm tracking-wide text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <a href="#" className="flex items-center gap-1 hover:text-[#999999] transition-colors pb-0.5">
                View Resume (PDF) <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="hover:text-[#999999] transition-colors pb-0.5">
                {personalInfo.email}
              </a>
            </motion.div>

            <div className="space-y-8 text-lg md:text-xl text-[#999999] leading-relaxed max-w-2xl">
              {personalInfo.about.map((para, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
            
          </div>

          {/* Right Column: Image */}
          <div className="w-full lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full aspect-[4/5] bg-[#222222] overflow-hidden"
            >
              <img 
                src="/images/profile.jpg" 
                alt="Medhawin Tiwari" 
                className="w-full h-full object-cover object-center grayscale-[10%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>

        </div>

        {/* Separator */}
        <div className="w-full h-px bg-[#333333] mb-24"></div>

        {/* Rest of the Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-4">
            <h2 className="text-sm tracking-widest text-[#888888] uppercase mb-8">
              Stats & Experience
            </h2>
            <div className="grid grid-cols-2 gap-8 mb-16">
              {personalInfo.stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}<span className="text-[#666666]">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-[#888888] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-24">
            
            <section>
              <h2 className="text-sm tracking-widest text-[#888888] uppercase mb-12">
                Professional Timeline
              </h2>
              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <div className="text-xs font-mono text-[#888888] mb-3">{item.year}</div>
                    <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                    <p className="text-[#999999] leading-relaxed max-w-3xl">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm tracking-widest text-[#888888] uppercase mb-12">
                Capabilities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {personalInfo.skills.map((group, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <h3 className="text-white font-medium mb-6">{group.category}</h3>
                    <div className="space-y-4">
                      {group.items.map((skill, j) => (
                        <div key={j} className="flex justify-between items-center text-sm">
                          <span className="text-[#999999]">{skill.name}</span>
                          <span className="font-mono text-[#666666]">{skill.proficiency}%</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Globe } from "@/components/sub/globe";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <section id="contact" className="relative flex flex-col items-center justify-center min-h-screen w-full py-20">
      <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        Get in Touch
      </h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between w-full px-10 gap-10">
        <motion.div 
          variants={slideInFromLeft(0.5)}
          className="w-full md:w-1/2 p-4"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-2 rounded-lg bg-[#0F1627] border border-[#7042F88B] text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 rounded-lg bg-[#0F1627] border border-[#7042F88B] text-white"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="p-2 rounded-lg bg-[#0F1627] border border-[#7042F88B] text-white resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <button
              type="submit"
              className="py-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div 
          variants={slideInFromRight(0.5)}
          className="w-full md:w-1/2 h-[400px]"
        >
          <div className="relative w-full h-full">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
              <Globe />
            </Canvas>
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-xl font-semibold text-white">
                I&apos;m very flexible with time
              </h3>
              <p className="text-gray-400">zone communications</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
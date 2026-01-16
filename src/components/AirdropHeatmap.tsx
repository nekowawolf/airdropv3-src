'use client';

import { useEffect, useRef, useState } from "react";
import { BsFire } from "react-icons/bs";
import { motion, Variants } from "framer-motion";
import TextGenerateEffect from "./ui/TextGenerateEffect";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getColor = (level: number) => {
  switch (level) {
    case 0:
      return "bg-gray-600/10";
    case 1:
      return "bg-blue-900/40";
    case 2:
      return "bg-blue-700/60";
    case 3:
      return "bg-blue-500/80";
    case 4:
      return "bg-blue-400";
    default:
      return "bg-gray-600/10";
  }
};

const cellVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.4,
  },
  visible: (columnIndex: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: columnIndex * 0.03,
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AirdropHeatmap() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [activityData, setActivityData] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const data = Array.from({ length: 52 * 7 }, () =>
      Math.floor(Math.random() * 5)
    );
    setActivityData(data);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      id="heatmap"
      className="relative py-20 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 text-center">

        {/* Badge */}
        <span className="relative mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium glass-card">
          <BsFire className="text-orange-400" />
          <span className="text-fill-color">Heatmap</span>
        </span>

        {/* Title */}
        <h2 className="mb-4 text-2xl font-extrabold text-fill-color sm:text-4xl xl:text-5xl text-center">
          <TextGenerateEffect
            words="Airdrop Activity Heatmap"
            duration={0.6}
            staggerDelay={0.15}
            filter
          />
        </h2>

        {/* Description */}
        <p className="mx-auto mb-16 max-w-[720px] font-medium text-fill-color/70">
          Visual overview of platform activity based on how frequently new airdrops are added.
        </p>

        {/* Heatmap */}
        <div className="mx-auto max-w-5xl overflow-x-auto lg:overflow-visible">
          <div className="flex gap-2 text-left">

            {/* Day labels */}
            <div className="flex flex-col gap-2 pr-2 text-xs text-fill-color">
              {days.map((day) => (
                <span key={day} className="h-3">
                  {day}
                </span>
              ))}
            </div>

            {/* Grid */}
            {activityData.length > 0 && (
              <motion.div
                initial="hidden"
                animate={hasAnimated ? "visible" : "hidden"}
                className="grid gap-2 lg:scale-[0.95] xl:scale-100 origin-left"
                style={{
                  gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                  gridAutoFlow: "column",
                }}
              >
                {activityData.map((level, index) => {
                  const columnIndex = Math.floor(index / 7);

                  return (
                    <motion.div
                      key={index}
                      variants={cellVariants}
                      custom={columnIndex}
                      className={`h-3 w-3 rounded-sm ${getColor(level)}`}
                      title={`Activity level: ${level}`}
                    />
                  );
                })}
              </motion.div>
            )}

          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-end gap-2 text-xs text-fill-color">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <span
                key={lvl}
                className={`h-3 w-3 rounded-sm ${getColor(lvl)}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>

      </div>
    </section>
  );
}
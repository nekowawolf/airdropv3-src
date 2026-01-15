'use client';

import { BsFire } from "react-icons/bs";
import BlurText from "./ui/Blur-text";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const activityData = Array.from({ length: 52 * 7 }, () =>
  Math.floor(Math.random() * 5)
);

const getColor = (level: number) => {
  switch (level) {
    case 0:
      return "bg-white/5";
    case 1:
      return "bg-blue-900/40";
    case 2:
      return "bg-blue-700/60";
    case 3:
      return "bg-blue-500/80";
    case 4:
      return "bg-blue-400";
    default:
      return "bg-white/5";
  }
};

export default function AirdropHeatmap() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 text-center">

        {/* Badge */}
        <span className="relative mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium glass-card">
          <BsFire className="text-orange-400" />
          <span className="text-fill-color">Heatmap</span>
        </span>

        {/* Title */}
        <h2 className="mb-4 text-2xl font-extrabold text-fill-color sm:text-4xl xl:text-5xl">
           <BlurText
            text="Airdrop Activity Heatmap"
            animateBy="words"
            direction="top"
            delay={120}
            className="leading-tight justify-center"
          />
        </h2>

        {/* Description */}
        <p className="mx-auto mb-16 max-w-[720px] font-medium text-fill-color/70">
          Visual overview of platform activity based on how frequently new airdrops are added.
        </p>

        {/* Heatmap */}
        <div className="mx-auto max-w-5xl overflow-x-auto lg:overflow-visible">
          <div className="flex gap-2 text-left">

            <div className="flex flex-col gap-2 pr-2 text-xs text-fill-color">
              {days.map((day) => (
                <span key={day} className="h-3">
                  {day}
                </span>
              ))}
            </div>

            <div
              className="grid gap-2"
              style={{
                gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                gridAutoFlow: "column",
              }}
            >
              {activityData.map((level, index) => (
                <div
                  key={index}
                  className={`h-3 w-3 rounded-sm transition hover:scale-110 ${getColor(level)}`}
                  title={`Activity level: ${level}`}
                />
              ))}
            </div>

          </div>

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
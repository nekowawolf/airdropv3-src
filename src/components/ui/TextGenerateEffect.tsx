'use client';

import * as React from 'react';
import { motion, stagger, useAnimate, useInView, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

type TextGenerateEffectProps = HTMLMotionProps<'span'> & {
  words: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
};

const TextGenerateEffect = React.forwardRef<HTMLSpanElement, TextGenerateEffectProps>(
  ({ words, className, filter = true, duration = 0.5, staggerDelay = 0.2, ...props }, ref) => {
    const localRef = React.useRef<HTMLSpanElement>(null);
    React.useImperativeHandle(ref, () => localRef.current!);

    const [scope, animate] = useAnimate();

    // Trigger animasi saat masuk viewport
    const isInView = useInView(localRef, { margin: '-100px', once: true });

    const wordsArray = React.useMemo(() => words.split(' '), [words]);

    React.useEffect(() => {
      if (!isInView) return;

      animate(
        'span',
        {
          opacity: 1,
          filter: filter ? 'blur(0px)' : 'none',
        },
        {
          duration,
          delay: stagger(staggerDelay),
        }
      );
    }, [isInView, animate, duration, filter, staggerDelay]);

    return (
      <motion.span
        ref={localRef}
        className={cn('inline-block font-bold', className)}
        {...props}
      >
        <motion.span ref={scope} className="inline-flex flex-wrap">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={`${word}-${idx}`}
              className="opacity-0 will-change-transform will-change-opacity will-change-filter mr-1"
              style={{ filter: filter ? 'blur(10px)' : 'none' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </motion.span>
    );
  }
);

TextGenerateEffect.displayName = 'TextGenerateEffect';

export { TextGenerateEffect, type TextGenerateEffectProps };
export default TextGenerateEffect;
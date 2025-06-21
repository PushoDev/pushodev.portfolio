"use client";

import {
  useScroll,
  useTransform,
  motion,
  useMotionTemplate,
  useSpring,
} from "motion/react";

const springVars = {
  stiffness: 120,
  damping: 20,
};

const Hero = () => {
  const { scrollYProgress } = useScroll();

  const maskSize = useSpring(
    useTransform(scrollYProgress, [0, 1], [14000, 400]),
    springVars
  );
  const maskPosition = useSpring(
    useTransform(scrollYProgress, [0, 1], [-1800, 100]),
    springVars
  );

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  const outerImageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const whiteFillOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <>
      <div className="h-[200vh] bg-black">
        {/* outer image */}
        <motion.div
          style={{
            scale: imageScale,
            opacity: outerImageOpacity,
          }}
          className="fixed inset-0 h-full w-full bg-[url('https://assets.aceternity.com/background-gta.webp')] bg-fixed bg-cover"
        ></motion.div>

        <motion.div
          className=" fixed flex m-auto w-full h-full inset-0 [mask-image:url('https://assets.aceternity.com/mask-gta.svg')] [mask-repeat:no-repeat] "
          style={{
            maskSize: useMotionTemplate`${maskSize}px`,
            maskPosition: useMotionTemplate`center ${maskPosition}px`,
          }}
        >
          {/* inner image */}
          <motion.div
            style={{
              scale: imageScale,
            }}
            className="fixed inset-0 h-full w-full bg-[url('https://assets.aceternity.com/background-gta.webp')] bg-fixed bg-cover"
          ></motion.div>
          <motion.div
            style={{
              opacity: whiteFillOpacity,
            }}
            className="fixed inset-0 w-full h-full bg-white"
          ></motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;

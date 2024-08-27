import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMG_PADDING = 12;

export default function App() {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subHeading="Empowering Teams Everywhere"
        heading="Unite, Collaborate, and Succeed Together"
      >
        <CardContent
          heading="Empowering Teams to Achieve More"
          text1="Collaboration is at the heart of every great achievement. By bringing together diverse skills and perspectives, teams can tackle challenges more effectively and create innovative solutions."
          text2="Whether you're working remotely or side by side, our platform provides the tools you need to communicate, collaborate, and succeed together, no matter where you are."
          buttonText="Discover How"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subHeading="Excellence in Every Detail"
        heading="Craftsmanship That Stands the Test of Time"
      >
        <CardContent
          heading="Excellence in Every Detail"
          text1="True quality is found in the details. From the smallest component to the overall design, every aspect is crafted with precision and care to ensure longevity and excellence."
          text2="Our commitment to craftsmanship means that you can trust our products to not only meet but exceed your expectations, standing the test of time and delivering unparalleled performance."
          buttonText="Learn More About Our Craft"
        />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subHeading="Elevate Your Style"
        heading="Embrace Modern Elegance"
      >
        <CardContent
          heading="Elevate Your Style"
          text1="Modern elegance is all about simplicity and sophistication. Our designs are crafted to help you make a statement, combining timeless style with contemporary flair."
          text2="Whether you're dressing for a special occasion or everyday confidence, our collection offers the perfect blend of comfort and style to elevate your wardrobe."
          buttonText="Explore the Collection"
        />
      </TextParallaxContent>
    </div>
  );
}

const TextParallaxContent = ({ imgUrl, subHeading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImg imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subHeading={subHeading} />
      </div>
      {children}
    </div>
  );
};

const StickyImg = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        style={{
          opacity,
        }}
        className="absolute inset-0 bg-neutral-950/70"
      />
    </motion.div>
  );
};

const OverlayCopy = ({ heading, subHeading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  return (
    <motion.div
      ref={targetRef}
      style={{
        y,
        opacity,
      }}
      className="absolute top-0 left-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subHeading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const CardContent = ({ heading, text1, text2, buttonText }) => {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">{heading}</h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">{text1}</p>
        <p className="mb-8 text-xl text-neutral-600 md:text-2xl">{text2}</p>
        <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

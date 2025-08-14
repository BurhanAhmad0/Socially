import React from "react";
import { Link } from "react-router-dom";
import AboutImg1 from "../assets/about1.svg";
import AboutImg2 from "../Assets/about2.svg";
import ArrowIcon from "../Assets/arrow-white.svg";
import { motion } from "motion/react";

const About = () => {
  return (
    <section className="about-page px-5">
      <nav className="about-nav bg-white sticky z-10 top-0 flex justify-between items-center border-b py-2">
        <h1 className="text-3xl font-bold">
          <Link to={"/"}>Socailly</Link>
        </h1>
        <ul className="flex gap-10 text-xl">
          <li>
            <Link to={"#"}>Work</Link>
          </li>
          <li>
            <Link to={"#"}>About</Link>
          </li>
          <li>
            <Link to={"#"}>Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="imageContainer flex items-center gap-3 mt-5">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2 }}
          className="w-36 h-36"
          src={AboutImg2}
          alt="About Image"
        />
        <img className="w-36 h-36" src={AboutImg1} alt="About Image" />
      </div>

      <p className="text-7xl mt-8 max-w-3/4">
        Socially specialize in crafting the visual language of your digital
        brand.
      </p>

      <div className="creatorsContent border-t border-black mt-36">
        <h2 className="text-2xl py-10">Creators Content</h2>

        <div className="overflow-hidden w-full">
          <motion.div
            className="contentShowcase flex gap-5 justify-start w-max"
            animate={{ x: ["0%", "-50%"] }} // Move left
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 85, // Adjust speed here
              ease: "linear",
            }}
          >
            {/* Original content */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div className="flex gap-5" key={i}>
                <div className="box1 w-96 h-96 border border-black"></div>
                <div className="box2 w-96 h-96 border border-black"></div>
                <div className="box3 w-96 h-96 border border-black"></div>
                <div className="box4 w-96 h-96 border border-black"></div>
                <div className="box5 w-96 h-96 border border-black"></div>
                <div className="box6 w-96 h-96 border border-black"></div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="CTA_Btn flex justify-center items-center">
          <motion.a
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            href={"/"}
            className="text-xl bg-black text-white px-7 py-3 rounded-md mt-5 flex items-center gap-2"
          >
            Explore
            <img
              className="w-8 h-8"
              loading="lazy"
              src={ArrowIcon}
              alt="Arrow Icon"
            />
          </motion.a>
        </div>
      </div>

      <div className="stats flex justify-between mt-20 border-b border-black pb-10">
        <div className="left w-1/2">
          <p className="text-2xl w-64">
            Frame & Form craft visual strategies that elevate your brand.
          </p>
        </div>
        <div className="right w-1/2 flex flex-col gap-10">
          <div className="one border-b border-black pb-3">
            <h2 className="text-9xl">1M+</h2>
            <p className="text-gray-500">
              Users and visitors interacted with our websites
            </p>
          </div>
          <div className="two border-b border-black pb-3">
            <h2 className="text-9xl">36</h2>
            <p className="text-gray-500">
              Active campaigns for multiple companies and brands
            </p>
          </div>
          <div className="three">
            <h2 className="text-9xl">100+</h2>
            <p className="text-gray-500">
              Different clients have sought our expertise
            </p>
          </div>
        </div>
      </div>

      <p className="border-b border-black mt-7 text-2xl pb-5">
        Connect with us to explore your project's potential.
      </p>

      <footer className="footer h-96 grid grid-cols-3 gap-16 mt-10">
        <div className="one flex gap-2">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2 }}
            className="w-20 h-20"
            src={AboutImg2}
            alt="About Image"
          />
          <img className="w-20 h-20" src={AboutImg1} alt="About Image" />
        </div>

        <div className="two flex flex-col gap-16">
          <div className="office">
            <h3 className="text-2xl">OFFICE</h3>
            <button className="hover:text-black/25 text-start text-xl cursor-pointer transition-all duration-300">
              15 Candyland Lane 28010 San Francisco
            </button>
          </div>
          <div className="contact">
            <h3 className="text-2xl">CONTACT</h3>
            <button className="hover:text-black/25 block text-xl cursor-pointer transition-all duration-300">
              (646) 555-4567
            </button>
            <button className="hover:text-black/25 underline block text-xl cursor-pointer transition-all duration-300">
              hello@figma.com
            </button>
          </div>
        </div>

        <div className="three">
          <h3 className="text-2xl">SOCIAL</h3>
          <ul>
            <Link className="hover:text-black/25 text-xl transition-all duration-300">
              <li>Instagram</li>
            </Link>
            <Link className="hover:text-black/25 text-xl transition-all duration-300">
              <li>Behance</li>
            </Link>
            <Link className="hover:text-black/25 text-xl transition-all duration-300">
              <li>Spotify</li>
            </Link>
            <Link className="hover:text-black/25 text-xl transition-all duration-300">
              <li>LinkedIn</li>
            </Link>
          </ul>
        </div>
      </footer>

      <div className="footerTitle">
        <h2 className="text-9xl font-bold text-center">Socailly</h2>
      </div>
    </section>
  );
};

export default About;

import React from "react";
import CardNav from "../components/Navbar";
import InfiniteMenu from "../components/InfiniteMenu";
import CurvedLoop from "../components/curvedLoop";
import DomeGallery from "../components/gallery";

const items = [
  {
    image: "https://picsum.photos/300/300?grayscale",
    link: "https://www.linkedin.com/in/jha-ashmita/",
    title: "Ashmita J",
    description: "She did all the work. Shes the coolest of em all.",
  },
  {
    image: "https://picsum.photos/400/400?grayscale",
    link: "https://google.com/",
    title: "Lekisha M",
    description: "This cutiepie was ashmita&#39;s emotional support",
  },
  {
    image: "https://picsum.photos/500/500?grayscale",
    link: "https://google.com/",
    title: "Kirti",
    description: "She was sad most of the times, made the presentation",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    link: "https://google.com/",
    title: "Pranavi R",
    description: "did nothing + unresponsive",
  },
];

const items1 = [
  {
    label: "About",
    bgColor: "#f0f0f0",
    textColor: "#000",
    links: [
      { label: "Team", ariaLabel: "About Members" },
      { label: "Work Snippets", ariaLabel: "Work Snippets" },
    ],
  },
  {
    label: "Project",
    bgColor: "#f0f0f0",
    textColor: "#000",
    links: [
      { label: "Phases", ariaLabel: "Featured Projects" },
      { label: "Concepts behind", ariaLabel: "Concepts behind the project" },
      { label: "Our Approach", ariaLabel: "Methodology" },
    ],
  },
  {
    label: "Formatted Content",
    bgColor: "#f0f0f0",
    textColor: "#000",
    links: [
      { label: "Concept Paper", ariaLabel: "Paper" },
      { label: "Poster", ariaLabel: "Poster" },
      { label: "Report", ariaLabel: "Report" },
    ],
  },
];

const workSnippets = [
  { task: "Sensor Data Visualization", owner: "Ashmita Jha" },
  { task: "Dashboard UI & Navigation", owner: "Lekisha Malekar" },
  { task: "Data Processing & Backend", owner: "Pranavi Reddy" },
  { task: "System Integration & Testing", owner: "Kirti Kundu" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* NAVBAR */}
      <header>
        <CardNav
          logo="axis-logo.png"
          logoAlt="AXIS Logo"
          items={items1}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />{" "}
      </header>

      <section>
        <div style={{ height: "700px", position: "relative" }}>
          <InfiniteMenu items={items} />
        </div>
      </section>

      <section>
        <div style={{ width: "98.8vw", height: "100vh" }}>
          <DomeGallery />
        </div>
      </section>
    </div>
  );
};

export default About;

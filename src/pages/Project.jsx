import React from "react";
import CardNav from "../components/Navbar";
import GlassSurface from "../components/phases";

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

const Project = () => {
  return (
    <div className="font-sans text-gray-900 bg-gray-50">
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
        />
      </header>

      {/* GLASS SURFACE / Hero Section */}
      <section className="flex justify-center items-center min-h-screen px-8 md:px-20 py-24">
        <GlassSurface
          style={{ width: "400px", height: "250px" }} // boundary added
          borderRadius={24}
          className="flex flex-col justify-center items-center text-center p-8"
        >
          <h2 className="text-2xl md:text-4xl font-semibold text-indigo-600 mb-4">
            Welcome to AXIS Project
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Explore initial phases, core concepts, and our approach to monitoring infrastructure intelligently.
          </p>
        </GlassSurface>
      </section>

      {/* INITIAL PHASES */}
      <section className="px-8 md:px-20 py-24 bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Initial Phases</h2>
          <p className="text-gray-600 leading-relaxed">
            Overview of the initial phases of the project: setting up infrastructure, deploying sensors, and collecting initial data. Each phase is documented with key milestones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-indigo-600 mb-2">Phase 1</h3>
              <p className="text-gray-600 text-sm">Project setup and initial experiments.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-indigo-600 mb-2">Phase 2</h3>
              <p className="text-gray-600 text-sm">Sensor deployment & preliminary data collection.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-indigo-600 mb-2">Phase 3</h3>
              <p className="text-gray-600 text-sm">Data validation & early analysis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONCEPTS BEHIND */}
      <section className="px-8 md:px-20 py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Concepts Behind</h2>
          <p className="text-gray-600 leading-relaxed">
            Explaining the key concepts driving the project: from sensor technology to data analysis models and actionable insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <div className="text-indigo-600 mb-3 text-4xl">🔧</div>
              <h3 className="font-semibold text-lg mb-1">Sensor Tech</h3>
              <p className="text-gray-600 text-sm">Understanding instrumentation and data acquisition.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <div className="text-indigo-600 mb-3 text-4xl">📊</div>
              <h3 className="font-semibold text-lg mb-1">Data Models</h3>
              <p className="text-gray-600 text-sm">Algorithms used to interpret structural data.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center">
              <div className="text-indigo-600 mb-3 text-4xl">💡</div>
              <h3 className="font-semibold text-lg mb-1">Insights</h3>
              <p className="text-gray-600 text-sm">How concepts translate into actionable insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR APPROACH / METHODOLOGY */}
      <section className="px-8 md:px-20 py-24 bg-white">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Our Approach</h2>
          <p className="text-gray-600 leading-relaxed">
            Step-by-step methodology from concept to implementation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-indigo-600 mb-2">Step 1: Planning</h3>
              <p className="text-gray-600 text-sm">Define scope, objectives, and resources needed.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-indigo-600 mb-2">Step 2: Implementation</h3>
              <p className="text-gray-600 text-sm">Deploy sensors, collect data, and process it efficiently.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-indigo-600 mb-2">Step 3: Analysis</h3>
              <p className="text-gray-600 text-sm">Visualize insights, detect anomalies, and generate reports.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-20 py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} AXIS by RV College of Engineering. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Project;

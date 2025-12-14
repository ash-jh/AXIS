import React from "react";
import CardNav from "../components/Navbar";

const items = [
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

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* NAVBAR */}
      <header>
        {" "}
        <CardNav
          logo="axis-logo.png"
          logoAlt="AXIS Logo"
          items={items}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />{" "}
      </header>

      {/* HERO / ABOUT SECTION */}
      <section className="grid pt-30 pb-40 grid-cols-1 md:grid-cols-2 gap-12 px-8 md:px-20 py-24 items-center">
        {/* IMAGE */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-72 rounded-xl bg-gray-200 flex items-center justify-center shadow-md">
            <span className="text-gray-500 text-sm">Project Visual</span>
          </div>
        </div>

        {/* TEXT */}
        <div className="space-y-6">
          <h1 className="belleza text-5xl md:text-7xl">AXIS</h1>

          <div className="space-y-6">
            {/* Punchline */}
            <p className="font-sans text-3xl md:text-3xl text-gray-800 leading-snug">
              Turning{" "}
              <span className="font-semibold text-gray-900">
                structural data
              </span>{" "}
              into{" "}
              <span className="italic font-serif text-indigo-600">
                decisive insight
              </span>
            </p>

            {/* Description */}
            <p className="font-sans text-lg md:text-xl text-gray-600 leading-relaxed">
              AXIS is an intelligent monitoring platform that transforms
              structural data into meaningful insights. It helps detect
              anomalies early, understand system health at a glance, and make
              faster, data-driven decisions, all through a single, intuitive
              dashboard.
            </p>

            {/* Attribution */}
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Built by students of RV College of Engineering, Bangalore
            </p>

            {/* Logo */}
            <div className="opacity-90">
              <img
                src="RVCE-2024-Logo.png"
                alt="RV College of Engineering Logo"
                className="w-36 grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition">
              Explore Project
            </button>
            <button className="px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 transition">
              View Report
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="px-8 md:px-20 py-24 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Section header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Built for Clarity. Designed for Decisions.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              AXIS brings structure, intelligence, and confidence to
              infrastructure monitoring—so teams can focus on action, not
              interpretation.
            </p>
          </div>

          {/* Value pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 rounded-2xl bg-gray-50 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Real-Time Visibility
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize live sensor data and system behavior in a single,
                continuously updating dashboard.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Early Anomaly Detection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Identify deviations and warning signals early—before they evolve
                into critical structural risks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Insight-Driven Decisions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Convert complex sensor streams into clear, actionable insights
                that support faster, better engineering decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-20 py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Section Header */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              How AXIS Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A simple, intuitive workflow that turns raw structural data into
              clear insights.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-indigo-600 font-bold text-2xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Collect Data</h3>
              <p className="text-gray-600">
                Sensors capture live structural information—vibrations, stress
                points, and environmental factors.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-indigo-600 font-bold text-2xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Analyze & Detect</h3>
              <p className="text-gray-600">
                AI-powered algorithms process the data in real time,
                highlighting anomalies and trends.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <div className="text-indigo-600 font-bold text-2xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Visualize & Act</h3>
              <p className="text-gray-600">
                Dashboards display actionable insights, enabling faster,
                data-driven decisions from a single platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-8 md:px-20 py-12 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-lg">AXIS</h3>
            <p className="text-gray-400 text-sm">
              Built by students of RV College of Engineering, Bangalore.
              Monitoring infrastructure smarter, safer, and faster.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-semibold">Contact</h4>
            <p className="text-sm">Email: support@axisplatform.com</p>
            <p className="text-sm">Phone: +91 98765 43210</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-white">
                Twitter
              </a>
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AXIS by RV College of Engineering.
          All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;

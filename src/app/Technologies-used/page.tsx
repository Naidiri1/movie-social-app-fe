'use client';
export const dynamic = 'force-dynamic';
"use client";
import Link from "next/link";

const technologies = {
  frontend: {
    title: "Frontend",
    icon: "🎨",
    color: "from-blue-400 to-cyan-400",
    items: [
      {
        name: "Next.js 14",
        description: "React framework with server-side rendering and routing",
      },
      {
        name: "React 18",
        description: "JavaScript library for building user interfaces",
      },
      {
        name: "TypeScript",
        description: "Typed superset of JavaScript for better code quality",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid UI development",
      },
      {
        name: "Redux Toolkit",
        description: "State management for complex application state",
      },
      {
        name: "Session Storage",
        description: "Saves Search User to keep flow datausage",
      },
    ],
  },
  backend: {
    title: "Backend",
    icon: "⚙️",
    color: "from-purple-400 to-pink-400",
    items: [
      {
        name: "Spring Boot",
        description: "Java-based framework for building REST APIs",
      },
      {
        name: "Java 21",
        description: "Programming language for backend development",
      },
      {
        name: "PostgreSQL",
        description: "Relational database for data persistence",
      },
      {
        name: "Spring Security",
        description: "Authentication and authorization framework",
      },
      {
        name: "JWT",
        description: "JSON Web Tokens for secure API authentication",
      },
    ],
  },
  ui: {
    title: "UI Libraries",
    icon: "✨",
    color: "from-yellow-400 to-orange-400",
    items: [
      {
        name: "Material Tailwind",
        description: "Material Design components for Tailwind CSS",
      },
      {
        name: "React Icons",
        description: "Popular icon libraries as React components",
      },
      { name: "Lucide Icons", description: "Clean, consistent icon library" },
      {
        name: "Heroicons",
        description: "Beautiful hand-crafted SVG icons by Tailwind team",
      },
      {
        name: "Framer Motion",
        description: "Production-ready animation library for React",
      },
    ],
  },
  tools: {
    title: "Tools & Utilities",
    icon: "🛠️",
    color: "from-green-400 to-teal-400",
    items: [
      {
        name: "Fuse.js",
        description:
          "Lightweight fuzzy-search library for better search experience",
      },
      { name: "Day.js", description: "Lightweight date manipulation library" },
      {
        name: "React Hook Form",
        description: "Performant forms with easy validation",
      },
      {
        name: "Fetch API",
        description: "Built-in web API for network requests",
      },
      { name: "React Query", description: "Data fetching and caching library" },
      {
        name: "React Slider",
        description: "Movie Scoring and displaying user score",
      },
    ],
  },
  apis: {
    title: "APIs & Services",
    icon: "🌐",
    color: "from-red-400 to-rose-400",
    items: [
      {
        name: "TMDB API v3",
        description: "The Movie Database API for movie information",
      },
      { name: "RESTful API", description: "Custom backend API architecture" },
      {
        name: "Vercel",
        description: "Platform for frontend deployment and hosting",
      },
      {
        name: "Railway/Render",
        description: "Platform for backend deployment",
      },
    ],
  },
  devtools: {
    title: "Development Tools",
    icon: "💻",
    color: "from-indigo-400 to-purple-400",
    items: [
      {
        name: "Git & GitHub",
        description: "Version control and code collaboration",
      },
      { name: "VS Code", description: "Primary code editor with extensions" },
      { name: "Postman", description: "API testing and documentation" },
      { name: "ESLint & Prettier", description: "Code linting and formatting" },
      {
        name: "Chrome DevTools",
        description: "Browser debugging and performance analysis",
      },
    ],
  },
};

export default function TechnologiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of all technologies, libraries, and tools
            used to build Iriscope
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 text-center border border-gray-700">
            <div className="text-3xl font-bold text-blue-400">30+</div>
            <div className="text-sm text-gray-400">Technologies</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 text-center border border-gray-700">
            <div className="text-3xl font-bold text-purple-400">Full Stack</div>
            <div className="text-sm text-gray-400">Application</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 text-center border border-gray-700">
            <div className="text-3xl font-bold text-green-400">Modern</div>
            <div className="text-sm text-gray-400">Architecture</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 text-center border border-gray-700">
            <div className="text-3xl font-bold text-red-400">Responsive</div>
            <div className="text-sm text-gray-400">Design</div>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(technologies).map(([key, section]) => (
            <section
              key={key}
              className="bg-gray-800/30 backdrop-blur rounded-xl p-6 md:p-8 border border-gray-700 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{section.icon}</span>
                <h2
                  className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}
                >
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-gray-600 transition-all hover:transform hover:scale-105"
                  >
                    <h3 className="font-semibold text-white mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-8 border border-purple-700/30">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Architecture Overview
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-500/20 rounded-lg p-6 mb-3 border border-blue-500/30">
                <div className="text-4xl mb-2">🎭</div>
                <h3 className="font-bold text-blue-400">Frontend</h3>
              </div>
              <p className="text-sm text-gray-400">
                Next.js with TypeScript, deployed on Vercel with SSR/SSG
                optimization
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500/20 rounded-lg p-6 mb-3 border border-purple-500/30">
                <div className="text-4xl mb-2">🔗</div>
                <h3 className="font-bold text-purple-400">API Layer</h3>
              </div>
              <p className="text-sm text-gray-400">
                RESTful API with Spring Boot, JWT authentication, and TMDB
                integration
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-500/20 rounded-lg p-6 mb-3 border border-green-500/30">
                <div className="text-4xl mb-2">💾</div>
                <h3 className="font-bold text-green-400">Database</h3>
              </div>
              <p className="text-sm text-gray-400">
                PostgreSQL for user data, reviews, and social features
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/popular"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-center"
          >
            Go to Home
          </Link>
        </div>

        <div className="text-center mt-12 pb-8">
          <p className="text-xs text-gray-500">
            This tech stack represents a modern, scalable, and performant web
            application architecture
          </p>
        </div>
      </div>
    </div>
  );
}

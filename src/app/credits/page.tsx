"use client";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import iriscope from "../../../public/iriscope.png";
import TMDB from "../../../public/TMDB.png"

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Credits & Legal
          </h1>
          <p className="text-gray-400 text-lg">Attributions and Legal Disclaimers</p>
        </div>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-8 mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="relative w-[160px] h-[100px] mb-4">
              <Image
                src={TMDB}
                alt="Iriscope Logo"
                fill
                className="object-contain"
                priority
              />
            </div>            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 text-blue-400">The Movie Database (TMDB)</h2>
              <p className="text-gray-300">
                This product uses the TMDB API but is not endorsed or certified by TMDB.
              </p>
            </div>
          </div>
          
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              All movie data, including but not limited to titles, descriptions, release dates, 
              ratings, and genres are provided by{" "}
              <a 
                href="https://www.themoviedb.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                The Movie Database (TMDB)
              </a>.
            </p>
            <p>
              All movie posters, backdrop images, and actor photos are sourced from TMDB's image database.
            </p>
          </div>
        </section>

        <section className="bg-red-900/20 backdrop-blur rounded-lg p-8 mb-8 border border-red-800/50">
          <h2 className="text-2xl font-bold mb-6 text-red-400 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Legal Disclaimer
          </h2>
          
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">No Ownership of Content</h3>
              <p className="text-sm">
                Iriscope and its developer Iridian Cisneros Vargas DO NOT claim ownership of any content displayed on this platform, including but not limited to:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 text-sm space-y-1">
                <li>Movie titles, descriptions, and metadata</li>
                <li>Movie posters and backdrop images</li>
                <li>Actor/actress photos and biographical information</li>
                <li>Ratings and review scores from TMDB</li>
                <li>Any other visual or textual content from third-party sources</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Fair Use Statement</h3>
              <p className="text-sm">
                This website is a non-commercial, educational project created for portfolio and demonstration purposes only. 
                All copyrighted material is used under the doctrine of fair use for:
              </p>
              <ul className="list-disc list-inside mt-2 ml-4 text-sm space-y-1">
                <li>Educational purposes</li>
                <li>Non-commercial use</li>
                <li>Portfolio demonstration</li>
                <li>Software development learning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Copyright Notice</h3>
              <p className="text-sm">
                All movie-related content, images, and data are the property of their respective copyright holders. 
                This includes content owned by movie studios, distributors, and other rights holders.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-8 mb-8 border border-gray-700">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-[160px] h-[100px] mb-4">
              <Image
                src={iriscope}
                alt="Iriscope Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-2xl font-bold text-yellow-400">About Iriscope</h2>
          </div>
          
          <div className="space-y-3 text-sm text-gray-300 text-center">
            <p>
              Iriscope is a movie discovery and social platform created for educational and portfolio purposes.
            </p>
            <p>
              This project demonstrates web development skills using Next.js, React, and various modern web technologies.
            </p>
            <p className="font-semibold text-yellow-400">
              NOT FOR COMMERCIAL USE
            </p>
          </div>
        </section>

           <section className="bg-gray-800/50 backdrop-blur rounded-lg p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Technologies & Libraries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-2">Frontend</h3>
              <ul className="text-gray-400 space-y-1">
                <li>• Next.js 14</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Redux Toolkit</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Backend</h3>
              <ul className="text-gray-400 space-y-1">
                <li>• Spring Boot</li>
                <li>• Java 21</li>
                <li>• PostgreSQL</li>
                <li>• Spring Security</li>
                <li>• JWT Auth</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">UI Libraries</h3>
              <ul className="text-gray-400 space-y-1">
                <li>• Material Tailwind</li>
                <li>• React Icons</li>
                <li>• Lucide Icons</li>
                <li>• Fuse.js</li>
                <li>• Slider.js</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">APIs & Services</h3>
              <ul className="text-gray-400 space-y-1">
                <li>• TMDB API v3</li>
                <li>• RESTful API</li>
                <li>• Vercel (Hosting)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur rounded-lg p-8 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Contact & Removal Requests</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <p>
              If you are a copyright holder and believe that any content on this website infringes upon your rights, 
              please contact Developer immediately for content removal:
            </p>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <p className="font-semibold text-white mb-2">Email for Legal Inquiries:</p>
              <a 
                href="mailto:naidiri121510@gmail.com" 
                className="text-blue-400 hover:text-blue-300 underline"
              >
                naidiri121510@gmail.com
              </a>
            </div>
            <p className="text-xs text-gray-500">
              We will respond to all legitimate requests within 48 hours and remove any infringing content immediately.
            </p>
          </div>
        </section>

        <div className="text-center py-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            This website is a portfolio project and is not intended for commercial use. 
            All trademarks, service marks, trade names, logos, and icons are proprietary to their respective owners.
            No copyright infringement is intended.
          </p>
          <Link 
            href="/popular"
            className="inline-block mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
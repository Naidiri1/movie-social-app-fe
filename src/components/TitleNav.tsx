import { Typography } from "@material-tailwind/react";

export default function NavTitle({
  username,
  orbitron,
}: {
  username?: string;
  orbitron: any;
}) {
  return (
    <Typography
      as="a"
      href="/popular"
      className={`cursor-pointer py-1.5 tracking-widest ${orbitron.className} flex-shrink min-w-0 group`}
    >
      <span className="block sm:hidden text-xs">
        {username ? (
          <>
            <span className="text-gray-400 group-hover:text-white transition-colors">
              Welcome{" "}
            </span>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
              {username}
            </span>
          </>
        ) : (
          <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500">
            Welcome
          </span>
        )}
      </span>

      <span className="hidden sm:block md:hidden text-sm">
        {username ? (
          <>
            <span className="text-gray-400 group-hover:text-white transition-colors">
              Welcome{" "}
            </span>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse uppercase">
              {username}
            </span>
            <span className="text-gray-400 group-hover:text-white transition-colors">
              {" "}
              to{" "}
            </span>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500">
              IRISCOPE
            </span>
          </>
        ) : (
          <>
            <span className="text-gray-400 group-hover:text-white transition-colors">
              Welcome to{" "}
            </span>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500">
              IRISCOPE
            </span>
          </>
        )}
      </span>

      <span className="hidden md:block text-base lg:text-lg">
        {username ? (
          <>
            <span className="text-gray-400 font-light group-hover:text-white transition-all duration-300">
              Welcome{" "}
            </span>
            <span className="font-black text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse uppercase tracking-wider">
              {username}
            </span>
            <span className="text-gray-400 font-light group-hover:text-white transition-all duration-300">
              {" "}
              to{" "}
            </span>
            <span className="font-black text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 uppercase tracking-wider">
              IRISCOPE
            </span>
          </>
        ) : (
          <>
            <span className="text-gray-400 font-light group-hover:text-white transition-all duration-300">
              Welcome to{" "}
            </span>
            <span className="font-black text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 uppercase tracking-wider">
              IRISCOPE
            </span>
          </>
        )}
      </span>
    </Typography>
  );
}

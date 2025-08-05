import Link from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "@material-tailwind/react";
import { EyeIcon, BookmarkIcon, Trophy } from "lucide-react";
import { IoHome } from "react-icons/io5";
import { IoArrowUndoSharp } from "react-icons/io5";

export default function PhoneNavlist() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `flex items-center ml-2 rounded p-3 ${
      pathname === path
        ? "bg-white text-black"
        : "text-white hover:text-blue-400"
    }`;

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:hidden">
      <Typography as="li" variant="small" className="font-medium">
        <Link href="/popular">
          <button className={linkClasses("/popular")}>
            Popular
            <IoHome className="h-4 w-4 ml-1 " />
          </button>
        </Link>
      </Typography>

      <Typography as="li" variant="small" className="font-medium">
        <Link href="/upcoming">
          <button className={linkClasses("/upcoming")}>
            Upcoming
            <IoArrowUndoSharp className="h-5 w-5 ml-1" />
          </button>
        </Link>
      </Typography>

      <Typography as="li" variant="small" className="font-medium">
        <Link href="/favorites">
          <button className={linkClasses("/favorites")}>
            Favorites <BookmarkIcon className="h-5 w-5 ml-1" />
          </button>
        </Link>
      </Typography>

      <Typography as="li" variant="small" className="font-medium">
        <Link href="/watched">
          <button className={linkClasses("/watched")}>
            Watched <EyeIcon className="h-5 w-5 ml-1" />
          </button>
        </Link>
      </Typography>

      <Typography as="li" variant="small" className="font-medium">
        <Link href="/top10">
          <button className={linkClasses("/top10")}>
            Top 10 <Trophy className="h-5 w-5 ml-1" />
          </button>
        </Link>
      </Typography>
    </ul>
  );
}

import Image from "next/image";
import Link from "next/link";
import { HomeIcon, LayoutGridIcon, SearchIcon, UserIcon } from "lucide-react";

export default function DesktopNav() {
  return (
    <div className="hidden lg:block  shadow-md shadow-gray-400 p-4 w-48">
      <div className="top-0 sticky">
        <Image src="/ig.png" width={50} height={50} alt="logo" />
        <div className="ml-1 inline-flex flex-col gap-6 mt-8 *:flex *:items-center *:gap-2">
          <Link href={"/"}>
            <HomeIcon />
            Home
          </Link>

          <Link href={"/search"}>
            <SearchIcon />
            Search
          </Link>
          <Link href={"/browser"}>
            <LayoutGridIcon />
            Browser
          </Link>
          <Link href={"/profile"}>
            <UserIcon />
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

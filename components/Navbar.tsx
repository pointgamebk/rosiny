import { NavLinks } from "@/constants";
import { getCurrentUser } from "@/libs/session";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo1.svg" width={115} height={43} alt="rosiny" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7 text-light-purp">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-press" className="text-white">
              Share Press
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

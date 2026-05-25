"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DrawingsIcon } from "../../constants/images";
import { supabase } from "../../lib/supabase";

const menuList = [
  // {
  //   title: "Home",
  //   path: "/",
  // },
  {
    title: "About Us",
    path: "/about-us",
  },
  {
    title: "Service",
    path: "/service",
  },
  {
    title: "Article",
    path: "/article",
  },
  {
    title: "Projects",
    path: "/projects",
  },
  {
    title: "Contact Us",
    path: "/contact-us",
  },
];

const Nav = () => {
  const pathname = usePathname();
  const [bg, setBg] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const changeBg = () => {
      if (window.scrollY >= 90) {
        setBg(true);
      } else {
        setBg(false);
      }
    };

    window.addEventListener("scroll", changeBg);

    return () => {
      window.removeEventListener("scroll", changeBg);
    };
  }, []);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(Boolean(user));
    };

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadSession();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`w-full mt-0 md:mt-1 sticky__navbar relative z-50 backdrop-blur ${
        bg ? "bg-transparent sm:bg-white" : "bg-transparent sm:bg-white"
      }`}
    >
      <div className="container mx-auto px-4 md:px-0 flex items-center justify-between py-2 text-sm font-nunito">
        {/* logo */}
        <Link href={"/"}>
          <Image
            src={"/images/crystal-logo.png"}
            width={75}
            height={75}
            alt="Crystal company logo"
            className="hidden md:block"
          />
          <Image
            src={"/mobile-logo.svg"}
            width={75}
            height={75}
            alt="Crystal company logo"
            className="md:hidden"
          />
        </Link>
        {/* menu */}
        <div className="hidden md:flex items-center gap-5">
          {menuList.map((menu) => (
            <Link
              href={menu.path}
              key={menu.title}
              className={`relative pb-1 px-1 ${
                pathname === menu.path
                  ? 'after:content-[""] after:w-full after:h-[1px] after:bg-red after:absolute after:bottom-0 after:left-0'
                  : "after:content-none"
              }`}
            >
              {menu.title}
            </Link>
          ))}
        </div>
        {/* cta */}
        <div className="hidden md:flex items-center gap-8">
          {isLoggedIn ? (
            <Link
              href="/cg-admin"
              className="font-semibold text-black transition-colors hover:text-red"
            >
              Dashboard
            </Link>
          ) : null}
          {/* <Link
            href={"tel:+2348069452707"}
            className="flex items-center gap-1 text-black font-semibold"
          >
            <Image src={"/call.svg"} width={20} height={20} alt="" />
            08069452707
          </Link> */}

          <Link
            href={"/drawings"}
            className="flex items-center gap-1 px-2 bg-red dark-shadow rounded text-white min-w-[163px] h-[44px]"
          >
            <DrawingsIcon />
            Purchase Drawings
          </Link>
        </div>

        {/* hamburger */}
        <div className="md:hidden">
          <Image
            src={"/menu-open.svg"}
            width={55}
            height={55}
            alt="open"
            onClick={() => toggleMenu()}
          />
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`md:hidden bg-white h-screen w-full px-4 py-5 absolute -top-3 left-0 ${
          isMenuOpen ? "slide-in" : "slide-out"
        }`}
      >
        <div className="relative h-full px-4 py-5">
          <div className="w-full">
            <Image
              src={"/ic_baseline-close.svg"}
              width={30}
              height={30}
              alt="open"
              onClick={() => toggleMenu()}
              className="ml-auto"
            />
          </div>

          {/* menu list */}
          <div className="flex flex-col items-start gap-4 mt-5">
            {menuList.map((menu) => (
              <Link
                href={menu.path}
                key={menu.title}
                // className={`relative font-nunito font-medium text-base pb-1 ${
                //   pathname === menu.path
                //     ? 'after:content-[""] after:w-full after:h-[2px] after:bg-red after:absolute after:bottom-0 after:left-0'
                //     : "after:content-none"
                // }`}

                className={`font-nunito font-medium text-sm uppercase shadow w-full py-2 px-3 hover:bg-red hover:text-white rounded ${pathname === menu.path ? "bg-red text-white" : ""}`}
                onClick={() => toggleMenu()}
              >
                {menu.title}
              </Link>
            ))}

            {isLoggedIn ? (
              <Link
                href="/cg-admin"
                className="font-nunito font-medium text-sm uppercase shadow w-full py-2 px-3 hover:bg-red hover:text-white rounded"
                onClick={() => toggleMenu()}
              >
                Dashboard
              </Link>
            ) : null}

            <Link
              href="/drawings"
              className={`font-nunito font-medium text-sm uppercase shadow w-full py-2 px-3 hover:bg-red hover:text-white rounded ${
                pathname === "/drawings" ? "bg-red text-white" : ""
              }`}
              onClick={() => toggleMenu()}
            >
              Purchase Drawings
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            <Image
              src={"/mobile-nav-bg.svg"}
              width={278}
              height={75}
              alt="house background image"
              className="w-full h-full select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

"use client";

import { getProviders, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const setProvidersFn = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersFn();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="app logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptForge</p>
      </Link>

      {/*Destop Navigation*/}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={"/assets/images/logo.svg"}
                alt="profile"
                className="rounded-full"
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>

      {/*Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              src={"/assets/images/logo.svg"}
              alt="profile"
              className="rounded-full"
              width={37}
              height={37}
              onClick={() => {}}
            />
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

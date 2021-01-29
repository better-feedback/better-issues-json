import Link from "next/link";
import dynamic from "next/dynamic";

import Logo from "./svg/Logo";

const ConnectWallet = dynamic(() => import("./ConnectWallet"), {
  ssr: false,
});

export const Header = (): JSX.Element => {
  return (
    <header className="mb-6 shadow-lg bg-better-white body-font">
      <div className="container flex flex-row flex-wrap items-center p-2 mx-auto">
        <Link href={{ pathname: `/` }}>
          <a className="flex items-center w-40 mr-2 text-2xl font-bold md:w-40 text-better-violet font-poppins title-font">
            <Logo
              style={{ height: "56px" }}
              blendMode1="darken"
              blendMode2="multiply"
            />
            <span className="hidden md:inline">Better</span>
          </a>
        </Link>
        <nav className="flex items-center justify-center ml-8 space-x-10 text-gray-600">
          <a
            href="/"
            className="text-sm font-semibold rounded-xl hover:text-better-black"
          >
            <svg
              className="inline-flex w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden md:inline">Roadmap</span>
          </a>
          <a
            href="/issues"
            className="inline-flex text-sm font-semibold rounded-xl hover:text-better-black"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden md:inline">Issues</span>
          </a>
        </nav>
        <div className="flex items-center ml-auto">
          <ConnectWallet />
        </div>
      </div>
    </header>
  );
};

export default Header;

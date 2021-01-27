import Link from "next/link";
import Logo from "./svg/Logo";

export const Header = (): JSX.Element => {
  return (
    <header className="mb-6 shadow-lg bg-better-white body-font">
      <div className="container flex flex-col flex-wrap p-2 mx-auto md:items-center md:flex-row ">
        <Link href={{ pathname: `/` }}>
          <a className="flex items-center w-40 mb-4 mr-2 text-2xl font-bold text-better-violet font-poppins title-font md:mb-0">
            <Logo
              style={{ height: "56px", width: "56px" }}
              blendMode1="darken"
              blendMode2="multiply"
            />
            Better
          </a>
        </Link>
        <nav className="flex flex-wrap items-center justify-center space-x-10 text-gray-600">
          <a
            href="#"
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
            Roadmap
          </a>
          <a
            href="#"
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
            Issues
          </a>
        </nav>
        <div className="flex ml-auto">
          <button
            className="flex ml-3 text-sm rounded-full bg-better-violet focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <svg
              className="w-6 h-6 text-better-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

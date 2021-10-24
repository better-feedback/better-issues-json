import Link from "next/link";
import dynamic from "next/dynamic";
import { useSession, signIn, signOut } from "next-auth/client";
import Logo from "./svg/Logo";

const ConnectWallet = dynamic(() => import("./ConnectWallet"), {
  ssr: false,
});

export const Header = (): JSX.Element => {
  const [session] = useSession();

  const handleSignin = (e) => {
    e.preventDefault()
    signIn()
  }    
  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }

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
            <span className="hidden align-middle md:inline">Roadmap</span>
          </a>
          <a
            href="/issues"
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
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden align-middle md:inline">Issues</span>
          </a>
        </nav>
        <div className="flex ml-auto items-center py-0.5 text-sm font-medium text-gray-600 bg-better-purple rounded-full ">
          <ConnectWallet />
          <span>|</span>
          <div className="flex mx-3 self-center font-normal">
            <div className="mr-1">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            </div>
            { session && <a href="#" onClick={handleSignout}>Sign Out</a> }
            { !session && <a href="#" onClick={handleSignin}>Sign In</a> }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

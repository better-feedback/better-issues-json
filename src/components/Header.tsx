import Head from "next/head";

type HeaderProps = {
  siteTitle: string;
};

export const Header = (props: HeaderProps): JSX.Element => {
  return (
    <Head>
      <title>{props.siteTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default Header;

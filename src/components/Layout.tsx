import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <div className="flex flex-col antialiased bg-gray-100 v-full">
      <Header siteTitle={props.siteTitle} />
      <Navbar />
      <div className="flex flex-wrap items-center justify-center pb-16 bg-gray-100 content">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

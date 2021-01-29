import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <div className="antialiased bg-gray-100 v-full">
      <Header siteTitle={props.siteTitle} />
      <Navbar />
      <div className="flex flex-wrap items-center justify-center content">
        {props.children}
      </div>
    </div>
  );
}

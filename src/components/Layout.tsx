import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <body className="bg-gray-100 v-full">
      <Header siteTitle={props.siteTitle} />
      <Navbar />
      <div className="flex items-center justify-center content">
        {props.children}
      </div>
    </body>
  );
}

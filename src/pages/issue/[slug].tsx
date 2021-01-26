import glob from "glob";
import Layout from "../../components/Layout";
import IssueTags from "../../components/IssueTags";
import ReactMarkdown from "react-markdown";

export const IssueTemplate = (props): JSX.Element => {
  if (!props.issueData) return <></>;

  return (
    <Layout siteTitle={props.siteTitle}>
      <div className="flex items-start w-5/6 space-x-6 text-gray-800 issue rounded-xl">
        <div className="w-1/3 bg-white shadow-lg issue rounded-xl">
          <div className="p-6">
            sidebar content goes here asdf asdf asdf asdf
            <div className="py-2">
              <span className="text-xs font-medium uppercase text-better-black">
                Funding goal
              </span>
              <div className="relative">
                <div className="flex h-2 mb-4 overflow-hidden text-xs bg-pink-200 rounded">
                  <div
                    style={{ width: "30%" }}
                    className="flex flex-col justify-center text-center text-white shadow-none bg-better-red whitespace-nowrap"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex issue__sidebar-buttons">
            <div className="w-1/2 text-center bg-better-yellow rounded-bl-xl font-poppins">
              <button className="w-full h-full p-4">
                <svg
                  className="inline w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold align-middle">LIKE</span>
              </button>
            </div>
            <div className="w-1/2 text-center bg-better-green rounded-br-xl font-poppins">
              <button className="w-full h-full p-4">
                <svg
                  className="inline w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-bold align-middle">FUND</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-2/3 p-6 bg-white shadow-lg rounded-xl issue__main">
          <div className="mb-6 issue__main-header">
            <div className="flex mb-1">
              <span className="text-xl font-medium issue__main-title">
                {props.issueData.title}
              </span>
              <div className="ml-auto">
                <a
                  className="flex p-1 bg-gray-200 rounded-3xl"
                  href={props.issueData.html_url}
                  rel="noreferrer"
                  target="_blank"
                  title="Open original issue"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-600 uppercase issue__main-type">
              feature request
            </div>
          </div>

          <div className="text-gray-800 issue__body">
            <ReactMarkdown>{props.issueData.body}</ReactMarkdown>
          </div>
          <div className="my-3 space-x-2">
            <hr className="mb-2" />
            <IssueTags tags={props.issueData.labels} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IssueTemplate;

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const content = await import(`../../../issues/${slug}.json`);
  const config = await import(`../../data/config.json`);

  console.log(content);

  return {
    props: {
      siteTitle: config.title,
      issueData: { ...content },
    },
  };
}

export async function getStaticPaths() {
  //get all .md files in the posts dir
  const issues = glob.sync("./issues/**/*.json");

  //remove path and extension to leave slug only
  const issueSlugs = issues.map((filename: string) =>
    filename.split("/")[2].slice(0, -5).trim()
  );

  // create paths with `slug` param
  const paths = issueSlugs.map((slug: string) => `/issue/${slug}`);
  return {
    paths,
    fallback: false,
  };
}

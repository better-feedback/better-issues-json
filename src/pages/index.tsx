import IssueList from "../components/IssueList";
import Layout from "../components/Layout";

export const Home = (props): JSX.Element => {
  return (
    <Layout siteTitle={props.siteTitle}>
      <section>
        <IssueList allIssues={props.allItems} />
      </section>
      <div>afaf</div>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`);
  //get posts & context from folder
  const items = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      return {
        ...(values[index] as Record<string, unknown>),
      };
    });
    return data;
  })(require.context("../../issues", true, /\.json$/));

  return {
    props: {
      allItems: items,
      siteTitle: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  };
}

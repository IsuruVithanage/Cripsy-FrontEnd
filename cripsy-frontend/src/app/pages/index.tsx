import { GetStaticProps } from "next";

interface Data {
  title: string;
}

// Define fetchSomeData function
async function fetchSomeData(): Promise<Data> {
  // Replace with actual data fetching logic
  return { title: "Hello from Cripsy" };
}

export default function Home({ data }: { data: Data }) {
  return <div>{data.title}</div>;
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchSomeData(); // Fetch your data here
  return {
    props: { data },
  };
};

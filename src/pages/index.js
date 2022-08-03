import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>
      <Header />
      <main className="max-w-5xl container mx-auto">
        {/* Banner */}
        <Banner />
        {/* Production Feed */}
        <ProductFeed products={products} />
        {/* {console.log(products)} */}
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  // console.log(products);
  return {
    props: {
      products,
    },
  };
}

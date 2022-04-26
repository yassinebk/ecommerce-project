import Head from "next/head";
import Image from "next/image";
import SEOLayout from "../components/SEOLayout";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <SEOLayout
      title={"Shop Admin"}
      description={{
        name: "",
        content: "",
      }}
      normalNavbar
    >
      
    </SEOLayout>
  );
};

export default Home;

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import InputFields from "./InputFields";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <InputFields />
    </div>
  );
}

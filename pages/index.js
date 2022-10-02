import Head from "next/head";
import Image from "next/image";

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

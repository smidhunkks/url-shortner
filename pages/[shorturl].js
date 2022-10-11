import React from "react";
import { getLongUrl } from "./api/service/dbservice";

export const getServerSideProps = async (context) => {
  const { params } = context;

  const longUrlResponse = await getLongUrl(params.shorturl);

  console.log("long url" + longUrlResponse);
  console.log(longUrlResponse);
  if (longUrlResponse.status === 200)
    return {
      redirect: {
        destination: longUrlResponse.url,
      },
      props: { params },
    };
  else {
    return {
      redirect: {
        destination: "/",
      },
      props: { params },
    };
  }
};

function redirection({ params }) {
  console.log(params.shorturl);
  return <div>redirecting to {params.shorturl} </div>;
}

export default redirection;

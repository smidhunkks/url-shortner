import React from "react";
import { getLongUrl } from "./api/service/dbservice";
// const params = {
//   params: {
//     shorturl: { shorturl },
//   },
// };

export const getServerSideProps = async (context) => {
  const { params } = context;
  // console.log(params);
  const longUrlResponse = await getLongUrl(params.shorturl);

  // const longUrl=await longUrlResponse.json();
  console.log("long url" + longUrlResponse);
  console.log(longUrlResponse);
  if(longUrlResponse.status===200)
  return {
    redirect: {
      destination: longUrlResponse.url,
    },
    props: { params },
  };
  else{
    return {
      redirect: {
        destination: '/',
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

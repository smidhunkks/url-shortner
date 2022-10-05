import React from "react";
// const params = {
//   params: {
//     shorturl: { shorturl },
//   },
// };

export const getServerSideProps = async (context) => {
  
  const {params}=context;
 // console.log(params);
  return { 
    redirect:{
        destination:'/'
    },
    props: {params} };
};

function redirection({params}) {
    console.log(params.shorturl)
  return <div>redirecting to {params.shorturl} </div>;
}

export default redirection;

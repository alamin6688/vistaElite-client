import React from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Vista Elite</title>
      </Helmet>
      <div className="pt-20 px-4">
        <h2>Thi is Home Page</h2>
      </div>
    </>
  );
};

export default Home;

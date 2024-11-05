import React from "react";
import { Helmet } from "react-helmet-async";
import Rooms from "../Rooms/Rooms";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Vista Elite</title>
      </Helmet>
      <div className="pt-20">
        <Rooms></Rooms>
      </div>
    </>
  );
};

export default Home;

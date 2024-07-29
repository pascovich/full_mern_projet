import React from "react";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";

const homePage = () => {
  return (
    <div>
      <LeftNav />
      <div>
        <Thread />
      </div>
    </div>
  );
};

export default homePage;

import React from "react";
import { motion } from "framer-motion";

import memeem865 from "../../assets/memeem-865.png";
import melong from "../../assets/melong.png";
import blob from "../../assets/blob.svg";

const ProfileImage = () => {

  const divStyle = {
    borderRadius: '67% 33% 61% 39% / 47% 30% 70% 53%',
  };
  return (
    
    <div className=" min-h-[550px] min-w-[200px] relative w-32">

      <div className=" rounded-full absolute inset-0 " >
        <img
          src={melong}
          alt="Ammar's Picture"
          className="bg-gradient-to-b from-[#003f7a] to-[#00a5c2] w-full h-full rounded-lg object-cover" style={divStyle}
        />
      </div>
    </div>
  );
};

export default ProfileImage;

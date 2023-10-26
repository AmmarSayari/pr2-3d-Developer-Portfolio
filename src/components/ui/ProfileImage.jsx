import React from "react";

import memeem865 from "../../assets/memeem-865.png";
import melong from "../../assets/melong.png";

const ProfileImage = () => {

  const isMobile = window.innerWidth < 640;
  const divStyle = {
    borderRadius: '67% 33% 61% 39% / 47% 30% 70% 53%',
  };
  return (
    
    <div className={`relative  w-32 ${isMobile ? 'min-h-[200px] ml-7' : 'min-h-[550px]'} min-w-[200px] `}>

      <div className=" rounded-full absolute inset-0  " >
        <img
          src={isMobile ? memeem865 : melong}
          alt="Ammar's Picture"
          className="bg-gradient-to-b from-[#003f7a] to-[#00a5c2] w-full h-full rounded-lg object-cover" style={divStyle}
        />
      </div>
    </div>
  );
};

export default ProfileImage;

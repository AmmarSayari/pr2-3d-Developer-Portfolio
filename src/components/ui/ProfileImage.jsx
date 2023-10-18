import React from "react";
import { motion } from "framer-motion";

import memeem865 from "../../assets/memeem-865.png";

const ProfileImage = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Geometric shapes and architecture elements in the background */}
      <div
        className="absolute z-0 top-0 left-0 w-full h-full"
        style={{
          // Add your custom background style here
        }}
      />

      {/* Circular image component */}
      <div className="relative z-10 w-40 h-40 rounded-full overflow-hidden">
        <img
          src={memeem865}
          alt="Ammar's Picture"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileImage;

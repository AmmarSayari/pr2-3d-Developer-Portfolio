import  { Tilt }  from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";


const SmallCard = () => {
    return (
      <Tilt className="xs:w-[550px] w-full mb-6" >
        <motion.div
          variants={fadeIn("right", "spring", 0.5 , 0.75)}
          className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        >
          <div
            options={{
              max: 45,
              scale: 1,
              speed: 450
            }}
            className="bg-tertiary rounded-[20px] px-3 py-2  min-h-[90px]
              flex justify-evenly items-center flex-row
            "
          >
          
            <h3 className="text-white text-[14px]  text-center">
              BACHELOR OF SCIENCE FROM THE FACULTY OF COMPUTING
              AND INFORMATION TECH IN INFORMATION TECHNOLOGY
            </h3>
            <div className="ml-3 rounded-full bg-[#fff3] min-w-[90px]">
              <p className="text-white text-[15px] font-bold text-center" >
                GPA 4.04
              </p>
            </div>
          </div>
        </motion.div>
      </Tilt>
    )
  }

  export default SmallCard
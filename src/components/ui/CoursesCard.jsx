import  { Tilt }  from "react-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";


const CoursesCard = (
    { index, title}
  ) => {
    return (
      <Tilt className="w-[160px] " >
        <motion.div
          variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
          className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
        >
          <div
            options={{
              max: 45,
              scale: 1,
              speed: 450
            }}
            className="bg-tertiary rounded-[20px] py-3 px-3 h-[90px]
              flex justify-evenly items-center flex-col
            "
          >
            <h3 className="text-white text-[15px] font-bold text-center">
              {title}
            </h3>
          </div>
        </motion.div>
      </Tilt>
    )
  }

  export default CoursesCard
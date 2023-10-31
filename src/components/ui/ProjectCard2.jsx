import React from "react";
import {Tilt} from "react-tilt";
import { motion } from "framer-motion";

import { github } from "../../assets";
import { fadeIn} from "../../utils/motion";

import {link} from "../../assets";

const ProjectCard2 = ({
    index,
    name,
    apps,
    description,
    achievements,
  }) => {
    return (
      <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
        <div
          className=" green-pink-gradient p-[1px] rounded-[20px] shadow-card m-1"
        >
          <div
            className='bg-tertiary p-5 rounded-[20px] w-full'
          >
            
            <div>
              <h3 className='text-white font-bold text-[24px]'>{name}</h3>
            </div>

            <div
              className='flex flex-col sm:flex-row w-full sm:min-w-[1000px] '
            >
              {apps.map((app, appIndex) => (
                  <Tilt
                  options={{
                    max: 45,
                    scale: 1,
                    speed: 450,
                  }} key={appIndex} className='relative mr-[30px] mt-9 h-full w-[310px] custom-glass-white rounded-2xl'>
                      
                      <div className="relative w-[310px] h-[230px] ">
                        <div className='absolute inset-0 flex justify-end 
                          m-3 card-img_hover gap-1'
                        >
                          <div
                            onClick={() => window.open(app.source_code_link, "_blank")}
                            className='black-gradient w-8 h-8 rounded-full 
                              flex justify-center items-center cursor-pointer'
                          >
                            <img
                              src={github}
                              alt='source code'
                              className='w-1/2 h-1/2 object-contain'
                            />
                          </div>
                          
                          <div
                            onClick={() => {
                              if (app.live_preview_link) {
                                window.open(app.live_preview_link, "_blank");
                              } else {
                                alert("Live preview link is not available.");
                              }
                            }}

                            className='black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer'
                          >
                            <img
                              src={link}
                              alt='review code'
                              className='w-1/2 h-1/2 object-contain'
                            />
                          </div>
                        </div>
                        <div className=" ">
                          {app.images.map((image, imageIndex) => (
                                  <img
                                      key={imageIndex}
                                      src={image.image}
                                      alt={`Image ${imageIndex}`}
                                      className=' rounded-2xl w-full object-cover object-left-top max-h-[230px] '
                                  />
                          ))}
                        </div>
                      </div>

                      <h3 className='mt-3 text-white font-bold text-[24px]'>{app.name}</h3>
                      
                      <div className=" green-pink-gradient p-[1px] rounded-[20px] shadow-card m-1">
                        <div className="bg-tertiary rounded-[20px] px-3 py-1 flex justify-center flex-row">
                            <h3 className='text-white font-semibold text-[14px] mr-2 mt-2'>Tech:</h3>
                          <div className="flex flex-row gap-3 flex-wrap mt-2 mb-2">
                            {app.technologies.map((tech, techIndex) => (

                              <div className="rounded-full bg-[#fff3] min-w-[60px]" key={techIndex}>
                                <p className="text-white text-[12px] text-center " >
                                  {tech.techName }
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>


                      </Tilt>
                ))}
              </div>

              <div className='mt-5 '>
                <h3 className="font-bold" >Description:</h3>
                <p className='text-secondary text-[14px] w-full sm:w-[660px]'>{description}</p>
                <h3 className="mt-3 font-bold" >Achievements:</h3>
                <p className=' text-secondary text-[14px] w-full sm:w-[660px]'>{achievements}</p>
              </div>
          
            </div>
          </div>
      </motion.div>
    )
  }

export default ProjectCard2
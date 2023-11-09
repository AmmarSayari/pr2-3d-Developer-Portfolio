import React , {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import {styles} from '../styles';
import { navLinks} from '../constants';
import {menu,close, linkedin, twitter} from '../assets';

import logoA1 from '../assets/logoA1.png';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  
  return (
    <nav
      className={`${styles.paddingX} 
        w-full flex items-center py-5 fixed
        top-0 z-20 bg-primary `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div className='flex flex-row gap-6'>
          <Link 
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}  
          >
            <img 
                src={logoA1} 
                alt="logo" 
                className="w-12 h-12 object-contain rounded-full" 
            />
            <p className="text-white text-[18px]
                font-bold cursor-pointer flex"
            >
              Ammar &nbsp;
              <span className="sm:block hidden" >
                Al-sayari
              </span> 
            </p>
          </Link>
        
          <button
            onClick={() => window.open("https://www.linkedin.com/in/%D8%B9%D9%85%D8%A7%D8%B1-%D8%A7%D9%84%D8%B5%D9%8A%D8%B9%D8%B1%D9%8A-50a5a0287/", "_blank")}
            className='btnIcon1 w-[45px] h-[45px] rounded-xl'
          >
            <img
              src={twitter}
              alt='twitter'
              className='w-[70%] h-[70%] bg-[#e3e3e3] rounded-md'
            />
          </button>

          <button
            onClick={() => window.open("https://twitter.com/amar9dev", "_blank")}
            className='btnIcon1 w-[45px] h-[45px] rounded-xl'
          >
            <img
              src={linkedin}
              alt='linkedIn'
              className='w-[70%] h-[70%]'
            />
          </button>

        </div>

        
        <ul className="list-none hidden sm:flex flex-row gap-5" >
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? 
                "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center" >
          {/** Mobile Menu */}
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div className={`${!toggle ? 'hidden' : 'flex'} 
            p-6 black-gradient absolute top-20 right-0 mx-4 my-2
            min-w-[140px] z-10 rounded-xl
          `}>
              <ul className="list-none flex justify-end items-start flex-col gap-4" >
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? 
                      "text-white" : "text-secondary"
                      
                    } font-poppins font-medium cursor-pointer text-[16px]
                    `}
                    onClick={() => {
                      setToggle(!toggle)
                      setActive(link.title)
                    }}
                  >
                    <a href={`#${link.id}`}>{link.title}</a>
                  </li>
                ))}
              </ul>

          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar
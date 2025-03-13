import React from 'react'
//import heroImg from '../..assets/rabbit-hero.webp';
import hero from "../../assets/rabit.webp";
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='relative'>
        <img 
        src={hero}
        alt="Roket"
        className='w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover'
         />
         <div className='absolute inset-0  bg-opacity-5 flex items-center justify-center'>
          <div className='text-center text-white p-6'>
            <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
              VACATION <br />  READY
            </h1>
            <p className='text-sm tracking-tighter mb:text-lg mb-6'>
              Expore our vacation ready outfits with fast worldwide shipping</p>
              <Link to="#" className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg">
              Shop now
              </Link>
          </div>
         </div>
    </section>
  )
}

export default Hero
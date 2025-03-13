import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight, } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'
const NewArrivals = () => {
    const scrollRef = useRef(null)
    //const [scrollLeft , setScrollLeft] = useState(0)
    //const [scrollRight , setScrollRight] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0)

    const [newArrivals , setNewArrivals] = useState([]);

    useEffect (() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNewArrivals();
    } , [])

    const handleScrollLeft =()=>{
        scrollRef.current.scrollLeft -= 300;
        setScrollPosition( scrollRef.current.scrollLeft)
    }
    const handleScrollRight =()=>{
        scrollRef.current.scrollLeft += 300
        setScrollPosition( scrollRef.current.scrollLeft)
    }

   // Dummy Products
  return (
   <section className='py-16 px-4 lg:px-0   '>
    <div className='container mx-auto text-center mb-10 relative'>
        <h2 className='text-3xl font-bold text-gray-700 mb-4'>Expore New Arrivals</h2>
        <p className='text-lg text-gray-600 mb-8'>
            Discover the latest styles straight off the runway , freshly addded
            to keep your wordrobe on the cutting edge of fashion
        </p>

        {/**Scroll Button */}
        <div className='absolute right-0 bottom-[-30px] flex  space-x-2'>
            {/**Left Button */}
            <button 
            onClick={handleScrollLeft}
            disabled={scrollPosition <= 0}
             className='p-2 border rounded-full bg-white  hover:bg-gray-200  text-black disabled:opacity-50'>
                <FiChevronLeft className='text-2xl '/>
            </button>
            {/**right button */}
            <button
             onClick={handleScrollRight} 
             className='p-2  border rounded-full bg-white hover:bg-gray-200 text-black  disabled:opacity-50'>
                <FiChevronRight className='text-2xl '/>
            </button>
        </div>
    </div>

    {/**Scrollable Content */}
    <div
    ref={scrollRef}
     className='container mx-auto overflow-x-scroll scroll-smooth flex space-x-6 relative'>
        {newArrivals.map((product)=>(
            <div
            className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'
             key={product.id}>
                <img 
                src={product.images[0]?.url}
                 alt={product.images[0]?.altText || product.name} 
                 className='w-full h-[500px] object-cover rounded-lg transition-transform hover:scale-105'
                 draggable="false"
                 />
                 
                 <div className='absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white 
                 p-4 rounded-b-lg'>
                    <Link to="/product/${product.id" className="block">
                        <h4 className='font-medium'>{product.name}</h4>
                        <p className='mt-1'>${product.price}</p>
                    </Link>

                 </div>
            </div>
        ))}
    </div>
   </section>
  )
}

export default NewArrivals
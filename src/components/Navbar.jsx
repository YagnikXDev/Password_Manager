import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white'>
        <div className="mycontainer  text-slate-300 flex justify-between items-center px-4 py-5 h-14 ">
        <div className='logo font-bold text-white text-2xl '>
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
            </div>
            <button className='text-white bg-slate-900 my-5  flex justify-between items-center'>
              <img className='invert w-10  p-1' src='/icons/github.svg' alt='github logo'/>
              <span className='font-bold px-2'>Github</span>
            </button>
        </div>
    </nav>
  )
}

export default Navbar

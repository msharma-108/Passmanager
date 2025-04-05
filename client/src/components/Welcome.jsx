import React from 'react'

const Welcome = ({displayname}) => {
  return (
    <div className='flex mt-10 m-auto w-fit  justify-center rounded-2xl bg-fuchsia-800 p-2'>
            <div className='self-center text-2sm font-semibold flex flex-col md:flex-row text-white'>
                <span>Welcome {displayname}!Your own password library.</span>
                <span> Start adding your information.</span>
            </div>
            <lord-icon
                    src="https://cdn.lordicon.com/fjvfsqea.json"
                    trigger="loop"
                >
                </lord-icon>
         </div>
  )
}

export default Welcome

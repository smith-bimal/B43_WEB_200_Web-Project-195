import React from 'react'

const SecondaryButton = ({ children, onClick }) => {
    return (
        <button className='border border-gray-900 bg-gray-900 text-white px-6 py-3 rounded-full cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200' onClick={onClick}>{children}</button>
    )
}

export default SecondaryButton
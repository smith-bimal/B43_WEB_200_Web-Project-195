import React from 'react'

const PrimaryButton = ({ children, onClick }) => {
    return (
        <button className="px-6 py-3 border border-gray-900 text-gray-900 rounded-full hover:bg-gray-700 hover:text-white transition duration-200 cursor-pointer" onClick={onClick}>{children}</button>
    )
}

export default PrimaryButton
import React, { useState } from 'react'

const DashboardCard = ({ heading, icon, bg, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`p-6 rounded-3xl shadow-sm h-full relative ${bg}`}>
            <div className='flex justify-between items-center mb-4'>
                <h2 className="text-xl font-semibold"><i className={`${icon} mr-2`}></i>{heading}</h2>
                <div
                    className='flex bg-[#0002] h-8 justify-center rounded-full w-8 cursor-pointer items-center'
                    onClick={handleToggle}
                >
                    <i className={`fa-solid ${isExpanded ? 'fa-xmark' : 'fa-ellipsis'}`}></i>
                </div>
            </div>
            <div>
                {typeof children === 'function' ? children(isExpanded) : children}
            </div>
        </div>
    )
}

export default DashboardCard
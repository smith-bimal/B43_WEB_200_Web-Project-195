import React from 'react'

const QualityCard = ({ color, icon, head, body }) => {
    return (
        <div className={color + " p-8 rounded-lg w-80 relative"}>
            <img alt="Decorative background wave" className="absolute bottom-0 left-0 w-full h-full object-cover opacity-10" src="pngs/pngegg (3).png" />
            <div className="flex justify-center items-center text-gray-600 border-2 w-16 h-16 rounded-full text-3xl mb-28">
                <i className={icon}></i>
            </div>
            <h2 className="text-3xl font-medium mb-2">{head}</h2>
            <small className="text-gray-700">{body}</small>
        </div>
    )
}

export default QualityCard
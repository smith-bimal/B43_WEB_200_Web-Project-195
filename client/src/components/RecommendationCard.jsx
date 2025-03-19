import React from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

const RecommendationCard = ({ color, image, heading, body }) => {
    return (
        <div className={color + " min-w-[250px] w-[300px] rounded-lg p-4"}>
            <div className="mid-w-[250px] h-48 rounded-lg overflow-hidden object-cover">
                <img alt="Photo of China" className='h-full w-full' src={image} />
            </div>
            <div className="flex justify-between items-center mt-2">
                <h3 className="text-xl font-bold">{heading}</h3>
                <span className="text-sm text-gray-600 flex items-center">
                    Partner discount
                    <i className="fas fa-tag ml-1">
                    </i>
                </span>
            </div>
            <small className="text-gray-500 block my-4">{body}</small>
            <SecondaryButton>Explore</SecondaryButton>
        </div>
    )
}

export default RecommendationCard
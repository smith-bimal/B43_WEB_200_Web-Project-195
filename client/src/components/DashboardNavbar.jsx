import { useState } from 'react'
import { NavLink } from 'react-router'

const DashboardNavbar = () => {
    const [activeNav, setActiveNav] = useState({ dashboard: true, trips: false, archives: false });

    return (
        <nav className='flex justify-between items-center'>
            <img src="logo_light.png" className='h-12' alt="logo" />

            <div className="flex items-center justify-center gap-2">
                <div className="flex items-center relative border-2 border-gray-200 bg-gray-100 px-6 h-14 gap-12 rounded-full">
                    <div className={`w-1/3 absolute bg-[#1E2939] border-2 scale-y-115 border-[#1E2939] h-full top-0 rounded-full z-0 transition-all duration-150 ${activeNav.dashboard ? "left-0" : activeNav.trips ? "left-[33%]" : "left-[67%]"}`}></div>
                    <NavLink className={`z-10 w-20 text-center ${activeNav.dashboard && "text-white"}`} to="/dashboard" onClick={() => setActiveNav({ dashboard: true, trips: false, archives: false })}>
                        Dashboard
                    </NavLink>
                    <NavLink className={`z-10 w-20 text-center ${activeNav.trips && "text-white"}`} to="/trips" onClick={() => setActiveNav({ dashboard: false, trips: true, archives: false })}>
                        Your Trips
                    </NavLink>
                    <NavLink className={`z-10 w-20 text-center ${activeNav.archives && "text-white"}`} to="/archive" onClick={() => setActiveNav({ dashboard: false, trips: false, archives: true })}>
                        Archive
                    </NavLink>
                </div>
                <div className="flex items-center justify-center relative border-2 border-indigo-200 px-4 h-14 rounded-full cursor-pointer transition-all duration-150 hover:bg-[#e0e7ff67]">
                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full mr-2"><i className="fa-solid fa-plus"></i></div>
                    New Trip
                </div>
            </div>

            <div className="flex items-center justify-center gap-2">
                <div className="h-14 w-14 rounded-full border-2 border-gray-200 text-2xl flex items-center justify-center cursor-pointer hover:scale-105"><i className="fa-regular fa-bell"></i></div>
                <div className="h-14 w-14 rounded-full border-2 border-gray-200 text-2xl flex items-center justify-center cursor-pointer hover:scale-105"><i className="fa-regular fa-envelope"></i></div>
                <div className="h-14 w-14 rounded-full border-2 border-gray-200 text-2xl flex items-center justify-center cursor-pointer hover:scale-105"><img src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" alt="" className='h-full w-full rounded-full object-cover' /></div>
            </div>
        </nav>
    )
}

export default DashboardNavbar
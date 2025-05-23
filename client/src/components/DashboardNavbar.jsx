import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useAuth } from './AuthProvider';
import AddNewTripModal from './AddNewTripModal';

const DashboardNavbar = () => {
    const [activeNav, setActiveNav] = useState({ dashboard: true, trips: false, archives: false });
    const [showNewTripModal, setShowNewTripModal] = useState(false);

    useEffect(() => {
        if (window.location.pathname == "/dashboard") {
            setActiveNav({ dashboard: true, trips: false, archives: false })
        } else if (window.location.pathname == "/trips") {
            setActiveNav({ dashboard: false, trips: true, archives: false })
        } else if (window.location.pathname == "/archive") {
            setActiveNav({ dashboard: false, trips: false, archives: true })
        }
    }, []);

    const { logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <nav className='flex flex-col md:flex-row justify-between items-center'>
            <img src="logo_light.png" className='h-12 mb-4 md:mb-0' alt="logo" />

            <div className="flex flex-col md:flex-row justify-center gap-2 items-center mb-4 md:mb-0">
                <div className="flex bg-gray-100 border-2 border-gray-200 h-10 md:h-14 rounded-full gap-12 items-center px-4 md:px-6 relative">
                    <div className={`w-1/3 absolute bg-[#1E2939] border-2 scale-y-115 border-[#1E2939] h-full top-0 rounded-full z-0 ${activeNav.dashboard ? "left-0" : activeNav.trips ? "left-[33%]" : "left-[67%]"}`}></div>
                    <NavLink className={`z-10 w-20 text-center ${activeNav.dashboard && "text-white"}`} to="/dashboard">
                        Dashboard
                    </NavLink>
                    <NavLink className={`z-10 w-20 text-center ${activeNav.trips && "text-white"}`} to="/trips">
                        Your Trips
                    </NavLink>
                    <NavLink className={`z-10 w-20 text-center ${activeNav.archives && "text-white"}`} to="/archive">
                        Archive
                    </NavLink>
                </div>
            </div>

            <div className="flex justify-center gap-2 items-center">
                <div className="flex border-2 border-gray-200 h-12 md:h-14 justify-center rounded-full text-xl md:text-2xl w-12 md:w-14 cursor-pointer hover:scale-105 items-center"><i className="fa-bell fa-regular"></i></div>
                <div className="flex border-2 border-gray-200 h-12 md:h-14 justify-center rounded-full text-xl md:text-2xl w-12 md:w-14 cursor-pointer hover:scale-105 items-center"><i className="fa-envelope fa-regular"></i></div>
                <div className="relative">
                    <div
                        className="flex border-2 border-gray-200 h-12 md:h-14 justify-center rounded-full text-xl md:text-2xl w-12 md:w-14 cursor-pointer hover:scale-105 items-center"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <img
                            src="https://imgs.search.brave.com/8ylarQ0Xf9DIrDR0ypzj4DPdPWmPmoUhgkhi4SwM8gw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE3/OTk4MjY0L3ZlY3Rv/ci9tYWxlLXVzZXIt/aWNvbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NFJNaHFJ/WGNKTWNGa1JKUHE2/SzhoN296dVVvWmhQ/d0tuaUVrZTZLWWFf/az0"
                            alt=""
                            className='h-full rounded-full w-full object-cover'
                        />
                    </div>
                    {showUserMenu && (
                        <div className="bg-white border border-[#f5f5f5] rounded-md shadow-lg w-48 absolute mt-2 py-1 right-0 z-10">
                            <button
                                onClick={logout}
                                className="text-gray-700 text-left text-sm w-full block cursor-pointer hover:bg-gray-100 px-4 py-2"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {showNewTripModal && (
                <AddNewTripModal onClose={() => setShowNewTripModal(false)} />
            )}
        </nav>
    )
}

export default DashboardNavbar;
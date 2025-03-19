import React from 'react';
import Navbar from '../components/Navbar';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import QualityCard from '../components/QualityCard';
import Footer from '../components/Footer';
import RecommendationCard from '../components/RecommendationCard';

function Home() {
  return (
    <div className="max-w-screen-2xl p-4 md:p-8 font-medium text-gray-900 mx-auto">
      <Navbar />
      <div className="mx-auto p-4 relative">
        <main className="mt-8 md:mt-16">
          <div className="relative">
            <div className="absolute bottom-0 left-0 w-full h-full md:h-1/2 bg-purple-100 rounded-lg z-0">
              <img alt="Decorative background wave" className="absolute bottom-0 left-0 w-full h-full object-cover opacity-10" src="pngs/pngegg (2).png" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left md:w-1/2 p-4 md:p-8">
                <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold whitespace-normal md:whitespace-nowrap">
                  PLAN YOUR
                </h1>
                <h2 className="text-4xl md:text-7xl lg:text-9xl font-light italic">
                  ESCAPE
                </h2>
                <p className="text-gray-700 mt-4 md:mt-8 mb-2 md:mb-4">
                  We have the largest selection of unique tours. Try our easy and quick tour selection for any request. 24-hour support is always happy to answer all your questions.
                </p>
                <SecondaryButton>
                  Get Started
                </SecondaryButton>
                <div className="mt-4 md:mt-8 flex justify-center md:justify-start items-center space-x-2 md:space-x-4">
                  <p className="text-gray-700">
                    The mobile app is available now
                  </p>
                  <i className="fab fa-apple text-xl md:text-2xl">
                  </i>
                  <i className="fab fa-google-play text-xl md:text-2xl">
                  </i>
                </div>
              </div>
              <div className="w-full md:w-1/2 min-w-xs p-4 md:p-8">
                <img alt="Mobile app screenshot showing trip details" className="mx-auto rounded-lg md:scale-105" src="erasebg-transformed.png" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center my-4 md:mt-20">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold">
                1K+
              </h2>
              <p className="text-gray-500 mt-2">
                UNIQUE TOURS
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold">
                10K+
              </h2>
              <p className="text-gray-500 mt-2">
                HAPPY TRAVELERS
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold">
                4.8+
              </h2>
              <p className="text-gray-500 mt-2">
                APP STORE RATING
              </p>
            </div>
          </div>
          <div className="relative pt-8 md:pt-16 flex flex-col lg:flex-row items-center w-full">
            <div className="absolute inset-0 bg-[#f5f5f5] rounded-lg z-[-1] w-full self-end h-full md:h-[calc(100%-12rem)]">
              <img alt="Decorative background wave" className="absolute bottom-0 left-0 w-full h-full object-cover opacity-10" src="pngs/pngegg (1).png" />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 md:pl-12">
              <h1 className="text-3xl md:text-4xl lg:text-7xl font-medium">
                IMMENSE TOURS SELECTION
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mt-4 mb-8 md:mb-12">
                WE TURN YOUR DREAMS INTO UNFORGETTABLE TRAVEL
              </p>
              <PrimaryButton>View reviews</PrimaryButton>
            </div>
            <div className="lg:w-1/2 flex justify-center relative">
              <div className="relative flex items-end">
                <img alt="Smartphone displaying a travel app with a tour to Paris" className="h-[400px] md:h-[600px] relative z-[3]" src="freepik__background__77958.png" />
                <img alt="Smartphone displaying a travel app with a tour to Paris" className="h-[375px] md:h-[575px] relative z-[2] -ml-16 md:-ml-32 hidden md:block" src="freepik__background__77958.png" />
                <img alt="Smartphone displaying a travel app with a tour to Paris" className="h-[350px] md:h-[550px] relative -ml-16 md:-ml-32 hidden md:block" src="freepik__background__77958.png" />
              </div>
            </div>
          </div>

          <div className="my-8 md:my-16">
            <div className="flex flex-col md:flex-row justify-between p-4 md:p-12">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium mb-4">
                WHY TRAVELERS <br /> CHOOSE US
              </h1>
              <div className='text-right w-full md:w-60'>
                <h3 className="text-gray-700 text-2xl md:text-4xl font-light italic">
                  WE ARE THE TOP MOBILE TRAVEL APPS
                </h3>

                <small className='text-gray-500'>
                  According to the world rating list of tour apps in 2024
                </small>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-16">
              <QualityCard color={"bg-purple-100"} icon={"fas fa-mobile-alt"} head={"CLEAR & SIMPLE APP INTERFACE"} body={"Buy a tour in just two clicks. It's possible with our app"} />
              <QualityCard color={"bg-gray-100"} icon={"fas fa-gift"} head={"THE MOBILE APP IS FREE FOR YOU"} body={"You can use the application without a paid subscription"} />
              <QualityCard color={"bg-green-100"} icon={"fas fa-route"} head={"A LOT OF COOL TOURS & ROUTES"} body={"You can choose the tour you are interested in with our app"} />
            </div>
          </div>

          <main className="flex flex-col md:flex-row justify-between items-center mt-8">
            <div className="flex flex-col md:flex-row justify-between gap-8 p-4 md:p-12 w-full">
              <div className="text-left w-full md:w-60 mt-8 md:mt-0">
                <h3 className="text-gray-700 text-2xl md:text-4xl font-light italic">
                  THE BEST EXPERIENCE IN TRAVEL
                </h3>
                <small className="text-gray-500">
                  They have already joined our community. And you?
                </small>
                <div className="flex justify-start items-center gap-2 mt-4">
                  <div className="flex -space-x-2">
                    <img alt="User 1" className="rounded-full border-2 border-white h-10 w-10 md:h-14 md:w-14 object-cover" src="https://appstronauts.co/wp-content/uploads/2019/11/user-persona-1.jpg" />
                    <img alt="User 2" className="rounded-full border-2 border-white h-10 w-10 md:h-14 md:w-14 object-cover" src="https://dz2cdn1.dzone.com/storage/user-avatar/534373-thumb.jpg" />
                    <img alt="User 3" className="rounded-full border-2 border-white h-10 w-10 md:h-14 md:w-14 object-cover" src="https://www.debugbear.com/public/landing/michael.jpg" />
                    <img alt="User 4" className="rounded-full border-2 border-white h-10 w-10 md:h-14 md:w-14 object-cover" src="https://plus.unsplash.com/premium_photo-1708271598244-ba0c3ef2214f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMHdvbWFufGVufDB8fDB8fHww" />
                  </div>
                  <span className="text-gray-700">
                    +1K
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 space-y-4 text-right max-w-[700px]">
                <h1 className="text-3xl md:text-4xl lg:text-7xl font-medium mb-4">
                  JOIN OUR COMMUNITY
                </h1>
                <p className="text-gray-700">
                  Become a user of our mobile app and your travels will become more enjoyable and amazing
                </p>
                <button className="bg-gray-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-full">
                  Download App
                </button>
              </div>
            </div>
          </main>
          <section className="mb-32 md:mb-64 flex items-center flex-wrap justify-between relative">
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <RecommendationCard color={"bg-purple-100"} image={"https://acko-cms.ackoassets.com/Best_time_to_visit_china_2_6ec8c5cd03.png"} heading={"China"} body={"12 recommended hotels"} />
              <RecommendationCard color={"bg-blue-100"} image={"https://www.flightgift.com/media/wp/FG/2024/08/bali-1.webp"} heading={"Bali"} body={"10 recommended hotels"} />
            </div>

            <div className="absolute z-10 right-0 xl:right-1/2 xl:translate-x-1/2 md:block hidden">
              <img alt="Mobile app interface" className="rounded-lg max-h-[400px] md:max-h-[650px]" src="freepik__background__77958.png" />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <RecommendationCard color={"bg-green-100"} image={"https://www.pandotrip.com/wp-content/uploads/2013/08/1D110-Bertrand-Monney.jpg"} heading={"Paris"} body={"Over 100 hotels"} />
              <RecommendationCard color={"bg-pink-100"} image={"https://blog.italotreno.com/wp-content/uploads/2022/04/costiera-amalfitana.jpg"} heading={"Italy"} body={"8 recommended hotels"} />
            </div>
          </section>
        </main>
      </div>
      <hr className='opacity-25' />
      <Footer />
    </div>
  );
}

export default Home;

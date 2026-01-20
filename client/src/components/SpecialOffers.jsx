import React from 'react'
import { BadgeIndianRupee, ClipboardClock, Handshake, UserPlus } from 'lucide-react';

const SpecialOffers = () => {

    const offers = [
        {title: 'First Time User', icon: <UserPlus />, points: ["Flat ₹500 OFF on your first booking", "Use code: FIRSTDRIVE"], aos: "0" },
        {title: 'Weekend Discounts', icon: <BadgeIndianRupee />, points: ["Weekend Bonanza – Save 20%", "Festival Special Offer"], aos: "100" },
        {title: 'Limited Time', icon: <ClipboardClock />, points: ["Hurry! Offer ends in 12 hours", "Countdown timer included"], aos: "200" },
        {title: 'Long Term Rental', icon: <Handshake />, points: ["Book for 7 days & get 1 day FREE", "Monthly rentals at discounted price"], aos: "300" },
    ]
  return (
    <div className='max-w-screen bg-bg mx-auto overflow-x-hidden px-4 md:px-16 lg:px-20 xl:px-24 sm:py-15 py-10'>
            <h1 data-aos="fade-up" className='title text-4xl max-[400px]:text-2xl font-bold text-center text-primary text-shadow-lg text-shadow-secondary'>Special Offers</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto w-fit py-10 sm:py-15'>
                {offers.map((offer, i) => (
                    <div data-aos="slide-up" data-aos-delay={offer.aos}>
                        <div key={i} className='space-y-2 p-4 bg-white transform hover:-translate-y-2 shadow-lg shadow-secondary/30 rounded-xl text-center transition-all duration-300'>
                            <div className='text-white bg-primary w-fit mx-auto p-3 rounded-full mb-4'>{offer.icon}</div>
                            <h1 className='text-sm font-medium'>{offer.title}</h1>
                            <ul className='text-xs text-gray-500'>
                                {offer.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default SpecialOffers
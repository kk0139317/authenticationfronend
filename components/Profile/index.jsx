import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Profile = () => {
    return (
        <section className='h-auto w-auto my-20 mx-20 px-20 bg-white' >
            <div className='h-auto w-auto mx-10 px-10 ' >
                <h1 className=' font-semibold text-3xl ' >Account</h1>
                <span>Manage your account and billing information</span>

                <div className='h-auto w-auto grid grid-cols-2 py-6' >
                    <div className='flex' >
                        <img src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                            className='h-20 w-20 my-auto rounded-full'
                            alt="" />

                        <div className='my-auto mx-4' >
                            <h2 className=' font-bold text-xl ' >
                                Kundan Kumar
                            </h2>
                            <span className=' text-sm ' >
                                kk4881757@gmail.com
                            </span>
                        </div>

                    </div>
                    <div className=' text-end flex flex-col ' >
                        <Link href={"/logout"}
                        className='text-sm my-1 text-purple-700 font-bold '
                        >
                            Logout
                        </Link>

                        <Link href={"/contact"} 
                        className='text-sm my-1 text-purple-700 font-bold '>
                            Contact Us
                        </Link>

                        <Link href={"/billing"} 
                        className='text-sm my-1 text-purple-700 font-bold '>
                            Billing Guide
                        </Link>

                        <Link href={"/guide"} 
                        className='text-sm my-1 text-purple-700 font-bold '>
                            Prompt Guide
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Profile
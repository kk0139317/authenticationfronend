import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const app = () => {
  return (
    <div className='h-screen flex flex-col  overflow-hidden ' >
        {/* <Header /> */}
        <Sidebar />
    </div>
  )
}

export default app
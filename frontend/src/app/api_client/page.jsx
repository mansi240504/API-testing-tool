'use client'
import React from 'react'

export const api_client = () => {
  return (
    //Main content
    <div className='container h-screen bg-gray-900'>
         
        <div className=''>
            <main>
                <div className='flex  '>
                    <select className='bg-gray-800 text-white border '>
                        <option value="">Get</option>
                        <option value="">Post</option>
                        <option value="">Delete</option>
                        <option value="">Put</option>
                    </select>
                    <input type="text" 
                    placeholder='Enter API Url'
                    className='bg-gray-800 text-white border'/>
                    <button className='bg-green-700 text-white p-2'>
                        Send</button>

                </div>
                {/* Tabs  */}
                <div className=''>
                    <div className=' flex space-x-5'>
                        <div>Query</div>
                        <div>Header</div>
                        <div>Body</div>
                    </div>
                </div>
                

            </main>

        </div>

    </div>
  )
}
export default api_client;

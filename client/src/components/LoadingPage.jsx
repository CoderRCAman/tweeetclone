import {DotLoader} from 'react-spinners'

import React from 'react'

export default function LoadingPage() {
  return (
    <div className='flex h-screen  justify-center items-center bg-sky-600'>
        <DotLoader color='#ffffff' />
    </div>
  )
}

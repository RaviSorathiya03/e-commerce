import React from 'react'

async function page({searchParams}:{
    searchParams: {
        query: string
    }
}) {

    const {query} = await searchParams;
  return (
    <div>
      
    </div>
  )
}

export default page

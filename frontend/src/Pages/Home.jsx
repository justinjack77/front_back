import React from 'react'

function Home() {
  return (
    <div>
      <div>
      <code>{JSON.stringify(import.meta.env.VITE_API_URL)}</code>
      </div>
      Home Page
    </div>
  )
}

export default Home

// 'use client'
import React, { useState, useEffect } from 'react'
import IncrementalButton from './IncDecButton'


import Image from 'next/image'

const SecondStepSection = () => {


  const spaces = [
    {
      name: 'Master Bedroom',
      desc: 'Largest bedroom in a home, offering ample space and privacy',
      img: '/images/bedroom-icon.jpg',
    },
    {
      name: 'Bedroom',
      desc: 'Additional room typically used for guests or family members',
      img: '/images/bedroom-icon.jpg',
    },
    {
      name: 'Living and Dining',
      desc: 'Versatile space for relaxation and dining',
      img: '/images/living_dining.jpg',
    },
    {
      name: 'Kitchen',
      desc: 'Space for cooking, meal preparation',
      img: '/images/kitchen.jpg',
    },
    {
      name: 'Bathroom',
      desc: 'Space dedicated to personal hygiene',
      img: '/images/bathroom.jpg',
    },
    {
      name: 'Mandir Room',
      desc: 'Sacred and serene space dedicated to religious worship',
      img: '/images/mandir.jpg',
    },
    {
      name: 'Study Room',
      desc: 'Space for focused learning, reading, and work',
      img: '/images/study.jpg',
    },
    {
      name: 'Living Room',
      desc: 'Social hub of a home',
      img: '/images/living.jpg',
    },
    {
      name: 'Dining Area',
      desc: 'Designated space for enjoying meals together',
      img: '/images/dining.jpg',
    },
    {
      name: 'Entrance Lobby',
      desc: 'Welcoming gateway to your home',
      img: '/images/entranceLobby.jpg',
    },
    {
      name: 'Balcony',
      desc: 'Open air retreat within your home',
      img: '/images/balcony.jpg',
    },
    {
      name: 'Passage',
      desc: 'Corridor that connects various rooms',
      img: '/images/passage.jpg',
    },
    {
      name: 'Servant Room',
      desc: 'Compact space for domestic staff',
      img: '/images/store.jpg',
    },

    {
      name: 'Store Room',
      desc: 'Organized space designed for storage',
      img: '/images/store.jpg',
    },
  ]

  const [spaceCounts, setSpaceCounts] = useState({
    'Master Bedroom': 1,
    Bedroom: 1,
    Kitchen: 1,
    Bathroom: 1,
    'Living and Dining': 1,
  })
  useEffect(() => {
    localStorage.setItem('spaceCounts', JSON.stringify(spaceCounts))
    console.log(spaceCounts)
  }, [spaceCounts])
  // Function to handle incrementing the count for a space
  const handleIncrement = (spaceName) => {
    setSpaceCounts((prevCounts) => ({
      ...prevCounts,
      [spaceName]: (prevCounts[spaceName] || 0) + 1,
    }))
  }

  // Function to handle decrementing the count for a space
  const handleDecrement = (spaceName) => {
    setSpaceCounts((prevCounts) => ({
      ...prevCounts,
      [spaceName]: Math.max((prevCounts[spaceName] || 0) - 1, 0),
    }))
  }

  const renderedSpaces = spaces.map((space) => {
    const defaultCount = spaceCounts[space.name] || 0

    if (defaultCount > 0) {
      return (
        <div
          key={space.name}
          className="flex items-center justify-between h-20 mb-4 bg-white rounded-lg p-2 mx-4"
        >
          <div className="flex items-center">
            <Image
              width={1000}
              height={1000}
              src={space.img}
              alt={space.name}
              className="h-12 w-16 mr-4"
            />
            <div>
              <h3 className="text-sm font-bold">{space.name}</h3>
              <p className="text-xxs sm:text-xs text-gray-600">{space.desc}</p>
            </div>
          </div>
          <IncrementalButton
            count={defaultCount}
            onIncrement={() => handleIncrement(space.name)}
            onDecrement={() => handleDecrement(space.name)}
          />
        </div>
      )
    }

    return null // If the default count is 0, don't render the space
  })

  // Unrendered Spaces
  const unrenderedSpaces = spaces
    .filter((space) => !(spaceCounts[space.name] || 0))
    .map((space) => (
      <button
        key={space.name}
        onClick={() => handleIncrement(space.name)}
        className="bg-blue-500 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-700 m-2"
      >
        {space.name}
      </button>
    ))

  // Submit Function

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 mx-4">Add or Remove Spaces</h2>

      {renderedSpaces}

      <h2 className="text-xl font-bold mt-8 mx-4">Add more spaces</h2>
      {unrenderedSpaces}
    </div>
  )
}

export default SecondStepSection

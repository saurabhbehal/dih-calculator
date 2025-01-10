'use client'
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Pencil } from 'lucide-react'
import Link from 'next/link'

// import { updateSpaceData } from '@/components/redux/actions/secondStepActions'
import { updateSpaceData } from '../../components/redux/actions/secondStepActions'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const ThirdStep = (props) => {
  // const spaceCounts = useSelector((state) => state.space)
  const [area, setArea] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [layoutModalOpen, setLayoutModalOpen] = useState(false)
  const [editSpaceName, setEditSpaceName] = useState('')
  const [layoutSpaceName, setLayoutSpaceName] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [spaceData, setSpaceData] = useState([])
  const [spaceDataFromLs, setSpaceDataFromLs] = useState([])
  const [initialSpaceData, setInitialSpaceData] = useState([])
  const [totalRoomPrice, setTotalRoomPrice] = useState(0)
  const [spaceCounts, setSpaceCounts] = useState({})
  // fetching space count from ls
  useEffect(() => {
    let count = JSON.parse(localStorage.getItem('spaceCounts'))
    setSpaceCounts(count)
    // console.log(spaceCounts)
  }, [])

  // Fetch spaceData and firstStepData from localStorage on component mount for price
  useEffect(() => {
    const localStorageSpaceData = localStorage.getItem('newSpaceData')

    if (localStorageSpaceData) {
      const parsedSpaceData = JSON.parse(localStorageSpaceData)
      setSpaceDataFromLs(parsedSpaceData)
      const total = parsedSpaceData.reduce(
        (acc, room) => acc + (room.roomPrice || 0),
        0
      )
      setTotalRoomPrice(total)
    }
  }, [])
  // -----------------------------------------------------------------------------

  useEffect(() => {
    const initialData = Object.entries(spaceCounts).flatMap(
      ([spaceName, count]) => {
        if (count > 0) {
          return Array.from({ length: count }, (_, index) => ({
            name: `${spaceName} ${index + 1}`,
            area: 192, // Set initial area as 192, you can adjust this as needed
          }))
        } else {
          return []
        }
      }
    )
    setSpaceData(initialData)
  }, [spaceCounts])

  useEffect(() => {
    const localStorageSpaceData = localStorage.getItem('newSpaceData')

    if (
      localStorageSpaceData &&
      localStorageSpaceData !== 'undefined' &&
      localStorageSpaceData !== 'null'
    ) {
      // If spaceData exists in localStorage, set spaceData from localStorage
      console.log('it ran this')
      console.log(
        'Setting spaceData from localStorage:',
        JSON.parse(localStorageSpaceData)
      )
      setSpaceDataFromLs(JSON.parse(localStorageSpaceData))
    }
  }, [])

  useEffect(() => {
    if (
      spaceDataFromLs &&
      spaceDataFromLs !== 'undefined' &&
      spaceDataFromLs !== 'null'
    ) {
      console.log('spaceDataFromLs', spaceDataFromLs)
      setSpaceData(spaceDataFromLs)
    }
  }, [spaceDataFromLs])

  useEffect(() => {
    localStorage.setItem('spaceData', JSON.stringify(spaceData))
    // console.log('spaceData', spaceData)
  }, [spaceData])

  // --------------------------------------------------------

  const handleEditArea = (spaceName) => {
    setEditSpaceName(spaceName)
    setEditModalOpen(true)
  }

  const handleSave = () => {
    console.log(editSpaceName, length, width, area)
    if (length && width) {
      // Calculate the area
      const calculatedArea = length * width
      // Update the area directly in spaceData if the space name matches the editSpaceName
      setSpaceData((prevSpaceData) =>
        prevSpaceData.map((space) =>
          space.name === editSpaceName
            ? { ...space, area: calculatedArea }
            : space
        )
      )
      setLength('')
      setWidth('')
    } else if (area) {
      // Update the area directly in spaceData using the provided value
      const intArea = parseInt(area, 10)
      // Update the area directly in spaceData using the provided value
      setSpaceData((prevSpaceData) =>
        prevSpaceData.map((space) =>
          space.name === editSpaceName ? { ...space, area: intArea } : space
        )
      )
      setArea('')
    }
    console.log(spaceData)
    // Close the modal
    setEditModalOpen(false)
  }

  // useEffect(() => {
  //   console.log('Redux Areas:', spaceCounts)
  // }, [spaceCounts])

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent overlay
    },
  }

  // Add a media query to adjust maxWidth for smaller screens
  const smallerScreensMediaQuery = '@media (max-width: 768px)'

  customStyles.content = {
    ...customStyles.content,
    [smallerScreensMediaQuery]: {
      maxWidth: '100%',
    },
  }

  // Add this line to use the useRouter hook

  // ... other code

  const handlePlanClick = (spaceName) => {
    // Encode the space name to make it URL-friendly
    const encodedSpaceName = encodeURIComponent(spaceName)

    // Pass the selected space to the parent component
    props.onPlanClick(spaceName)

    // Construct the URL with the encoded space name
    // router.push(`/calculator/image-maps/${encodedSpaceName}`)
  }
  // for layouts ------------------------------------------------------------
  const router = useRouter()
  const handleKitchenLayout = (spaceName) => {
    setLayoutSpaceName(spaceName)
    setLayoutModalOpen(true)
  }
  const handleLayoutButtonClick = (layout) => {
    const updatedSpaceName = spaceData.find(
      (space) => space.name === layoutSpaceName
    )?.name
    const newSpaceName = `${updatedSpaceName.replace(
      /\s*\(.*?\)\s*/,
      ''
    )} (${layout})`

    setSpaceData((prevSpaceData) =>
      prevSpaceData.map((space) =>
        space.name === layoutSpaceName
          ? { ...space, name: newSpaceName }
          : space
      )
    )

    setLayoutModalOpen(false)
    console.log('newSpaceName', newSpaceName)
    router.push(`calculator/image-maps/${encodeURIComponent(newSpaceName)}`)
  }

  // ------------------------------------------------------------------------

  return (
    <div>
      <div className="p-4 m-4 bg-blue-500 flex justify-between rounded-lg shadow-lg text-white">
        <div>
          <p className="text-xs">Total budget</p>
          <h3>₹{totalRoomPrice}</h3>
          <p className="text-xxs">
            *All prices are inclusive of material and labour charges
          </p>
        </div>
      </div>
      <h2 className="text-xl font-bold mx-4">Plan your spaces</h2>
      <p className="text-xs mb-4 mx-4 text-gray-700">
        Customise each space as per your choice
      </p>
      {spaceData.map((space, index) => {
        const hasSelectedPolygon = spaceDataFromLs.some(
          (item) =>
            item.name === space.name &&
            item.selectedPolygonArea &&
            item.selectedPolygonArea.length > 0
        )
        const roomPrice = spaceDataFromLs.find(
          (item) => item.name === space.name && item.roomPrice
        )
        {
          /* console.log(space) */
        }
        return (
          <div key={`${space.name}-${index + 1}`} className="mx-4 mb-4">
            <div
              className={`flex items-center justify-between h-20 bg-white rounded-lg p-2`}
            >
              <div className="flex items-center">
                {/* Adjust the image source based on your requirements */}
                <Image
                  width={1000}
                  height={1000}
                  src="/images/bed-square.svg"
                  alt={space.name}
                  className="h-12 w-8 mr-4"
                />
                <div>
                  <h3 className="text-sm font-bold">{space.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xxs sm:text-xs text-gray-600">
                      {space.area}
                    </p>
                    <div>
                      <button
                        onClick={() => handleEditArea(space.name)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Pencil size={10} color="#4b5563" strokeWidth={2} />
                      </button>
                    </div>
                    <div className="ml-4 sm:hidden flex justify-center items-center">
                      <p className="text-xxs sm:text-xs text-gray-600 text-center">
                        {roomPrice ? `Room Price: ₹${roomPrice.roomPrice}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* plan */}
              <div className="m-4 flex">
                {roomPrice ? (
                  <div className="mx-0 sm:mx-8 hidden sm:flex justify-center items-center">
                    <p className=" text-sm text-gray-700 text-center">
                      Room Price:{' '}
                      <span className="font-semibold">
                        {' '}
                        {` ₹${roomPrice.roomPrice}`}
                      </span>
                    </p>
                  </div>
                ) : (
                  ''
                )}
                {
                  <button
                    className={`text-xxs border-gray-300 border-2 rounded py-1 px-2 hover:bg-green-500 hover:text-white ${
                      hasSelectedPolygon ? 'bg-blue-500 text-white' : ''
                    }`}
                    onClick={() => handlePlanClick(space.name)}
                  >
                    {space.name.includes('Kitchen') ? (
                      <button onClick={() => handleKitchenLayout(space.name)}>
                        PLAN
                      </button>
                    ) : (
                      /* Render link for other spaces */
                      <Link
                        href={`/calculator/image-maps/${encodeURIComponent(
                          space.name
                        )}`}
                      >
                        PLAN
                      </Link>
                    )}
                  </button>
                }
              </div>
            </div>
          </div>
        )
      })}

      {/* Modal for editing spaceName */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Edit SpaceName Modal"
        style={customStyles}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{editSpaceName}</h2>
          <button
            onClick={() => setEditModalOpen(false)}
            className="text-gray-500 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Add your form inputs for editing the spaceName */}
        <div>
          <label htmlFor="lengthInput" className="text-gray-600">
            Length:
          </label>
          <input
            type="text"
            id="lengthInput"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Enter length..."
            className="border-2 border-blue-500 rounded-md p-2 w-full mb-4"
          />
        </div>
        <div>
          <label htmlFor="widthInput" className="text-gray-600">
            Width:
          </label>
          <input
            type="text"
            id="widthInput"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Enter width..."
            className="border-2 border-blue-500 rounded-md p-2 w-full mb-4"
          />
        </div>
        <div>
          <h3 className="text-center">OR</h3>
        </div>
        <div>
          <label htmlFor="areaInput" className="text-gray-600">
            Area:
          </label>
          <input
            type="text"
            id="areaInput"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area..."
            className="border-2 border-blue-500 rounded-md p-2 w-full mb-4"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </Modal>
      {/* <div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-4"
        >
          Submit
        </button>
      </div> */}
      <Modal
        isOpen={layoutModalOpen}
        onRequestClose={() => setLayoutModalOpen(false)}
        contentLabel="Edit SpaceName Modal"
        style={customStyles}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{editSpaceName}</h2>
          <button
            onClick={() => setLayoutModalOpen(false)}
            className="text-gray-500 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="flex mt-4">
            <button
              onClick={() => handleLayoutButtonClick('Straight')}
              className="text-gray-500 hover:text-gray-900 mr-4"
            >
              <Image
                src={'/images/calculator/straightkitchenicon.png'}
                height={200}
                width={200}
                alt="Straight"
              ></Image>
            </button>
            <button
              onClick={() => handleLayoutButtonClick('L Shaped')}
              className="text-gray-500 hover:text-gray-900"
            >
              <Image
                src={'/images/calculator/LShapeKitchenicon.png'}
                height={200}
                width={200}
                alt="L Shaped"
              ></Image>
            </button>
          </div>
          <div className="flex mt-4">
            <button
              onClick={() => handleLayoutButtonClick('U Shaped')}
              className="text-gray-500 hover:text-gray-900 mr-4"
            >
              <Image
                src={'/images/calculator/ushapekitchenicon.png'}
                height={200}
                width={200}
                alt="U Shaped"
              ></Image>
            </button>
            <button
              onClick={() => handleLayoutButtonClick('Parallel')}
              className="text-gray-500 hover:text-gray-900"
            >
              <Image
                src={'/images/calculator/parallelkitchenicon.png'}
                height={200}
                width={200}
                alt="Parallel"
              ></Image>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ThirdStep

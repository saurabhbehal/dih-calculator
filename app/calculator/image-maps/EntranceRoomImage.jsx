'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSpaceData } from '../../../components/redux/actions/secondStepActions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const SvgMap = ({ data, name }) => {
  const router = useRouter()
  const pricing = {
    premium: {
      ShoeRack: { price: 4500 },
      Walls: { pricePerSqFt: 20 },
      Door: { price: 19000 },
      falseCeiling: { pricePerSqFt: 175 },
      Electrical: { price: 1900 },
      Console: { price: 19000 },
      Flooring: { pricePerSqFt: 170 },
    },
    luxury: {
      ShoeRack: { price: 9500 },
      Walls: { pricePerSqFt: 60 },
      Door: { price: 24000 },
      falseCeiling: { pricePerSqFt: 200 },
      Electrical: { price: 3400 },
      Console: { price: 29000 },
      Flooring: { pricePerSqFt: 220 },
    },
    ultraLuxury: {
      ShoeRack: { price: 19000 },
      Walls: { pricePerSqFt: 85 },
      Door: { price: 35000 },
      falseCeiling: { pricePerSqFt: 240 },
      Electrical: { price: 4500 },
      Console: { price: 45000 },
      Flooring: { pricePerSqFt: 450 },
    },
  }

  const descriptions = {
    premium: {
      Walls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
      falseCeiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.15,000/-',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
      Door: 'Flush door with hardware, both side laminate finish and Chaukhat repairing & polishing Door 35mm hardwood (price range Rs.80 to Rs. 125/-) | Hardware (Stylus or equivalent) | Locks (Upto Rs.1,800/-)',
      ShoeRack:
        'Standard HDHMR shoe rack including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
    },
    luxury: {
      Walls:
        'Premium Emulsion with 2 primer coats, putty repairing and one highlight wall Paint (Asian Paints or similar)',
      falseCeiling:
        'POP ceiling with heavy duty channel POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.25,000/-',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      Door: 'Flush door with hardware, both side veneer with polish, and Chaukhat repairing & polishing Door 35mm hardwood (upto Rs. 125/-) | Hardware (Hettich or Hafele or similar) | Locks (Upto Rs.2,500/-)',
      ShoeRack:
        'Standard shoe rack including hardware, laminates on carcass and shutters',
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
    },
    ultraLuxury: {
      Walls:
        'Premium paint with POP finish and one rustic / textured wall POP 3-5 mm (Sakarni) | Paint (Asian Paint Royale or similar)',
      falseCeiling:
        'POP Ceiling with cove, heavy duty channel & wooden design element POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.40,000/-',
      Flooring:
        'Italian store flooring with installation and Diamond polish Italian stone (Price range upto Rs. 350/-)',
      Door: 'Flush door with hardware, both side veneer with polish / HDHMR with PU, and new marandi Chaukhat with mouldings Door 35mm Bhutan Tuff (upto Rs. 165/-) | Hardware (Hettich or Hafele or similar) | Locks (Upto Rs.3,500/-)',
      ShoeRack:
        'Standard shoe rack including hardware, laminates on carcass and shutters',
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
    },
    // Add descriptions for other packages...
  }
  const initialSquareFootage = {
    falseCeiling: 40,
    Flooring: 40,
    ShoeRack: 1,
    Walls: 98,
    Console: 1,
  }
  console.log('data: ', data)
  console.log('name: ', name)
  const [selectedPolygon, setSelectedPolygon] = useState([])
    const [selectedPolygonArea, setSelectedPolygonArea] = useState([])
  const [selectedPackage, setSelectedPackage] = useState('premium') // Default to premium
  const [spaceSquareFootage, setSpaceSquareFootage] = useState({}) // New state for square footage

  const [updatedData, setUpdatedData] = useState(data)
  const [roomPrice, setRoomPrice] = useState(0)
  // let roomPrice = 0

  useEffect(() => {
    const localStorageSpaceData = localStorage.getItem('spaceData')
    if (localStorageSpaceData) {
      const parsedSpaceData = JSON.parse(localStorageSpaceData)
      console.log('parsedSpaceData', parsedSpaceData)
      setUpdatedData(parsedSpaceData)
    }
  }, [])

  const updateData = () => {
    console.log('updatedData', updatedData)
    setUpdatedData((prevData) => {
      // console.log('prevData', prevData)

      return prevData.map((item) =>
        item.name === name
          ? { ...item, selectedPolygon, selectedPackage, roomPrice }
          : item
      )
    })
  }
  useEffect(() => {
    updateData()
  }, [selectedPolygon, selectedPackage, roomPrice])
  useEffect(() => {
    console.log('updatedData', updatedData)
    // localStorage.setItem('spaceData', JSON.stringify(updatedData))
  }, [updatedData])

  // ----------------------------------------------------------------------------------

  const [editableSquareFootage, setEditableSquareFootage] =
    useState(initialSquareFootage)



  const calculateSpacePrice = (polygonId, selectedPackage) => {
    const component = pricing[selectedPackage]?.[polygonId]
    if (!component) return 0 // Return 0 if the component doesn't exist

    // Check if the component has price per square foot
    if ('pricePerSqFt' in component) {
      const pricePerSqFt = component.pricePerSqFt || 0
      const squareFootage = editableSquareFootage[polygonId] || 0
      return (pricePerSqFt * squareFootage).toFixed(2)
    } else {
      // If not, return the fixed price directly
      return component.price.toFixed(2)
    }
  }

    const handlePolygonClick = (polygonId) => {
      const isSelected = selectedPolygon.includes(polygonId)

      // Check if the polygon is already selected
      if (isSelected) {
        // Polygon is already selected, remove it from the selected polygons
        setSelectedPolygon((prevSelected) =>
          prevSelected.filter((id) => id !== polygonId)
        )

        // Remove the polygon's area from selectedPolygonArea
        setSelectedPolygonArea((prevSelectedArea) =>
          prevSelectedArea.filter((item) => Object.keys(item)[0] !== polygonId)
        )

        // Subtract the price of the deselected polygon from the room price
        const priceOfDeselectedPolygon = calculateSpacePrice(
          polygonId,
          selectedPackage
        )
        setRoomPrice(
          (prevRoomPrice) =>
            prevRoomPrice - parseFloat(priceOfDeselectedPolygon)
        )
      } else {
        // Polygon is not selected, add it to the selected polygons
        setSelectedPolygon((prevSelected) => [...prevSelected, polygonId])

        // Add the polygon's area to selectedPolygonArea
        setSelectedPolygonArea((prevSelectedArea) => [
          ...prevSelectedArea,
          { [polygonId]: initialSquareFootage[polygonId] || '' },
        ])

        // Add the price of the selected polygon to the room price
        const priceOfSelectedPolygon = calculateSpacePrice(
          polygonId,
          selectedPackage
        )
        setRoomPrice(
          (prevRoomPrice) => prevRoomPrice + parseFloat(priceOfSelectedPolygon)
        )
      }

      // Update the data
      updateData()
    }

    const handleEditSquareFootage = (polygonId) => {
      const newSquareFootage = prompt(
        `Enter new square footage for ${polygonId}:`,
        editableSquareFootage[polygonId]
      )

      if (!isNaN(newSquareFootage) && newSquareFootage !== null) {
        const updatedSquareFootage = {
          ...editableSquareFootage,
          [polygonId]: parseFloat(newSquareFootage),
        }
        setEditableSquareFootage(updatedSquareFootage)

        // Update selectedPolygonArea with edited area
        setSelectedPolygonArea((prevSelectedArea) =>
          prevSelectedArea.map((item) =>
            Object.keys(item)[0] === polygonId
              ? { [polygonId]: parseFloat(newSquareFootage) }
              : item
          )
        )

        // Recalculate room price
        const priceOfSelectedPolygon = calculateSpacePrice(
          polygonId,
          selectedPackage
        )
        const updatedRoomPrice =
          parseFloat(roomPrice) - parseFloat(priceOfSelectedPolygon) // subtract old price
        setRoomPrice(
          updatedRoomPrice +
            parseFloat(newSquareFootage) *
              parseFloat(pricing[selectedPackage][polygonId].pricePerSqFt)
        ) // add new price
        updateData() // Update the data after room price is updated
      }
    }

    const handleSave = () => {
      // Retrieve existing spaceData from localStorage
      const localStorageSpaceData = localStorage.getItem('spaceData')

      // Check if there is existing spaceData in localStorage
      if (localStorageSpaceData) {
        // Parse the existing spaceData
        const parsedSpaceData = JSON.parse(localStorageSpaceData)

        // Find the index of the item with the same name as the current page
        const index = parsedSpaceData.findIndex((item) => item.name === name)

        // If an item with the same name exists, update its data
        if (index !== -1) {
          parsedSpaceData[index] = {
            ...parsedSpaceData[index],
            selectedPolygonArea,
            selectedPackage,
            roomPrice,
          }

          // Update the localStorage with the updated spaceData
          localStorage.setItem('newSpaceData', JSON.stringify(parsedSpaceData))
          // localStorage.setItem('areaDetails', JSON.stringify(selectedPolygonArea))
          alert('Space data updated successfully!')
        } else {
          // If no item with the same name exists, show an alert
          alert(`No data found for ${name} in localStorage`)
        }
      } else {
        // If no spaceData exists in localStorage, set it with the current data
        localStorage.setItem('newSpaceData', JSON.stringify(spaceData))
        alert('Space data saved successfully!')
      }
      router.push('/calculator?step=2')
    }


  const handleSquareFootageChange = (polygonId, value) => {
    setSpaceSquareFootage((prevSquareFootage) => ({
      ...prevSquareFootage,
      [polygonId]: parseFloat(value) || 0,
    }))
    updateData()
  }

  const handleTabChange = (selectedTab) => {
    setSelectedPackage(selectedTab)

    // Recalculate room price based on the newly selected package
    let newRoomPrice = 0
    selectedPolygon.forEach((polygon) => {
      newRoomPrice += parseFloat(calculateSpacePrice(polygon, selectedTab))
    })

    setRoomPrice(newRoomPrice)

    // Update the data
    updateData()
  }
  const renderTab = (tabName) => {
    const isActive = selectedPackage === tabName

    return (
      <button
        key={tabName}
        onClick={() => handleTabChange(tabName)}
        className={`border px-4 py-3 text-base focus:outline-none rounded-lg ${
          isActive ? 'bg-green-500 text-white' : 'bg-white text-black'
        } ${
          isActive
            ? 'hover:bg-green-600 hover:text-white'
            : 'hover:bg-gray-200 hover:text-black'
        }`}
      >
        {tabName}
      </button>
    )
  }





  return (
    <>
      {/* <div className="bg-white p-4 flex items-center w-full rounded-t-lg shadow-lg">
        <button className="inline-flex items-center mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h3 className="inline text-lg">{name}</h3>
      </div> */}
      <div className="p-4 m-4 bg-blue-500 flex justify-between rounded-lg shadow-lg text-white">
        <div>
          <p className="text-xs">Room budget</p>
          <h3>₹{roomPrice}</h3>
          <p className="text-xxs">
            *All prices are inclusive of material and labour charges
          </p>
        </div>
        {/* <div className="text-right">
          <p className="text-xs">Total budget</p>
          <h3>₹44,765</h3>
          <p className="text-xxs">
            *All prices are inclusive of material and labour charges
          </p>
        </div> */}
      </div>
      <div className="m-4">
        <p>
          First select your Package then Tap the desired components and add to
          your project&apos;s scope
        </p>
      </div>
      <div>
        <div className="flex justify-center sm:text-3xl text-xl font-bold mt-8">
          <h2>Select Your Packages</h2>
        </div>
        <div className="flex sm:flex-row flex-col sm:gap-12 gap-4 justify-center my-4 mb-8  bg-white px-8 py-4">
          {renderTab('premium')}
          {renderTab('luxury')}
          {renderTab('ultraLuxury')}
        </div>

        <div className="flex justify-center sm:text-3xl text-xl font-bold my-4">
          <h2>Select Your Components</h2>
        </div>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 3022 2192"
          style={{
            backgroundImage: 'url("/images/calculator/entranceLobby.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling*/}
          <polygon
            points="119,99,1064,692,2076,686,3013,123,3013,3,7,-3"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1538.6666666666667"
            y="223.66666666666669"
            width="339.62062072753906"
            height="60"
            fill="#282828"
            rx="30"
            opacity="0.3"
            ry="30"
            class="dynamic-rectangle cursor-pointer"
          ></rect>

          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1603.6666666666667"
            y="266.6666666666667"
            fontSize={40}
            id="falseCeiling"
            onClick={() => handlePolygonClick('falseCeiling')}
            className="cursor-pointer"
            style={{ color: 'black' }}
          >
            False Ceiling
          </text>

          {/* ------Electrical----------------- */}

          <polygon
            points="1777,1007,2001,1001,2001,1087,1774,1097"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1878.25"
            y="1005"
            width="272.3708801269531"
            height="60"
            fill="#282828"
            rx="30"
            opacity="0.3"
            ry="30"
            class="dynamic-rectangle cursor-pointer"
          ></rect>
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1943.25"
            y="1048"
            fontSize={40}
            className="cursor-pointer"
            id="Electrical"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ color: 'black' }}
          >
            Electrical
          </text>
          {/* ---Flooring---------- */}
          <polygon
            points="986,1517,1075,1442,2089,1447,2254,1565,2249,1677,2706,2069,2983,2075,2983,2179,517,2147,992,1695"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1873.4"
            y="1738.3"
            width="252.87432861328125"
            height="60"
            fill="#282828"
            rx="30"
            opacity="0.3"
            ry="30"
            class="dynamic-rectangle cursor-pointer"
          ></rect>
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1938.4"
            y="1781.3"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>

          {/* -------------- Door ----------- */}
          <polygon
            points="1352,804,1737,804,1737,1444,1363,1442"
            fill={selectedPolygon.includes('Door') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Door')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1537.25"
            y="1080.5"
            width="191.39341735839844"
            height="60"
            fill="#282828"
            rx="30"
            opacity="0.3"
            ry="30"
            class="dynamic-rectangle cursor-pointer"
          ></rect>
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1602.25"
            y="1123.5"
            fontSize={40}
            id="Door"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Door')}
            style={{ color: 'black' }}
          >
            Door
          </text>
          {/* -------------- Walls ----------- */}

          <polygon
            points="1,2187,199,2139,84,894,976,926,992,1506,1075,1442,1363,1442,1355,804,1739,798,1742,1450,2089,1450,2081,1087,2001,1087,1777,1100,1779,1004,2004,999,2001,1087,2081,1087,2089,1450,2254,1562,2257,1001,2724,958,3021,964,3021,123,2070,692,1056,686,-1,40"
            fill={selectedPolygon.includes('Walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Walls')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1613.3333333333333"
            y="1066.8148148148148"
            width="177.4520492553711"
            height="60"
            fill="#282828"
            rx="30"
            opacity="0.3"
            ry="30"
            class="dynamic-rectangle cursor-pointer"
          ></rect>
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1678.3333333333333"
            y="1109.8148148148148"
            fontSize={40}
            id="Walls"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Walls')}
            style={{ color: 'black' }}
          >
            Walls
          </text>
          {/* -------------- Console ----------- */}
          <polygon
            points="84,886,976,926,989,1706,514,2147,436,2141,196,2139"
            fill={selectedPolygon.includes('Console') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Console')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="522.5"
            y="1614.5"
            width="253.942626953125"
            height="60"
            fill="#282828"
            rx="30"
            opacity="0.3"
            ry="30"
            class="dynamic-rectangle cursor-pointer"
          ></rect>
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="587.5"
            y="1657.5"
            fontSize={40}
            id="Console"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Console')}
            style={{ color: 'black' }}
          >
            Console
          </text>
          {/* -------------- Shoe Rack ----------- */}
          <polygon
            points="2260,1004,2722,958,3002,961,2978,2075,2708,2077,2249,1682"
            fill={
              selectedPolygon.includes('ShoeRack') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('ShoeRack')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="2643.1666666666665"
            y="1416.5"
            width="299.7728729248047"
            height="60"
            fill="#282828"
            rx="30"
            opacity="0.3"
            ry="30"
            class="dynamic-rectangle cursor-pointer"
          ></rect>
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="2708.1666666666665"
            y="1459.5"
            fontSize={40}
            id="ShoeRack"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('ShoeRack')}
            style={{ color: 'black' }}
          >
            Shoe Rack
          </text>

          {/* -------------------------------------- */}
        </svg>

        <div className="mt-8">
          {selectedPolygon.map((polygon) => (
            <div
              className="flow-root"
              key={polygon}
              style={{
                border: '1px solid #000',
                borderRadius: '5px',
                padding: '20px',
                marginBottom: '10px',
                marginLeft: '20px',
                marginRight: '20px',
                backgroundColor: 'white',
                marginTop: '10px',
              }}
            >
              <div className="float-left">
                <span>{polygon} </span>
                {editableSquareFootage[polygon] && (
                  <span style={{ fontSize: '12px' }}>
                    {' '}
                    - {editableSquareFootage[polygon]} sqft
                  </span>
                )}
                {polygon === 'Flooring' ||
                polygon === 'flooring' ||
                polygon === 'walls' ||
                polygon === 'Console' ||
                polygon == 'ShoeRack' ||
                polygon === 'falseCeiling' ||
                polygon === 'Walls' ? (
                  <span
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                    onClick={() => handleEditSquareFootage(polygon)}
                  >
                    ✏️ Edit
                  </span>
                ) : null}
                {selectedPackage && (
                  <div
                    style={{
                      fontSize: '14px',
                      marginTop: '5px',
                      width: '650px',
                    }}
                  >
                    {descriptions[selectedPackage]?.[polygon]}
                  </div>
                )}
              </div>
              <div></div>
              <div className="float-right">
                {pricing[selectedPackage]?.[polygon]?.pricePerSqFt ? (
                  <span style={{ color: 'green', fontSize: '20px' }}>
                    ₹{calculateSpacePrice(polygon, selectedPackage)}
                  </span>
                ) : (
                  <span style={{ color: 'green', fontSize: '20px' }}>
                    ₹{pricing[selectedPackage]?.[polygon]?.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* <div>
        Selected Polygon:{' '}
        {selectedPolygon.map((polygon) => `${polygon},`) || 'None'}
      </div> */}
      </div>
      <div className="m-4">
        <p className="text-blue-500 text-xs">Disclaimer:</p>
        <p className="text-xs">
          Indicative rates based on market averages. Actual costs vary based on
          professional choice, measurements, materials, and additional charges
          like taxes, design fees, appliances, and site expenses.
        </p>
      </div>
      <div className="bg-white flex justify-center py-4 sm:px-12 w-full rounded-b-lg shadow-lg">
        <button
          onClick={handleSave}
          className="text-lg shadow-md hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Save
        </button>
      </div>
    </>
  )
}

export default SvgMap

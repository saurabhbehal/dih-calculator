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
      Mandir: { price: 29500 },
      Walls: { pricePerSqFt: 22 },
      upvcWindow: { pricePerSqFt: 750 },
      FalseCeiling: { pricePerSqFt: 170 },
      Electrical: { price: 2000 },
      Flooring: { pricePerSqFt: 170 },
    },
    luxury: {
      Mandir: { price: 44500 },
      Walls: { pricePerSqFt: 30 },
      upvcWindow: { pricePerSqFt: 1080 },
      FalseCeiling: { pricePerSqFt: 200 },
      Electrical: { price: 3500 },
      Flooring: { pricePerSqFt: 200 },
    },
    ultraLuxury: {
      Mandir: { price: 74500 },
      Walls: { pricePerSqFt: 50 },
      upvcWindow: { pricePerSqFt: 1450 },
      FalseCeiling: { pricePerSqFt: 240 },
      Electrical: { price: 5000 },
      Flooring: { pricePerSqFt: 470 },
    },
  }
  const descriptions = {
    premium: {
      Mandir: '3 x 4 SqFt. Mandir MDF finished with Laminate',
      Walls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
      upvcWindow: 'Premium UPVC windows UPVC (Deceuninck or Veka or similar)',
      FalseCeiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
      Electrical:
        'Electrical work including point relocation excluding switches Wires (Havells or Polycab)',
    },
    luxury: {
      Mandir:
        '4 x 4 SqFt. Mandir finished With HDHMR/Veneer with PU Polish & Jali cutting on sides',
      Walls:
        'Premium Emulsion with 2 primer coats, putty repairing and one highlight wall Paint (Asian Paints or similar)',
      upvcWindow:
        'Premium UPVC windows with 74mm shutter frame and 8mm toughened glass, and single wool pile UPVC (Fenesta or similar)',
      FalseCeiling:
        'POP ceiling with heavy duty channel POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      Electrical:
        'Electrical work including point relocation excluding switches Wires (Havells or Polycab)',
    },
    ultraLuxury: {
      Mandir: '4 x 5 SqFt. Corian stone Mandir',
      Walls:
        'Premium paint with POP finish and one rustic / textured wall POP 3-5 mm (Sakarni) | Paint (Asian Paint Royale or similar)',
      upvcWindow:
        'Premium UPVC windows with 90mm shutter frame and 12.5mm toughened glass, key locking and single wool pile UPVC (Fenesta or similar)',
      FalseCeiling:
        'POP Ceiling with cove, heavy duty channel & wooden design element POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      Flooring:
        'Italian store flooring with installation and Diamond polish Italian stone (Price range upto Rs. 350/-)',
      Electrical:
        'Electrical work including point relocation excluding switches',
    },
    // Add descriptions for other packages...
  }

  const initialSquareFootage = {
    FalseCeiling: 36,
    electrical: 10,
    Flooring: 48,
    upvcWindow: 36,
    Walls: 88,
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
          viewBox="0 0 2616 1648"
          style={{
            backgroundImage: 'url("/images/calculator/mandir.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling*/}
          <polygon
            points="332,2,822,337,2016,335,2615,55,2613,0"
            fill={
              selectedPolygon.includes('FalseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('FalseCeiling')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1669.6"
            y="102.80000000000001"
            width="339.5174255371094"
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
            x="1734.6"
            y="145.8"
            fontSize={40}
            id="FalseCeiling"
            onClick={() => handlePolygonClick('FalseCeiling')}
            className="cursor-pointer"
            style={{ color: 'black' }}
          >
            False Ceiling
          </text>

          {/* ------Electrical----------------- */}

          <polygon
            points="2197,638,2421,613,2416,712,2190,723"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="2296"
            y="628.5"
            width="272.2860870361328"
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
            x="2361"
            y="671.5"
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
            points="817,1103,1106,1103,1108,1181,1700,1172,1700,1093,2042,1089,2613,1431,2615,1646,248,1648"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1539.888888888889"
            y="1231"
            width="252.7732696533203"
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
            x="1604.888888888889"
            y="1274"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* --------------Mandir---------- */}
          <polygon
            points="1402,435,1117,571,1108,1179,1700,1170,1686,571"
            fill={selectedPolygon.includes('Mandir') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Mandir')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1392.6"
            y="742.2"
            width="230.7173309326172"
            height="60"
            fill="#282828"
            rx="30"
            opacity="0.3"
            ry="30"
            class="dynamic-rectangle cursor-pointer"
          ></rect>
          <text
            fill="white"
            opacity="1"
            fontWeight={400}
            x="1457.6"
            y="785.2"
            fontSize={40}
            id="Mandir"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Mandir')}
            style={{ color: 'black' }}
          >
            Mandir
          </text>

          {/* -------------- UPVC Window ----------- */}
          <polygon
            points="144,273,657,465,683,968,205,1304"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="412.25"
            y="709.5"
            width="372.2545471191406"
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
            x="477.25"
            y="752.5"
            fontSize={40}
            id="upvcWindow"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ color: 'black' }}
          >
            UPVC Window
          </text>
          {/* -------------- Walls ----------- */}
          <polygon
            points="805,337,1385,335,1404,432,1117,573,812,573"
            fill={selectedPolygon.includes('Walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Walls')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="810,576,1120,576,1106,1100,817,1103"
            fill={selectedPolygon.includes('Walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Walls')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1385,340,1406,432,1690,569,1697,1093,2037,1084,2613,1424,2615,737,2418,710,2187,726,2192,640,2425,608,2418,710,2615,737,2615,62,2037,328,2016,335"
            fill={selectedPolygon.includes('Walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Walls')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="803,331,817,1100,246,1646,-3,1648,-3,1373,205,1304,685,966,662,460,142,268,205,1304,-3,1373,-1,-2,325,-2"
            fill={selectedPolygon.includes('Walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Walls')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1094.6"
            y="407"
            width="177.45012664794922"
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
            x="1159.6"
            y="450"
            fontSize={40}
            id="Walls"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Walls')}
            style={{ color: 'black' }}
          >
            Walls
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
                <span className="font-bold text-lg capitalize">{polygon} </span>
                {editableSquareFootage[polygon] && (
                  <span style={{ fontSize: '12px' }}>
                    {' '}
                    - {editableSquareFootage[polygon]} sqft
                  </span>
                )}
                {polygon === 'FalseCeiling' ||
                polygon === 'Flooring' ||
                polygon === 'Walls' ||
                polygon === 'crockeryUnit' ||
                polygon == 'upvcWindow' ||
                polygon === 'falseCeiling' ||
                polygon === 'diningTableSet' ? (
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

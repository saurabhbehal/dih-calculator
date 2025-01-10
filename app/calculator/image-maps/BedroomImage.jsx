'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSpaceData } from '../../../components/redux/actions/secondStepActions'
import { useRouter } from 'next/navigation'
const SvgMap = ({ data, name }) => {
  const router = useRouter()
  const pricing = {
    premium: {
      falseCeiling: { pricePerSqFt: 180 },
      walls: { pricePerSqFt: 53 },
      bed: { price: 47500 },
      wardrobe: { pricePerSqFt: 1380 },
      sofa: { price: 32850 },
      flooring: { pricePerSqFt: 175 },
      door: { price: 19500 },
      upvcWindow: { pricePerSqFt: 780 },
      tvpanel: { pricePerSqFt: 980 },
      studyTable: { price: 15000 },
      electrical: { price: 7500 },
      sideTables: { price: 7800 },
      armchair: { price: 14800 },
      // Add other elements as needed
    },
    luxury: {
      falseCeiling: { pricePerSqFt: 200 },
      walls: { pricePerSqFt: 60 },
      bed: { price: 64500 },
      wardrobe: { pricePerSqFt: 1650 },
      sofa: { price: 43000 },
      flooring: { pricePerSqFt: 210 },
      door: { price: 24500 },
      upvcWindow: { pricePerSqFt: 1050 },
      tvpanel: { pricePerSqFt: 1350 },
      studyTable: { price: 28000 },
      electrical: { price: 14000 },
      sideTables: { price: 11500 },
      armchair: { price: 19000 },
      // Add other elements as needed
    },
    ultraLuxury: {
      falseCeiling: { pricePerSqFt: 240 },
      walls: { pricePerSqFt: 85 },
      bed: { price: 94000 },
      wardrobe: { pricePerSqFt: 1850 },
      sofa: { price: 74000 },
      flooring: { pricePerSqFt: 490 },
      door: { price: 35500 },
      upvcWindow: { pricePerSqFt: 1450 },
      tvpanel: { pricePerSqFt: 1780 },
      studyTable: { price: 35000 },
      electrical: { price: 21000 },
      sideTables: { price: 19000 },
      armchair: { price: 28000 },
      // Add other elements as needed
    },
  }
  const descriptions = {
    premium: {
      falseCeiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
      bed: 'Standard plywood bed with box storage, laminate finish and fabric bed backPlywood (upto Rs. 55/-) | Laminate 0.8mm (Skydecor or similar) | Fabric (upto Rs. 400/-)',
      walls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      wardrobe:
        'Standard HDHMR wardrobe including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      upvcWindow: 'Premium UPVC windows UPVC (Deceuninck or Veka or similar)',
      sofa: '3 seat Marandi wood and Fabric sofa Foam (High Density - 35GSM) | Faric (upto Rs. 450 per mtr)',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
      door: 'Flush door with hardware, both side laminate finish and Chaukhat repairing & polishing Door 35mm hardwood (price range Rs.80 to Rs. 125/-) | Hardware (Stylus or equivalent) | Locks (Upto Rs.1,800/-)',
      armchair:
        'Teak and Marandi chair with upholstery and foam. Foam (Soft HR) | Fabric (Upto Rs. 450/- per mtr)',
      sideTables:
        'Side tables with laminate finish HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8mm Laminate (Skydecor or similar)',
      electrical:
        'Electrical work including point relocation excluding switches Wires (Havells or Polycab)',
      studyTable:
        'Study table with 2 floating sleek drawers and wall cabinets HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 1mm Laminate (Merino or similar)',
      // Add descriptions for other components...
    },
    luxury: {
      falseCeiling:
        'POP ceiling with heavy duty channel POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      bed: 'Standard plywood bed with box storage, veneer finish with polish and fabric bed back Plywood (upto Rs. 55/-) | Laminate 0.8mm (Merino or similar) | Fabric (upto Rs. 700/-)',
      walls:
        'Premium Emulsion with 2 primer coats, putty repairing and one highlight wall Paint (Asian Paints or similar)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass, Acrylic or plain membrane on shutters Carcass (Action Tess or similar) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar)',
      wardrobe:
        'Standard HDHMR wardrobe including hardware, laminates on carcass, Acrylic or plain membrane on shutters Carcass (Action Tess or similar) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar)',
      upvcWindow:
        'Premium UPVC windows with 74mm shutter frame and 8mm toughened glass, and single wool pile UPVC (Fenesta or similar',
      sofa: 'Marandi wood and Fabric sofa Foam (High Density - 40 GSM) | Faric (upto Rs. 650 per mtr)',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-',
      door: 'Flush door with hardware, both side veneer with polish, and Chaukhat repairing & polishing Door 35mm hardwood (upto Rs. 125/-) | Hardware (Hettich or Hafele or similar) | Locks (Upto Rs.2,500/-)',
      armchair:
        'Teak and Marandi chair with upholstery and foam. Foam (High Density) | Fabric (Upto Rs. 650/- per mtr)',
      sideTables:
        'Side tables with Veneer finish and melamine polish HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent)',
      electrical:
        'Electrical work with point relocation including switches & boards Wires (Havells or Polycab) | Switches (Anchor Penta or similar) | Lights (Orient or Similar)',
      studyTable:
        'Study table with 2 floating sleek drawers and wall cabinets HDHMR (Action Tesa or similar) | Hardware ( Hettich or similar) | 1mm Laminate (Merino or similar))',
    },
    ultraLuxury: {
      bed: 'Standard plywood bed with hydraulic box storage, veneer finish with polish or HDHMR with PU and fabric bed back. Plywood (upto Rs. 65/-) | Laminate 0.8mm (Merino or similar) | Fabric (upto Rs. 1000/-)',
      falseCeiling:
        'POP Ceiling with cove, heavy duty channel & wooden design element. POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      walls:
        'Premium paint with POP finish and one rustic / textured wall. POP 3-5 mm (Sakarni) | Paint (Asian Paint Royale or similar)',
      tvpanel:
        'Standard TV Panel including hardware, laminates on carcass, veneer / PU polish on shutters. Carcass (Action Tesa or Local plywood) | Hardware (Hettich or Hafele) | 0.8 mm Laminate (Skydecor or similar)',
      wardrobe:
        'Standard wardrobe including hardware, laminates on carcass, veneer / PU polish on shutters. Carcass (Action Tesa or Local plywood) | Hardware (Hettich or Hafele) | 0.8 mm Laminate (Skydecor or similar)',
      upvcWindow:
        'Premium UPVC windows with 90mm shutter frame and 12.5mm toughened glass, key locking and single wool pile. UPVC (Fenesta or similar)',
      sofa: 'Marandi wood and Fabric sofa. Foam (High Density - 40 GSM) | Faric (upto Rs. 750 per mtr)',
      flooring:
        'Italian store flooring with installation and Diamond polish. Italian stone (Price range upto Rs. 350/-)',
      door: 'Flush door with hardware, both side veneer with polish / HDHMR with PU, and new marandi Chaukhat with mouldings. Door 35mm Bhutan Tuff (upto Rs. 165/-) | Hardware (Hettich or Hafele or similar) | Locks (Upto Rs.3,500/-)',
      armchair:
        'Teak and Marandi chair with upholstery and foam. Foam (High Density, Soft) | Fabric (Upto Rs. 750/- per mtr)',
      sideTables:
        'Side tables with Veneer or HDHMR finish and PU polish. HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8mm Laminate (Skydecor or similar)',
      electrical:
        'Electrical work with new points, relocation including switches & boards. Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
      studyTable:
        'Study table with 2 floating sleek drawers and wall cabinets with glass shutters. Veneer with PU polish. HDHMR (Action Tesa or similar) | Hardware ( Hettich or similar)',
    },
  }
  const initialSquareFootage = {
    wardrobe: 54,
    flooring: 143,
    walls: 350,
    tvpanel: 42,
    upvcWindow: 64,
    falseCeiling: 143,

    // Add other spaces as needed
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
        (prevRoomPrice) => prevRoomPrice - parseFloat(priceOfDeselectedPolygon)
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
          viewBox="0 0 3206 2085"
          style={{
            backgroundImage: 'url("/images/calculator/bedroom.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling*/}
          <polygon
            points="800,-3,1182,439,2094,459,2420,201,2505,130,2661,-3"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1933.6666666666667"
            y="160.83333333333334"
            width="339.53492736816406"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />

          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1998.6666666666667"
            fontSize={40}
            id="falseCeiling"
            y="203.83333333333334"
            onClick={() => handlePolygonClick('falseCeiling')}
            className="cursor-pointer"
            style={{ color: 'black' }}
          >
            False Ceiling
          </text>

          {/* ------walls----------*/}

          <polygon
            points="-4,45,115,99,1120,660,1100,1017,936,1071,930,1167,358,1405,347,1725,222,1802,302,422,1,312"
            fill={selectedPolygon.includes('walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('walls')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="2117,671,3202,93,3202,1229,3165,1303,3165,1346,3162,1394,3156,1453,3154,1484,3151,1524,3148,1575,3086,1564,3103,1490,3108,1391,2910,1334,2904,1416,3100,1490,3086,1567,3032,1550,2964,1561,2924,1586,2882,1555,2876,1510,2924,1507,2893,1428,2876,1399,2870,1150,2307,1034,2290,1187,2270,1173,2236,1187,2219,1193,2185,1195,2160,1198,2145,1207,2123,1201,2097,1201"
            fill={selectedPolygon.includes('walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('walls')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="483.3636363636364"
            y="841.0909090909091"
            width="177.4159164428711"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="548.3636363636364"
            fontSize={40}
            y="884.0909090909091"
            className="cursor-pointer"
            id="walls"
            onClick={() => handlePolygonClick('walls')}
            style={{ color: 'black' }}
          >
            Wall
          </text>
          {/* ---electrical------- */}
          <polygon
            points="2907,1334,2899,1411,3097,1490,3103,1391,2987,1357"
            fill={
              selectedPolygon.includes('electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('electrical')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2988.6"
            y="1353.6"
            width="272.27191162109375"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="3053.6"
            fontSize={40}
            y="1396.6"
            className="cursor-pointer"
            id="electrical"
            onClick={() => handlePolygonClick('electrical')}
            style={{ color: 'black' }}
          >
            Electrical
          </text>
          {/* --------------flooring---------- */}
          <polygon
            points="347,1725,1,1952,1,2079,2876,2085,2757,2034,2754,2054,2717,2065,2672,2054,2695,2000,2689,1977,2698,1938,2576,1816,2570,1793,1647,1790,1641,1839,1624,1853,1562,1850,1565,1782,1542,1807,1539,1833,1525,1844,1494,1841,1497,1816,1290,1813,1290,1839,1253,1844,1262,1700,766,1683,681,1739,344,1745"
            fill={
              selectedPolygon.includes('flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('flooring')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1267,1697,1259,1640,1355,1368,1333,1360,1338,1255,1293,1255,1262,1252,1239,1252,1236,1374,1222,1374,1211,1360,1197,1337,1182,1365,755,1686"
            fill={
              selectedPolygon.includes('flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('flooring')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1652.5"
            y={1830}
            width="252.78488159179688"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1717.5"
            fontSize={40}
            id="flooring"
            y={1873}
            className="cursor-pointer"
            onClick={() => handlePolygonClick('flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* -------wardrobe-------- */}
          <polygon
            points="1514,666,2117,671,2092,1198,1599,1198,1596,1252,1485,1246"
            fill={
              selectedPolygon.includes('wardrobe') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('wardrobe')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1723.8333333333333"
            y="995.5"
            width="283.6529998779297"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1788.8333333333333"
            fontSize={40}
            id="wardrobe"
            y="1038.5"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('wardrobe')}
            style={{ color: 'black' }}
          >
            Wardrobe
          </text>
          {/* ------tv panel--------- */}
          <polygon
            points="361,1408,919,1176,1151,1173,1146,1388,684,1739,347,1742,355,1598"
            fill={selectedPolygon.includes('tvpanel') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('tvpanel')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x={699}
            y="1417.5714285714287"
            width="268.05519104003906"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x={764}
            fontSize={40}
            id="tvpanel"
            y="1460.5714285714287"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('tvpanel')}
            style={{ color: 'black' }}
          >
            TV Panel
          </text>
          {/* ----door------ */}
          <polygon
            points="-1,309,299,433,217,1810,163,1841,-4,1952"
            fill={selectedPolygon.includes('door') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('door')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="124.80000000000001"
            y={1226}
            width="191.3352279663086"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="189.8"
            fontSize={40}
            id="door"
            y={1269}
            className="cursor-pointer"
            onClick={() => handlePolygonClick('door')}
            style={{ color: 'black' }}
          >
            Door
          </text>
          {/* --------------UPVC window----------- */}
          <polygon
            points="1342,754,1481,754,1470,1119,1371,1122,1374,994,1357,989,1340,1000"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1380.7142857142858"
            y="918.7142857142857"
            width="372.2862548828125"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1445.7142857142858"
            fontSize={40}
            id="upvcWindow"
            y="961.7142857142857"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ color: 'black' }}
          >
            UPVC Window
          </text>
          {/* -------bed-------- */}
          <polygon
            points="1565,1844,1624,1847,1638,1839,1638,1793,2570,1796,2584,1527,2800,1518,2811,1501,2703,1499,2726,1450,2751,1402,2774,1374,2800,1354,2831,1357,2853,1371,2873,1394,2870,1326,2868,1246,2868,1181,2868,1153,2307,1034,2290,1193,2273,1176,2222,1195,2185,1193,2165,1201,2148,1210,2128,1201,2100,1201,1607,1195"
            fill={selectedPolygon.includes('bed') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('bed')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2404.6666666666665"
            y="1342.7"
            width="174.14078521728516"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="2469.6666666666665"
            fontSize={40}
            id="bed"
            y="1385.7"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('bed')}
            style={{ color: 'black' }}
          >
            Bed
          </text>
          {/* ---armchair------ */}
          <polygon
            points="3202,1244,3185,1258,3168,1292,3168,1314,3168,1348,3162,1377,3159,1419,3156,1459,3154,1501,3151,1527,3151,1558,3151,1578,3105,1569,3052,1555,3001,1552,2970,1555,2944,1572,2924,1595,2913,1615,2904,1626,2876,1626,2848,1632,2822,1649,2808,1669,2800,1691,2783,1717,2771,1748,2757,1799,2737,1836,2726,1873,2715,1915,2703,1963,2692,1980,2703,1994,2703,2011,2692,2031,2678,2051,2715,2065,2746,2054,2754,2026,2780,2037,2797,2045,2817,2060,2851,2068,2873,2077,2887,2082,3199,2082"
            fill={
              selectedPolygon.includes('armchair') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('armchair')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2905.340425531915"
            y="1686.6808510638298"
            width="269.56993103027344"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="2970.340425531915"
            fontSize={40}
            id="armchair"
            y="1729.6808510638298"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('armchair')}
            style={{ color: 'black' }}
          >
            Armchair
          </text>
          {/* -------sofa----------- */}
          <polygon
            points="1392,1272,1267,1652,1256,1841,1284,1839,1287,1813,1494,1819,1497,1841,1525,1841,1534,1841,1536,1640,1596,1272"
            fill={selectedPolygon.includes('sofa') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('sofa')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1414.3636363636363"
            y="1654.3636363636363"
            width="185.72657012939453"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1479.3636363636363"
            fontSize={40}
            id="sofa"
            y="1697.3636363636363"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('sofa')}
            style={{ color: 'black' }}
          >
            Sofa
          </text>
          {/* ---------side tables-------- */}
          <polygon
            points="2785,1521,2584,1527,2570,1810,2695,1932,2715,1884,2754,1782,2791,1691,2808,1663,2828,1643,2853,1632,2879,1626,2899,1623,2910,1623,2916,1603,2924,1592,2859,1547,2853,1552,2859,1544,2862,1567,2865,1586,2856,1601,2839,1615,2825,1623,2825,1640,2797,1643,2774,1643,2749,1646,2774,1618,2746,1609,2743,1586,2743,1567,2757,1552,2774,1538"
            fill={
              selectedPolygon.includes('sideTables') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('sideTables')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2790.3333333333335"
            y="1588.1818181818182"
            width="318.1237487792969"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="2855.3333333333335"
            fontSize={40}
            id="sideTables"
            y="1631.1818181818182"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('sideTables')}
            style={{ color: 'black' }}
          >
            Side Tables
          </text>
          {/* --------study table-------- */}
          <polygon
            points="936,1074,1089,1023,1259,1045,1259,1195,1347,1187,1347,994,1372,994,1367,1331,1358,1368,1335,1365,1338,1212,1239,1221,1236,1377,1225,1371,1225,1221,1216,1215,1214,1343,1197,1340,1199,1198,1253,1195,1256,1116,1191,1159,1180,1365,1151,1385,1151,1173,933,1173"
            fill={
              selectedPolygon.includes('studyTable') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('studyTable')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1215.8846153846155"
            y="1173.923076923077"
            width="324.4693298339844"
            height={60}
            fill="#282828"
            rx={30}
            opacity="0.3"
            ry={30}
            className="dynamic-rectangle cursor-pointer"
          />
          <text
            fill="white"
            opacity="0.75"
            fontWeight={400}
            x="1280.8846153846155"
            fontSize={40}
            id="studyTable"
            y="1216.923076923077"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('studyTable')}
            style={{ color: 'black' }}
          >
            Study Table
          </text>
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
                {polygon === 'wardrobe' ||
                polygon === 'flooring' ||
                polygon === 'walls' ||
                polygon === 'tvpanel' ||
                polygon === 'upvcWindow' ||
                polygon === 'falseCeiling' ? (
                  <span
                    style={{
                      cursor: 'pointer',
                      fontSize: '12px',
                      marginLeft: '5px',
                    }}
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

        <div></div>
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

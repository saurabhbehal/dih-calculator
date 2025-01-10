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
      barUnit: { pricePerSqFt: 1240 },
      walls: { pricePerSqFt: 50 },
      upvcWindow: { pricePerSqFt: 750 },
      falseCeiling: { pricePerSqFt: 170 },
      electrical: { price: 4800 },
      crockeryUnit: { pricePerSqFt: 1280 },
      diningTableSet: { price: 49500 },
      flooring: { pricePerSqFt: 170 },
    },
    luxury: {
      barUnit: { pricePerSqFt: 1420 },
      walls: { pricePerSqFt: 64 },
      upvcWindow: { pricePerSqFt: 1050 },
      falseCeiling: { pricePerSqFt: 210 },
      electrical: { price: 12000 },
      crockeryUnit: { pricePerSqFt: 1540 },
      diningTableSet: { price: 84000 },
      flooring: { pricePerSqFt: 220 },
    },
    ultraLuxury: {
      barUnit: { pricePerSqFt: 1750 },
      walls: { pricePerSqFt: 90 },
      upvcWindow: { pricePerSqFt: 1480 },
      falseCeiling: { pricePerSqFt: 240 },
      electrical: { price: 17500 },
      crockeryUnit: { pricePerSqFt: 1980 },
      diningTableSet: { price: 148000 },
      flooring: { pricePerSqFt: 490 },
    },
  }
  const descriptions = {
    premium: {
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
      diningTableSet:
        '1 NOS: 6 seater dining table with chairs Sheesham wood | Wooden counter top',
      walls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
      crockeryUnit:
        'Crockery unit with laminate finish on carcass & Shutters and frosted glass HDHMR (Japaness MDH-MR or similar) | Hardware (Stylush or equivalent) | 0.8 Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      electrical:
        'Electrical work including point relocation excluding switches Wires (Havells or Polycab)',
      upvcWindow: 'Premium UPVC windows UPVC (DECEUNINCK or Veka or similar)',
      barUnit:
        'Bar unit with laminate finish on carcass & Shutters and frosted glass HDHMR (Japaness MDH-MR or similar) | Hardware (Stylush or equivalent) | 0.8 Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      falseCeiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
    },
    luxury: {
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      diningTableSet:
        '6 seater dining table with chairs Sheesham wood | Stone counter top',
      walls:
        'Premium Emulsion with 2 primer coats, putty repairing and one highlight wall Paint (Asian Paints or similar)',
      crockeryUnit:
        'Crockery unit with laminate finish on carcass & Acrylic / plain membrane finish on shutters and tinted glass HDHMR (Japaness MDH-MR or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      electrical:
        'Electrical work with point relocation including switches & boards Wires (Havells or Polycab) | Switches (Anchor Penta or similar) | Lights (Orient or Similar)',
      upvcWindow:
        'Premium UPVC windows with 74mm shutter frame and 8mm toughened glass, and single wool pile UPVC (Fenesta or similar)',
      barUnit:
        'Bar unit with laminate finish on carcass & Acrylic / plain membrane finish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      falseCeiling: 'Gypsum board ceiling with heavy duty channel',
    },
    ultraLuxury: {
      flooring:
        'Italian store flooring with installation and Diamond polish Italian stone (Price range upto Rs. 350/-)',
      diningTableSet:
        '6 seater luxury dining table with chairs Sheesham wood | Italian counter top',
      walls:
        'Premium paint with POP finish and one rustic / textured wall POP 3-5 mm (Sakarni) | Paint (Asian Paint Royale or similar)',
      crockeryUnit:
        'Crockery unit (HDHMR or plywood) with laminate finish on carcass & Veneer / PU polish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
      upvcWindow:
        'Premium UPVC windows with 90mm shutter frame and 12.5mm toughened glass, key locking and single wool pile UPVC (Fenesta or similar)',
      barUnit:
        'Bar unit (HDHMR or plywood) with laminate finish on carcass & Veneer / PU polish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      falseCeiling: 'Gypsum board ceiling with heavy duty channel',
    },
    // Add descriptions for other packages...
  }
  const initialSquareFootage = {
    falseCeiling: 120,
    electrical: 1,
    flooring: 120,
    upvcWindow: 24,
    walls: 294,
    crockeryUnit: 42,
    barUnit: 28,
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
          viewBox="0 0 2856 1934"
          style={{
            backgroundImage: 'url("/images/calculator/dining.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling*/}
          <polygon
            points="319,58,1520,555,2522,227,2214,35,2110,15,983,5,892,0"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1498.5714285714287"
            y="84.85714285714286"
            width="339.6360778808594"
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
            x="1563.5714285714287"
            y="127.85714285714286"
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
            points="1555,759,1747,734,1745,812,1548,837"
            fill={
              selectedPolygon.includes('electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('electrical')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1638.75"
            y="742.5"
            width="272.34413146972656"
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
            x="1703.75"
            y="785.5"
            fontSize={40}
            className="cursor-pointer"
            id="electrical"
            onClick={() => handlePolygonClick('electrical')}
            style={{ color: 'black' }}
          >
            Electrical
          </text>
          {/* ---Flooring---------- */}
          <polygon
            points="74,1309,105,1306,160,1374,491,1319,496,1281,582,1273,561,1553,576,1578,604,1571,614,1344,705,1397,677,1694,690,1705,713,1697,740,1399,801,1392,783,1515,801,1531,819,1526,829,1384,912,1374,902,1488,932,1503,927,1624,942,1642,965,1629,970,1523,1018,1546,1195,1503,1192,1677,1212,1692,1240,1674,1243,1495,1379,1473,1364,1793,1379,1813,1414,1795,1422,1470,1553,1440,1545,1586,1563,1596,1566,1720,1601,1737,1603,1425,1717,1402,1717,1647,1757,1654,1755,1402,1851,1372,1856,1594,1878,1604,1904,1586,1901,1304,2693,1417,2784,1346,2845,1359,2855,1931,82,1931"
            fill={
              selectedPolygon.includes('flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('flooring')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1187.5"
            y="1490.0172413793102"
            width="252.8582305908203"
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
            x="1252.5"
            y="1533.0172413793102"
            fontSize={40}
            className="cursor-pointer"
            id="flooring"
            onClick={() => handlePolygonClick('flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>

          {/* -------------- UPVC Window ----------- */}
          <polygon
            points="862,492,1306,628,1293,1057,1288,1142,1164,1145,1167,1041,975,1041,978,1140,841,1140"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1087.111111111111"
            y="937.6666666666666"
            width="372.39862060546875"
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
            x="1152.111111111111"
            y="980.6666666666666"
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
            points="130,282,138,66,1311,517,1308,625,859,494,834,1155,922,1188,917,1248,738,1263,753,1011,738,996,599,1006,576,1268,496,1271,554,318,249,212"
            fill={selectedPolygon.includes('walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('walls')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1518,598,2605,245,2698,406,2524,411,2529,971,2411,976,2413,888,2418,482,1883,618,1876,920,2411,888,2413,976,1694,988,1692,1067,1558,1059,1555,1092,1497,1084,1507,840,1550,842,1747,809,1752,729,1558,756,1550,842,1505,840"
            fill={selectedPolygon.includes('walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('walls')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="685.125"
            y="764.5"
            width="177.43875122070312"
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
            x="750.125"
            y="807.5"
            fontSize={40}
            id="walls"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('walls')}
            style={{ color: 'black' }}
          >
            Walls
          </text>
          {/* -------------- Crockery Unit ----------- */}
          <polygon
            points="2527,411,2693,411,2797,469,2784,1336,2688,1407,2527,1387"
            fill={
              selectedPolygon.includes('crockeryUnit') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('crockeryUnit')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="2659.3333333333335"
            y="860.5"
            width="359.8287048339844"
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
            x="2724.3333333333335"
            y="903.5"
            fontSize={40}
            id="crockeryUnit"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('crockeryUnit')}
            style={{ color: 'black' }}
          >
            Crockery Unit
          </text>
          {/* -------------- Dining Table Set ----------- */}
          <polygon
            points="849,1145,978,1140,975,1044,1162,1046,1164,1140,1288,1147,1290,1062,1442,1057,1442,1087,1558,1092,1563,1064,1692,1067,1687,1150,1729,1157,1737,1104,1896,1097,1899,1584,1881,1599,1863,1591,1858,1369,1757,1404,1760,1644,1735,1652,1717,1647,1724,1404,1603,1420,1603,1727,1591,1735,1571,1722,1566,1594,1550,1594,1553,1437,1419,1468,1414,1793,1384,1803,1371,1788,1386,1460,1245,1490,1240,1672,1220,1687,1192,1677,1195,1498,1021,1546,975,1518,965,1629,942,1642,932,1621,935,1495,907,1475,910,1372,831,1384,819,1520,806,1531,788,1518,793,1392,735,1397,715,1692,693,1699,677,1689,705,1399,617,1339,604,1566,584,1576,564,1556,599,1006,751,999,740,1294,841,1288,912,1316,925,1183,844,1162"
            fill={
              selectedPolygon.includes('diningTableSet')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('diningTableSet')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1199.5633802816901"
            y="1377.5915492957747"
            width="407.68524169921875"
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
            x="1264.5633802816901"
            y="1420.5915492957747"
            fontSize={40}
            id="diningTableSet"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('diningTableSet')}
            style={{ color: 'black' }}
          >
            Dining Table Set
          </text>
          {/* -------------- Bar Unit ----------- */}
          <polygon
            points="132,285,246,214,551,320,493,1316,163,1377,110,1306,87,1304"
            fill={selectedPolygon.includes('barUnit') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('barUnit')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="244.57142857142858"
            y="831.5714285714286"
            width="251.84860229492188"
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
            x="309.57142857142856"
            y="874.5714285714286"
            fontSize={40}
            id="barUnit"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('barUnit')}
            style={{ color: 'black' }}
          >
            Bar Unit
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
                {polygon === 'barUnit' ||
                polygon === 'flooring' ||
                polygon === 'walls' ||
                polygon === 'crockeryUnit' ||
                polygon == 'upvcWindow' ||
                polygon === 'falseCeiling'? (
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

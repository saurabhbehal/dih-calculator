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
      barUnit: { pricePerSqFt: 1250 },
      tvpanel: { pricePerSqFt: 1000 },
      SideTables: { price: 7500 },
      CenterTable: { price: 19000 },
      Sofa: { price: 10000 },
      Console: { price: 19000 },
      Mandir: { price: 29000 },
      Walls: { pricePerSqFt: 50 },
      upvcWindow: { pricePerSqFt: 750 },
      falseCeiling: { pricePerSqFt: 170 },
      Electrical: { price: 4500 },
      crockeryUnit: { pricePerSqFt: 1300 },
      diningTableSet: { price: 50000 },
      Flooring: { pricePerSqFt: 170 },
    },
    luxury: {
      barUnit: { pricePerSqFt: 1450 },
      tvpanel: { pricePerSqFt: 1350 },
      CenterTable: { price: 34500 },
      Sofa: { price: 14500 },
      SideTables: { price: 11500 },
      Console: { price: 29500 },
      Mandir: { price: 44500 },
      Walls: { pricePerSqFt: 60 },
      upvcWindow: { pricePerSqFt: 1050 },
      falseCeiling: { pricePerSqFt: 200 },
      Electrical: { price: 12500 },
      crockeryUnit: { pricePerSqFt: 1600 },
      diningTableSet: { price: 85000 },
      Flooring: { pricePerSqFt: 200 },
    },
    ultraLuxury: {
      barUnit: { pricePerSqFt: 1750 },
      tvpanel: { pricePerSqFt: 1750 },
      CenterTable: { price: 55000 },
      Sofa: { price: 24500 },
      SideTables: { price: 19500 },
      Console: { price: 45000 },
      Mandir: { price: 65500 },
      Walls: { pricePerSqFt: 240 },
      upvcWindow: { pricePerSqFt: 1450 },
      falseCeiling: { pricePerSqFt: 240 },
      Electrical: { price: 17500 },
      crockeryUnit: { pricePerSqFt: 2000 },
      diningTableSet: { price: 150000 },
      Flooring: { pricePerSqFt: 450 },
    },
  }
  const initialSquareFootage = {
    falseCeiling: 165,
    Electrical: 1,
    Flooring: 165,
    tvpanel: 64,
    CenterTable: 100,
    Sofa: 200,
    Console: 500,
    Mandir: 70,
    SideTables: 1,
    upvcWindow: 80,
    Walls: 400,
    crockeryUnit: 50,
    diningTableSet: 80,
    barUnit: 140,
  }

  const descriptions = {
    premium: {
      Walls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
      falseCeiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
      CenterTable:
        'Designer furniture element - Ready made Price range upto Rs.15,000/-',
      SideTables:
        'Designer furniture element - Ready made Price range upto Rs.15,000/-',
      Sofa: 'Marandi wood and Fabric sofa Foam (High Density - 35GSM) | Faric (upto Rs. 450 per mtr)',
      diningTableSet:
        '6 seater dining table with chairs Sheesham wood | Wooden counter top',
      crockeryUnit:
        'Crockery unit with laminate finish on carcass & Shutters and frosted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8 Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      upvcWindow: 'Premium UPVC windows UPVC (Deceuninck or Veka or similar)',
      Electrical:
        'Electrical work including point relocation excluding switches Wires (Havells or Polycab)',
      Mandir: '3 x 4 SqFt. Mandir MDF finished with Laminate',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.15,000/-',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
    },
    luxury: {
      Walls:
        'Premium Emulsion with 2 primer coats, putty repairing and one highlight wall Paint (Asian Paints or similar)',
      falseCeiling:
        'POP ceiling with heavy duty channel POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      CenterTable:
        'Designer furniture element - Ready made Price range upto Rs.30,000/-',
      SideTables:
        'Designer furniture element - Ready made Price range upto Rs.30,000/-',
      Sofa: 'Marandi wood and Fabric sofa Foam (High Density - 40 GSM) | Faric (upto Rs. 650 per mtr)',
      diningTableSet:
        '6 seater dining table with chairs Sheesham wood | Stone counter top',
      crockeryUnit:
        'Crockery unit with laminate finish on carcass & Acrylic / plain membrane finish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass, Acrylic or plain membrane on shutters Carcass (Action Tess or similar) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar)',
      upvcWindow:
        'Premium UPVC windows with 74mm shutter frame and 8mm toughened glass, and single wool pile UPVC (Fenesta or similar)',
      Electrical:
        'Electrical work with point relocation including switches & boards Wires (Havells or Polycab) | Switches (Anchor Penta or similar) | Lights (Orient or Similar)',
      Mandir:
        '4 x 4 SqFt. Mandir finished With HDHMR/Veneer with PU Polish & Jali cutting on sides',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.25,000/-',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      // Add descriptions for luxury package components...
    },
    ultraLuxury: {
      Walls:
        'Premium paint with POP finish and one rustic / textured wall POP 3-5 mm (Sakarni) | Paint (Asian Paint Royale or similar)',
      falseCeiling:
        'POP Ceiling with cove, heavy duty channel & wooden design element POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      CenterTable:
        'Designer furniture element - Ready made Price range upto Rs.50,000/-',
      SideTables:
        'Designer furniture element - Ready made Price range upto Rs.50,000/-',
      Sofa: 'Marandi wood and Fabric sofa Foam (High Density - 40 GSM) | Faric (upto Rs. 750 per mtr)',
      diningTableSet:
        '6 seater luxury dining table with chairs Sheesham wood | Italian counter top',
      crockeryUnit:
        'Crockery unit (HDHMR or plywood) with laminate finish on carcass & Veneer / PU polish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      tvpanel:
        'Standard TV Panel including hardware, laminates on carcass, veneer / PU polish on shutters Carcass (Action Tesa or Local plywood) | Hardware (Hettich or Hafele) | 0.8 mm Laminate (Skydecor or similar)',
      upvcWindow:
        'Premium UPVC windows with 90mm shutter frame and 12.5mm toughened glass, key locking and single wool pile UPVC (Fenesta or similar)',
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
      Mandir: '4 x 5 SqFt. Corian stone Mandir',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.40,000/-',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      // Add descriptions for ultra luxury package components...
    },
    // Add descriptions for other packages...
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
          viewBox="0 0 2782 1790"
          style={{
            backgroundImage: 'url("/images/calculator/living.jpg")',
            backgroundSize: 'cover',
          }}
        >
          <polygon
            points="281,5,906,452,1594,472,2161,10"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1225.5"
            y="191.75"
            width="339.58924865722656"
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
            fontWeight="400"
            x="1290.5"
            y="234.75"
            fontSize={40}
            id="falseCeiling"
            onClick={() => handlePolygonClick('falseCeiling')}
            className="cursor-pointer"
            style={{ color: 'black' }}
          >
            False Ceiling
          </text>
          {/* walls */}
          <polygon
            points="901,455,896,920,847,925,822,858,805,851,773,858,151,991,171,-2,267,-2"
            fill={selectedPolygon.includes('Walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Walls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <polygon
            points="908,457,1594,472,1591,900,1459,875,1451,583,1048,578,1048,870,1461,875,1589,900,1346,900,1346,1072,1056,1074,1048,925,1036,922,1043,507,903,502"
            fill={selectedPolygon.includes('Walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Walls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <polygon
            points="1594,467,2161,10,2302,10,2773,7,2778,895,2724,885,2501,856,2459,843,2456,595,2007,647,2004,932,2456,1030,2461,843,2503,856,2498,971,2717,1003,2722,885,2776,895,2773,1701,2510,1534,2515,1242,1935,1006,1945,979,1950,947,1940,922,1928,897,1918,870,1918,846,1901,834,1884,836,1876,846,1874,861,1867,878,1859,740,1881,735,1803,644,1736,639,1712,666,1695,686,1677,696,1640,725,1640,745,1643,772,1643,787,1643,821,1645,838,1648,870,1645,890,1667,900,1707,912,1734,920,1781,937,1803,944,1830,937,1830,959,1832,979,1840,998,1842,1008,1783,1015,1785,1094,1594,981"
            fill={selectedPolygon.includes('Walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Walls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="615.8888888888889"
            y="607.4444444444445"
            width="177.42926788330078"
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
            font-weight="400"
            x="680.8888888888889"
            y="650.4444444444445"
            fontSize={40}
            id="Walls"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Walls')}
            style={{ color: 'black' }}
          >
            Wall
          </text>
          {/* electrical */}
          <polygon
            points="2501,861,2719,885,2717,1001,2498,971"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2598.75"
            y="886.5"
            width="272.3055877685547"
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
            font-weight="400"
            x="2663.75"
            y="929.5"
            fontSize={40}
            className="cursor-pointer"
            id="Electrical"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ color: 'black' }}
          >
            Electrical
          </text>
          {/* floor */}
          <polygon
            points="1463,1074,1643,1072,1788,1168,1788,1193,2206,1500,2292,1512,2498,1532,2781,1709,2778,1788,1,1785,4,1751,109,1667,119,1689,210,1694,210,1667,269,1667,235,1748,254,1748,286,1667,397,1667,407,1701,417,1711,424,1672,537,1670,571,1751,596,1743,562,1672,675,1674,682,1699,736,1642,729,1608,1021,1124,1060,1114,1060,1082,1090,1079,812,1652,1874,1657"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="924.7027027027027"
            y="1512.3783783783783"
            width="252.8209228515625"
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
            font-weight="400"
            x="989.7027027027027"
            y="1555.3783783783783"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* sofa */}
          <polygon
            points="159,991,788,851,805,856,822,863,842,932,1043,927,1053,1119,1021,1116,726,1611,736,1645,684,1692,680,1667,559,1670,480,1465,532,1468,530,1456,399,1453,417,1429,417,1404,407,1392,397,1379,390,1357,402,1343,417,1333,434,1330,444,1306,424,1274,409,1281,385,1269,367,1274,340,1271,323,1279,318,1296,321,1308,323,1323,335,1335,350,1335,362,1343,367,1355,358,1382,348,1392,338,1421,338,1436,353,1451,328,1453,296,1451,276,1451,269,1465,284,1468,299,1470,313,1470,340,1470,267,1665,205,1665,200,1692,117,1697,112,1662,104,1252,151,1210"
            fill={selectedPolygon.includes('Sofa') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Sofa')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="422.271186440678"
            y="1323.457627118644"
            width="185.74951934814453"
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
            font-weight="400"
            x="487.271186440678"
            y="1366.457627118644"
            fontSize={40}
            id="Sofa"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Sofa')}
            style={{ color: 'black' }}
          >
            Sofa
          </text>
          {/* center table */}
          <polygon
            points="1122,1106,1395,1106,1510,1379,1510,1551,1024,1569,1033,1392"
            fill={
              selectedPolygon.includes('CenterTable') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CenterTable')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1255.6666666666667"
            y="1307.5"
            width="341.9664611816406"
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
            font-weight="400"
            x="1320.6666666666667"
            y="1350.5"
            fontSize={40}
            id="CenterTable"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('CenterTable')}
            style={{ color: 'black' }}
          >
            Centre Table
          </text>
          {/* mandir */}
          <polygon
            points="1739,644,1805,642,1879,740,1854,740,1862,888,1844,910,1832,937,1800,942,1645,893,1640,725"
            fill={selectedPolygon.includes('Mandir') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Mandir')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1780"
            y="763.1"
            width="230.74679565429688"
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
            font-weight="400"
            x="1845"
            y="806.1"
            font-size="40"
            fontSize={40}
            id="Mandir"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Mandir')}
            style={{ color: 'black' }}
          >
            Mandir
          </text>
          {/* tv panel */}
          <polygon
            points="1930,1013,2510,1244,2508,1532,2206,1500,1783,1193,1788,1015,1842,1011,1857,1023,1879,1030,1894,1033,1913,1030,1923,1023"
            fill={selectedPolygon.includes('tvpanel') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('tvpanel')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1992.75"
            y="1094.25"
            width="268.10301208496094"
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
            font-weight="400"
            x="2057.75"
            y="1137.25"
            fontSize={40}
            id="tvpanel"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('tvpanel')}
            style={{ color: 'black' }}
          >
            TV Panel
          </text>
          {/* upvc window */}
          <polygon
            points="1051,578,1449,585,1454,873,1053,868"
            fill={selectedPolygon.includes('tvpanel') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('tvpanel')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1241.75"
            y="683"
            width="372.36083984375"
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
            font-weight="400"
            x="1306.75"
            y="726"
            fontSize={40}
            id="tvpanel"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('tvpanel')}
            style={{ color: 'black' }}
          >
            UPVC Window
          </text>
          {/* side table */}
          <polygon
            points="279,1458,530,1458,527,1472,483,1470,589,1748,574,1750,466,1472,409,1472,421,1703,407,1708,390,1470,358,1475,249,1743,235,1743,338,1473,276,1470"
            fill={
              selectedPolygon.includes('SideTables') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('SideTables')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="398.1875"
            y="1524.8125"
            width="318.15187072753906"
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
            font-weight="400"
            x="463.1875"
            y="1567.8125"
            fontSize={40}
            id="SideTables"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('SideTables')}
            style={{ color: 'black' }}
          >
            Side Tables
          </text>
          {/* console */}
          <polygon
            points="1348,900,1591,897,1591,1074,1564,1070,1567,949,1365,954,1365,1074,1346,1074"
            fill={selectedPolygon.includes('Console') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Console')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1457.125"
            y="956"
            width="253.92462158203125"
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
            font-weight="400"
            x="1522.125"
            y="999"
            fontSize={40}
            id="Console"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Console')}
            style={{ color: 'black' }}
          >
            Console
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
                <span>{polygon} </span>
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
                polygon === 'sofa' ||
                polygon === 'crockeryUnit' ||
                polygon === 'CenterTable' ||
                polygon === 'diningTableSet' ||
                polygon === 'falseCeiling' ? (
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

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
      tvpanel: { pricePerSqFt: 950 },
      CenterTable: { price: 19800 },
      Sofa: { price: 32000 },
      Console: { price: 19800 },
      sideTables: { price: 7500 },
      Mandir: { price: 29800 },
      walls: { pricePerSqFt: 50 },
      upvcWindow: { pricePerSqFt: 750 },
      falseCeiling: { pricePerSqFt: 180 },
      electrical: { price: 11800 },
      crockeryUnit: { pricePerSqFt: 1250 },
      diningTableSet: { price: 49000 },
      flooring: { pricePerSqFt: 175 },
    },
    luxury: {
      barUnit: { pricePerSqFt: 1350 },
      tvpanel: { pricePerSqFt: 1350 },
      CenterTable: { price: 34500 },
      Sofa: { price: 45000 },
      Console: { price: 29000 },
      sideTables: { price: 11000 },
      Mandir: { price: 44500 },
      walls: { pricePerSqFt: 60 },
      upvcWindow: { pricePerSqFt: 1050 },
      falseCeiling: { pricePerSqFt: 200 },
      electrical: { price: 17500 },
      crockeryUnit: { pricePerSqFt: 1550 },
      diningTableSet: { price: 84000 },
      flooring: { pricePerSqFt: 200 },
    },
    ultraLuxury: {
      barUnit: { pricePerSqFt: 1700 },
      tvpanel: { pricePerSqFt: 1750 },
      CenterTable: { price: 55000 },
      Sofa: { price: 74500 },
      Console: { price: 50000 },
      sideTables: { price: 19000 },
      Mandir: { price: 65000 },
      walls: { pricePerSqFt: 85 },
      upvcWindow: { pricePerSqFt: 1450 },
      falseCeiling: { pricePerSqFt: 240 },
      electrical: { price: 17500 },
      crockeryUnit: { pricePerSqFt: 1900 },
      diningTableSet: { price: 140000 },
      flooring: { pricePerSqFt: 450 },
    },
  }
  const descriptions = {
    premium: {
      walls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
      falseCeiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
      CenterTable:
        '1 NOS: Designer furniture element - Ready made Price range upto Rs.15,000/-',
      Sofa: '3 Seats: Marandi wood and Fabric sofa Foam (High Density - 35GSM) | Faric (upto Rs. 450 per mtr)',
      diningTableSet:
        '1 NOS: 6 seater dining table with chairs Sheesham wood | Wooden counter top',
      crockeryUnit:
        'Crockery unit with laminate finish on carcass & Shutters and frosted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8 Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      upvcWindow: 'Premium UPVC windows UPVC (DECEUNINCK or Veka or similar)',
      electrical:
        '1NOS: Electrical work including point relocation excluding switches Wires (Havells or Polycab)',
      Mandir: '1 NOS: 3 x 4 SqFt. Mandir MDF finished with Laminate',
      Console:
        '1 NOS: Designer furniture element - Ready made Price range upto Rs.15,000/-',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
        sideTables: '1 NOS: Designer Furniture element - Ready made Price range upto RS. 5,000/-'
    },
    luxury: {
      walls:
        'Premium Emulsion with 2 primer coats, putty repairing and one highlight wall Paint (Asian Paints or similar)',
      falseCeiling:
        'POP ceiling with heavy duty channel POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      CenterTable:
        '1 NOS: Designer furniture element - Ready made Price range upto Rs.30,000/-',
      Sofa: 'Marandi wood and Fabric sofa Foam (High Density - 40 GSM) | Faric (upto Rs. 650 per mtr)',
      diningTableSet:
        '6 seater dining table with chairs Sheesham wood | Stone counter top',
      crockeryUnit:
        'Crockery unit with laminate finish on carcass & Acrylic / plain membrane finish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass, Acrylic or plain membrane on shutters Carcass (Action Tess or similar) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar)',
      upvcWindow:
        'Premium UPVC windows with 74mm shutter frame and 8mm toughened glass, and single wool pile UPVC (Fenesta or similar)',
      electrical:
        '1 NOS: Electrical work with point relocation including switches & boards Wires (Havells or Polycab) | Switches (Anchor Penta or similar) | Lights (Orient or Similar)',
      Mandir:
        '1 NOS: 4 x 4 SqFt. Mandir finished With HDHMR/Veneer with PU Polish & Jali cutting on sides',
      Console:
        '1NOS: Designer furniture element - Ready made Price range upto Rs.25,000/-',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
        sideTables: '1 NOS: Designer furniture element - Ready made Price range upto Rs. 10,000/-',

      // Add descriptions for luxury package components...
    },
    ultraLuxury: {
      walls:
        'Premium paint with POP finish and one rustic / textured wall POP 3-5 mm (Sakarni) | Paint (Asian Paint Royale or similar)',
      falseCeiling:
        'POP Ceiling with cove, heavy duty channel & wooden design element POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      CenterTable:
        'Designer furniture element - Ready made Price range upto Rs.50,000/-',
      Sofa: '3 Seat: Marandi wood and Fabric sofa Foam (High Density - 40 GSM) | Faric (upto Rs. 750 per mtr)',
      diningTableSet:
        '6 seater luxury dining table with chairs Sheesham wood | Italian counter top',
      crockeryUnit:
        'Crockery unit (HDHMR or plywood) with laminate finish on carcass & Veneer / PU polish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      tvpanel:
        'Standard TV Panel including hardware, laminates on carcass, veneer / PU polish on shutters Carcass (Action Tesa or Local plywood) | Hardware (Hettich or Hafele) | 0.8 mm Laminate (Skydecor or similar)',
      upvcWindow:
        'Premium UPVC windows with 90mm shutter frame and 12.5mm toughened glass, key locking and single wool pile UPVC (Fenesta or similar)',
      electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
      Mandir: '4 x 5 SqFt. Corian stone Mandir',
      Console:
        '1 NOS: Designer furniture element - Ready made Price range upto Rs.40,000/-',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
        sideTables: '1 NOS: Designer furniture element - Ready made Price range upto Rs. 20,000/-',
      // Add descriptions for ultra luxury package components...
    },
    // Add descriptions for other packages...
  }
  const initialSquareFootage = {
    falseCeiling: 140,
    flooring: 140,
    tvpanel: 49,
    upvcWindow: 72,
    walls: 343,
    crockeryUnit: 35,
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
          viewBox="0 0 3081 2099"
          style={{
            backgroundImage: 'url("/images/calculator/living_dining.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling*/}
          <polygon
            points="943,523,1841,427,2059,515,3074,403,3074,16,7,19,7,397"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1562.142857142857"
            y="285.57142857142856"
            width="339.62501525878906"
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
            x="1627.142857142857"
            y="328.57142857142856"
            fontSize={40}
            id="falseCeiling"
            onClick={() => handlePolygonClick('falseCeiling')}
            className="cursor-pointer"
            style={{ color: 'black' }}
          >
            False Ceiling
          </text>

          {/* ------walls----------------- */}

          <polygon
            points="940,528,1833,430,1858,1154,1773,1146,1765,1113,1811,1113,1806,1100,1751,1097,1762,1081,1762,1051,1819,1045,1773,939,1708,945,1694,972,1634,961,1637,915,1626,787,1670,781,1828,770,1822,702,1667,713,1670,781,1624,787,1618,569,1174,596,1185,779,1626,787,1637,917,1144,882,1136,901,1074,890,951,923"
            fill={selectedPolygon.includes('walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('walls')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="181,419,753,504,766,1105,636,1138,388,1070,388,1211,208,1260,205,1103,573,1015,562,564,189,534"
            fill={selectedPolygon.includes('walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('walls')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1836,425,1860,1157,1882,1141,1885,945,2021,855,2143,852,2116,961,2236,967,2247,953,2522,980,2527,994,2579,997,2582,812,2394,803,2391,866,2195,863,2192,798,2024,806,1909,869,1912,518,2021,553,2024,806,2192,798,2192,724,2301,607,2399,724,2396,803,2582,812,2758,822,2767,795,2761,765,2769,768,2772,746,2772,793,2780,822,2799,825,2810,806,2810,790,2799,771,2791,754,2791,733,2807,724,2835,741,2851,749,2824,784,2821,814,2832,828,2862,828,2867,667,2620,684,2590,659,2592,550,3077,504,3074,409,2059,518"
            fill={selectedPolygon.includes('walls') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('walls')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1576.8125"
            y="836.84375"
            width="177.44397735595703"
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
            x="1641.8125"
            y="879.84375"
            fontSize={40}
            className="cursor-pointer"
            id="walls"
            onClick={() => handlePolygonClick('walls')}
            style={{ color: 'black' }}
          >
            Wall
          </text>
          {/* ---electrical---------- */}
          <polygon
            points="1667,713,1822,705,1825,770,1667,779"
            fill={
              selectedPolygon.includes('electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('electrical')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1735.25"
            y="698.75"
            width="272.3520965576172"
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
            x="1800.25"
            y="741.75"
            fontSize={40}
            className="cursor-pointer"
            id="electrical"
            onClick={() => handlePolygonClick('electrical')}
            style={{ color: 'black' }}
          >
            Electrical
          </text>
          {/* --------------flooring---------- */}
          <polygon
            points="309,1233,211,1266,205,1277,178,1288,159,1285,146,1290,127,1299,110,1304,108,1290,50,1307,39,2099,3074,2099,3080,1179,2788,1135,2778,1157,2805,1190,2832,1225,2848,1244,2859,1274,2886,1299,2843,1350,2783,1522,2761,1628,2753,1704,2753,1778,2758,1819,2764,1873,2729,1870,2729,1843,2720,1794,2720,1772,2712,1734,2707,1775,2682,1772,2666,1715,2669,1672,2671,1633,2530,1587,2538,1947,2508,1933,2494,1478,2051,1383,2056,1764,2029,1751,2021,1473,1855,1418,1860,1587,1833,1582,1825,1386,1817,1369,1819,1350,2086,1075,2105,1073,2122,1073,2138,1075,2149,1086,2211,999,2113,991,2103,1029,2043,1026,2040,1007,1980,1059,1969,1094,1969,1127,1972,1149,1977,1165,1942,1162,1882,1162,1885,1138,1858,1157,1773,1146,1825,1307,1811,1307,1757,1143,1711,1135,1700,1263,1686,1263,1697,1135,1689,1133,1683,1184,1613,1220,1580,1280,1564,1280,1591,1231,1572,1239,1572,1258,1526,1285,1466,1277,1460,1252,995,1143,995,1152,978,1152,932,1143,919,1075,897,1084,883,1078,859,1084,851,1081,826,1092,802,1092,769,1103,644,1138,755,1165,753,1201,897,1146,1449,1271,1449,1375,1210,1500,747,1334,742,1391,989,1489,954,1702,818,1778,225,1457,211,1288"
            fill={
              selectedPolygon.includes('flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('flooring')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="2530,1029,2538,1176,2631,1187,2644,1141,2652,1113,2595,1103,2579,1048,2579,1032"
            fill={
              selectedPolygon.includes('flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('flooring')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1691.017391304348"
            y="1300.486956521739"
            width="252.86029052734375"
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
            x="1756.017391304348"
            y="1343.486956521739"
            fontSize={40}
            id="flooring"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* -------Crockery Unit-------- */}
          <polygon
            points="2867,664,2614,681,2587,653,2587,542,2625,542,3080,501,3080,1173,2778,1133,2764,1089,2748,1056,2729,1032,2707,1015,2674,1067,2652,1111,2595,1100,2579,1045,2584,814,2756,822,2761,836,2772,844,2780,836,2780,819,2799,822,2805,841,2821,844,2827,836,2829,822,2867,825"
            fill={
              selectedPolygon.includes('crockeryUnit') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('crockeryUnit')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2741.6785714285716"
            y="827.1785714285714"
            width="359.8363342285156"
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
            x="2806.6785714285716"
            y="870.1785714285714"
            fontSize={40}
            id="crockeryUnit"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('crockeryUnit')}
            style={{ color: 'black' }}
          >
            Crockery Unit
          </text>
          {/* ------ Sofa--------- */}
          <polygon
            points="1074,893,1134,898,1142,882,1632,920,1634,966,1645,958,1689,975,1651,1056,1689,1054,1686,1097,1629,1092,1624,1103,1632,1108,1662,1111,1594,1228,1566,1241,1569,1258,1526,1285,1463,1274,1468,1250,992,1135,995,1152,981,1152,929,1143,900,939,987,915,1033,904"
            fill={selectedPolygon.includes('Sofa') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Sofa')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1618,1217,1678,1111,1686,1111,1686,1184"
            fill={selectedPolygon.includes('Sofa') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Sofa')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1379.851851851852"
            y="1030.6666666666667"
            width="185.75089263916016"
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
            x="1444.851851851852"
            y="1073.6666666666667"
            fontSize={40}
            id="Sofa"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Sofa')}
            style={{ color: 'black' }}
          >
            Sofa
          </text>
          {/* ----Dining Table Set------ */}
          <polygon
            points="2092,1073,2111,1070,2127,1075,2143,1086,2154,1089,2252,950,2527,975,2538,1171,2576,1176,2601,1179,2628,1190,2652,1135,2663,1100,2674,1070,2693,1048,2709,1021,2742,1040,2756,1067,2767,1089,2772,1113,2780,1130,2780,1160,2797,1168,2805,1182,2816,1195,2829,1209,2837,1228,2848,1241,2859,1260,2862,1277,2878,1285,2884,1296,2873,1312,2859,1329,2840,1361,2829,1399,2813,1432,2805,1467,2788,1506,2780,1541,2769,1568,2769,1595,2761,1628,2758,1663,2753,1702,2753,1731,2750,1767,2753,1794,2758,1840,2761,1868,2734,1870,2729,1808,2720,1759,2712,1740,2709,1772,2682,1770,2669,1696,2674,1669,2674,1631,2628,1620,2527,1587,2535,1944,2505,1933,2494,1478,2048,1380,2056,1756,2032,1748,2021,1470,1852,1416,1860,1582,1833,1579,1825,1380,1819,1367,1822,1353"
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
            x="2564.108108108108"
            y="1364.554054054054"
            width="407.6828308105469"
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
            x="2629.108108108108"
            y="1407.554054054054"
            fontSize={40}
            id="diningTableSet"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('diningTableSet')}
            style={{ color: 'black' }}
          >
            Dining Table Set
          </text>
          {/* -------------- Centre Table ----------- */}
          <polygon
            points="750,1244,750,1201,900,1146,1447,1274,1441,1375,1207,1503,744,1329"
            fill={
              selectedPolygon.includes('CenterTable') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CenterTable')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1024.142857142857"
            y="1253"
            width="342.01243591308594"
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
            y="1296"
            x="1089.142857142857"
            fontSize={40}
            id="CenterTable"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('CenterTable')}
            style={{ color: 'black' }}
          >
            Centre Table
          </text>
          {/* -------Mandir-------- */}
          <polygon
            points="2301,610,2192,724,2192,858,2396,863,2394,713"
            fill={selectedPolygon.includes('Mandir') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Mandir')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2285"
            y="710.6"
            width="230.7521209716797"
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
            x="2350"
            y="753.6"
            fontSize={40}
            id="Mandir"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Mandir')}
            style={{ color: 'black' }}
          >
            Mandir
          </text>
          {/* ---TV Panel------ */}
          <polygon
            points="388,1252,336,1228,216,1290,225,1457,821,1780,957,1699,989,1495,744,1391,744,1437,755,1446,548,1361,529,1397,505,1448,543,1467,540,1489,469,1465,431,1440,437,1424,475,1437,480,1383,513,1348,388,1296"
            fill={selectedPolygon.includes('tvpanel') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('tvpanel')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="536.9545454545455"
            y="1385.6363636363637"
            width="268.13323974609375"
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
            x="601.9545454545455"
            y="1428.6363636363637"
            fontSize={40}
            id="tvpanel"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('tvpanel')}
            style={{ color: 'black' }}
          >
            TV Panel
          </text>
          {/* -------UPVC Window----------- */}
          <polygon
            points="186,536,562,566,573,1010,203,1103"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="371"
            y="760.75"
            width="372.3948059082031"
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
            x="436"
            y="803.75"
            fontSize={40}
            id="upvcWindow"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ color: 'black' }}
          >
            UPVC Window
          </text>
          {/* ---------side tables-------- */}
          <polygon
            points="1629,1097,1806,1103,1811,1116,1762,1116,1828,1309,1811,1307,1749,1111,1713,1116,1705,1260,1686,1263,1702,1111,1675,1111,1580,1280,1564,1282,1664,1111,1629,1108"
            fill={
              selectedPolygon.includes('sideTables') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('sideTables')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1697.125"
            y="1132.0625"
            width="318.2036437988281"
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
            x="1762.125"
            y="1175.0625"
            fontSize={40}
            id="sideTables"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('sideTables')}
            style={{ color: 'black' }}
          >
            Side Tables
          </text>
          {/* --------Console-------- */}
          <polygon
            points="2024,849,1890,939,1882,1157,1975,1162,1969,1127,1972,1094,1977,1062,1988,1015,1999,986,2015,945,2045,923,2043,1021,2100,1024,2116,964,2122,923,2130,898,2141,866,2138,852"
            fill={selectedPolygon.includes('Console') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Console')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2019.2222222222222"
            y="946.2777777777778"
            width="253.9395294189453"
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
            x="2084.222222222222"
            y="989.2777777777778"
            fontSize={40}
            id="Console"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Console')}
            style={{ color: 'black' }}
          >
            Console
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
                {polygon === 'wardrobe' ||
                polygon === 'flooring' ||
                polygon === 'walls' ||
                polygon === 'tvpanel' ||
                polygon === 'upvcWindow' ||
                polygon === 'crockeryUnit' ||
                polygon === 'diningTableSet' ||
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

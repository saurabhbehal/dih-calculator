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
      KitchenCabinets: { pricePerSqFt: 1250 },
      walls: { pricePerSqFt: 55 },
      upvcWindow: { pricePerSqFt: 800 },
      falseCeiling: { pricePerSqFt: 185 },
      Electrical: { price: 5000 },
      Plumbing: { pricePerSqFt: 1300 },
      CounterTop: { price: 50000 },
      KitchenWalls: { pricePerSqFt: 1500 },
      Flooring: { pricePerSqFt: 497 },
    },
    luxury: {
      KitchenCabinets: { pricePerSqFt: 1450 },
      walls: { pricePerSqFt: 65 },
      upvcWindow: { pricePerSqFt: 1100 },
      falseCeiling: { pricePerSqFt: 210 },
      Electrical: { price: 13000 },
      Plumbing: { pricePerSqFt: 1600 },
      CounterTop: { price: 85000 },
      KitchenWalls: { pricePerSqFt: 2000 },
      Flooring: { pricePerSqFt: 498 },
    },
    ultraLuxury: {
      KitchenCabinets: { pricePerSqFt: 1800 },
      walls: { pricePerSqFt: 90 },
      upvcWindow: { pricePerSqFt: 1500 },
      falseCeiling: { pricePerSqFt: 250 },
      Electrical: { price: 18000 },
      Plumbing: { pricePerSqFt: 2000 },
      CounterTop: { price: 150000 },
      KitchenWalls: { pricePerSqFt: 2500 },
      Flooring: { pricePerSqFt: 499 },
    },
  }
  const descriptions = {
    premium: {
      KitchenCabinets:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
      falseCeiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
      CenterTable:
        'Designer furniture element - Ready made Price range upto Rs.15,000/-',
      Sofa: 'Marandi wood and Fabric sofa Foam (High Density - 35GSM) | Faric (upto Rs. 450 per mtr)',
      diningTableSet:
        '6 seater dining table with chairs Sheesham wood | Wooden counter top',
      crockeryUnit:
        'Crockery unit with laminate finish on carcass & Shutters and frosted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8 Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      upvcWindow: 'Premium UPVC windows UPVC (Deceuninck or Veka or similar)',
      electrical:
        'Electrical work including point relocation excluding switches Wires (Havells or Polycab)',
      Mandir: '3 x 4 SqFt. Mandir MDF finished with Laminate',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.15,000/-',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
    },
    luxury: {
      walls:
        'Premium Emulsion with 2 primer coats, putty repairing and one highlight wall Paint (Asian Paints or similar)',
      falseCeiling:
        'POP ceiling with heavy duty channel POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      CenterTable:
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
      electrical:
        'Electrical work with point relocation including switches & boards Wires (Havells or Polycab) | Switches (Anchor Penta or similar) | Lights (Orient or Similar)',
      Mandir:
        '4 x 4 SqFt. Mandir finished With HDHMR/Veneer with PU Polish & Jali cutting on sides',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.25,000/-',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      // Add descriptions for luxury package components...
    },
    ultraLuxury: {
      walls:
        'Premium paint with POP finish and one rustic / textured wall POP 3-5 mm (Sakarni) | Paint (Asian Paint Royale or similar)',
      falseCeiling:
        'POP Ceiling with cove, heavy duty channel & wooden design element POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      CenterTable:
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
      electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
      Mandir: '4 x 5 SqFt. Corian stone Mandir',
      Console:
        'Designer furniture element - Ready made Price range upto Rs.40,000/-',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      // Add descriptions for ultra luxury package components...
    },
    // Add descriptions for other packages...
  }
  const initialSquareFootage = {
    falseCeiling: 80,
    Electrical: 1,
    Flooring: 80,
    upvcWindow: 45,
    walls: 65,
    Plumbing: 50,
    CounterTop: 80,
    KitchenWalls: 196,
    KitchenCabinets: 50,
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

  const updateData = () => {
    setUpdatedData((prevData) =>
      prevData.map((item) =>
        item.name === name
          ? { ...item, selectedPolygon, selectedPackage, roomPrice }
          : item
      )
    )
  }
  useEffect(() => {
    updateData()
  }, [selectedPolygon, selectedPackage, roomPrice])

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

  console.log('updatedData: ', updatedData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateSpaceData(updatedData))
  }, [dispatch, updatedData])

  const spaceData = useSelector((state) => state.secondStep.spaceData)
  console.log('Space Data from redux:', spaceData)



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
          viewBox="0 0 2763 1717"
          style={{
            backgroundImage: 'url("/images/calculator/kitchen.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling*/}
          <polygon
            points="104,186,1227,354,1224,318,1273,310,1380,322,1383,376,1842,454,2674,283,2759,269,2762,7,104,0"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1511.090909090909"
            y="218.72727272727275"
            width="339.50189208984375"
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
            x="1576.090909090909"
            y="261.72727272727275"
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
            points="782,835,1007,823,1014,882,787,896"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1678,784,1783,779,1788,818,1683,821"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="887.5"
            y="816"
            width="272.2518615722656"
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
            x="952.5"
            y="859"
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
            points="13,1717,524,1566,528,1544,1856,1165,2757,1492,2762,1715"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1396.6666666666667"
            y="1490.1666666666667"
            width="252.76547241210938"
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
            x="1461.6666666666667"
            y="1533.1666666666667"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* --------------Kitchen Cabinets---------- */}
          <polygon
            points="511,1116,1846,906,1861,918,1886,918,2479,1028,2474,1338,1866,1121,524,1487"
            fill={
              selectedPolygon.includes('KitchenCabinets')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenCabinets')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="111,242,106,454,494,513,509,764,1187,755,1168,430,480,320,480,300"
            fill={
              selectedPolygon.includes('KitchenCabinets')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenCabinets')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1427,486,1517,479,1937,550,1949,742,1515,752,1434,750,1432,708,1515,708,1549,703,1551,669,1434,674"
            fill={
              selectedPolygon.includes('KitchenCabinets')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenCabinets')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1670.875"
            y="1061"
            width="422.7219543457031"
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
            x="1735.875"
            y="1104"
            fontSize={40}
            id="KitchenCabinets"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('KitchenCabinets')}
            style={{ color: 'black' }}
          >
            Kitchen Cabinets
          </text>
          {/* -------Counter Top-------- */}
          <polygon
            points="514,1055,594,1043,726,1031,770,1028,770,977,773,938,1180,901,1178,931,1083,943,1209,982,1534,933,1488,911,1488,887,1529,889,1536,879,1529,874,1507,869,1864,835,2278,882,2283,906,2144,889,2076,923,2359,970,2435,933,2315,911,2315,884,2562,911,2469,996,2469,1026,1856,909,1844,901,514,1116"
            fill={
              selectedPolygon.includes('CounterTop') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1589.71875"
            y="896.46875"
            width="333.9831848144531"
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
            x="1654.71875"
            y="939.46875"
            fontSize={40}
            id="CounterTop"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ color: 'black' }}
          >
            Counter Top
          </text>
          {/* ------ Plumbing--------- */}
          <polygon
            points="2138,894,2278,906,2280,891,2282,879,2273,867,2256,865,2258,848,2282,855,2290,830,2297,811,2312,801,2329,796,2346,791,2365,796,2365,811,2353,821,2341,808,2326,818,2314,828,2309,850,2307,862,2334,860,2334,874,2312,874,2313,889,2310,913,2434,933,2363,967,2082,926"
            fill={
              selectedPolygon.includes('Plumbing') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Plumbing')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="2292.862068965517"
            y="814.3793103448276"
            width="274.9379577636719"
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
            x="2357.862068965517"
            y="857.3793103448276"
            fontSize={40}
            id="Plumbing"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Plumbing')}
            style={{ color: 'black' }}
          >
            Plumbing
          </text>
          {/* ----Kitchen Walls------ */}
          <polygon
            points="506,764,1183,760,1180,711,1168,427,485,320,106,237,104,191,1224,354,1229,681,1180,674,1180,708,1219,716,1427,711,1432,757,1512,755,1856,750,1954,747,1942,550,1515,471,1429,491,1432,672,1383,674,1383,383,1837,457,2757,269,2762,420,2759,935,2318,882,2315,874,2337,874,2340,860,2310,855,2318,828,2718,852,2691,430,2015,530,2030,811,2288,828,2283,850,2257,848,2252,865,2269,865,2274,874,1854,833,1688,852,1685,823,1793,823,1785,779,1676,782,1690,852,1478,872,1436,869,1383,862,1363,872,1366,884,1331,884,1319,869,1261,869,1258,855,1239,855,1234,869,1192,869,1163,889,1180,889,1178,899,770,938,768,896,1019,884,1009,821,780,833,787,894,768,896,770,884,597,874,506,884"
            fill={
              selectedPolygon.includes('KitchenWalls') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1516.4666666666667"
            y="705.8666666666667"
            width="353.4207458496094"
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
            x="1581.4666666666667"
            y="748.8666666666667"
            fontSize={40}
            id="KitchenWalls"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ color: 'black' }}
          >
            Kitchen Walls
          </text>
          {/* -------------- UPVC Window ----------- */}
          <polygon
            points="2017,535,2689,432,2715,850,2476,835,2462,484,2335,498,2342,598,2466,579,2474,835,2322,826,2340,808,2352,821,2371,813,2366,791,2342,789,2320,796,2303,804,2291,826,2239,821,2176,816,2064,808,2030,811"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2330.5454545454545"
            y="692.2727272727273"
            width="372.2722473144531"
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
            x="2395.5454545454545"
            y="735.2727272727273"
            fontSize={40}
            id="upvcWindow"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ color: 'black' }}
          >
            UPVC Window
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
                {polygon === 'CounterTop' ||
                polygon === 'Flooring' ||
                polygon === 'walls' ||
                polygon === 'KitchenWalls' ||
                polygon == 'upvcWindow' ||
                polygon === 'falseCeiling' ||
                polygon === 'KitchenCabinets' ? (
                  <span
                    style={{ cursor: 'pointer', fontSize: '12px' }}
                    onClick={() => handleEditSquareFootage(polygon)}
                  >
                    ✏️ Edit
                  </span>
                ) : null}
              </div>

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

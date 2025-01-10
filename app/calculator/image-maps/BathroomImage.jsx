'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSpaceData } from '../../../components/redux/actions/secondStepActions'
import { useRouter } from 'next/navigation'
const SvgMap = ({ data, name }) => {
  const router = useRouter()
  const initialSquareFootage = {
    // ... existing bedroom spaces
    wallTiles: 98,
    Flooring: 40,
    upvcWindow: 6,
    falseCeiling: 40,
    // ... other existing spaces
  }

  const pricing = {
    premium: {
      // ... existing premium spaces
      Plumbing: { price: 24000 },
      wallTiles: { pricePerSqFt: 170 }, // adjust based on your actual pricing
      Flooring: { pricePerSqFt: 170 }, // adjust based on your actual pricing
      sanitaryAndCP: { price: 34000 },
      ShowerEnclosure: { price: 7000 },
      upvcWindow: { pricePerSqFt: 750 },
      bathroomVanity: { price: 19000 },
      door: { price: 19000 },
      Electrical: { price: 4500 },
      falseCeiling: { pricePerSqFt: 180 }, // adjust based on your actual pricing
      // ... other existing premium spaces
    },
    luxury: {
      // ... existing luxury spaces
      Plumbing: { price: 29000 },
      wallTiles: { pricePerSqFt: 210 }, // adjust based on your actual pricing
      Flooring: { pricePerSqFt: 210 }, // adjust based on your actual pricing
      sanitaryAndCP: { price: 54000 },
      ShowerEnclosure: { price: 20000 },
      upvcWindow: { pricePerSqFt: 1050 },
      bathroomVanity: { price: 24000 },
      Electrical: { price: 7500 },
      door: { price: 24000 },
      falseCeiling: { pricePerSqFt: 210 }, // adjust based on your actual pricing
      // ... other existing luxury spaces
    },
    ultraLuxury: {
      // ... existing ultraLuxury spaces
      Plumbing: { price: 34000 },
      wallTiles: { pricePerSqFt: 490 }, // adjust based on your actual pricing
      Flooring: { pricePerSqFt: 450 }, // adjust based on your actual pricing
      sanitaryAndCP: { price: 84000 },
      ShowerEnclosure: { price: 30500 },
      upvcWindow: { pricePerSqFt: 1450 },
      sideTables: { price: 19000 },
      Electrical: { price: 11500 },
      bathroomVanity: { price: 34000 },
      door: { price: 35000 },
      falseCeiling: { pricePerSqFt: 250 }, // adjust based on your actual pricing
      // ... other existing ultraLuxury spaces
    },
  }
  const descriptions = {
    premium: {
      falseCeiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
      wallTiles:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X24" (Price range Rs. 55-65/- psf)',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
      bathroomVanity:
        'HDHMR bathroom vanity with shutter storage and mirror above vanity, including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Skydecor or similar) | Stone counter (upto Rs. 150/- psf)',
      sanitaryAndCP:
        'Sanitary Brands: Cera /Similar Inclusions: Sanitary Fittings (Faucets), Divertor Fittings, Bottle Trap etc.',
      door: 'Flush door with hardware, both side laminate finish and Chaukhat repairing & polishing Door 35mm hardwood (price range Rs.80 to Rs. 125/-) | Hardware (Stylus or equivalent) | Locks (Upto Rs.1,800/-)',
      upvcWindow: 'Premium UPVC windows UPVC (Deceuninck or Veka or similar)',
      ShowerEnclosure:
        '18 x 7 SqFt., 8mm toughened glass partition with installation',
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
        Plumbing: '1 NOS: Plumbing work including pipes and all sanitary installation CPVC (Price or similar) | PVC (Prakash or similar) | Water Proofing'
    },
    luxury: {
      falseCeiling:
        'POP ceiling with heavy duty channel POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      wallTiles:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 70-80/- psf)',
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      bathroomVanity:
        'BWR plywood bathroom vanity with drawer storage and mirror above vanity, including hardware, laminates on carcass, Acrylic or plain membrane on shutters BWR (upto Rs. 60/- psf) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar) | Granite / Quartz (upto Rs. 250/- psf)',
      sanitaryAndCP:
        'Sanitary Brands: Jaquar /Similar Inclusions: Sanitary Fittings (Faucets), Divertor Fittings, Bottle Trap etc.',
      door: 'Flush door with hardware, both side veneer with polish, and Chaukhat repairing & polishing Door 35mm hardwood (upto Rs. 125/-) | Hardware (Hettich or Hafele or similar) | Locks (Upto Rs.2,500/-)',
      upvcWindow:
        'Premium UPVC windows with 74mm shutter frame and 8mm toughened glass, and single wool pile UPVC (Fenesta or similar)',
      ShowerEnclosure: 'Shower enclosure with 8mm toughened glass partition',
      Electrical:
        'Electrical work with point relocation including switches & boards Wires (Havells or Polycab) | Switches (Anchor Penta or similar) | Lights (Orient or Similar)',
      Plumbing: '1 NOS: Plumbing work including pipes and all sanitary installation CPVC (Vectus or similar) | PVC (Vectus or similar) | Water Proofing'
    },
    ultraLuxury: {
      falseCeiling:
        'POP Ceiling with cove, heavy duty channel & wooden design element POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      wallTiles:
        'Tiling work including demolition, material (MYK Laticrete), grouting, cleaning, finishing Tile size 24"X48" (Price range upto Rs. 125/- psf)',
      Flooring:
        'Italian store flooring with installation and Diamond polish Italian stone (Price range upto Rs. 350/-)',
      bathroomVanity:
        'Standard TV Panel including hardware, laminates on carcass, veneer / PU polish on shutters BWR (upto Rs. 60/- psf) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar) | Granite / Quartz (upto Rs. 500/- psf)',
      sanitaryAndCP:
        'Sanitary Brands: Kohler/Similar Inclusions: Sanitary Fittings (Faucets), Divertor Fittings, Bottle Trap etc.',
      door: 'Flush door with hardware, both side veneer with polish / HDHMR with PU, and new marandi Chaukhat with mouldings Door 35mm Bhutan Tuff (upto Rs. 165/-) | Hardware (Hettich or Hafele or similar) | Locks (Upto Rs.3,500/-)',
      upvcWindow:
        'Premium UPVC windows with 90mm shutter frame and 12.5mm toughened glass, key locking and single wool pile UPVC (Fenesta or similar)',
      ShowerEnclosure:
        'Branded shower cubical including hardware and installation Cubical (Jaquar or similar, upto Rs. 35,000/-)',
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
        Plumbing: '1NOS: Plumbing work including pipes and all sanitary CPVC (Astral or similar) | PVC (Supreme or similar) | Water Proofing'
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

  // to reset the selectedPolygon and roomPrice to back to inital state when package is changed

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
  // -----------------------------------------------------------

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
          viewBox="0 0 2450 1702"
          style={{
            backgroundImage: 'url("/images/calculator/bathroom.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling*/}
          <polygon
            points="34,167,704,518,921,518,921,385,722,372,300,2"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="992,383,1081,524,1823,539,2449,184,2250,15,1789,401"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="590.3333333333334"
            y="284"
            width="339.5609588623047"
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
            x="655.3333333333334"
            y="327"
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
            points="1860,738,1971,730,1968,806,1856,808,1856,786,1858,767,1860,751"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="1879.857142857143"
            y="726.4285714285714"
            width="272.30894470214844"
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
            x="1944.857142857143"
            y="769.4285714285714"
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
            points="689,1174,917,1171,917,1420,936,1420,1079,1169,1239,1169,1228,1195,1235,1204,1254,1206,1269,1208,1289,1208,1310,1202,1317,1204,1310,1184,1302,1167,1455,1165,1473,1178,1503,1195,1568,1230,1916,1232,1936,1230,2423,1516,2429,1672,5,1657,62,1553"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1272.44"
            y="1234.16"
            width="252.82188415527344"
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
            x="1337.44"
            y="1277.16"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* --------------Shower Enclosure---------- */}
          <polygon
            points="925,290,945,288,1081,533,1077,1169,934,1418,919,1418"
            fill={
              selectedPolygon.includes('ShowerEnclosure')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('ShowerEnclosure')}
            style={{ cursor: 'pointer' }}
          />

          <rect
            x="970.1666666666666"
            y="809.6666666666666"
            width="438.0788879394531"
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
            x="1035.1666666666665"
            y="852.6666666666666"
            fontSize={40}
            id="ShowerEnclosure"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('ShowerEnclosure')}
            style={{ color: 'black' }}
          >
            Shower Enclosure
          </text>
          {/* -------Bathroom Vanity-------- */}
          <polygon
            points="1523,977,1469,977,1462,1178,1568,1234,1951,1230,1949,1033,1808,972,1800,974,1802,992,1791,1007,1769,1005,1776,989,1782,976,1717,974,1700,1009,1683,1018,1665,1026,1642,1024,1618,1026,1598,1022,1570,1018,1553,1007,1538,994"
            fill={
              selectedPolygon.includes('bathroomVanity')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('bathroomVanity')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1674.0869565217392"
            y="985.7826086956522"
            width="412.3992614746094"
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
            y="1028.7826086956522"
            x="1739.0869565217392"
            fontSize={40}
            id="bathroomVanity"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('bathroomVanity')}
            style={{ color: 'black' }}
          >
            Bathroom Vanity
          </text>
          {/* ------ Plumbing--------- */}
         <polygon
          points="55,925,430,886,427,1091,53,1223"
          fill={selectedPolygon.includes('Plumbing') ? 'green' : 'transparent'}
          fillOpacity="0.2"
          onClick={() => handlePolygonClick('Plumbing')}
          style={{ cursor: 'pointer' }}
        />

        <rect
          x="231.25"
          y="988.25"
          width="274.9938201904297"
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
          x="296.25"
          y="1031.25"
          fontSize={40}
          id="Plumbing"
          className="cursor-pointer"
          onClick={() => handlePolygonClick('Plumbing')}
          style={{ color: 'black' }}
        >
          Plumbing
        </text>
          {/* ----Walls Tiles------ */}
          <polygon
            points="42,169,696,515,923,520,923,630,873,628,871,604,837,589,828,591,819,600,813,611,795,613,776,621,778,628,791,621,804,624,811,624,826,628,832,634,834,637,837,630,828,619,821,613,832,602,843,600,860,608,867,619,867,639,871,725,873,823,873,845,841,842,845,851,858,851,856,868,804,873,798,881,795,896,811,896,813,881,852,879,845,903,860,905,865,886,873,877,888,881,888,864,869,868,867,851,888,849,886,840,880,840,878,801,873,667,871,628,923,630,917,1174,696,1171,687,1174,62,1550,57,1221,430,1091,430,888,412,890,393,890,367,892,345,894,324,896,302,896,282,899,265,901,252,903,235,905,222,907,200,907,183,909,168,912,150,914,131,914,114,918,92,918,77,918,64,922,51,925,53,907,51,888,51,864,51,845,51,823,51,808,49,788,49,769,49,751,49,732,49,710,49,691,47,671,44,647,44,630,47,611,44,591,42,567,42,550,44,531,44,509,42,489,42,463,42,444,44,424,44,405,42,379,44,355,44,331,42,312,42,290,44,253"
            fill={
              selectedPolygon.includes('wallTiles') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('wallTiles')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1083,526,1821,537,1810,972,1800,974,1800,955,1784,957,1784,966,1765,961,1763,968,1782,970,1722,972,1707,968,1687,972,1663,970,1639,966,1639,957,1652,957,1661,957,1659,951,1648,944,1650,929,1670,927,1689,927,1711,927,1730,927,1771,927,1774,896,1780,643,1471,645,1471,925,1490,925,1605,927,1601,944,1601,953,1570,953,1583,957,1585,968,1525,964,1525,979,1468,979,1466,1167,1432,1165,1304,1167,1295,1152,1339,1089,1323,1091,1326,1000,1263,1000,1263,972,1285,970,1291,944,1233,946,1233,974,1265,972,1263,1000,1215,1000,1215,1085,1207,1091,1211,1107,1215,1122,1222,1139,1243,1150,1243,1169,1075,1167,1081,797,1178,801,1386,799,1386,641,1174,637,1178,801,1081,797"
            fill={
              selectedPolygon.includes('wallTiles') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('wallTiles')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1821,535,2447,182,2449,1533,2323,1455,2343,481,1994,598,1968,1260,1947,1236,1971,730,1858,734,1856,806,1968,801,1958,1035,1951,1033,1810,974"
            fill={
              selectedPolygon.includes('wallTiles') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('wallTiles')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="468.704347826087"
            y="702.6086956521739"
            width="277.5487976074219"
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
            x="533.704347826087"
            y="745.6086956521739"
            fontSize={40}
            id="wallTiles"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('wallTiles')}
            style={{ color: 'black' }}
          >
            Walls Tiles
          </text>
          {/* -------------- UPVC Window ----------- */}
          <polygon
            points="1178,639,1391,641,1384,797,1181,799"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1273.5"
            y="676"
            width="372.342529296875"
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
            y="719"
            x="1338.5"
            fontSize={40}
            id="upvcWindow"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ color: 'black' }}
          >
            UPVC Window
          </text>
          {/* --------door----------- */}
          <polygon
            points="1994,598,2341,481,2323,1459,1968,1252"
            fill={selectedPolygon.includes('door') ? 'green' : 'transparent'}
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('door')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="2146.5"
            y="904.5"
            width="191.37267303466797"
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
            x="2211.5"
            y="947.5"
            fontSize={40}
            id="Door"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Door')}
            style={{ color: 'black' }}
          >
            Door
          </text>
          {/* ----------sanitary and cp----------- */}
          <polygon
            points="1217,1003,1326,1000,1326,1087,1336,1096,1330,1115,1323,1135,1315,1143,1295,1154,1300,1169,1306,1182,1310,1193,1313,1204,1300,1206,1285,1208,1261,1208,1237,1202,1230,1195,1235,1180,1243,1165,1246,1154,1239,1145,1224,1139,1215,1126,1213,1111,1207,1098,1217,1087"
            fill={
              selectedPolygon.includes('sanitaryAndCP')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('sanitaryAndCP')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1527,968,1583,968,1583,955,1572,953,1594,951,1594,966,1601,966,1601,953,1603,935,1609,925,1620,925,1635,922,1646,927,1650,940,1646,946,1635,948,1631,940,1624,944,1620,955,1622,964,1631,966,1635,959,1644,953,1659,955,1655,957,1639,961,1637,968,1657,970,1674,968,1702,968,1717,970,1713,983,1704,996,1694,1007,1672,1016,1652,1020,1616,1022,1585,1024,1562,1013,1546,1003"
            fill={
              selectedPolygon.includes('sanitaryAndCP')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('sanitaryAndCP')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="780,628,795,621,808,621,821,626,832,632,834,637,832,619,819,611,828,602,839,600,856,608,865,611,867,634,867,656,867,676,867,710,873,845,834,845,841,849,845,851,860,851,858,868,826,868,811,870,798,879,795,896,800,896,811,894,813,881,834,879,852,877,847,888,849,907,860,907,860,886,871,879,888,879,886,866,862,866,867,851,888,849,878,836,873,600,834,587,813,608,793,611"
            fill={
              selectedPolygon.includes('sanitaryAndCP')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('sanitaryAndCP')}
            style={{ cursor: 'pointer' }}
          />
          <polygon
            points="1237,951,1291,944,1285,974,1233,972"
            fill={
              selectedPolygon.includes('sanitaryAndCP')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('sanitaryAndCP')}
            style={{ cursor: 'pointer' }}
          />
          <rect
            x="1261.1153846153845"
            y="1099.5"
            width="403.6517333984375"
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
            x="1326.1153846153845"
            y="1142.5"
            fontSize={40}
            id="sanitaryAndCP"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('sanitaryAndCP')}
            style={{ color: 'black' }}
          >
            Sanitary and CP
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
                {polygon === 'wallTiles' ||
                polygon === 'Flooring' ||
                polygon === 'walls' ||
                polygon === 'tvpanel' ||
                polygon == 'upvcWindow' ||
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
                <span style={{ color: 'green', fontSize: '20px' }}>
                  ₹{calculateSpacePrice(polygon, selectedPackage)}
                </span>
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

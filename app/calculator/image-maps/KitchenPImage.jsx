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
      upvcWindow: { pricePerSqFt: 7900 },
      falseCeiling: { pricePerSqFt: 180 },
      Electrical: { price: 10000 },
      Plumbing: { price: 18000 },
      'Base Cabinets Panel 1': { pricePerSqFt: 1380 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 1480 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 1180 },
      'Base Cabinets Panel 2': { pricePerSqFt: 1380 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 1480 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 1180 },
      CounterTop: { pricePerSqFt: 345 },
      KitchenWalls: { pricePerSqFt: 175},
      Flooring: { pricePerSqFt: 175 },
    },
    luxury: {
      KitchenCabinets: { pricePerSqFt: 1450 },
      walls: { pricePerSqFt: 65 },
      upvcWindow: { pricePerSqFt: 1080 },
      falseCeiling: { pricePerSqFt: 205 },
      Electrical: { price: 18000 },
      Plumbing: { price: 22000 },
      'Base Cabinets Panel 1': { pricePerSqFt: 1980 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 1980 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 1680 },
      'Base Cabinets Panel 2': { pricePerSqFt: 1980 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 1980 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 1680 },
      CounterTop: { pricePerSqFt: 490 },
      KitchenWalls: { pricePerSqFt: 215},
      Flooring: { pricePerSqFt: 215 },
    },
    ultraLuxury: {
      KitchenCabinets: { pricePerSqFt: 1800 },
      walls: { pricePerSqFt: 90 },
      upvcWindow: { pricePerSqFt: 1480 },
      falseCeiling: { pricePerSqFt: 245 },
      Electrical: { price: 25000 },
      Plumbing: { price: 28000 },
      'Base Cabinets Panel 1': { pricePerSqFt: 2480 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 2480 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 2180 },
      'Base Cabinets Panel 2': { pricePerSqFt: 2480 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 2480 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 2180 },
      CounterTop: { pricePerSqFt: 790 },
      KitchenWalls: { pricePerSqFt: 490 },
      Flooring: { pricePerSqFt: 499 },
    },
  }
  const descriptions = {
    premium: {
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
      CounterTop:
        'Counter top in composite or quartz with 40mm thickness moulding Composite or Quartz (upto Rs. 500/- psf)',
      Plumbing:
        'Plumbing work with point shifting, excluding drain point shifting CP fitting (Kohler or Grohe or similar)',
      KitchenWalls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
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
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
      'Base Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Base Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
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
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      'Base Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Base Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',

      // Add descriptions for luxury package components...
    },
    ultraLuxury: {
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
      CounterTop:
        'Counter top in composite or quartz with 40mm thickness moulding Composite or Quartz (upto Rs. 500/- psf)',
      Plumbing:
        'Plumbing work with point shifting, excluding drain point shifting CP fitting (Kohler or Grohe or similar)',
      KitchenWalls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
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
      Flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      'Base Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Base Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in Veneer / PU polish (2 glass shutters), including hardware Hardware (Hettich/Hafele or similar) | 0.8 mm Laminate (Skydecor or similar)',

      // Add descriptions for ultra luxury package components...
    },
    // Add descriptions for other packages...
  }
  const initialSquareFootage = {
    falseCeiling: 80,
    Flooring: 80,
    upvcWindow: 20,
    walls: 65,
    CounterTop: 96,
    KitchenWalls: 196,
    KitchenCabinets: 50,
    'Base Cabinets Panel 1': 25,
    'Wall Cabinets Panel 1': 25,
    'Loft Cabinets Panel 1': 25,
    'Base Cabinets Panel 2': 25,
    'Wall Cabinets Panel 2': 25,
    'Loft Cabinets Panel 2': 25,
  }
  //hello world
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
          viewBox="0 0 3300 2434"
          style={{
            backgroundImage: 'url("/images/calculator/PshapeKitchen.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false celling */}
          <polygon
            points="853,3,1468,682,2240,679,2911,0"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1858"
            y="298"
            width="339.29966735839844"
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
            x="1923"
            y="341"
            fontSize={40}
            id="falseCeiling"
            onClick={() => handlePolygonClick('falseCeiling')}
            className="cursor-pointer"
            style={{ color: 'black' }}
          >
            False Ceiling
          </text>
          {/* electrical */}
          <polygon
            points="-1,1239,232,1210,238,1414,-4,1466"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="106.25"
            y="1289.25"
            width="272.10377502441406"
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
            x="171.25"
            y="1332.25"
            fontSize={40}
            className="cursor-pointer"
            id="Electrical"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ color: 'black' }}
          >
            Electrical
          </text>
          {/* flooring */}
          <polygon
            points="806,2431,1567,1440,1581,1428,1576,1408,2124,1411,2130,1431,3013,2431"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1818.142857142857"
            y="1668.4285714285713"
            width="252.63067626953125"
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
            x="1883.142857142857"
            y="1711.4285714285713"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* base cabs 1 */}
          <polygon
            points="1,1860,1567,1204,1576,1440,800,2431,4,2431"
            fill={
              selectedPolygon.includes('Base Cabinets Panel 1')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Base Cabinets Panel 1')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="779.6"
            y="1830.2"
            width="516.3403015136719"
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
            x="844.6"
            y="1873.2"
            fontSize={40}
            id="Base Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Base Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Base Cabinets Panel 1
          </text>
          {/* wall cabs 1 */}
          <polygon
            points="931,519,934,670,928,770,1217,869,1366,874,1366,796,1468,857,1465,1061,1389,1058,1214,1041,1217,869,928,770,926,994,818,988,759,991,666,988,611,988,579,985,547,988,520,988,482,982,456,982,427,979,383,977,357,971,316,968,275,968,241,968,191,959,136,950,71,947,25,944,7,944,7,-3,106,-3,179,44,261,93,322,131,372,160,447,204,538,262,617,318,701,364,809,437,870,472"
            fill={
              selectedPolygon.includes('Wall Cabinets Panel 1')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 1')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="622.1111111111111"
            y="692.1555555555556"
            width="500.9812316894531"
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
            x="687.1111111111111"
            y="735.1555555555556"
            fontSize={40}
            id="Wall Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Wall Cabinets Panel 1
          </text>
          {/* loft cabs 1 */}
          <polygon
            points="124,0,853,0,928,85,1369,580,1465,688,1465,854,1363,790,1366,872,1214,866,931,767,934,513"
            fill={
              selectedPolygon.includes('Loft Cabinets Panel 1')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 1')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1082"
            y="503.81818181818187"
            width="498.9242248535156"
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
            x="1147"
            y="546.8181818181819"
            fontSize={40}
            id="Loft Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Loft Cabinets Panel 1
          </text>
          {/* base cabs 2 */}
          <polygon
            points="2132,1218,2337,1306,2736,1484,3296,1723,3296,2431,3115,2431,3019,2431,2736,2119,2331,1659,2127,1425"
            fill={
              selectedPolygon.includes('Base Cabinets Panel 2')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Base Cabinets Panel 2')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2702.5"
            y="1779.7"
            width="521.9627990722656"
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
            x="2767.5"
            y="1822.7"
            fontSize={40}
            id="Base Cabinets Panel 2"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Base Cabinets Panel 2')}
            style={{ color: 'black' }}
          >
            Base Cabinets Panel 2
          </text>
          {/* wall cabs 2 */}
          <polygon
            points="2237,851,2334,796,2730,563,3299,224,3299,898,3299,953,3051,982,2984,982,2730,979,2730,563,2334,796,2334,1029,2421,1029,2331,1044,2229,1038"
            fill={
              selectedPolygon.includes('Wall Cabinets Panel 2')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 2')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2679.4666666666667"
            y="805.4666666666667"
            width="506.603759765625"
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
            x="2744.4666666666667"
            y="848.4666666666667"
            fontSize={40}
            id="Wall Cabinets Panel 2"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 2')}
            style={{ color: 'black' }}
          >
            Wall Cabinets Panel 2
          </text>
          {/* loft cabs 2 */}
          <polygon
            points="2240,682,2334,583,2727,192,2917,0,3299,-3,3299,224,2727,560,2331,790,2234,848"
            fill={
              selectedPolygon.includes('Loft Cabinets Panel 2')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 2')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2668.6666666666665"
            y="387.6666666666667"
            width="504.5467224121094"
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
            x="2733.6666666666665"
            y="430.6666666666667"
            fontSize={40}
            id="Loft Cabinets Panel 2"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 2')}
            style={{ color: 'black' }}
          >
            Loft Cabinets Panel 2
          </text>
          {/* counter top */}
          <polygon
            points="255,1425,908,1437,1363,1265,1039,1259,1366,1189,1564,1189,1570,1201,756,1542,707,1565,660,1580,631,1592,593,1606,561,1621,529,1632,503,1650,471,1659,439,1667,404,1685,375,1697,348,1708,325,1723,290,1737,246,1755,-4,1860,4,1816,4,1787,4,1755,4,1691,1,1664,1,1641,1,1612,-1,1580,1,1554,1,1527,-1,1498,-4,1478,19,1472,42,1475,57,1469,83,1463,101,1460,121,1455,141,1452,165,1443,197,1437,220,1434"
            fill={
              selectedPolygon.includes('CounterTop') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <polygon
            points="2736,1434,3296,1425,3299,1653,3299,1723,2733,1478"
            fill={
              selectedPolygon.includes('CounterTop') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <polygon
            points="2124,1195,2331,1192,2678,1271,2334,1280,2334,1303,2121,1210"
            fill={
              selectedPolygon.includes('CounterTop') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="360.8695652173913"
            y="1509.3260869565217"
            width="333.8143005371094"
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
            x="425.8695652173913"
            y="1552.3260869565217"
            fontSize={40}
            id="CounterTop"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ color: 'black' }}
          >
            Counter Top
          </text>
          {/* plumbing */}
          <polygon
            points="273,1423,789,1315,783,1297,789,1280,803,1274,803,1251,803,1216,812,1198,826,1189,847,1189,861,1207,864,1227,864,1245,867,1262,870,1277,841,1286,829,1218,844,1245,838,1224,829,1218,824,1239,824,1259,832,1277,841,1291,829,1303,993,1268,990,1251,987,1242,996,1233,1001,1210,1004,1186,1007,1178,1016,1169,1022,1166,1039,1169,1045,1183,1048,1207,1051,1221,1033,1233,1031,1216,1028,1189,1016,1201,1016,1227,1022,1233,1031,1248,1025,1259,1039,1256,1360,1265,1325,1283,1290,1291,1267,1300,1249,1309,1229,1315,1211,1318,1191,1326,1168,1338,1147,1347,1127,1353,1106,1358,1086,1367,1068,1373,1048,1379,1036,1390,1013,1396,987,1405,961,1414,940,1423,908,1437"
            fill={
              selectedPolygon.includes('Plumbing') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Plumbing')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="965.6176470588235"
            y="1229.6764705882354"
            width="274.70933532714844"
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
            x="1030.6176470588234"
            y="1272.6764705882354"
            fontSize={40}
            id="Plumbing"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Plumbing')}
            style={{ color: 'black' }}
          >
            Plumbing
          </text>
          {/* walls */}
          <polygon
            points="1106,831,1127,837,1159,848,1188,857,1214,863,1211,1046,1366,1061,1360,1189,1316,1201,1287,1204,1264,1213,1243,1216,1203,1221,1176,1230,1150,1233,1118,1239,1080,1248,1048,1253,1028,1256,1031,1239,1022,1224,1016,1204,1028,1189,1031,1221,1039,1227,1054,1227,1051,1201,1048,1175,1031,1166,1013,1169,1001,1183,996,1198,996,1230,984,1242,987,1256,993,1265,835,1300,841,1288,859,1283,870,1265,859,1251,867,1230,864,1207,841,1186,815,1192,806,1210,803,1251,800,1277,786,1286,786,1300,794,1312,261,1428,264,1192,-4,1210,-1,947,118,959,162,962,206,962,246,965,293,974,331,979,383,977,424,977,468,982,506,982,538,988,579,988,622,988,660,991,710,991,748,991,780,991,812,991,832,991,870,994,896,994,934,994,934,965,931,939,934,912,928,883,934,857,928,834,931,810,934,784,931,767,955,778,984,790,1004,793,1022,796,1042,805,1063,810,1083,822"
            fill={
              selectedPolygon.includes('KitchenWalls') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <polygon
            points="1471,682,2234,679,2229,1044,2328,1044,2541,1026,2864,997,2987,985,3045,985,3299,956,3299,1396,2334,1195,2118,1192,2118,1218,2127,1218,2124,1408,2060,1408,2057,1367,2063,869,1666,872,1660,1367,2057,1367,2060,1408,1576,1405,1573,1186,1363,1186,1369,1061,1462,1052"
            fill={
              selectedPolygon.includes('KitchenWalls') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="856.3118279569892"
            y="1034.774193548387"
            width="353.15025329589844"
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
            x="921.3118279569892"
            y="1077.774193548387"
            fontSize={40}
            id="KitchenWalls"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ color: 'black' }}
          >
            Kitchen Walls
          </text>
          {/* upvc window */}
          <polygon
            points="1666,869,2060,872,2057,1373,1660,1361"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1850.75"
            y="1075.75"
            width="371.93768310546875"
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
            x="1915.75"
            y="1118.75"
            fontSize={40}
            id="upvcWindow"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ color: 'black' }}
          >
            UPVC Window
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
                {polygon === 'CounterTop' ||
                polygon === 'Flooring' ||
                polygon === 'walls' ||
                polygon === 'KitchenWalls' ||
                polygon == 'upvcWindow' ||
                polygon === 'falseCeiling' ||
                polygon === 'Base Cabinets Panel 1' ||
                polygon === 'Wall Cabinets Panel 1' ||
                polygon === 'Loft Cabinets Panel 1' ||
                polygon === 'Base Cabinets Panel 2' ||
                polygon === 'Wall Cabinets Panel 2' ||
                polygon === 'Loft Cabinets Panel 2' ||
                polygon === 'KitchenCabinets' ? (
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

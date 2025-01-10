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
      upvcWindow: { pricePerSqFt: 780 },
      falseCeiling: { pricePerSqFt: 180 },
      Electrical: { price: 5000 },
      Plumbing: { price: 18000 },
      'Base Cabinets Panel 1': { pricePerSqFt: 1380 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 1480 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 1180 },
      'Base Cabinets Panel 2': { pricePerSqFt: 1380 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 1480 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 1180 },
      CounterTop: { pricePerSqFt: 345 },
      KitchenWalls: { pricePerSqFt: 175 },
      Flooring: { pricePerSqFt: 178 },
    },
    luxury: {
      KitchenCabinets: { pricePerSqFt: 1450 },
      walls: { pricePerSqFt: 65 },
      upvcWindow: { pricePerSqFt: 1080 },
      falseCeiling: { pricePerSqFt: 205 },
      Electrical: { price: 18000 },
      Plumbing: { price: 22000},
      'Base Cabinets Panel 1': { pricePerSqFt: 1980 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 1980 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 1680 },
      'Base Cabinets Panel 2': { pricePerSqFt: 1980 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 1980 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 1680 },
      CounterTop: { pricePerSqFt: 490 },
      KitchenWalls: { pricePerSqFt: 215 },
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
      Electrical:
        'Electrical work with new points, relocation including switches & boards Wires (Havells or Polycab) | Switches (Legrand or Crabtree or similar) | Lights (Orient or Similar)',
      CounterTop:
        'Counter top in composite or quartz with 40mm thickness moulding Composite or Quartz (upto Rs. 500/- psf)',
      Plumbing:
        'Plumbing work with point shifting, excluding drain point shifting CP fitting (Kohler or Grohe or similar)',
      KitchenWalls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
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
    walls: 196,
    Plumbing: 50,
    CounterTop: 96,
    KitchenWalls: 196,
    KitchenCabinets: 50,
    'Base Cabinets Panel 1': 25,
    'Wall Cabinets Panel 1': 25,
    'Loft Cabinets Panel 1': 26,
    'Base Cabinets Panel 2': 20,
    'Wall Cabinets Panel 2': 20,
    'Loft Cabinets Panel 2': 20,
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
          viewBox="0 0 3159 2550"
          style={{
            backgroundImage: 'url("/images/calculator/LshapeKitchen.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling */}
          <polygon
            points="981,-3,1120,204,1983,201,2326,193,2580,184,2879,176,2973,184,3155,187,3158,0"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          ></polygon>

          <rect
            x="2340.5555555555557"
            y="104.33333333333334"
            width="339.58763122558594"
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
            x="2405.5555555555557"
            y="147.33333333333334"
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
            points="2290,1108,2471,1113,2468,1200,2287,1202"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2369"
            y="1112.75"
            width="272.37181091308594"
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
            x="2434"
            y="1155.75"
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
            points="453,2547,680,2263,875,2003,1009,1833,1475,1833,1676,1827,2184,1839,2806,1853,2831,1853,2828,1733,2831,1671,3158,1671,3158,1724,3155,2547,2332,2547,1653,2547,1165,2544,950,2547,755,2547"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1883.3684210526317"
            y="2058.5263157894738"
            width="252.94224548339844"
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
            x="1948.3684210526317"
            y="2101.5263157894738"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* base cabinets */}
          <polygon
            points="4,1995,236,1844,501,1674,1026,1350,1009,1833,878,2000,674,2257,453,2547,4,2547"
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
            x="521.6666666666666"
            y="1962.2222222222222"
            width="516.9481201171875"
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
            x="586.6666666666666"
            y="2005.2222222222222"
            fontSize={40}
            id="Base Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Base Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Base Cabinets Panel 1
          </text>
          {/* wall cabinets */}
          <polygon
            points="4,-3,484,279,710,413,1031,603,1017,912,933,907,202,848,205,608,1,566"
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
            x="499.6666666666667"
            y="527.3333333333334"
            width="501.5882568359375"
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
            x="564.6666666666667"
            y="570.3333333333334"
            fontSize={40}
            id="Wall Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Wall Cabinets Panel 1
          </text>
          {/* Loft cabinets */}
          <polygon
            points="774,11,1048,310,1034,603,7,0,498,-3"
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
            x="662.2"
            y="141.2"
            width="499.4877624511719"
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
            x="727.2"
            y="184.2"
            fontSize={40}
            id="Loft Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Loft Cabinets Panel 1
          </text>
          {/* base cabinets p2 */}
          <polygon
            points="1028,1356,1408,1359,1941,1361,2413,1370,2823,1375,2826,1853,2357,1839,1656,1825,1006,1836"
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
            x="1929.7777777777778"
            y="1531.888888888889"
            width="522.5932006835938"
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
            x="1994.7777777777778"
            y="1574.888888888889"
            fontSize={40}
            id="Base Cabinets Panel 2"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Base Cabinets Panel 2')}
            style={{ color: 'black' }}
          >
            Base Cabinets Panel 2
          </text>
          {/* wall cabinets p2 */}
          <polygon
            points="1020,868,1034,603,1235,608,1433,611,1969,617,2178,605,2644,594,2636,896,2549,904,1944,921,1938,904,1946,633,1723,633,1720,617,1659,611,1662,636,1430,631,1419,904,1430,918,1017,912,1026,801,1031,714,1034,667,1034,636"
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
            x="1602.9583333333333"
            y="683.8333333333334"
            width="507.23333740234375"
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
            x="1667.9583333333333"
            y="726.8333333333334"
            fontSize={40}
            id="Wall Cabinets Panel 2"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 2')}
            style={{ color: 'black' }}
          >
            Wall Cabinets Panel 2
          </text>
          {/* loft cabinets p2 */}
          <polygon
            points="1053,310,1444,315,1980,318,2181,312,2359,307,2652,296,2639,594,2357,600,1969,614,1430,611,1034,605"
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
            x="1908"
            y="400.8181818181818"
            width="505.1328430175781"
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
            x="1973"
            y="443.8181818181818"
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
            points="1,1986,1028,1348,1408,1353,1944,1359,2831,1367,2823,1322,2479,1216,1857,1208,1941,1317,1946,1359,1408,1353,1408,1311,1483,1208,1430,1208,1249,1205,1095,1202,936,1197,850,1225,825,1233,802,1239,780,1247,763,1253,744,1264,721,1272,696,1278,671,1286,643,1295,613,1300,593,1308,560,1320,532,1325,498,1339,453,1356,894,1373,504,1590,1,1568"
            fill={
              selectedPolygon.includes('CounterTop') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1084.7222222222222"
            y="1278.9444444444443"
            width="334.07383728027344"
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
            x="1149.7222222222222"
            y="1321.9444444444443"
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
            points="4,1509,328,1401,320,1375,336,1348,339,1314,339,1275,342,1239,356,1219,373,1205,398,1197,420,1205,437,1225,440,1247,437,1269,440,1297,392,1292,392,1272,400,1267,403,1247,395,1236,384,1236,375,1255,373,1278,370,1295,370,1311,370,1334,387,1342,389,1359,389,1378,448,1356,892,1373,841,1403,797,1426,760,1445,741,1459,716,1473,688,1487,668,1498,626,1521,610,1534,576,1554,540,1574,498,1593,-1,1568"
            fill={
              selectedPolygon.includes('Plumbing') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Plumbing')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="446.77272727272725"
            y="1313.6136363636363"
            width="274.9974365234375"
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
            x="511.77272727272725"
            y="1356.6136363636363"
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
            points="1,840,202,851,448,876,593,887,939,910,1106,915,1257,918,1430,921,1441,923,1944,923,1955,918,2485,912,2477,1219,2468,1219,2468,1200,2471,1110,2293,1108,2287,1202,2466,1200,2466,1219,2080,1214,1916,1208,1743,1208,1592,1208,1430,1208,1249,1202,1093,1202,933,1197,582,1308,392,1375,389,1342,370,1331,373,1306,375,1272,378,1247,392,1236,400,1250,400,1264,389,1275,389,1289,440,1295,442,1264,440,1225,417,1202,389,1197,370,1205,347,1228,342,1253,333,1348,322,1373,325,1401,1,1507"
            fill={
              selectedPolygon.includes('KitchenWalls') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1032.8846153846155"
            y="1128.3653846153845"
            width="353.50340270996094"
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
            x="1097.8846153846155"
            y="1171.3653846153845"
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
            points="2655,388,3077,396,3060,1177,2482,1172,2488,912,2641,898"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2723.8333333333335"
            y="780.8333333333334"
            width="372.4078369140625"
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
            x="2788.8333333333335"
            y="823.8333333333334"
            fontSize={40}
            id="upvcWindow"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ color: 'black' }}
          >
            UPVC Window
          </text>
          {/*  */}
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

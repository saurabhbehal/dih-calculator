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
      upvcWindow: { pricePerSqFt: 750 },
      falseCeiling: { pricePerSqFt: 180 },
      Electrical: { price: 7500 },
      Plumbing: { price: 17500 },
      'Base Cabinets Panel 1': { pricePerSqFt: 1380 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 1380 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 1180 },
      'Base Cabinets Panel 2': { pricePerSqFt: 1500 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 1500 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 1150 },
      CounterTop: { pricePerSqFt: 345 },
      KitchenWalls: { pricePerSqFt: 175 },
      Flooring: { pricePerSqFt: 175 },
    },
    luxury: {
      KitchenCabinets: { pricePerSqFt: 1450 },
      walls: { pricePerSqFt: 65 },
      upvcWindow: { pricePerSqFt: 1180 },
      falseCeiling: { pricePerSqFt: 205 },
      Electrical: { price: 14500 },
      Plumbing: { price: 22000},
      'Base Cabinets Panel 1': { pricePerSqFt: 1980 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 1980 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 1680 },
      'Base Cabinets Panel 2': { pricePerSqFt: 1800 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 1800 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 1800 },
      CounterTop: { pricePerSqFt: 490 },
      KitchenWalls: { pricePerSqFt: 215 },
      Flooring: { pricePerSqFt: 215 },
    },
    ultraLuxury: {
      KitchenCabinets: { pricePerSqFt: 1800 },
      walls: { pricePerSqFt: 90 },
      upvcWindow: { pricePerSqFt: 1490 },
      falseCeiling: { pricePerSqFt: 245 },
      Electrical: { price: 21000 },
      Plumbing: { price: 28000 },
      'Base Cabinets Panel 1': { pricePerSqFt: 2480 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 2480 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 2180 },
      'Base Cabinets Panel 2': { pricePerSqFt: 2500 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 2500 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 2500 },
      CounterTop: { pricePerSqFt: 780 },
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
          viewBox="0 0 3300 2200"
          style={{
            backgroundImage: 'url("/images/calculator/straightkitchen.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false ceiling */}
          <polygon
            points="401,181,1541,198,3223,192,3220,-3,89,-3,10,3"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1404"
            y="51.66666666666667"
            width="339.3092956542969"
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
            x="1469"
            y="94.66666666666667"
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
            points="2447,851,2608,851,2608,921,2456,927"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2519.75"
            y="844.5"
            width="272.11070251464844"
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
            x="2584.75"
            y="887.5"
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
            points="1,1448,756,1445,1086,1451,1380,1451,1806,1454,2287,1463,2724,1469,3054,1477,3059,1539,3296,1737,3299,1845,3299,1990,3293,2197,2888,2197,2587,2197,2258,2197,1,2197"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2170.823529411765"
            y="1707.235294117647"
            width="252.63682556152344"
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
            x="2235.823529411765"
            y="1750.235294117647"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* base cobinets 1 */}
          <polygon
            points="4,1087,366,1093,759,1099,1077,1099,1380,1101,1596,1104,1800,1101,2039,1107,2290,1110,2511,1116,2838,1119,3074,1116,3077,1472,2826,1472,2506,1463,2284,1460,2030,1457,1800,1451,1596,1448,1377,1445,1077,1445,754,1445,357,1442,-4,1445"
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
            x="1632.25"
            y="1236.0416666666667"
            width="516.3570251464844"
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
            x="1697.25"
            y="1279.0416666666667"
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
            points="34,452,255,449,622,457,800,457,993,460,1380,463,1383,484,1812,481,1812,460,2803,452,2803,676,1803,676,1812,481,1383,484,1380,676,987,673,797,670,622,670,249,664,31,659"
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
            x="1178.05"
            y="504.20000000000005"
            width="500.9973449707031"
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
            x="1243.05"
            y="547.2"
            fontSize={40}
            id="Wall Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Wall Cabinets Panel 1
          </text>
          {/* loft cabinets */}
          <polygon
            points="28,274,249,280,430,283,622,283,797,286,990,291,1185,291,1389,294,1812,294,2197,291,2800,288,2806,455,2194,460,1809,460,1809,481,1389,484,1386,463,1176,460,990,460,800,457,625,455,433,452,249,446,34,449"
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
            x="1164.9583333333333"
            y="337.7083333333333"
            width="498.94024658203125"
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
            x="1229.9583333333333"
            y="380.7083333333333"
            fontSize={40}
            id="Loft Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Loft Cabinets Panel 1
          </text>
          {/* counter top */}
          <polygon
            points="1,1043,765,1052,990,944,1442,947,1386,1055,1806,1061,1759,950,2115,953,2281,953,2494,956,2686,956,3094,1072,3094,1116,2841,1113,2511,1113,2290,1110,2033,1107,1800,1101,1383,1096,366,1093,1,1084"
            fill={
              selectedPolygon.includes('CounterTop') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1758.4761904761904"
            y="998.6666666666667"
            width="333.8236999511719"
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
            x="1823.4761904761904"
            y="1041.6666666666667"
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
            points="1,979,203,941,462,941,459,877,433,912,413,912,430,874,450,857,471,860,482,877,491,897,491,927,494,941,517,941,555,941,587,944,759,944,762,932,771,932,768,906,765,880,756,874,745,892,742,909,736,915,719,912,719,897,733,880,742,860,759,851,774,860,786,877,789,897,794,918,800,944,984,947,759,1052,724,1049,701,1049,678,1049,657,1049,628,1052,590,1049,564,1046,520,1046,485,1046,450,1046,421,1046,392,1043,363,1049,337,1046,302,1046,278,1046,246,1043,217,1046,185,1046,162,1043,136,1043,112,1043,86,1043,66,1040,39,1040,1,1040"
            fill={
              selectedPolygon.includes('Plumbing') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Plumbing')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="504.93650793650795"
            y="923.4126984126984"
            width="274.7163543701172"
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
            x="569.936507936508"
            y="966.4126984126984"
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
            points="203,667,526,670,832,676,1133,679,1450,682,1765,679,2115,679,2436,673,2745,676,2748,970,2692,950,2608,956,2611,927,2608,854,2450,854,2456,927,2613,927,2608,956,2424,956,2115,950,1756,947,1716,950,1678,950,1637,950,1599,947,1570,947,1541,947,1512,947,1482,947,1459,947,1436,947,1401,947,1351,947,1305,944,1243,944,1200,944,1165,944,1144,944,1115,944,1074,944,1051,941,797,941,791,909,789,883,783,863,768,851,745,857,736,871,724,889,716,906,724,915,739,912,745,892,756,874,765,886,765,906,771,932,759,935,759,941,491,941,491,909,488,874,471,857,453,854,436,863,427,877,413,903,415,915,445,912,447,892,456,883,459,915,459,938,203,935"
            fill={
              selectedPolygon.includes('KitchenWalls') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1216.472972972973"
            y="846.2972972972973"
            width="353.1604461669922"
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
            x="1281.472972972973"
            y="889.2972972972973"
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
            points="2806,428,3097,428,3100,734,3100,781,3103,813,3103,851,3103,883,3103,903,3013,897,2931,900,2855,900,2748,897,2748,676,2806,670,2806,632,2806,594,2803,554,2806,525,2803,495,2803,463"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2912.15"
            y="658.2"
            width="371.9486083984375"
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
            x="2977.15"
            y="701.2"
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

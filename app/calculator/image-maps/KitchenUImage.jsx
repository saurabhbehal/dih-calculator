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
      upvcWindow: { pricePerSqFt: 790 },
      falseCeiling: { pricePerSqFt: 185 },
      Electrical: { price: 12000 },
      Plumbing: { price: 18000 },
      'Base Cabinets Panel 1': { pricePerSqFt: 1380 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 1480 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 1180 },
      'Base Cabinets Panel 2': { pricePerSqFt: 1500 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 1480 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 1180 },
      'Base Cabinets Panel 3': { pricePerSqFt: 1500 },
      'Wall Cabinets Panel 3': { pricePerSqFt: 1480 },
      'Loft Cabinets Panel 3': { pricePerSqFt: 1180 },
      CounterTop: { pricePerSqFt: 345 },
      KitchenWalls: { pricePerSqFt: 175 },
      Flooring: { pricePerSqFt: 175 },
    },
    luxury: {
      KitchenCabinets: { pricePerSqFt: 1450 },
      walls: { pricePerSqFt: 65 },
      upvcWindow: { pricePerSqFt: 1080 },
      falseCeiling: { pricePerSqFt: 205 },
      Electrical: { price: 20000 },
      Plumbing: { price: 22000 },
      'Base Cabinets Panel 1': { pricePerSqFt: 1980 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 1980 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 1680 },
      'Base Cabinets Panel 2': { pricePerSqFt: 1980 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 1980 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 1680 },
      'Base Cabinets Panel 3': { pricePerSqFt: 1980 },
      'Wall Cabinets Panel 3': { pricePerSqFt: 1980 },
      'Loft Cabinets Panel 3': { pricePerSqFt: 1680 },
      CounterTop: { pricePerSqFt: 490 },
      KitchenWalls: { pricePerSqFt: 215 },
      Flooring: { pricePerSqFt: 215 },
    },
    ultraLuxury: {
      KitchenCabinets: { pricePerSqFt: 1800 },
      walls: { pricePerSqFt: 90 },
      upvcWindow: { pricePerSqFt: 1480 },
      falseCeiling: { pricePerSqFt: 245 },
      Electrical: { price: 30000 },
      Plumbing: { price: 28000 },
      'Base Cabinets Panel 1': { pricePerSqFt: 2480 },
      'Wall Cabinets Panel 1': { pricePerSqFt: 2480 },
      'Loft Cabinets Panel 1': { pricePerSqFt: 2180 },
      'Base Cabinets Panel 2': { pricePerSqFt: 2480 },
      'Wall Cabinets Panel 2': { pricePerSqFt: 2480 },
      'Loft Cabinets Panel 2': { pricePerSqFt: 2180 },
      'Base Cabinets Panel 3': { pricePerSqFt: 2480 },
      'Wall Cabinets Panel 3': { pricePerSqFt: 2480 },
      'Loft Cabinets Panel 3': { pricePerSqFt: 2180 },
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
    
      'Base Cabinets Panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 3':
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
      'Base Cabinets Panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 3':
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
      'Base Cabinets Panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'Wall Cabinets Panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'Loft Cabinets Panel 3':
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
    'Base Cabinets Panel 1': 170,
    'Wall Cabinets Panel 1': 50,
    'Loft Cabinets Panel 1': 50,
    'Base Cabinets Panel 2': 70,
    'Wall Cabinets Panel 2': 50,
    'Loft Cabinets Panel 2': 50,
    'Base Cabinets Panel 3': 70,
    'Wall Cabinets Panel 3': 50,
    'Loft Cabinets Panel 3': 50,
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
          viewBox="0 0 3509 2388"
          style={{
            backgroundImage: 'url("/images/calculator/UshapeKitchen.jpg")',
            backgroundSize: 'cover',
          }}
        >
          {/* false celling */}
          <polygon
            points="618,-3,2757,-3,2140,496,1300,490"
            fill={
              selectedPolygon.includes('falseCeiling') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('falseCeiling')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1693.75"
            y="202"
            width="339.2958068847656"
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
            x="1758.75"
            y="245"
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
            points="3142,1324,3433,1427,3436,1569,3135,1442"
            fill={
              selectedPolygon.includes('Electrical') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Electrical')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="3276.5"
            y="1397.5"
            width="272.21714782714844"
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
            x="3341.5"
            y="1440.5"
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
            points="590,2264,1071,1665,1247,1445,1266,1433,1564,1430,1926,1430,2075,1430,2239,1433,2295,1507,2463,1712,2642,1938,2918,2276,2921,2382,584,2385"
            fill={
              selectedPolygon.includes('Flooring') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="1832.9285714285713"
            y="1723.4285714285713"
            width="252.67684936523438"
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
            x="1897.9285714285713"
            y="1766.4285714285713"
            fontSize={40}
            className="cursor-pointer"
            id="Flooring"
            onClick={() => handlePolygonClick('Flooring')}
            style={{ color: 'black' }}
          >
            Flooring
          </text>
          {/* base cab 1 */}
          <polygon
            points="70,1762,581,1758,587,1799,1251,1231,1248,1448,587,2270,73,2255"
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
            x="618.1428571428571"
            y="1746"
            width="516.470947265625"
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
            x="683.1428571428571"
            y="1789"
            fontSize={40}
            id="Base Cabinets Panel 1"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Base Cabinets Panel 1')}
            style={{ color: 'black' }}
          >
            Base Cabinets Panel 1
          </text>
          {/* wall cab 1 */}
          <polygon
            points="628,654,786,657,1254,729,1251,965,795,1107,628,1116"
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
            x="880.3333333333334"
            y="828.3333333333334"
            width="501.1595153808594"
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
            x="945.3333333333334"
            y="871.3333333333334"
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
            points="618,288,777,285,1254,546,1251,726,780,654,625,648"
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
            x="874.1666666666666"
            y="481.5"
            width="499.11798095703125"
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
            x="939.1666666666666"
            y="524.5"
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
            points="1254,1231,1558,1234,1561,1259,1917,1262,1923,1241,2233,1244,2240,1436,1254,1436"
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
            x="1732.5"
            y="1249.875"
            width="522.1580505371094"
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
            x="1797.5"
            y="1292.875"
            fontSize={40}
            id="Base Cabinets Panel 2"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Base Cabinets Panel 2')}
            style={{ color: 'black' }}
          >
            Base Cabinets Panel 2
          </text>
          {/* walls cabs 2 */}
          <polygon
            points="1257,735,1558,732,1558,955,1251,958"
            fill={
              selectedPolygon.includes('Wall Cabinets Panel 2')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 2')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <polygon
            points="1920,726,2264,723,2264,949,1920,955"
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
            x="1396"
            y="802"
            width="506.7008056640625"
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
            x="1461"
            y="845"
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
            points="1257,549,2261,540,2264,720,1251,729"
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
            x="1748.25"
            y="591.5"
            width="504.6592712402344"
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
            x="1813.25"
            y="634.5"
            fontSize={40}
            id="Loft Cabinets Panel 2"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 2')}
            style={{ color: 'black' }}
          >
            Loft Cabinets Panel 2
          </text>
          {/* base cabs 3 */}
          <polygon
            points="2237,1250,2891,1805,3436,1820,3433,2252,2894,2267,2237,1439"
            fill={
              selectedPolygon.includes('Base Cabinets Panel 3')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Base Cabinets Panel 3')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2844.6666666666665"
            y="1762.5"
            width="523.3246459960938"
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
            x="2909.6666666666665"
            y="1805.5"
            fontSize={40}
            id="Base Cabinets Panel 3"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Base Cabinets Panel 3')}
            style={{ color: 'black' }}
          >
            Base Cabinets Panel 3
          </text>
          {/* wall cabs 3  */}
          <polygon
            points="2268,723,3139,589,3427,595,3436,1219,3139,1222,2264,952"
            fill={
              selectedPolygon.includes('Wall Cabinets Panel 3')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 3')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2935.5"
            y="840.3333333333334"
            width="508.0132141113281"
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
            x="3000.5"
            y="883.3333333333334"
            fontSize={40}
            id="Wall Cabinets Panel 3"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Wall Cabinets Panel 3')}
            style={{ color: 'black' }}
          >
            Wall Cabinets Panel 3
          </text>
          {/* loft cabs 3 */}
          <polygon
            points="2264,537,3132,109,3418,105,3427,595,3139,586,2268,720"
            fill={
              selectedPolygon.includes('Loft Cabinets Panel 3')
                ? 'green'
                : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 3')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2931.3333333333335"
            y="399"
            width="505.9716796875"
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
            x="2996.3333333333335"
            y="442"
            fontSize={40}
            id="Loft Cabinets Panel 3"
            className="cursor-pointer"
            onClick={() => handlePolygonClick('Loft Cabinets Panel 3')}
            style={{ color: 'black' }}
          >
            Loft Cabinets Panel 3
          </text>
          {/* counter top */}
          <polygon
            points="3439,1774,3436,1817,2887,1802,2230,1237,1920,1234,1917,1222,1880,1129,2308,1132,2466,1225,2571,1284,2639,1321,2720,1368,2763,1392,2838,1433,2878,1455,2925,1482"
            fill={
              selectedPolygon.includes('CounterTop') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <polygon
            points="1586,1129,1176,1132,907,1281,1155,1290,953,1455,603,1451,64,1758,587,1755,587,1783,1254,1228,1555,1231"
            fill={
              selectedPolygon.includes('CounterTop') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('CounterTop')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2603.5625"
            y="1351.1875"
            width="333.9003448486328"
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
            x="2668.5625"
            y="1394.1875"
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
            points="615,1448,956,1451,987,1423,1003,1411,1021,1396,1037,1383,1055,1368,1074,1358,1090,1343,1108,1327,1127,1312,1155,1287,1133,1287,1105,1287,1074,1287,1046,1287,1021,1287,990,1284,956,1287,897,1284,773,1352,770,1337,755,1337,755,1312,752,1284,755,1262,761,1244,767,1237,780,1234,792,1244,795,1262,798,1281,789,1293,792,1306,811,1309,826,1296,826,1281,817,1278,814,1259,804,1234,801,1219,783,1213,764,1216,749,1228,736,1244,730,1265,727,1293,730,1343,721,1368,727,1383"
            fill={
              selectedPolygon.includes('Plumbing') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('Plumbing')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="863"
            y="1261.22"
            width="274.8419647216797"
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
            x="928"
            y="1304.22"
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
            points="3135,1219,3132,1603,2308,1132,2311,968"
            fill={
              selectedPolygon.includes('KitchenWalls') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <polygon
            points="2308,968,2264,955,2233,955,1251,961,1179,986,783,1113,634,1116,631,1321,73,1563,70,1746,721,1380,718,1361,730,1343,730,1318,730,1287,730,1262,739,1237,770,1216,792,1213,808,1225,811,1241,817,1262,820,1281,826,1296,811,1306,792,1306,783,1287,792,1281,792,1256,780,1237,767,1237,755,1256,755,1284,755,1303,758,1330,770,1340,773,1349,1179,1129,2308,1132"
            fill={
              selectedPolygon.includes('KitchenWalls') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('KitchenWalls')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="2711.5"
            y="1187.5"
            width="353.2948303222656"
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
            x="2776.5"
            y="1230.5"
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
            points="73,568,622,651,628,1315,73,1560"
            fill={
              selectedPolygon.includes('upvcWindow') ? 'green' : 'transparent'
            }
            fillOpacity="0.2"
            onClick={() => handlePolygonClick('upvcWindow')}
            style={{ cursor: 'pointer' }}
          ></polygon>
          <rect
            x="339"
            y="980.5"
            width="372.10601806640625"
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
            x="404"
            y="1023.5"
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
                polygon === 'Base Cabinets Panel 3' ||
                polygon === 'Wall Cabinets Panel 3' ||
                polygon === 'Loft Cabinets Panel 3' ||
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

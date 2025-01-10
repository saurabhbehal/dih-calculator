import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Download } from 'lucide-react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Modal from 'react-modal'
import FormWithOTPVerification from './FormWithOTPVerification'
import Image from 'next/image'
import axios from 'axios'
const FourthStep = () => {
  const [spaceData, setSpaceData] = useState([])
  const [firstStepData, setFirstStepData] = useState([])
  const [totalRoomPrice, setTotalRoomPrice] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const descriptions = {
    premium: {
      countertop:
        'Counter top in composite or quartz with 40mm thickness moulding Composite or Quartz (upto Rs. 500/- psf)',
      plumbing:
        'Plumbing work with point shifting, excluding drain point shifting CP fitting (Kohler or Grohe or similar)',
      kitchenwalls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',

      kitchencabinets:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',

      upvcwindow: 'Premium UPVC windows UPVC (Deceuninck or Veka or similar)',
      falseceiling:
        'Gypsum board ceiling with heavy duty channel Boards (USG Boral) | Wires (KEI or similar) | Lights (Orient or similar)',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 55-65/-)',
      electrical:
        'Electrical work including point relocation excluding switches Wires (Havells or Polycab)',
      walls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',
      walltiles:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X24" (Price range Rs. 55-65/- psf)',
      bathroomvanity:
        'HDHMR bathroom vanity with shutter storage and mirror above vanity, including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Skydecor or similar) | Stone counter (upto Rs. 150/- psf)',
      sanitaryandcp:
        'Sanitary Brands: Cera /Similar Inclusions: Sanitary Fittings (Faucets), Divertor Fittings, Bottle Trap etc.',
      door: 'Flush door with hardware, both side laminate finish and Chaukhat repairing & polishing Door 35mm hardwood (price range Rs.80 to Rs. 125/-) | Hardware (Stylus or equivalent) | Locks (Upto Rs.1,800/-)',
      showerenclosure:
        '18 x 7 SqFt., 8mm toughened glass partition with installation',
      bed: 'Standard plywood bed with box storage, laminate finish and fabric bed backPlywood (upto Rs. 55/-) | Laminate 0.8mm (Skydecor or similar) | Fabric (upto Rs. 400/-)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      wardrobe:
        'Standard HDHMR wardrobe including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      sofa: '3 seat Marandi wood and Fabric sofa Foam (High Density - 35GSM) | Faric (upto Rs. 450 per mtr)',
      armchair:
        'Teak and Marandi chair with upholstery and foam. Foam (Soft HR) | Fabric (Upto Rs. 450/- per mtr)',
      sidetables:
        'Side tables with laminate finish HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8mm Laminate (Skydecor or similar)',
      studytable:
        'Study table with 2 floating sleek drawers and wall cabinets HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 1mm Laminate (Merino or similar)',
      diningtableset:
        '6 seater dining table with chairs Sheesham wood | Wooden counter top',
      crockeryunit:
        'Crockery unit with laminate finish on carcass & Shutters and frosted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8 Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      barunit:
        'Bar unit with laminate finish on carcass & Shutters and frosted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8 Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      console:
        'Designer furniture element - Ready made Price range upto Rs.15,000/-',
      shoerack:
        'Standard HDHMR shoe rack including hardware, laminates on carcass and shutters Carcass (Cross Bond or similar) | Hardware (Stylus or equivalent) | 0.7mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar)',
      centertable:
        'Designer furniture element - Ready made Price range upto Rs.15,000/-',
      mandir: '3 x 4 SqFt. Mandir MDF finished with Laminate',
      'base cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'base cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'base cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
    },
    luxury: {
      countertop:
        'Counter top in composite or quartz with 40mm thickness moulding Composite or Quartz (upto Rs. 500/- psf)',
      plumbing:
        'Plumbing work with point shifting, excluding drain point shifting CP fitting (Kohler or Grohe or similar)',
      kitchenwalls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',

      kitchencabinets:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',

      upvcwindow:
        'Premium UPVC windows with 74mm shutter frame and 8mm toughened glass, and single wool pile UPVC (Fenesta or similar)',
      falseceiling:
        'POP ceiling with heavy duty channel POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      flooring:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 32"X64" (Price range Rs. 80-100/-)',
      electrical:
        'Electrical work including point relocation excluding switches',
      walls:
        'Premium Emulsion with 2 primer coats, putty repairing and one highlight wall Paint (Asian Paints or similar)',
      walltiles:
        'Tiling work including demolition, material, grouting, cleaning, finishing Tile size 24"X48" (Price range Rs. 70-80/- psf)',
      bathroomvanity:
        'BWR plywood bathroom vanity with drawer storage and mirror above vanity, including hardware, laminates on carcass, Acrylic or plain membrane on shutters BWR (upto Rs. 60/- psf) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar) | Granite / Quartz (upto Rs. 250/- psf)',
      sanitaryandcp:
        'Sanitary Brands: Jaquar /Similar Inclusions: Sanitary Fittings (Faucets), Divertor Fittings, Bottle Trap etc.',
      door: 'Flush door with hardware, both side veneer with polish, and Chaukhat repairing & polishing Door 35mm hardwood (upto Rs. 125/-) | Hardware (Hettich or Hafele or similar) | Locks (Upto Rs.2,500/-)',
      showerenclosure: 'Shower enclosure with 8mm toughened glass partition',
      bed: 'Standard plywood bed with box storage, veneer finish with polish and fabric bed back Plywood (upto Rs. 55/-) | Laminate 0.8mm (Merino or similar) | Fabric (upto Rs. 700/-)',
      tvpanel:
        'Standard HDHMR TV panel including hardware, laminates on carcass, Acrylic or plain membrane on shutters Carcass (Action Tess or similar) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar)',
      wardrobe:
        'Standard HDHMR wardrobe including hardware, laminates on carcass, Acrylic or plain membrane on shutters Carcass (Action Tess or similar) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar)',
      sofa: 'Marandi wood and Fabric sofa Foam (High Density - 40 GSM) | Faric (upto Rs. 650 per mtr)',
      armchair:
        'Teak and Marandi chair with upholstery and foam. Foam (High Density) | Fabric (Upto Rs. 650/- per mtr)',
      sidetables:
        'Side tables with Veneer finish and melamine polish HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent)',
      studytable:
        'Study table with 2 floating sleek drawers and wall cabinets HDHMR (Action Tesa or similar) | Hardware ( Hettich or similar) | 1mm Laminate (Merino or similar))',
      diningtableset:
        '6 seater dining table with chairs Sheesham wood | Stone counter top',
      crockeryunit:
        'Crockery unit with laminate finish on carcass & Acrylic / plain membrane finish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      barunit:
        'Bar unit with laminate finish on carcass & Acrylic / plain membrane finish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      console:
        'Designer furniture element - Ready made Price range upto Rs.25,000/-',
      shoerack:
        'Standard shoe rack including hardware, laminates on carcass and shutters',
      centertable:
        'Designer furniture element - Ready made Price range upto Rs.30,000/-',
      mandir:
        '4 x 4 SqFt. Mandir finished With HDHMR/Veneer with PU Polish & Jali cutting on sides',
      'base cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'base cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'base cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
    },
    ultraLuxury: {
      countertop:
        'Counter top in composite or quartz with 40mm thickness moulding Composite or Quartz (upto Rs. 500/- psf)',
      plumbing:
        'Plumbing work with point shifting, excluding drain point shifting CP fitting (Kohler or Grohe or similar)',
      kitchenwalls:
        'Premium Emulsion with basic putty repairing and one highlight wall Paint (Asian Paints or similar)',

      upvcwindow:
        'Premium UPVC windows with 90mm shutter frame and 12.5mm toughened glass, key locking and single wool pile UPVC (Fenesta or similar)',
      falseceiling:
        'POP Ceiling with cove, heavy duty channel & wooden design element POP (Sakarni) | Wires (Havells or Polycab) | Lights (Philips or similar)',
      flooring:
        'Italian store flooring with installation and Diamond polish Italian stone (Price range upto Rs. 350/-)',
      electrical:
        'Electrical work including point relocation excluding switches',
      walls:
        'Premium paint with POP finish and one rustic / textured wall POP 3-5 mm (Sakarni) | Paint (Asian Paint Royale or similar)',
      walltiles:
        'Tiling work including demolition, material (MYK Laticrete), grouting, cleaning, finishing Tile size 24"X48" (Price range upto Rs. 125/- psf)',
      bathroomvanity:
        'Standard TV Panel including hardware, laminates on carcass, veneer / PU polish on shutters BWR (upto Rs. 60/- psf) | Hardware (Hettich or similar) | 0.8mm Laminate (Skydecor or similar) | Granite / Quartz (upto Rs. 500/- psf)',
      sanitaryandcp:
        'Sanitary Brands: Kohler/Similar Inclusions: Sanitary Fittings (Faucets), Divertor Fittings, Bottle Trap etc.',
      door: 'Flush door with hardware, both side veneer with polish / HDHMR with PU, and new marandi Chaukhat with mouldings Door 35mm Bhutan Tuff (upto Rs. 165/-) | Hardware (Hettich or Hafele or similar) | Locks (Upto Rs.3,500/-)',
      showerenclosure:
        'Branded shower cubical including hardware and installation Cubical (Jaquar or similar, upto Rs. 35,000/-)',
      bed: 'Standard plywood bed with hydraulic box storage, veneer finish with polish or HDHMR with PU and fabric bed back. Plywood (upto Rs. 65/-) | Laminate 0.8mm (Merino or similar) | Fabric (upto Rs. 1000/-)',
      tvpanel:
        'Standard TV Panel including hardware, laminates on carcass, veneer / PU polish on shutters. Carcass (Action Tesa or Local plywood) | Hardware (Hettich or Hafele) | 0.8 mm Laminate (Skydecor or similar)',
      wardrobe:
        'Standard wardrobe including hardware, laminates on carcass, veneer / PU polish on shutters. Carcass (Action Tesa or Local plywood) | Hardware (Hettich or Hafele) | 0.8 mm Laminate (Skydecor or similar)',
      sofa: 'Marandi wood and Fabric sofa. Foam (High Density - 40 GSM) | Faric (upto Rs. 750 per mtr)',
      armchair:
        'Teak and Marandi chair with upholstery and foam. Foam (High Density, Soft) | Fabric (Upto Rs. 750/- per mtr)',
      sidetables:
        'Side tables with Veneer or HDHMR finish and PU polish. HDHMR (Japaness MDH-MR  or similar) | Hardware (Stylus or equivalent) | 0.8mm Laminate (Skydecor or similar)',
      studytable:
        'Study table with 2 floating sleek drawers and wall cabinets with glass shutters. Veneer with PU polish. HDHMR (Action Tesa or similar) | Hardware ( Hettich or similar)',
      diningtableset:
        '6 seater luxury dining table with chairs Sheesham wood | Italian counter top',
      crockeryunit:
        'Crockery unit (HDHMR or plywood) with laminate finish on carcass & Veneer / PU polish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      barunit:
        'Bar unit (HDHMR or plywood) with laminate finish on carcass & Veneer / PU polish on shutters and tinted glass HDHMR (Japaness MDH-MR  or similar) | Hardware (Hettich or similar) | 0.8 Laminate (Skydecor or similar)',
      console:
        'Designer furniture element - Ready made Price range upto Rs.40,000/-',
      shoerack:
        'Standard shoe rack including hardware, laminates on carcass and shutters',
      centertable:
        'Designer furniture element - Ready made Price range upto Rs.50,000/-',
      mandir: '4 x 5 SqFt. Corian stone Mandir',
      'base cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 1':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'base cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 2':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in Veneer / PU polish (2 glass shutters), including hardware Hardware (Hettich/Hafele or similar) | 0.8 mm Laminate (Skydecor or similar)',
      'base cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent) | Drawers (Inox or similar) | 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each)',
      'wall cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in laminate, including Hardware Hardware (Stylus or equivalent)| 0.8 mm Laminate (Skydecor or similar) | 1mm Laminate (Merino or similar) | Handles (upto Rs. 300/- each) Note; 2 shutters Profile with glass included',
      'loft cabinets panel 3':
        'Cabinets in HDHMR including carcass finish in laminate and shutters in Veneer / PU polish (2 glass shutters), including hardware Hardware (Hettich/Hafele or similar) | 0.8 mm Laminate (Skydecor or similar)',
    },
    // Add descriptions for other packages...
  }

  const customStyles = {
    content: {
      top: '60%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '400px',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent overlay
    },
  }

  // Fetch spaceData and firstStepData from localStorage on component mount
  useEffect(() => {
    const localStorageSpaceData = localStorage.getItem('newSpaceData')
    const localStorageFirstStepData = localStorage.getItem('userData')

    if (localStorageSpaceData && localStorageFirstStepData) {
      const parsedSpaceData = JSON.parse(localStorageSpaceData)
      const parsedFirstStepData = JSON.parse(localStorageFirstStepData)
      // console.log('parsedSpaceData', parsedSpaceData)
      setSpaceData(parsedSpaceData)
      setFirstStepData(parsedFirstStepData)

      const total = parsedSpaceData.reduce(
        (acc, room) => acc + (room.roomPrice || 0),
        0
      )
      setTotalRoomPrice(total)
    }
  }, [])

  // Function to generate and download PDF

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    interestedIn: '',
    mobileNumber: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDownloadPDF = async (event) => {
    event.preventDefault()
    setFormSubmitted(true)
    const pdfData = {
      companyName: 'Design Indian Homes',
      yourDetails: Object.entries(firstStepData)
        .filter(([key]) => key !== 'selectedOptionSet4')
        .map(([key, value]) => ({
          label:
            key === 'selectedOptionSet1'
              ? 'House Type'
              : key === 'selectedOptionSet2'
              ? 'Number of Bedrooms'
              : key === 'selectedOptionSet3'
              ? 'New or Renovation'
              : key === 'textInput'
              ? 'City'
              : key.replace(/([A-Z])/g, ' $1').trim(),
          value: value,
        })),
      yourRequirements: spaceData.map((room) => ({
        rooms: room.name,
        area: room.area,
        package: room.selectedPackage || '-',
        roomPriceEstimation: room.roomPrice ? `Rs. ${room.roomPrice}` : '-',
        selectedFeatures: room.selectedPolygon
          ? room.selectedPolygon
              .map(
                (feature) => feature.charAt(0).toUpperCase() + feature.slice(1)
              )
              .join(', ')
          : '-',
      })),
      totalRoomPrice: totalRoomPrice,
    }

    const formDataJSON = JSON.stringify(formData) // Stringify formData
    const pdfDataJSON = JSON.stringify(pdfData) // Stringify pdfData

    try {
      // Send form data to the server to handle email sending
      const response = await axios.post(
        'https://m.designindianhomes.com/CalculatortForm',
        {
          formData: formDataJSON, // Send stringified formData
          pdfData: pdfDataJSON, // Send stringified pdfData
        }
      )

      if (response.status === 200) {
        console.log('Form data submitted successfully')
      } else {
        console.error('Failed to submit form data')
        return // Exit function if form submission fails
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      return // Exit function if an error occurs
    }

    // Generate and download PDF
    const doc = new jsPDF()
    // Add company logo
    const companyLogo = '/logo.png'
    doc.addImage(companyLogo, 'PNG', 10, 10, 25, 25)

    // Add company name
    const companyName = 'Design Indian Homes'
    doc.setFontSize(32)
    doc.setTextColor(40, 40, 150) // Set color to dark blue
    doc.setFont('helvetica', 'bold')
    doc.text(companyName, 50, 30)

    doc.setDrawColor(0) // Reset draw color to black

    // Add Your Details section
    const yourDetailsData = [
      ...Object.entries(firstStepData)
        .filter(([key]) => key !== 'selectedOptionSet4')
        .map(([key, value]) => ({
          Label:
            key === 'propertyType'
              ? 'House Type'
              : key === 'numberOfRooms'
              ? 'Number of Bedrooms'
              : key === 'interiorType'
              ? 'New or Renovation'
              : key === 'city'
              ? 'City'
              : key.replace(/([A-Z])/g, ' $1').trim(),
          Value: value,
        })),
      { Label: 'Total Price', Value: `Rs. ${totalRoomPrice}` }, // Add total price row
    ]

    const yourDetailsColumns = [
      { header: 'Label', dataKey: 'Label' },
      { header: 'Value', dataKey: 'Value' },
    ]

    doc.setFontSize(16)
    doc.setTextColor(100) // Set text color to gray
    doc.text('Your Details-', 10, 70)
    doc.autoTable({
      startY: 80,
      body: yourDetailsData,
      columns: yourDetailsColumns,
      theme: 'grid', // Use grid theme for a stylish look
    })

    // Add Your Requirements section
    doc.addPage()
    // const yPosition = doc.autoTable.previous.finalY + 10
    // const yPosition = 0
    doc.setFontSize(16)
    doc.setTextColor(100) // Set text color to gray
    doc.text('Your Requirements-', 10, 0)

    // Modify requirementsColumns to include dynamic column headings
    // ---------------------------------------------------------------------

    const tableWidth = 180
    const columnWidth = 90
    // Set the width of each table

    spaceData.forEach((space, i) => {
      if (space.selectedPolygonArea && space.selectedPolygonArea.length > 0) {
        const spaceColumns = [
          {
            dataKey: space.name,
            header: `${space.name} (${space.area} sqft)`,
            width: columnWidth, // Set the width of the table
          },
          {
            dataKey: 'description',
            header: `Description - ${
              space.selectedPackage.toUpperCase() || '-'
            } Package, Total Room Price Estimate - ${space.roomPrice} Rs.`,
            width: columnWidth, // Set the width of the description column
          },
          {
            dataKey: 'area',
            header: 'Area',
            width: columnWidth, // Set the width of the description column
          },
        ]
        // const spaceDataFormatted = []
        // space.selectedPolygon.forEach((polygon) => {
        //   console.log(descriptions[space.selectedPackage])
        //   const row = {}
        //   spaceColumns.forEach((column) => {
        //     if (column.dataKey === space.name) {
        //       const lowercasePolygon = polygon.toLowerCase() // Convert selected polygon to lowercase
        //       row[column.dataKey] =
        //         polygon.charAt(0).toUpperCase() +
        //         polygon.slice(1) +
        //         ' - ' +
        //         `(${descriptions[space.selectedPackage][lowercasePolygon]} ||
        //           'Description not found')`
        //     }
        //   })
        //   spaceDataFormatted.push(row)
        // })

        // const spaceDataFormatted = space.selectedPolygon.map((polygon) => ({
        //   [space.name]: `${polygon.toUpperCase()} - ${
        //     descriptions[space.selectedPackage][polygon.toLowerCase()] ||
        //     'Description not found'
        //   }`,
        // }))

        const spaceDataFormatted = space.selectedPolygonArea.map((polygon) => ({
          [space.name]: Object.keys(polygon)[0].toUpperCase(),
          description:
            descriptions[space.selectedPackage][
              Object.keys(polygon)[0].toLowerCase()
            ] || 'Description not found',
          area: `${polygon[Object.keys(polygon)[0]]}-sqft`,
        }))

        // Create the table
        doc.autoTable({
          startY: 'space',

          body: spaceDataFormatted,
          columns: spaceColumns,
          theme: 'grid',
        })
      }
    })
    // styles: {
    //           cellWidth: columnWidth,
    //           // Define styles for the text
    //         },
    //  ------------------------------------------------------------------

    // Add horizontal line
    // const hrPosition = doc.autoTable.previous.finalY + 10
    // doc.setDrawColor(150) // Set draw color to light gray
    // doc.line(10, hrPosition, 200, hrPosition)

    // // Add Total Price Estimate
    // const totalPricePosition = hrPosition + 20
    // doc.setFont('helvetica', 'bold')
    // doc.setTextColor(40, 40, 150) // Set text color to dark blue
    // doc.text('Total Price Estimate', 10, totalPricePosition)
    // doc.setTextColor(0) // Reset text color to black
    // doc.text(Rs. ${totalRoomPrice}, 100, totalPricePosition)

    // Save the PDF
    doc.save('Project_Scope.pdf')

    setFormSubmitted(true)
  }

  const handleClose = () => {
    setFormSubmitted(false)
    // Add any additional logic you want to perform when closing the thank-you page
  }
  return (
    <div>
      <div>
        <div className="p-4 mx-4 bg-blue-500 flex justify-between rounded-lg shadow-lg text-white">
          <div>
            <p className="sm:text-lg">Estimated budget</p>
          </div>
          <div className="text-right">
            <h3 className="text-lg">₹{totalRoomPrice}</h3>
            <p className="text-xxs">
              *All prices are inclusive of material and labour charges
            </p>
          </div>
        </div>
        <h2 className="text-xl font-bold m-4">Selected components</h2>
        <div className="rounded-xl sm:m-4">
          {spaceData.map((room, index) => (
            <Accordion key={index} className="mb-4">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <img
                  src="/images/bed-square.svg"
                  alt={`Accordion ${index + 1}`}
                  className="h-6 mr-4 self-center"
                />
                <div>
                  <h6 className="text-lg font-bold">{room.name}</h6>
                  <p className="text-gray-400 text-xs">{room.area} SqFt.</p>
                </div>
              </AccordionSummary>
              <AccordionDetails className="shadow-lg">
                <div className="flex flex-col space-y-4 sm:mx-10">
                  {room.selectedPolygonArea &&
                    room.selectedPackage &&
                    room.roomPrice && (
                      <>
                        <div className="border-b-[1px] border-b-gray-300">
                          <h6 className="font-semibold text-lg">
                            Selected Package
                          </h6>
                          <p className="text-gray-400 text-xs capitalize">
                            {room.selectedPackage}
                          </p>
                        </div>
                        <div className="border-b-[1px] border-b-gray-300">
                          <h6 className="font-semibold text-lg">
                            Room Price Estimate
                          </h6>
                          <p className="text-gray-400 text-xs">
                            ₹{room.roomPrice}
                          </p>
                        </div>
                        <div className="border-b-[1px] border-b-gray-300">
                          <h6 className="font-semibold text-lg">
                            Selected Features
                          </h6>
                          <ul>
                            {room.selectedPolygonArea.map((polygon, index) => (
                              <li key={index}>
                                <p className="capitalize">
                                  {Object.keys(polygon)[0]}
                                  <span className="text-xs">
                                    {'   '}
                                    {polygon[Object.keys(polygon)[0]]}-sqft
                                  </span>
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <h2 className="text-xl font-bold m-4">Documents</h2>
        <div>
          <div className="bg-white rounded-lg flex justify-between p-4 m-4">
            <p>Project Scope</p>
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center text-blue-500"
            >
              <span className="mr-2">
                <Download className="h-4 w-4" />
              </span>
              Download
            </button>
          </div>
        </div>
        <div className="m-4">
          <p className="text-blue-500 text-xs">Disclaimer:</p>
          <p className="text-xs">
            Indicative rates based on market averages. Actual costs vary based
            on professional choice, measurements, materials, and additional
            charges like taxes, design fees, appliances, and site expenses.
          </p>
        </div>
      </div>
      <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Edit SpaceName Modal"
        style={customStyles}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Contact</h2>
          <button
            onClick={() => setEditModalOpen(false)}
            className="text-gray-500 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Add your form inputs for editing the spaceName */}
        {formSubmitted ? (
          <div className="grid grid-cols-1 justify-items-center">
            <p className="text-center text-lg">
              Thank you for your submission!
            </p>
            <Image
              src={
                'https://img.freepik.com/free-vector/thank-you-placard-concept-illustration_114360-13436.jpg'
              }
              width={400}
              height={300}
            />
            <h1 className="text-center font-bold">
              {' '}
              FOR ANY PRIORITY BOOKING OF DESIGN/PLANNING MEETING, DO CALL US OR
              WHATSAPP US ON 9899264978, 9582827928
            </h1>

            <button
              onClick={handleClose}
              className="bg-gray-900 text-white py-2 px-4 mt-4 rounded-full hover:bg-gray-700 hover:shadow"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleDownloadPDF}>
            <div>
              <input
                type="text"
                id="nameInput"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <input
                type="text"
                id="addressInput"
                name="address"
                placeholder="Enter your address"
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <input
                type="text"
                id="numberInput"
                name="mobileNumber"
                placeholder="Enter your number"
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <input
                type="email"
                id="emailInput"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="interestedInInput"
                className="text-gray-600 block"
              >
                Interested In:
              </label>
              <select
                id="interestedInInput"
                name="intrestedIn"
                onChange={handleChange}
                className="border-2 border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Select an option</option>
                <option value="Renovation">Renovation</option>
                <option value="Kitchen Work">Kitchen Work</option>
                <option value="Wardrobe Work">Wardrobe Work</option>
                <option value="House Work">House Work</option>
              </select>
            </div>

            <div className="flex w-full justify-center">
              <button
                type="submit"
                onClick={handleDownloadPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 w-full"
              >
                Download
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default FourthStep

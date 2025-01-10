import React, { Component, useState, useEffect } from 'react'
import { Tabs, Tab, Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

const delhiLocations = [
  'Pitampura',
  'Shalimar Bagh',
  'Ashok Vihar',
  'Mukherji Nagar',
  'Paschim Vihar',
  'Yojana Vihar',
  'Vigyan Vihar',
  'Parparganj',
  'Karol Bagh',
  'Gulabi Bagh',
  'Punjabi Bagh',
  'Rajouri Garden',
  'Tagore Garden',
  'Vikas Puri',
  'Uttam Nagar',
  'Delhi Cantt',
  'Janak Puri',
  'Palam',
  'Najafgarh',
  'Dwarka',
  'Dabri',
  'Mayapuri',
  'Hari Nagar',
  'Tilak Nagar',
  'Maya Enclave',
  'Subhash Nagar',
  'Ramesh Nagar',
  'Chanakyapuri',
  'Moti Bagh',
  'Vasant Vihar',
  'Vasant Kunj',
  'Delhi - IIT',
  'Hauz Khas',
  'Munirka',
  'Safdarjung',
  'Green Park',
  'Mahipalpur',
  'Mehrauli',
  'Badarpur',
  'Niti Bagh',
  'Chirag Delhi',
  'Malviya Nagar',
  'Saket',
  'Sanik Farms',
  'New Friends Colony',
  'Defence Colony',
  'Moti Nagar',
  'Sarita Vihar',
  'Mayur Vihar',
  'Trilok Puri',
  'New Ashok Nagar',
  'Khan Market',
  'Connaught Place',
  'Chattarpur',
  'Sultanpur',
  'Sukhdev Vihar',
  'Kalindi Kunj',
  'Okhla',
  'Govindpuri',
  'Tughlakabad',
  'New Delhi',
  'Greater Kailash',
  'Nehru Place',
  'Ashram',
  'Rk Puram',
  'Rohini',
  'South Extension',
  'Civil Lines',
  'Kohat Enclave',
  'Bikaji Cama Place',
  'Rajendra Nagar',
  'Inderpuri',
  'Naraina Vihar',
  'Ghitorni',
  'Guru Dhronacharya',
  'Vinod Nagar',
  'Sant Nagar',
  'Harkesh Nagar',
  'Jasola Vihar',
  'Pragati Vihar',
  'Arjan Garh',
  'Aya Nagar Extension',
  'Model Town',
  'Karkarduma',
  'East Azad Nagar',
  'Gulmohar Park',
  'Golf Links',
  'Amrita Shergill Marg',
  'Asiad Village',
  'Rajokri',
  'Kailash Colony',
  'East of Kailash',
  'Narela',
  'Pamposh Enclave',
  'Patel Nagar',
  'Vaishali',
  'Indirapuram',
  'Nirman Vihar',
  'Rangpuri',
  'Shivaji Park',
  'Madipur',
  'Shastri Nagar',
  'Partap Nagar',
  'Rk Ashram Marg',
  'Sanik Vihar',
  'Mansarovar Park',
  'Dilshad Garden',
  'Vidhan Sabha',
  'Vishwa Vidyalaya',
  'GTB Nagar',
  'Jagatpuri',
  'Yamuna Vihar',
  'Gautam Nagar',
  'Lajpat Nagar',
  'Vijay Nagar',
  'Kirti Nagar',
  'Mansarovar Garden',
  'MG Road',
  'Sunder Nagar',
  'Friends Colony',
  'Kalkaji',
  'GK Enclave',
  'Safdarjung Enclave',
  'Gulmohar Park',
  'Lodhi Colony',
  'Aurobindo Marg',
]

const gurgaonLocations = [
  'Sushant Lok 1',
  'Iffco Chowk',
  'Dlf Phase 1',
  'Dlf Phase 2',
  'Iffcow Chowk',
  'MG Road',
  'Huda City',
  'Palam Vihar',
  'M3M Seirra',
  'Arete our Homes',
  'Shapoorji Pallonji Joy Ville',
  'Dlf New Town Heights',
  'Pyramid Urban Homes',
  'Dlf the Ultima',
  'Dlf the Crest',
  'Ats Triumph',
  'Emaar Palm Drive',
  'Mapsko Mount',
  'Palam Vihar',
  'Dlf Regal Gardens',
  'Breez Global Heights',
  'Sobha City',
  'Godrej Summit',
  'Microtek Greenburg',
  'Emaar Palm Hills',
  'Godrej Habitat',
  'Signature Global Superia',
  'Emaar Gurgaon Greens',
  'Emaar Marbella',
  'Central Park Town Houses',
  'Adani Aangan',
  'Ireo Victory Valley',
  'M3M Golf Estate',
  'Tata Housing Development La Vida',
  'Tulip Violet',
  'Pyramid Urban',
  'Bestech Park View Grand Spa',
  'M3M Marina',
  'Godrej 101',
  'Dlf the Primus',
  'Adani Brahma Samsara Vilasa',
  'M3M Escala',
  'Lotus Momz',
  'Emaar Emerald Floors',
  'Puri Diplomatic Greens',
  'Emaar Emerald Floor Premier Phase 3',
  'Vatika Lifestyle Homes',
  'Tata Housing Development Primanti Uberluxe',
  'Vatika City Homes',
  'Chintels Serenity',
  'Godrej Oasis',
  'Puri EmraldBay',
  'Aipl Zen Residences',
  'Ats Tourmaline',
  'Adani M2K Oyster Grande',
  'M3M Woodshire',
  'Central Park Flamingo',
  'Pioneer Araya',
  'Shree Vardhman Victoria',
  'Paras Quartier',
  'SS The Coralwood',
  'Bestech Park View Sanskruti',
  'Anant Raj Maceo',
  'Green Court',
  'M3M Natura',
  'Tulip Lemon',
  'Dlf Siris Estate',
  'Mapsko Casa Bella',
  'Spaze Privy AT4',
  'Pioneer Presidia',
  'ROF Ananda',
  'Mahindra Luminare',
  'Ireo Skyon',
  'Concient HeritageMax',
  'Vatika The Seven lamps',
  'SS Almeria',
  'Godrej Aria',
  'DLF The Skycourt',
  'Ashiana Anmol',
  'Vatika Signature Villa',
  'Signature Global Roselia2',
  'BPTP Amstoria Country Floor',
  'Eldeco Acclaim',
  'Tata Housing Primanti',
  'Emaar Palm Heights',
  'Emaar Palm Select',
  'Uppal Gurgaon 99',
  'Pareena Om Apartment',
  'Vatika Boulevard Heights and Residences',
  'Emaar Palm Terraces',
  'MeM Latitude',
  'Tata Housing Gurgaon Gateway',
  'Tulip Ace',
  'Tulip Leaf',
  'Vatika Gurgaon',
  'Signature Orchard Avenue',
  'M3M Merlin',
  'Paras Irene',
  'SS The Leaf',
  'Emaar Emerald',
  'Whitehousz Nirvana',
  'Vatika Independent',
  'Solutrean Caladium',
  'Surendra Homes Dayanand Colony',
  'GGR Ansal Esensia Homes',
  'Surendra Alisha Homes',
  'Central Park Resort',
  'Mem One Key Residency3',
  'M3M One Key Resiment',
  'Lkrishna Homes',
  'CGHS Peach Jasmine',
  'CGHS Arzoo Apartment',
  'The Cedar Estate',
  'AKDA Mihir Apartments',
  'KST Urban Universe',
  'Luxury Floors, Gurgaon',
  'Sobha International City',
  'Ansal Heights',
  'Dlf Exclusive Floors',
  'Dlf Phase 3',
  'Dlf Phase 4',
  'Ivory Tulip',
  'DLF Summit',
  'Gurgaon Golf Course Extension',
  'Gurgaon Golf Course Road',
  'Belvedre Towers',
  'Suncity',
  'Ansal Esencia',
  'Nirvana County - Deerwood Chase',
  'Nirvana County - Espace',
  'La Laguine Gurgaon',
  'DLF Aralias',
  'DLF Magnolias',
  'The Camellias at DLF 5 Gurugram',
  'India Bulls, Gurgaon',
  'Dhoot Times Residency Gurgaon',
  'Samriddhi Apartments, Gurgaon',
  'Sector 22, Sector 23, Gurgaon',
  'Ireo the Grand Arch',
  'Orchid Petals',
  'S.S Habiscus',
  'Ireo The Corridor',
  'Vatika city Homes',
  'Tata Raisina Residence',
  'Emaar MGF The Palm Drive',
  'Vipul Green',
  'Unitech Fresco , Nirvana Country',
  'The Close South Nirvana Country',
  'DlfThe Camilia',
  'Vatik xpressions',
  'Salcon The Varandas',
  'DLF Park Place-Park Heights',
  'DLF Magnolias',
  'M3M Crown',
  'Smart World one DXP',
  'DLF the Arbour',
  'White Land Aspen',
  'M3M Golf Hills',
  'Elan The Presidential',
  'Tulip Monsella',
  'Mahinder Luminas',
  'Krisum Waterfall Residence',
  'White land BlissnVilla',
  'M3M Sky City',
  'BPTP Terra',
  'Trump Tower',
  'Oxirich Chintamani',
  'Saan Verdanta',
  'Experion Windchant',
  'GREEN COURT APARTMENTS',
  'CRESCENT PARK, PHASE 3',
  'THE CORRIDORS',
  'M3M WOODSHIRE',
  'MAPLE HEIGHTS',
  'SOUTHEND FLOORS B BLOCK',
  'SOUTH CITY-2 I BLOCK',
  'CORONA OPTUS',
  'SILVER OAKS CONDOMINIUM ASSOCIATION',
  'UMANG - MONSOON BREEZE',
  'ASHIANA ANMOL',
  'THE VIEW',
  'THE EDGE',
  'THE CLOSE SOUTH',
  'PARK VIEW SPA',
  'UNIWORLD GARDEN',
  'CHD AVENUE 71',
  'JAL VAYU VIHAR SECTOR 30',
  'BPTP PARK PRIME',
  'THE PLAZA AT 106',
  'APEX OUR HOMES PHASE 2',
  'SHREE VARDHMAN MANTRA',
  'PARK STREET A BLOCK',
  'ROSEWOOD CITY D BLOCK',
  'MARUTI VIHAR',
  'WINTER HILL SEC 77',
  'SWARNA JAYANTI',
  'PYRAMID URBAN HOMES',
  'ZARA AWAAS',
  'RIDGEWOOD ESTATE',
  'D2 BLOCK SOUTHCITY 2',
  'TODAY BLOSSOMS 2',
  'ARAVALI HOMES',
  'TATVAM VILLAS',
  'NINEX CITY',
  'DEEVAN SOCIETY',
  'JALVAYU TOWERS APARTMENT OWNERS ASSOCIATION',
  'OUR HOMES',
  'ADANI OYSTER GRANDE',
  'ANTRIKSH HEIGHTS 1 & 2',
  'DLF PINNACLE',
  'BPTP FREEDOM PARK LIFE',
  'VIPUL BELMONTE',
  'THE CLOSE NORTH',
  'ORCHID ISLAND',
]

const noidaLocations = [
  'Mahagun Mywood Phase 2',
  'ATS Knightbridge',
  'Arihant Arden',
  'Cleo Country',
  'Ace City',
  'Mahugun Mantra',
  'Trident Embassy',
  'Gaursons Hi Tech 14th Avenue',
  'Prateek Edific',
  'Kinson Green Villa',
  'ATS Pristine',
  'Civitech Stadia',
  'Ajnara Ambrosia',
  'Mahagun Mezzaria',
  'ExpressZenith',
  'Indosam 75',
  'Aastha Greens',
  'Panchsheel Greens2',
  'Shri Radha Sky Gardens',
  'Strategic Royal Court',
  'Gaursons Hi Tech Sports Wood',
  'Amaarta Homes',
  'Nirala Estate 2',
  'Shri Radha Sky Park',
  'Ajnara Le Garden',
  'Devika Gold Homz',
  'Supertech EcoVillage2',
  'Laureate Parx Laureate',
  'Panchsheel Pratishtha',
  'The Antriksh Forest',
  'Exotica Dreamville',
  'Supertech The Romano',
  'Nirala Aspire',
  'Mahagun Mywoods',
  'Gulshan Botnia',
  'Antara Noida Phase1',
  'Nirala Estate',
  'Shri Radha Aqua Garden',
  'Ska Greenarch',
  'Anthem French Apartments',
  'ACE Group Golfshire',
  'RG Residency',
  'Omaxe The Forest Spa',
  'Dkrrish Green Beauty Farms',
  'Novel Valley',
  'Dasnac The Jewel of Noida',
  'Mahagun Mantraa',
  'Stellar One',
  'Ratan Pearls',
  'Jaypee The Kalypso Court',
  'Urbtech Hilston',
  'Jaypee The Imperial Court',
  'Emenox La Solara',
  'Gaursons Hi Tech Gaur Suites',
  'Thv Heritage Floors',
  'OM Villa',
  'Rise Resort Residences Forest',
  'Vihaan Homes',
  'Galaxy Royale',
  'Supertech SpiraStudios',
  'AFOWO Raksha Addela',
  'Apartment Type Test Project',
  'Divyansh Flora',
  'Alpine AIG Park Avenue',
  'Addelia Raj Rakhsa Addela',
  'VVIP Homes',
  'Paras Tierea',
  'Defence Enclave',
  'Anandman Villas',
  'Jaypee Greens Aman',
  'Jaypee Kosmos',
  'Golf City',
  'Gardenia Gateway',
  'Spertech North Eye',
  'Amrapli Golf Homes',
  'Parteek Wisteria',
  'Stellar Jeevan',
  'Ajnara Dafodil',
  'Vijayant Enclave',
  'Antriksh Golf City',
  'Panchsheel Hynish',
  '3C Lotus Boulevard',
  'Future Rhythm Country',
  'Mahagun Mirabell',
  'Supreme Tower',
  'Paramount Emotions',
  'Amrapali Sapphire',
  'Gulshan Bellina',
  'Supertech Eco Village1',
  'Amrapali Zodiac',
  'Imperia H2O',
  'Sam Palm Olympia',
  'Supertech Eco Village 3',
  'Maxblis White House',
  'Ajnara Homes',
  'Jaypee Krescent Homes',
  'Supertech Crown Tower',
  'Sikka Kaama Greens',
  'Gardenia Glory',
  'Alpha Saptrishi Vihar',
  'Mahagun Mirabella Villa',
  'Jaypee Kenington Park Apartments',
  'Apex Buildcon Athena',
  'Aims Green Avenue',
  'Sunshine Helios',
  'Supertech Ecociti',
  'Amrapali Eden Park',
  'Noida Authority LIG Flats',
  'Supertech Cape Town',
  'Pearls Gateway Towers',
  'Madhuban Apartments',
  'Victory Amara',
  'Mahgun Maple',
  'Amrapali Silicon City',
  'Eldeco Aamantra',
  'Hawelia Group Valencia',
  'Exotica Fresco',
  'Ajnara Grand Heritage',
  'Prateek Stylome',
  'Paramount Floraville',
  'Urbtech Xaviers',
  'Gaursons India Gaur City 2 16th Avenue',
  'ATS One Hamlet',
  'Amrapali Pan Oasis',
  'Logix Blossom Greens',
  'Dasnac Burj Noida',
  'Elixir Harmony Apartment',
  'Jaypee The Pavillion Court',
  'Panchsheel Greens',
  'The 3C Lotus Boulevard Espacia',
  'Oxford Square',
  'Nimbus Hyde Park',
  'Luxury Homes',
  'Griha Grihapravesh',
  'Civitech Sampriti',
  'Gulshan Vivante',
  'Great Value Sahranam',
  'JM Orchid',
  'Assotech Celeste Towers',
  'Purvanchal Saket Dham',
  'TGB Meghdutam',
  'Paras Seasons',
  'Jaypee Green Aman',
  'Sunworld Arista',
  'Wave Magacity Sec 5 Greenwood Enclave',
  'Jaypee Klassic Heights',
  'Om Mahadev Apartment',
  'Amrapali Platinum',
  'The 3C Lotus Panache',
  'The 3C Lotus Zing',
  'Skytech Matrott',
  'Nimbus The Golden Palms',
  'JM Aroma',
  'Jaypee Garden Isles',
  'Aarcity Regency Park',
  'Assotech Winsor Court',
  'UCHDL Livork',
  'Sector 15 Noida',
  'Jalvayu Vihar',
  'ATS Knightbridge',
  'SKA Orion',
  'Tata Eureka Park',
  'Godrej Wood',
  'Ace Starlit',
]

const LocationLink = ({ location, url, prefix, city }) => {
  return (
    <Link href={`${url}`}>
      {prefix}
      {location}-{city}
    </Link>
  )
}

const CityLocations = ({ locations, city, prefix }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState)
  }
  const prefixLC = prefix.toLowerCase()

  const locationLinks = locations.map((location, index) => {
    const locationUrl = location.toLowerCase().replace(/\s+/g, '-')
    return (
      <span key={index}>
        <LocationLink
          location={location}
          url={`/locations/${prefixLC}${locationUrl}-${city}`}
          prefix={prefix}
          city={city}
        />
        {index !== locations.length - 1 && ' | '}
      </span>
    )
  })

  return (
    <div>
      <div
        className="flex relative items-center mt-4"
        onClick={toggleExpansion}
      >
        <span className="text-lg text-black font-bold cursor-pointer">
          {city}
        </span>
        <ChevronDown
          className={cn(
            'ml-2 h-4 w-4 transition-all text-muted-foreground cursor-pointer',
            {
              '-rotate-180': isExpanded,
            }
          )}
        />
      </div>

      {isExpanded && <div className="my-8">{locationLinks}</div>}
    </div>
  )
}

const ParagraphTab = ({ prefix }) => {
  return (
    <div className='ml-[100px]'>
      {/* <h2 className="mt-4 text-lg text-black font-bold">LOCATIONS -</h2> */}
      <CityLocations locations={delhiLocations} city="Delhi" prefix={prefix} />
      <hr className="my-6 border-t-2 border-gray-300" />
      <CityLocations
        locations={gurgaonLocations}
        city="Gurgaon"
        prefix={prefix}
      />
      <hr className="my-6 border-t-2 border-gray-300" />
      <CityLocations locations={noidaLocations} city="Noida" prefix={prefix} />
      <hr className="my-6 border-t-2 border-gray-300" />
    </div>
  )
}

const LocationsTabs = () => {
  const [value, setValue] = React.useState(-1) // Set initial value to -1
  const [renderParagraphTab, setRenderParagraphTab] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    setRenderParagraphTab(true) // Set to true when a tab is clicked
  }

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      marginRight: theme.spacing(1),
      color: '#fff',
      fontFamily: 'inherit',
      '&.Mui-selected': {
        color: '#000',
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#fff',
      },
    })
  )

  return (
    <div className="container mx-auto mt-8 p-0 ">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-bold">Our Locations</h1>
      </div>
      <div className="flex justify-center">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          className="text-center w-fit"
        >
          <StyledTab
            label="WARDROBE DESIGN LOCATIONS"
            // className="sm:text-xl text-xs font-[500] my-2"
            style={{ fontSize: '24px' }}
          />

          <StyledTab
            label="KITCHEN DESIGNS LOCATIONS"
            style={{ fontSize: '24px' }}
          />
          <StyledTab
            label="INTERIOR DESIGNS LOCATIONS"
            style={{ fontSize: '24px' }}
          />
        </Tabs>
      </div>

      {renderParagraphTab &&
        value !== -1 && ( // Render only if a tab is selected
          <Box width="100%" className="mt-2">
            {value === 0 && (
              <ParagraphTab prefix="Wardrobe-Dealers-&-Manufacturers-in-" />
            )}
            {value === 1 && (
              <ParagraphTab prefix="Modular-Kitchen-Dealers-&-Manufacturers-in-" />
            )}
            {value === 2 && (
              <ParagraphTab prefix="Interior-Designing-and-Architect-Services-in-" />
            )}
          </Box>
        )}
    </div>
  )
}

export default LocationsTabs

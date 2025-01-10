'use client'
import React, { Component, useState, useEffect } from 'react'
import { SocialIcon } from 'react-social-icons'
import Image from 'next/image'
//import WaveGradient from '@/components/Navbar/WaveGradient'
import Link from 'next/link'
import './Gradient.css'
import { Tabs, Tab, Box, Container, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css'
import LocationsTabs from './LocationTabs'
import Bloomflower from './Bloomberg_flower/page'
import MyForm from '../MyForm'
import PostFooter from '../PostFooter/page'

const DesignDropdown = ({
  id,
  heading,
  links,
  openDropdown,
  setOpenDropdown,
}) => {
  const isOpen = openDropdown === id

  const toggleDropdown = () => {
    setOpenDropdown(isOpen ? null : id)
  }

  return (
    <div className="relative text-left w-64">
      <button className="focus:outline-none" onClick={toggleDropdown}>
        <span className="cursor-pointer text-black hover:text-blue-700 font-bold">
          {heading}
        </span>
        <svg
          className={`ml-2 h-4 w-4 inline-block transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="z-10 block mt-2 bg-[#87fff0] border rounded-lg shadow-md w-64">
          <ul>
            {links.map((link, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-[#4f9ecc] rounded-lg"
              >
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const DesignIdeasDropdownContainer = () => {
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownData = [
    {
      id: 1,
      heading: 'Design Ideas',
      links: [
        { label: 'Modular Interior Designs', url: '/modular-interiors' },
        { label: 'Interior Design Solutions', url: '/home-interior-designs' },
        { label: 'End to End Interior', url: '/home-interior-services-india' },
        {
          label: 'Architectural Designs',
          url: '/architectural-designs-services-india',
        },
        {
          label: 'Selected Homes',
          url: '/selected-homes-exclusive-interior-designs-india',
        },
        { label: 'Home Renovation Services', url: '/home-renovation-service' },
        { label: 'Modular Kitchen', url: '/modular-kitchen-top-brand-india' },
        { label: 'Wardrobes', url: '/wardrobe-design-gallery-india' },
        // Add other links as needed
      ],
    },
    {
      id: 2,
      heading: 'Interior',
      links: [
        {
          label: '1bhk residence interior designs',
          url: '/1bhk-apartment-interior-designs',
        },
        {
          label: '2bhk residence interior designs',
          url: '/2bhk-apartment-interior-designs',
        },
        {
          label: '3bhk residence interior designs',
          url: '/3bhk-apartment-interior-designs',
        },
        {
          label: '4bhk residence interior designs',
          url: '/4bhk-apartment-interior-designs',
        },
        { label: 'Villa interior designs', url: '/villa-interior-designs' },
        {
          label: 'Farmhouse interior designs ',
          url: '/farmhouse-interior-designs',
        },
        {
          label: 'Penthouse interior designs ',
          url: '/penthouse-interior-designs',
        },
        {
          label: 'Studio apartment interior designs ',
          url: '/studio-apartment-interior-designs',
        },
        {
          label: 'Bungalow interior designs ',
          url: '/bungalow-interior-designs',
        },
        {
          label: 'Duplex Residence interior Designs ',
          url: '/duplex-interior-designs',
        },
        { label: 'Cottage Interior Designs', url: '/cottage-interior-designs' },
      ],
    },
    {
      id: 3,
      heading: 'Architecture',
      links: [
        { label: 'Consultancy', url: '/architectural-consultancy' },
        { label: 'Designing & Planning', url: '/architectural-brand-in-india' },
        {
          label: 'End to End Structural Projects ',
          url: '/top-architects-in-india',
        },
        {
          label: 'Luxury Residences ',
          url: '/commercial-architectural-delhi-india',
        },
        { label: 'Renovations', url: '/home-renovation-services' },
      ],
    },
    {
      id: 4,
      heading: 'Modular Kitchen',
      links: [
        {
          label: 'Types of Modular Kitchen',
          url: '/modular-kitchen-top-brand-india/types-of-modular-kitchens',
        },
        {
          label: 'Modular Kitchen Designs',
          url: '/modular-kitchen-top-brand-india/modular-kitchen-designs',
        },
        {
          label: 'Luxury Modular Kitchen ',
          url: '/modular-kitchen-top-brand-india/luxury-modular-kitchens',
        },
        {
          label: 'Kitchen Renovation ',
          url: '/modular-kitchen-top-brand-india/kitchen-renovations',
        },
        {
          label: 'Get Estimate ',
          url: '/get-free-estimate-by-top-interior-brand-in-delhi-gurgaon-noida-india',
        },
      ],
    },
    {
      id: 5,
      heading: 'Wardrobes',
      links: [
        { label: 'Types of Wardrobes ', url: '/types-of-wardrobe' },
        {
          label: 'Luxury Wardrobes',
          url: '/wardrobe-design-gallery-india/luxury-wardrobes-designs',
        },
        {
          label: 'Wardrobe Designs',
          url: '/wardrobe-design-gallery-india/wardrobe-designs',
        },
        {
          label: 'Lacquer Glass Wardrobe Designs',
          url: '/wardrobe-design-gallery-india/lacquer-glass-wardrobe-designs',
        },
        {
          label: 'Wardrobe Renovation Services ',
          url: '/wardrobe-design-gallery-india/wardrobe-renovations-services',
        },
      ],
    },
    {
      id: 6,
      heading: 'Modular Interior',
      links: [
        { label: 'Mandir', url: '/modular-interiors/mandir' },
        {
          label: 'Chest of Drawers',
          url: '/modular-interiors/chest-of-drawers',
        },
        { label: 'Bar Units', url: '/modular-interiors/bar-units' },
        { label: 'Side Tables', url: '/modular-interiors/side-tables' },
        { label: 'Foldable Beds ', url: '/modular-interiors/foldable-beds' },
        { label: 'Foyer Cabinets ', url: '/modular-interiors/foyer-cabinets' },
        {
          label: 'Bathroom Vanities ',
          url: '/modular-interiors/bathroom-vanities',
        },
        { label: 'Modular Kitchen', url: '/modular-kitchen-top-brand-india' },
        { label: 'Wardrobe', url: '/modular-interiors/wardrobe' },
        { label: 'Dresser', url: '/modular-interiors/dressers' },
        { label: 'TV Units', url: '/modular-interiors/tv-unit-designs' },
        { label: 'Crockery Units', url: '/modular-interiors/crockery-units' },
        { label: 'Homes by DIH', url: '/homes-by-design-indian-homes' },
      ],
    },
    // Add data for other dropdowns
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 gap-y-8">
      {dropdownData.map((dropdown) => (
        <DesignDropdown
          key={dropdown.id}
          id={dropdown.id}
          heading={dropdown.heading}
          links={dropdown.links}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
      ))}
    </div>
  )
}

// clock time

const AnalogClock = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000)

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="analog-clock">
      <Clock value={date} renderNumbers={true} />
    </div>
  )
}

function Time() {
  const [liveTime, setLiveTime] = useState('')

  useEffect(() => {
    const updateLiveTime = () => {
      const currentTime = new Date().toLocaleTimeString()
      setLiveTime(currentTime)
    }

    // Update the time every second
    const intervalId = setInterval(updateLiveTime, 1000)

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <ul className="border-l-4 border-black pl-2">
        <li className="mb-2 font-bold">ORGANIZATION & INDUSTRIAL BUSINESS</li>
        <li className="mb-2 font-bold">OPERATED SINCE 2008.</li>
        <li className="mb-2 font-bold">ALL RIGHTS RESERVED.</li>
        <li className="mb-2 font-bold">ALL WRONGS REVERSED.</li>
        <li className="mb-2 font-bold">DATA PRIVACY</li>
        <li className="mb-2 mt-8">
          <AnalogClock />
        </li>
        <li className="mb-2 text-sm mt-4 ml-6">{liveTime}</li>
      </ul>
    </div>
  )
}

const LetsConnectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  })
  const [btnText, setBtnText] = useState('Send Message')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Submitting form...')
    setFormSubmitted(true)

    const formDataToSend = new FormData()
    for (const key in formData) {
      formDataToSend.append(key, formData[key])
    }

    try {
      console.log(
        'Form Data to Send:',
        Object.fromEntries(formDataToSend.entries())
      )
      console.log('Uploading data...')
      const response = await fetch(
        'https://m.designindianhomes.com/submitForm',
        {
          method: 'POST',
          body: formDataToSend,
        }
      )

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)
      console.log('Response body:', await response.text())

      if (response.ok) {
        console.log('Form data submitted successfully!')
        console.log(
          'Form Data to Send:',
          Object.fromEntries(formDataToSend.entries())
        )
        setBtnText('Done')
      } else {
        console.error('Form data submission failed. Response:', response)
        setBtnText('Something Went Wrong')
      }
    } catch (error) {
      console.error('Error during form data submission:', error)
      setBtnText('Something Went Wrong')
    }
    setFormSubmitted(true)
  }
  const handleClose = () => {
    setFormSubmitted(false)
    // Add any additional logic you want to perform when closing the thank-you page
  }
  return (
    <>
      {formSubmitted ? (
        <div className="grid grid-cols-1 justify-items-center">
          <p className="text-center text-lg">Thank you for your submission!</p>
          <Image
            alt="thank you image"
            src={'/thank-you.png'}
            width={400}
            height={300}
          />
          <h1 className="text-center font-bold w-[200px]">
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
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="w-full mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 py-2 px-4 rounded-md transition-all duration-300 bg-gradient-to-r from-teal-400 to-blue-500"
          />

          <br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 py-2 px-4 rounded-md transition-all duration-300 bg-gradient-to-r from-teal-400 to-blue-500"
          />

          <br />

          <input
            type="text"
            name="contactNumber"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
            className="w-full mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 py-2 px-4 rounded-md transition-all duration-300 bg-gradient-to-r from-teal-400 to-blue-500"
          />

          <br />

          <textarea
            name="message"
            placeholder="Message"
            onChange={handleChange}
            required
            className="w-full mb-8 border-b border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 py-2 px-4 rounded-md transition-all duration-300 bg-gradient-to-r from-teal-400 to-blue-500"
          />

          <br />
          <button
            type="submit"
            // className="py-2 px-6 hover:text-white hover:bg-black"
            // style={{ border: "1px solid black" }}
            className="w-full rounded-full border-b border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 py-2 px-4 transition-all duration-300 bg-gradient-to-r from-lime-300 to-green-400"
          >
            {btnText}
          </button>
        </form>
      )}
    </>
  )
}

export class Footer extends Component {
  render() {
    return (
      <>
        <div className="bg-red-500 p-4 dark:text-white">
          <MyForm />
        </div>
        <PostFooter />
        <div className="flex justify-center w-full mx-0">
          <div className="gradient w-full flex flex-col justify-center items-center">
            <div className="mt-22 container">
              {/* <WaveGradient /> */}
              <div
                className="flex flex-col items-center justify-center bg-cover rounded-lg mb-12 h-[40vh] sm:h-[10vh] md:h-[100vh] h-1/2"
                style={{
                  backgroundImage: "url('/images/get-free-estimate.jpg')",
                  backgroundSize: 'fit',
                  backgroundRepeat: 'no-repeat',
                  objectFit: 'cover',
                }}
              >
                <div className="relative  m-16">
                  <Link href="/get-free-estimate-by-top-interior-brand-in-delhi-gurgaon-noida-india">
                    <h1 className="text-sm md:text-8xl font-bold text-center bg-white bg-opacity-50 p-4 rounded-full">
                      Get Your Estimates Free
                    </h1>
                  </Link>
                </div>
                {/* <h1 className="text-md md:text-xl sm:my-4 text-center sm:p-4 bg-white rounded-md">
                LOVE ALL SERVER ALL
              </h1> */}
              </div>

              <div class="">
                <div class="text-black w-full flex items-center justify-center">
                  <button class="lg:text-[100px] sm:text-[100px] lg:px-[300px] lg:py-[100px] sm:px-[200px]  sm:py-[100px] display-center run rounded-full border-dotted border-2 border-black hover:bg-black hover:text-white">
                    <a href="tel:+919899264978">
                      Call Us Today! <br />
                      <span class="button2 pb-4 lg:text-lg sm:text-[10px] font-bold">
                        We can talk about how big this button is.
                      </span>
                    </a>
                  </button>
                </div>
              </div>

              <h1 className="text-4xl md:text font-semibold text-center text-black pt-16">
                Know The Trinity Brands
              </h1>

              <div className="flex flex-col items-center md:flex-row justify-center gap-6 md:gap-32 w-full mt-5">
                {/* Brand 1 */}
                <a
                  href="https://www.designindiankitchen.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-center flex flex-col items-center justify-center">
                    <Image src="/dkilogo.png" alt="" width={200} height={80} />
                    <p className="text-green-500 text-2xl font-medium">
                      Design Indian Kitchen
                    </p>
                  </div>
                </a>

                {/* Brand 2 */}
                <a
                  href="https://www.designindianhomes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-center flex flex-col items-center justify-center">
                    <Image
                      src="/desig indian homes.gif"
                      alt=""
                      width={200}
                      height={80}
                    />
                    <p className="text-green-500 text-2xl font-medium">
                      Design Indian Home
                    </p>
                  </div>
                </a>

                {/* Brand 3 */}
                <a
                  href="https://www.designindianwardrobes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-center flex flex-col items-center justify-center">
                    <Image
                      src="/footer-logo-multi.png"
                      alt=""
                      width={300}
                      height={80}
                    />
                    <p className="text-green-500 text-2xl font-medium">
                      Design Indian Wardrobe
                    </p>
                  </div>
                </a>
              </div>

              {/* Features Section */}
              <div
                className="flex flex-col items-center md:flex-row justify-center    p-10 gap-6 mt-10 text-black"
                style={{ alignItems: 'center' }}
              >
                {/* Feature 1 */}
                <div className="text-center">
                  <div className="flex justify-center">
                    <Image src="/warranty.png" alt="" width={108} height={80} />
                  </div>

                  <h1 className="font-bold text-center text-sm">
                    Flat 10 year warranty
                  </h1>
                  <p className="text-sm">
                    Choose interiors designed with superior quality material,
                    leaving no room for defects.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="text-center mt-4 md:mt-0">
                  <div className="flex justify-center">
                    <Image
                      src="/fast-delivery.png"
                      alt=""
                      width={128}
                      height={80}
                    />
                  </div>

                  <h1 className="font-bold text-center text-sm">
                    45-day delivery
                  </h1>
                  <p className="text-sm">
                    Get beautiful interiors for your new home in just 45 days.
                    That’s our delivery guarantee.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="text-center mt-4 md:mt-0">
                  <div className="flex justify-center">
                    <Image
                      src="/team-building.png"
                      alt=""
                      width={128}
                      height={80}
                    />
                  </div>
                  <h1 className="font-bold text-center text-sm">
                    600+ design experts
                  </h1>
                  <p className="text-sm">
                    Explore design ideas and co-create your dream home with our
                    experienced designers
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="text-center mt-4 md:mt-0">
                  <div className="flex justify-center">
                    <Image
                      src="/customer-service.png"
                      alt=""
                      width={128}
                      height={80}
                    />
                  </div>
                  <h1 className="font-bold text-center text-sm">
                    Post-installation service
                  </h1>
                  <p className="text-sm">
                    Complete your design journey and get unwavering support from
                    our dedicated care team.
                  </p>
                </div>
              </div>

              {/* Social Media and Copyright Section */}
              {/* add hr */}
              <hr className="mb-12 border-t-2 border-black" />
              <div className="flex flex-col md:flex-row justify-center gap-8  text-black">
                {/* Social Media Icons */}
                <div className="text-left">
                  <Image
                    src="/desig indian homes.gif"
                    alt="footer logo"
                    width={128}
                    height={80}
                  />
                  <div className="flex gap-4 mt-4 hover">
                    <SocialIcon
                      network="twitter"
                      url="www.vimeo.com"
                      style={{ width: '2rem', height: '2rem' }}
                    />
                    <SocialIcon
                      network="facebook"
                      url="www.vimeo.com"
                      style={{ width: '2rem', height: '2rem' }}
                    />
                    <SocialIcon
                      network="instagram"
                      url="www.vimeo.com"
                      style={{ width: '2rem', height: '2rem' }}
                    />
                    <SocialIcon
                      network="linkedin"
                      url="www.vimeo.com"
                      style={{ width: '2rem', height: '2rem' }}
                    />
                  </div>
                  <p className="mt-8">
                    © Copyright <strong>Design Indian Homes</strong> 2024-25.{' '}
                    <br /> All Rights Reserved
                  </p>
                </div>

                <div className="px-0 mx-0">
                  <DesignIdeasDropdownContainer />
                </div>

                <div>
                  <Image
                    src="/homes-gif-logo-optimize.gif"
                    alt=""
                    width={300}
                    height={100}
                  />
                </div>
              </div>
              <div>
                {/* <h1 className="text-6xl md:text-lg font-extrabold text-center my-16">
              WE ARE DELHI BASED
            </h1> */}
                <div className="flex flex-col md:flex-row justify-center gap-36 mt-16  text-black">
                  <div>
                    <h1 className="text-4xl font-bold ">THE BRAND</h1>
                    <ul className="text-lg font-bold mt-4">
                      <li className="mb-2">
                        <Link href="/home-renovation-services">Renovation</Link>
                      </li>
                      <Link href="/virtual-interior-designing-meeting">
                        <li className="mb-2">Book a Virtual Meeting</li>
                      </Link>
                      <Link href="/about-best-interior-designers-architects">
                        <li> About Us</li>
                      </Link>
                      {/* <Link href="/largest-interior-designing-brand">
                      <li className="mb-2">The Team</li>
                    </Link> */}
                      <Link href="/collaborate-with-architects-interior-designers">
                        <li>Collaborate with Us</li>
                      </Link>
                      <Link href="/customer-reviews-interior-designs">
                        {' '}
                        <li className="mb-2">Reviews</li>
                      </Link>
                      <Link href="/home-interior-designs-designing-plans-for-residences">
                        <li className="mb-2"> Our Packages </li>
                      </Link>
                      <Link href="/why-choose-the-best-interior-designers">
                        <li className="mb-2">Why Choose Us</li>
                      </Link>
                      <Link href="/join-the-largest-interior-designing-brand">
                        <li className="mb-2">Join As a Designer</li>
                      </Link>
                      <Link href="/book-with-top-interior-designers-architects">
                        <li className="mb-2">Book a Design Visit</li>
                      </Link>
                    </ul>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">COLLABORATE</h1>
                    <ul className="text-lg font-bold mt-4">
                      <Link href="/join-us">
                        <li className="mb-2"> PARTNER WITH US</li>
                      </Link>
                      <Link href="/offer">
                        <li className="mb-2">REFER FOR REWARDS</li>
                      </Link>
                      <Link href="/join-us">
                        <li className="mb-2"> JOIN AS-A DESIGNER</li>
                      </Link>
                      <Link href="#">
                        <li className="mb-2">
                          FOR - ARCHITECTS & <br /> INTERIOR DESIGNERS
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">LETS CONNECT</h1>
                    <LetsConnectForm />
                  </div>
                </div>

                <div
                  className="flex flex-col md:flex-row justify-center text-black"
                  style={{ gap: '110px', marginTop: '100px' }}
                >
                  <div style={{ width: '300px' }}>
                    <h1 className="font-bold text-2xl uppercase">Contact Us</h1>
                    <div className="mt-8 text-sm">
                      <p className="font-extrabold mb-2 underline">
                        DESIGNING & OPERATIONS OFFICE -
                      </p>
                      <p className="mb-6">
                        25/42, A BLOCK, MIDDLE CIRCLE, CONNAUGHT PLACE, NEW
                        DELHI - 110001 NEAR RAJIV CHOWK METRO STN, GATE NO.8{' '}
                      </p>
                      <p className="font-extrabold mb-2 underline">
                        {' '}
                        CORPORATE INDUSTRIAL UNIT -
                      </p>
                      <p className="mb-6">
                        G - 984, NARELA DSIIDC INDUSTRIAL AREA, NEW DELHI -
                        110040
                      </p>
                      <p className="font-extrabold mb-2 underline">
                        MOBILE PHONE NUMBER -
                      </p>
                      <p className="mb-6">
                        0-9899264978 / 0-9582827928/ 0-9899239097
                      </p>
                      <p className="font-extrabold mb-2 underline">
                        LANDLINE NUMBER -
                      </p>
                      <p className="mb-6">01144127897</p>
                      <p className="font-extrabold mb-2 underline">EMAIL -</p>
                      <p className="mb-6">ENQUIRY@DESIGNINDIANKITCHEN.COM</p>
                      <p className="font-extrabold mb-2 underline">TIMING -</p>
                      <p className="mb-6">
                        MONDAY - SATURDAY:
                        <br /> 10:30 AM - 7:30 PM <br />
                        SUNDAY:
                        <br /> 11:00 AM - 7:00 PM ONLY FOR SITE VISITS
                      </p>
                    </div>
                  </div>
                  <div>
                    <h1 className="font-bold text-2xl">OTHER BUSINESS SITES</h1>
                    <ul className="mt-8 text-sm">
                      <li className="mb-4 font-bold">
                        <a
                          href="https://designindiankitchen.com/"
                          target="_blank"
                        >
                          DESIGN INDIAN KITCHEN
                        </a>
                      </li>
                      <li className="mb-4 font-bold">
                        <a
                          href="https://designindianwardrobe.com/"
                          target="_blank"
                        >
                          DESIGN INDIAN WARDROBE
                        </a>
                      </li>
                      <li className="mb-4 font-bold">
                        <a
                          href="https://modularkitchenindelhi.com/"
                          target="_blank"
                        >
                          MODULAR KITCHEN IN DELHI
                        </a>
                      </li>
                      <li className="mb-4 font-bold">
                        <a
                          href="https://modular-kitchen-gurgaon.com/"
                          target="_blank"
                        >
                          MODULAR KITCHEN IN GURGAON
                        </a>
                      </li>
                      {/* <li className="mb-4 font-bold">
                      <a>DESIGN INDIAN HOMES</a>
                    </li> */}
                      <li className="mb-4 font-bold">
                        <a
                          href="https://modularkitcheninnoida.com/"
                          target="_blank"
                        >
                          MODULAR KITCHEN IN NOIDA
                        </a>
                      </li>
                      <li className="mb-4 font-bold">
                        <a
                          href="https://thedesignerlounge.com/"
                          target="_blank"
                        >
                          THE DESIGNER LOUNGE
                        </a>
                      </li>
                      <li className="mb-4 font-bold">
                        <a href="https://devotionalindia.com/" target="_blank">
                          DEVOTIONAL INDIA
                        </a>
                      </li>
                      <li className="mb-4 font-bold">
                        <a href="https://tallysolution.net/">TALLY SOLUTION</a>
                      </li>
                    </ul>
                  </div>
                  <Bloomflower />
                  <div>
                    <h1 className="font-bold text-2xl">CHECK US OUT</h1>
                    <ul className="mt-8 text-sm">
                      <li className="mb-4 font-bold">
                        <Link href="/customer-reviews-interior-designs">
                          CUSTOMER REVIEWS
                        </Link>
                      </li>
                      <li className="mb-4 font-bold">
                        {/* <a>THE MODULAR PROCESS</a> */}
                      </li>
                      <li className="mb-4 font-bold">
                        <Link href="/book-a-interior-design-visit">
                          REQUEST A BROCHURE
                        </Link>
                      </li>
                      <li className="mb-4 font-bold">
                        <Link href="/book-a-interior-design-visit">
                          BOOK A VISIT TODAY
                        </Link>
                      </li>
                      <li className="mb-4 font-bold">
                        {/* <a>CORPORATE PRESENCE OF OUR BRAND</a> */}
                      </li>
                      <li className="mb-4 font-bold">
                        <Link href="/home-interior-designs-designing-estimates-pricing">
                          GET QUOTES
                        </Link>
                      </li>
                    </ul>

                    <div className="flex">
                      <div>
                        <Time />
                      </div>
                      <div>
                        <ul>
                          <li className="mb-2 font-bold">WORK</li>
                          <li className="mb-2 font-bold">
                            <Link href="/about-best-interior-designers-architects">
                              {' '}
                              ABOUT{' '}
                            </Link>
                          </li>
                          <li className="mb-2 font-bold">CAREERS</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" pt-1 md:p-4 text-black">
                <hr className="flex justify-center h-2 w-11/12 border-1 border-black ml-4 md:ml-14" />
              </div>
            </div>

            <div className="location mx-4 sm:mx-12 my-16">
              <LocationsTabs />
            </div>

            <div className="w-full text-center text-black text-sm  py-4 bg-white mb-16 sm:mb-0">
              <p>
                DESIGN INDIAN HOMES | ALL RIGHTS RESERVED 2024-25 CRAFTED WITH
                LOVE BY IN HOUSE BRAND -{' '}
                <a
                  href="https://www.designerlounge.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 font-bold underline"
                >
                  THE DESIGNER LOUNGE
                </a>{' '}
                <br />{' '}
                <span className="text-blue-500 underline">
                  <Link href="/privacy">PRIVACY</Link>
                </span>{' '}
                |{' '}
                <span className="text-blue-500 underline">
                  <Link href="/privacy#legal">LEGAL</Link>
                </span>{' '}
                | <span className="text-blue-500 underline">SITEMAP</span>
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Footer

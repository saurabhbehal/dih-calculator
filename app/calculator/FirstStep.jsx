'use strict'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../../components/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import {
  setOptionSet1,
  setOptionSet2,
  setOptionSet3,
  setOptionSet4,
  setTextInput,
} from '../../components/redux/actions/firstStepActions'
import Image from 'next/image'
import { useState } from 'react'

const FirstStepSection = () => {
  const [userData, setUserData] = useState({
    propertyType: '',
    numberOfRooms: '',
    interiorType: '',
    city: '',
  })

  // empty the local storage if there is already a spaceData there
  useEffect(() => {
    // Check if there is space data in local storage
    const spaceData = JSON.parse(localStorage.getItem('spaceData'))
    const newSpaceData = JSON.parse(localStorage.getItem('newSpaceData'))
    if (spaceData) {
      // Remove space data from local storage
      localStorage.removeItem('spaceData')
    }
    if (newSpaceData) {
      // Remove new space data from local storage
      localStorage.removeItem('newSpaceData')
    }
  }, [])

  // Save input values to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData))
    console.log(userData)
  }, [userData])

  const handleButtonClick = (option, setNumber, event) => {
    if (event) {
      event.preventDefault()
    }
    switch (setNumber) {
      case 1:
        setUserData((prev) => ({ ...prev, propertyType: option }))
        break
      case 2:
        setUserData((prev) => ({ ...prev, numberOfRooms: option }))
        break
      case 3:
        setUserData((prev) => ({ ...prev, interiorType: option }))
        break

      default:
        break
    }
  }

  const handleTextInputChange = (e) => {
    setUserData((prev) => ({ ...prev, city: e.target.value }))
  }

  return (
    <Provider store={store}>
      <div>
        <form className="m-4">
          {/* First set of options */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Select property type</h3>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={(event) => handleButtonClick('Apartment', 1, event)}
                className={`flex w-32 h-12 text-xs items-center p-2 rounded-md shadow-md hover:shadow-lg hover:border-[1px] hover:border-blue-400 ${
                  userData.propertyType === 'Apartment'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white'
                }`}
              >
                <Image
                  width={1000}
                  height={1000}
                  src="/images/apartment-icon.svg"
                  alt="Apartment"
                  className="w-8 h-8 mr-2" // Adjust the size and spacing as needed
                />
                <span>Apartment</span>
              </button>

              <button
                type="button"
                onClick={(event) => handleButtonClick('Villa', 1, event)}
                className={`flex w-32 h-12 text-xs items-center p-2 rounded-md shadow-md hover:shadow-lg hover:border-[1px] hover:border-blue-400 ${
                  userData.propertyType === 'Villa'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white'
                }`}
              >
                <Image
                  width={1000}
                  height={1000}
                  src="/images/villa-icon.svg"
                  alt="Villa"
                  className="w-8 h-8 mr-2" // Adjust the size and spacing as needed
                />
                <span>Villa</span>
              </button>
            </div>
          </div>

          {/* second field */}
          <div className="mb-8">
            <h3 className="text-lg font-bold">Select number of rooms</h3>
            <p className="text-xs text-gray-600 mb-4">
              Choose your BHK preference and move on to the next step
            </p>
            <div className="flex flex-wrap gap-4 ">
              <button
                type="button"
                onClick={(event) => handleButtonClick('1 BHK', 2, event)}
                className={`flex w-32 h-12 text-xs items-center p-2 rounded-md shadow-md hover:shadow-lg hover:border-[1px] hover:border-blue-400 ${
                  userData.numberOfRooms === '1 BHK'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white'
                }`}
              >
                <Image
                  width={1000}
                  height={1000}
                  src="/images/bed-icon.svg"
                  alt="1 BHK"
                  className="w-4 h-4 mr-4" // Adjust the size and spacing as needed
                />
                <span>1 BHK</span>
              </button>
              <button
                type="button"
                onClick={(event) => handleButtonClick('2 BHK', 2, event)}
                className={`flex w-32 h-12 text-xs items-center p-2 rounded-md shadow-md hover:shadow-lg hover:border-[1px] hover:border-blue-400 ${
                  userData.numberOfRooms === '2 BHK'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white'
                }`}
              >
                <Image
                  width={1000}
                  height={1000}
                  src="/images/bed-icon.svg"
                  alt="2 BHK"
                  className="w-4 h-4 mr-4" // Adjust the size and spacing as needed
                />
                <span>2 BHK</span>
              </button>
              <button
                type="button"
                onClick={(event) => handleButtonClick('3 BHK', 2, event)}
                className={`flex w-32 h-12 text-xs items-center p-2 rounded-md shadow-md hover:shadow-lg hover:border-[1px] hover:border-blue-400 ${
                  userData.numberOfRooms === '3 BHK'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white'
                }`}
              >
                <Image
                  width={1000}
                  height={1000}
                  src="/images/bed-icon.svg"
                  alt="3 BHK"
                  className="w-4 h-4 mr-4" // Adjust the size and spacing as needed
                />
                <span>3 BHK</span>
              </button>
              <button
                type="button"
                onClick={(event) => handleButtonClick('4+ BHK', 2, event)}
                className={`flex w-32 h-12 text-xs items-center p-2 rounded-md shadow-md hover:shadow-lg hover:border-[1px] hover:border-blue-400 ${
                  userData.numberOfRooms === '4+ BHK'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white'
                }`}
              >
                <Image
                  width={1000}
                  height={1000}
                  src="/images/bed-icon.svg"
                  alt="4+ BHK"
                  className="w-4 h-4 mr-4" // Adjust the size and spacing as needed
                />
                <span>4+ BHK</span>
              </button>
            </div>
          </div>

          {/* third input */}

          <div className="mb-8">
            <h3 className="text-lg font-bold">Home Interior Type</h3>
            <p className="text-xs text-gray-600 mb-4">
              What best describes your home interior need?
            </p>
            <div className="flex gap-2 bg-white p-2 w-fit rounded-lg">
              <button
                type="button"
                onClick={(event) => handleButtonClick('New', 3, event)}
                className={`rounded-lg w-32 h-12 text-xs   ${
                  userData.interiorType === 'New'
                    ? 'bg-green-400 text-white hover:text-white'
                    : 'bg-white hover:text-green-400'
                }`}
              >
                <span>New</span>
              </button>
              <button
                type="button"
                onClick={(event) => handleButtonClick('Renovation', 3, event)}
                className={`rounded-lg w-32 h-12 text-xs   ${
                  userData.interiorType === 'Renovation'
                    ? 'bg-green-400 text-white hover:text-white'
                    : 'bg-white hover:text-green-400'
                }`}
              >
                <span>Renovation</span>
              </button>
            </div>
          </div>

          {/* Input text field */}
          <div>
            <h3 className="text-lg font-bold mb-2">
              Your City <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              required
              placeholder="Type Your City..."
              value={userData.city}
              onChange={handleTextInputChange}
              className="border-2 border-blue-500 rounded-md p-2 sm:w-1/3 text-xs"
            />
          </div>

          {/* Button to submit the form */}
          {/* <button */}
          {/* type="button"
          onClick={handleFormSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
        >
          Submit
        </button> */}
        </form>
      </div>
    </Provider>
  )
}

export default FirstStepSection

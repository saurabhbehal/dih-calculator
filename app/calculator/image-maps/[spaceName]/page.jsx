'use client'
import React from 'react'
import { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import BedroomImage from '../BedroomImage'
import LivingandDiningImage from '../LivingandDiningImage'
import KitchenImage from '../KitchenImage'
import KitchenLImage from '../KitchenLImage'
import KitchenSImage from '../KitchenSImage'
import KitchenPImage from '../KitchenPImage'
import KitchenUImage from '../KitchenUImage'
import BathroomImage from '../BathroomImage'
import MandirRoomImage from '../MandirRoomImage'
import StoreRoomImage from '../StoreRoomImage'
import StudyRoomImage from '../StudyRoomImage'
import LivingRoomImage from '../LivingRoomImage'
import EntranceRoomImage from '../EntranceRoomImage'
import BalconyImage from '../BalconyImage'
import PassageImage from '../PassageImage'
import DiningRoom from '../DiningRoomImage'
import MaxWidthWrapper from '../../../../components/MaxWidthWrapper'
import { ArrowLeft } from 'lucide-react'
const Page = ({ params }) => {
  const [spaceData, setSpaceData] = useState(null)
  // const spaceDataFromRedux = useSelector((state) => state.secondStep.spaceData)

  useEffect(() => {
    const space = localStorage.getItem('spaceData')
    if (space) {
      // If spaceData exists in localStorage, parse and set it
      setSpaceData(JSON.parse(space))
    }
  }, [])

  // const getSpaceData = () => {
  //   return spaceDataFromLocalStorage || spaceDataFromRedux
  // }

  // const spaceData = getSpaceData()

  // console.log('spaceDataFromLocalStorage:', spaceDataFromLocalStorage)
  // console.log('spaceDataFromRedux:', spaceDataFromRedux)
  console.log('Space Data:', spaceData)

  const encodedSpaceName = params.spaceName
  const decodedSpaceName = decodeURIComponent(encodedSpaceName)

  // Extracting spaceType and spaceName from decodedSpaceName
  let spaceType = decodedSpaceName.split(' ')[0]
  const spaceName = decodedSpaceName.replace(/%20/g, ' ')
  const regex = /\(([^)]+)\)/
  const matches = spaceName.match(regex)
  const layout = matches ? matches[1] : ''

  // Check if spaceName contains "Kitchen"
  if (spaceName.toLowerCase().includes('kitchen')) {
    spaceType = layout
  }
  console.log('Space Type:', spaceType)
  console.log('Space Name:', spaceName)

  const getImageComponent = () => {
    switch (spaceType) {
      case 'Bedroom':
        return <BedroomImage data={spaceData} name={spaceName} />
      case 'Master':
        return <BedroomImage data={spaceData} name={spaceName} />
      case 'Living':
        if (spaceName.includes('Living and Dining')) {
          return <LivingandDiningImage data={spaceData} name={spaceName} />
        } else {
          return <LivingRoomImage data={spaceData} name={spaceName} />
        }
      // case 'Kitchen':
      //   return <KitchenImage data={spaceData} name={spaceName} />
      case 'Bathroom':
        return <BathroomImage data={spaceData} name={spaceName} />
      case 'Mandir':
        return <MandirRoomImage data={spaceData} name={spaceName} />
      case 'Store':
        return <StoreRoomImage data={spaceData} name={spaceName} />
      case 'Servant':
        return <StoreRoomImage data={spaceData} name={spaceName} />
      case 'Study':
        return <StudyRoomImage data={spaceData} name={spaceName} />
      // case 'Living':
      //   return <LivingRoomImage data={spaceData} name={spaceName} />
      case 'Entrance':
        return <EntranceRoomImage data={spaceData} name={spaceName} />
      case 'Balcony':
        return <BalconyImage data={spaceData} name={spaceName} />
      case 'Passage':
        return <PassageImage data={spaceData} name={spaceName} />
      case 'Dining':
        return <DiningRoom data={spaceData} name={spaceName} />
      case 'Straight':
        return <KitchenSImage data={spaceData} name={spaceName} />
      case 'L Shaped':
        return <KitchenLImage data={spaceData} name={spaceName} />
      case 'U Shaped':
        return <KitchenUImage data={spaceData} name={spaceName} />
      case 'Parallel':
        return <KitchenPImage data={spaceData} name={spaceName} />
      default:
        return null
    }
  }

  // handling back navigations
  const router = useRouter()

  return (
    <>
      <div
        className="w-full min-h-[100vh] flex justify-center items-center sm:py-12 py-4"
        style={{
          backgroundImage: "url('/images/calculator/living_background.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <MaxWidthWrapper>
          <div className="border-2 border-blue-500 rounded-lg bg-slate-200 shadow-lg p-0 my-4">
            <div className="bg-white p-4 flex items-center w-full rounded-t-lg shadow-lg">
              <button
                onClick={() => router.push('/calculator?step=2')}
                className="inline-flex items-center mr-4"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h3 className="inline text-lg">{spaceName}</h3>
            </div>
            {/* <div className="p-4 m-4 bg-blue-500 flex justify-between rounded-lg shadow-lg text-white">
            <div>
              <p className="text-xs">Room budget</p>
              <h3>₹0</h3>
            </div>
            <div className="text-right">
              <p className="text-xs">Total budget</p>
              <h3>₹44,765</h3>
              <p className="text-xxs">
                *All prices are inclusive of material and labour charges
              </p>
            </div>
          </div> */}
            {/* <div className="m-4">
            <p>
              Tap the desired components and add to your project&apos;s scope
            </p>
          </div> */}

            {/* the image map */}
            {getImageComponent()}

            {/* <div className="m-4">
            <p className="text-blue-500 text-xs">Disclaimer:</p>
            <p className="text-xs">
              Indicative rates based on market averages. Actual costs vary based
              on professional choice, measurements, materials, and additional
              charges like taxes, design fees, appliances, and site expenses.
            </p>
          </div>
          <div className="bg-white flex justify-center py-4 sm:px-12 w-full rounded-b-lg shadow-lg">
            <button className="text-lg shadow-md hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Save
            </button>
          </div> */}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  )
}

export default Page

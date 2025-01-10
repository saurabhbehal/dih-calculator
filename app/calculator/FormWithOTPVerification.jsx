import React, { useState, useRef } from 'react';
import axios from 'axios';

const FormWithOTPVerification = ({handleDownloadPDF}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countryCode, setCountryCode] = useState('+91'); // Default country code
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const ind = +91;
  const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));


  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    interestedIn: '',
    mobileNumber: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send an API request to your server to handle form submission
      const response = await axios.post('https://m.designindianhomes.com/submitForm', formData);

      // Assuming the server responds with a success message
      console.log(response.data);

      // Set the state to indicate successful download
      setDownloaded(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle form submission error
    }
  };

  const handleOTPInputChange = (index, value) => {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < 3) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleSendOTP = async () => {
    try {
      // Send an API request to your server to initiate OTP sending
      await axios.post('https://api.designindianwardrobe.com/api/send-otp', { to:countryCode + mobileNumber });

      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle error
    }
  };

  const handleVerifyNumber = async () => {
    try {
      // Send an API request to your server to verify the mobile number
      await axios.post('https://api.designindianwardrobe.com/api/verify-number', { mobileNumber: countryCode + mobileNumber });

      // Assuming verification is successful, proceed to send OTP
      await handleSendOTP();
    } catch (error) {
      console.error('Error verifying mobile number:', error);
      // Handle verification error
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Send an API request to your server to verify the entered OTP
      await axios.post('https://api.designindianwardrobe.com/api/verify-otp', { phone: countryCode + mobileNumber, enteredOtp: otp.join('') });
  
      console.log('OTP verified');
      setOtpVerified(true);

      // Assuming form data is available in state
      const formData = {
        name: document.getElementById('nameInput').value,
        address: document.getElementById('addressInput').value,
        email: document.getElementById('emailInput').value,
        interestedIn: document.getElementById('interestedInInput').value,
        mobileNumber: mobileNumber,
      };

      // Send an API request to your server to handle form submission
      const response = await axios.post('https://m.designindianhomes.com/submitForm', formData);

      // Assuming the server responds with a success message
      console.log(response.data);

      // Set the state to indicate successful download
      setDownloaded(true);

    } catch (error) {
      console.error('Error verifying OTP or submitting form:', error);
      // Handle OTP verification or form submission error
    }
  };

  const handleCloseForm = () => {
    // Reset form state when closing
    setMobileNumber('');
    setOtpSent(false);
    setOtp(['', '', '', '']);
    setOtpVerified(false);
    setDownloaded(false);
  };

  return (
    <div>
      <form className="space-y-4 w-[500px]" onSubmit={handleDownloadPDF}>
        <div>
          <input
            type="text"
            id="nameInput"
            placeholder="Enter your name"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            id="addressInput"
            placeholder="Enter your address"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <input
            type="email"
            id="emailInput"
            placeholder="Enter your email"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="interestedInInput" className="text-gray-600 block">
            Interested In:
          </label>
          <select
            id="interestedInInput"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select an option</option>
            <option value="Renovation">Renovation</option>
            <option value="Kitchen Work">Kitchen Work</option>
            <option value="Wardrobe Work">Wardrobe Work</option>
            <option value="House Work">House Work</option>
          </select>
        </div>
        
        <div>
          <input
            type="text"
            id="numberInput"
            placeholder="Enter your number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex w-full justify-center">
          {!otpSent ? (
            <button
              type="button"
              onClick={handleVerifyNumber}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 w-full"
            >
              Verify Number
            </button>
          ) : (
            <div className="flex flex-col">
              {!otpVerified ? (
                <>
                  <hr className="border-t-2 my-4" />
                  <div className="flex justify-center">
                    {[...Array(4)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleOTPInputChange(index, e.target.value)}
                        className="w-12 h-12 text-center border border-gray-300 rounded-md mr-2"
                        style={{
                          width: '3rem',
                        }}
                        ref={inputRefs.current[index]}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 mt-4"
                  >
                    Enter OTP
                  </button>
                </>
              ) : null}
            </div>
          )}
        </div>
        <div className="flex w-full justify-center">
  {otpVerified && !downloaded ? (
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 w-full"
    >
      Download
    </button>
  ) : null}
</div>
      </form>
    </div>
  );
};

export default FormWithOTPVerification;

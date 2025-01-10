"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
} from "@mui/material"; 
// import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import FirstStep from "./calculator/FirstStep";
import SecondStep from "./calculator/SecondStep";
import ThirdStep from "./calculator/ThirdStep";
import FourthStep from "./calculator/FourthStep";
import { useSpaceContext } from "./SpaceContext";
import { Suspense } from "react";
import Omsairam from "../components/Navbar/Omsairam";
const steps = ["Property Details", "Select Spaces", "Plan Spaces", "Finalise"];

export default function YourStepperComponent() {
  // handle back nav
  const searchParams = useSearchParams();
  const stepFromUrl = searchParams.get("step");
  console.log("stepFromUrl", stepFromUrl);
  const initialActiveStep = stepFromUrl ? parseInt(stepFromUrl) : 0;
  console.log("initialActiveStep", initialActiveStep);

  const [selectedSpace, setSelectedSpace] = useState(""); // Add initial state as needed

  const handlePlanClick = (spaceName) => {
    setSelectedSpace(spaceName);
  };

  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const { spaceCounts, setSpaceCounts } = useSpaceContext();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      const confirmBack = window.confirm(
        "Are you sure you want to go back to the first step? Any unsaved changes will be lost."
      );

      if (confirmBack) {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  const handleOpenWhatsApp = () => {
    const whatsappNumber = "9899264978"; // Replace with the full phone number in international format
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, "_blank");
  };
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FirstStep id="property-details" />
          // handleButtonClick={handleButtonClick}
          // handleTextInputChange={handleTextInputChange}
        );
      case 1:
        return (
          <SecondStep
            id="select-spaces"
            spaceCounts={spaceCounts}
            setSpaceCounts={setSpaceCounts}
          />
        );
      case 2:
        return <ThirdStep id="plan-spaces" onPlanClick={handlePlanClick} />;
      case 3:
        return <FourthStep id="finalise" />;
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Omsairam />

      {/* <h1 className="text-center">Get Free Estimate</h1> */}

      <div
        className="bg-fixed w-full min-h-[100vh] flex justify-center items-center sm:py-12 py-4 mt-[100px]"
        style={{
          backgroundImage: "url('/images/calculator/living_background.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container
          style={{
            border: "2px solid #3b82f6", // border-2 border-blue-500
            borderRadius: "0.5rem", // rounded-lg
            backgroundColor: "#c0d8fa", // bg-slate-200
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // shadow-lg
            padding: "0", // p-0
          }}
        >
          {/* Stepper component */}
          <div className="bg-white py-4 w-full rounded-t-lg shadow-lg">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel onClick={() => handleStepClick(index)}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          {/* Content for each step */}
          <div className="mt-4 pt-4">
            {activeStep === steps.length ? (
              <div>
                <Typography>All steps completed</Typography>
              </div>
            ) : (
              <div>
                {renderStepContent(activeStep)}
                {/* Your section content for each step goes here */}

                {/* Buttons for navigation */}
                <div className="mt-4 p-4 bg-white flex justify-evenly w-full rounded-b-lg shadow-lg">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={
                      activeStep === steps.length - 1
                        ? handleOpenWhatsApp
                        : handleNext
                    }
                    style={{
                      backgroundColor: "#3b82f6", // bg-blue-500
                      ":hover": {
                        backgroundColor: "#2563eb", // hover:bg-blue-700
                      },
                      color: "#fff", // text-white
                      fontWeight: "bold", // font-bold
                      padding: "0.5rem 1rem", // py-2 px-4
                      borderRadius: "9999px", // rounded-full
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? "Chat on WhatsApp"
                      : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </Suspense>
  );
}

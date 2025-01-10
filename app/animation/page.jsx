"use client";
import React, { useEffect, useRef, useState } from "react";

export default function FluidAnimation() {
  const canvasRef = useRef(null);
  const [fluidAnimation, setFluidAnimation] = useState(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    // Check if window object is available (i.e., we are in the browser environment)
    if (typeof window !== "undefined") {
      import("webgl-fluid").then(({ default: WebGLFluid }) => {
        const fluid = WebGLFluid(canvasRef.current, {
          IMMEDIATE: true, // Initially set to true
          TRIGGER: "hover", // Set trigger to hover
          SIM_RESOLUTION: 128, // Resolution of the simulation grid
          DYE_RESOLUTION: 1024, // Resolution of the dye grid
          CAPTURE_RESOLUTION: 512, // Resolution of captured frames
          DENSITY_DISSIPATION: 1, // Rate at which density dissipates
          VELOCITY_DISSIPATION: 0.2, // Rate at which velocity dissipates
          PRESSURE: 0.8, // Pressure value used in the simulation
          PRESSURE_ITERATIONS: 20, // Number of pressure iterations
          CURL: 30, // Curl value used in the simulation
          INITIAL: true, // Enables splats on initial load
          SPLAT_AMOUNT: 5, // Number of initial splats (Random number between n and n * 5)
          SPLAT_RADIUS: 0.25, // Radius of the splats
          SPLAT_FORCE: 6000, // Force applied by the splats
          SPLAT_KEY: "Space", // Keyboard key to spawn new splats (empty to disable)
          SHADING: true, // Enables shading in the visualization
          COLORFUL: true, // Enables rapid changing of colors
          COLOR_UPDATE_SPEED: 10, // Speed of color update
          COLOR_PALETTE: [], // Custom color palette (empty by default, uses hex colors)
          HOVER: true, // Enables interaction on hover
          BACK_COLOR: "#000000", // Background color of the canvas
          TRANSPARENT: true, // Makes the canvas transparent if true
          BRIGHTNESS: 0.5, // Color brightness (Recommend lower than 1.0 if BLOOM is true)
          BLOOM: true, // Enables bloom effect
          BLOOM_ITERATIONS: 8, // Number of bloom effect iterations
          BLOOM_RESOLUTION: 256, // Resolution of the bloom effect
          BLOOM_INTENSITY: 0.8, // Intensity of the bloom effect
          BLOOM_THRESHOLD: 0.6, // Threshold for the bloom effect
          BLOOM_SOFT_KNEE: 0.7, // Soft knee value for the bloom effect
          SUNRAYS: true, // Enables sunrays effect
          SUNRAYS_RESOLUTION: 196, // Resolution of the sunrays effect
          SUNRAYS_WEIGHT: 1.0, // Weight of the sunrays effect
        });

        // Set the fluid animation instance
        setFluidAnimation(fluid);

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        return () => {
          // Remove scroll event listener
          window.removeEventListener("scroll", handleScroll);
          // Destroy fluid animation
          fluid.destroy();
        };
      });
    }
  }, []);

  // const handleScroll = () => {
  //   const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  //   if (scrollPercentage >= 0 && !triggered) {
  //     // Reinitialize fluid animation with IMMEDIATE set to true
  //     if (typeof window !== 'undefined') {
  //       import('webgl-fluid').then(({ default: WebGLFluid }) => {
  //         const newFluidAnimation = WebGLFluid(canvasRef.current, {
  //           IMMEDIATE: true, // Initially set to true

  //           SPLAT_COUNT: Number.parseInt(Math.random() * 1) + 2,
  //           SIM_RESOLUTION: 128, // Resolution of the simulation grid
  //           DYE_RESOLUTION: 1024, // Resolution of the dye grid
  //           CAPTURE_RESOLUTION: 512, // Resolution of captured frames
  //           DENSITY_DISSIPATION: 0.5, // Rate at which density dissipates
  //           VELOCITY_DISSIPATION: 0.2, // Rate at which velocity dissipates
  //           PRESSURE: 0.8, // Pressure value used in the simulation
  //           PRESSURE_ITERATIONS: 10, // Number of pressure iterations
  //           CURL: 100, // Curl value used in the simulation
  //           INITIAL: true, // Enables splats on initial load
  //           SPLAT_AMOUNT: 2, // Number of initial splats (Random number between n and n * 5)
  //           SPLAT_RADIUS: 0.25, // Radius of the splats
  //           SPLAT_FORCE: 6000, // Force applied by the splats
  //           SPLAT_KEY: 'Space', // Keyboard key to spawn new splats (empty to disable)
  //           SHADING: true, // Enables shading in the visualization
  //           COLORFUL: true, // Enables rapid changing of colors
  //           COLOR_UPDATE_SPEED: 100, // Speed of color update
  //           COLOR_PALETTE: [], // Custom color palette (empty by default, uses hex colors)
  //           HOVER: true, // Enables interaction on hover
  //           BACK_COLOR: '#000000', // Background color of the canvas
  //           TRANSPARENT: true, // trueMakes the canvas transparent if true
  //           BRIGHTNESS: 0.1, // Color brightness (Recommend lower than 1.0 if BLOOM is true)
  //           BLOOM: true, // Enables bloom effect
  //           BLOOM_ITERATIONS: 3, // Number of bloom effect iterations
  //           BLOOM_RESOLUTION: 256, // Resolution of the bloom effect
  //           BLOOM_INTENSITY: 0.8, // Intensity of the bloom effect
  //           BLOOM_THRESHOLD: 0.6, // Threshold for the bloom effect
  //           BLOOM_SOFT_KNEE: 0.7, // Soft knee value for the bloom effect
  //           SUNRAYS: true, // Enables sunrays effect
  //           SUNRAYS_RESOLUTION: 196, // Resolution of the sunrays effect
  //           SUNRAYS_WEIGHT: 1.0, // Weight of the sunrays effect
  //         });

  //         // Destroy the previous animation
  //         fluidAnimation.destroy();
  //         // Set the new fluid animation instance
  //         setFluidAnimation(newFluidAnimation);
  //         setTriggered(true);
  //       });
  //     }
  //   } else if (scrollPercentage >= 20 && triggered) {
  //     // Reinitialize fluid animation with IMMEDIATE set to false
  //     if (typeof window !== 'undefined') {
  //       import('webgl-fluid').then(({ default: WebGLFluid }) => {
  //         const newFluidAnimation = WebGLFluid(canvasRef.current, {
  //           IMMEDIATE: false, // Initially set to false
  //           // Include other options here if needed
  //         });

  //         // Destroy the previous animation
  //         fluidAnimation.destroy();
  //         // Set the new fluid animation instance
  //         setFluidAnimation(newFluidAnimation);
  //         setTriggered(false);
  //       });
  //     }
  //   }
  // };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        inset: "0",
        maxHeight: "100vh",
      }}
    />
  );
}

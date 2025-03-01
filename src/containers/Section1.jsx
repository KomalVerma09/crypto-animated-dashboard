"use client";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import LaunchButton from "../components/Buttons/LaunchButton";
import { section1Content } from "../utils/content";
import useMeasure from "react-use-measure";
import Title from "../components/Title";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import { Typewriter } from "react-simple-typewriter";

import HeaderImage from "../../src/assets/images/section1/header-img.svg";


const { MainBG, ShootingStarImage, title, subtitle } =
  section1Content;
  const MotionGrid = motion(Grid);
const Section1 = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [ref, { height }] = useMeasure();

  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typingTime = title.length * 70; // Estimate time for title typing
    const cursorBlinkTime = 600; // Time for cursor to blink before hiding
    const subtitleStartTime = typingTime + cursorBlinkTime + 500; // Delay before subtitle starts

    // Step 1: Wait for title to finish typing, then make cursor blink
    setTimeout(() => {
      setShowCursor(false); // Hide cursor after blinking
    }, typingTime);

    // Step 2: Start subtitle after a delay
    setTimeout(() => {
      setShowSubtitle(true);
    }, subtitleStartTime);
  }, [title]);

  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef });

  // Scroll Effect: Moves Down on Scroll
  // const imageScroll = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  const imageScroll = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-200, 50, -50, 200], { clamp: false });


  return (
    <Box sx={{ width: "100%" }}>
      {/* Main Background */}
      <Box
        sx={{
          position: "fixed",
          zIndex: -10,
          top: 0,
          left: 0,
          right: 0,
          background:
            "radial-gradient(circle at right bottom, #6a0dad, #18091D, #000000)",
          // background: "radial-gradient(circle at right bottom, #9d8a57, #0D1A3A, #000000)"

        }}
      >
        <motion.img 
          src={MainBG} 
          style={{ width: "100%" }}
          animate={{ x: ["-10%", "10%"], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
      </Box>

      {/* backgrounds elements */}
      <Box
        ref={ref}
        sx={{
          position: "absolute",
          width: "100%",
          zIndex: -1,

          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <img src={MainBG} style={{ width: "100%", opacity: 0 }} />

        {/* Star */}
        <img
          src={ShootingStarImage}
          style={{
            position: "absolute",
            top: "30px",
            right: "15%",
            width: "500px",
          }}
        />

        <Box
          sx={{
            bgcolor: "background.default",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "800px",
            top: `calc(${height}px - 13%)`, // Default for small screens
            [theme.breakpoints.up("lg")]: {
              top: `calc(${height}px - 45%)`, // Change for md and above
            },
          }}
        ></Box>
      </Box>

      {/* Content */}
      <Container
        sx={{
          height: "80vh",
          mt: -6,
          [theme.breakpoints.up("md")]: { mt: 6 },
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left Content (Text) */}
        <Stack sx={{ flex: 1 }} justifyContent="center">
          <MotionGrid
            item
            xs={12}
            md={6}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <Title
              variant={{ xs: "h3", sm: "h2", md: "h2" }}
              sx={{ letterSpacing: "0.02em", mb: 1 }}
            >
              <Typewriter words={[title]} typeSpeed={70} cursor={showCursor} />
            </Title>
          </MotionGrid>

          {/* Subtitle */}
          {showSubtitle && (
            <MotionGrid
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
            >
              <Title
                variant={{ xs: "h6", sm: "h5", md: "h4" }}
                sx={{ fontWeight: 500, letterSpacing: "0.05em", mb: 5 }}
              >
                <Typewriter words={[subtitle]} typeSpeed={100} cursor />
              </Title>
            </MotionGrid>
          )}

          <MotionGrid
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            spacing={4}
          >
            <LaunchButton
              fullWidth={isSmallScreen}
              sx={{ height: 58, px: 3 }}
            />
          </MotionGrid>
        </Stack>

        {/* Right Image (Header Image) */}
        <motion.img
          ref={imgRef}
          src={HeaderImage}
          style={{
            maxWidth: "40%",
            height: "auto",
            right: 0,
            bottom: "10%", // Adjust as needed
            objectFit: "contain",
            y: imageScroll,
          }}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
      </Container>
    </Box>
  );
};

export default Section1;

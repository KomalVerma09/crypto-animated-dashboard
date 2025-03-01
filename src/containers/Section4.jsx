"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { motion } from "framer-motion";
import { Container, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import OutlinedButton from "../components/Buttons/OutlinedButton";
import Title from "../components/Title";
import { section4Content } from "../utils/content";
import LottieImage2 from "../../src/assets/images/LottieFile/lottie2.json";
import LottieImage1 from "../../src/assets/images/LottieFile/tab_img5.json";
import CodeBlock from "./CodeBlock";

const { top, bottom } = section4Content;
const MotionGrid = motion(Grid);

const Section4 = () => {
  const [tabValue, setTabValue] = useState(0);
  console.log(bottom.TABS.map(tab => tab.image));


  return (
    <Container sx={{ mt: { xs: 0, md: 5, lg: 5 }, mb: { xs: 10, lg: 15 } }}>
      {/* TOP Section */}
      <Grid container spacing={10} flexWrap="wrap-reverse" alignItems="center">
        <MotionGrid
          item
          xs={12}
          md={6}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <Title variant={{ xs: "h3", md: "h2" }}>{top.title}</Title>
            <Typography variant="body2" color="text.secondary" sx={{ pb: 2 }}>
              {top.subtitle}
            </Typography>
            {/* <OutlinedButton arrow fit>Swap</OutlinedButton> */}
          </Stack>
        </MotionGrid>

        <MotionGrid
          item
          xs={12}
          md={6}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <DotLottiePlayer src={LottieImage2} autoplay loop />
        </MotionGrid>
      </Grid>

      {/* BOTTOM Section */}
      <Grid container spacing={10} flexWrap="wrap-reverse" alignItems="center" sx={{ mt: { xs: 5, md: 0 }, mb: { xs: 10, md: 15 } }}>
        {/* Left Side - Lottie Animation */}
        <MotionGrid
          item
          xs={12}
          md={6}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <DotLottiePlayer
            src={bottom.TABS[tabValue].image} // Change based on tab selection
            autoplay
            loop
            style={{ width: "100%" }}
          />
        </MotionGrid>

        {/* Right Side - Tabs and Content */}
        <MotionGrid
          item
          xs={12}
          md={6}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <Title variant={{ xs: "h3", md: "h2" }}>{bottom.title}</Title>

            {/* Tabs Section */}
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant="scrollable" scrollButtons="auto">
              {bottom.TABS.map(({ name }, index) => (
                <Tab label={name} key={index} sx={{ minWidth: 60, "&.Mui-selected": { color: "text.primary" } }} />
              ))}
            </Tabs>

            {/* Tab Description */}
            <Typography variant="body2" color="text.secondary" sx={{ pb: 2, minHeight: 70 }}>
              {bottom.TABS[tabValue].subtitle}
            </Typography>

            <OutlinedButton arrow fit>Learn more</OutlinedButton>
          </Stack>
        </MotionGrid>
      </Grid>

      {/* CODE TERMINAL SECTION */}
      <MotionGrid
        item
        xs={12}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <CodeBlock />
      </MotionGrid>
    </Container>
  );
};

export default Section4;

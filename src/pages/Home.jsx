import { Box } from "@mui/material";
import React from "react";
import Footer from "../components/Footers/MainFooter";
import Navbar from "../components/Navbars/Navbar";
import Section1 from "../containers/Section1";
import Section10 from "../containers/Section10";
import Section2 from "../containers/Section2";
import Section4 from "../containers/Section4";
import Product from "../containers/Product";
import OrionEcosystem from "../containers/OrionEcosystem";
import BlockchainStats from "../containers/BlockchainStats";
import ComparisonSection from "../containers/ComparisonSection";
import RoadmapSection from "../containers/RoadmapSection";
import InitiativesSection from "../containers/InitiativesSection";

const Home = () => {
  return (
    <div style={{overflow:"hidden"}}>
      {/* Navbar */}
      <Navbar />

      {/* Sections */}
      <Section1 />
      <Section2 />
      
      <Box sx={{ bgcolor: "background.default", position: "relative"}}>
        <InitiativesSection/>

        <Section4 />
        <OrionEcosystem/>
        <BlockchainStats/>
        <ComparisonSection/>
        <RoadmapSection/>
        <Product />
        <Section10 />

        {/* Footer */}
        <Footer />
      </Box>
    </div>
  );
};

export default Home;

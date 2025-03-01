import { Container, Grid } from "@mui/material";
import React from "react";
import Title from "../components/Title";
import { productContent } from "../utils/content";
import {
  ArrowLeftRight,
  Rocket,
  Lock,
  PieChart,
  ShoppingBag,
  Brain,
  Coins,
  Repeat,
} from "lucide-react";
import "../assets/css/Product.css";

 
const { title } = productContent;

const Product = () => {
  const ecosystemItems = [
    {
      icon: <ArrowLeftRight className="ecosystem-icon" />,
      title: "DEX",
      description: "Decentralized Exchange Platform",
    },
    {
      icon: <Repeat className="ecosystem-icon" />,
      title: "Cross-chain Bridge",
      description: "Seamless Asset Transfer",
    },
    {
      icon: <PieChart className="ecosystem-icon" />,
      title: "Arbitrage",
      description: "Smart Trading Opportunities",
    },
    {
      icon: <ShoppingBag className="ecosystem-icon" />,
      title: "NFT Marketplace",
      description: "Trade Digital Assets",
    },
    {
      icon: <Rocket className="ecosystem-icon" />,
      title: "Token Launchpad",
      description: "Launch New Projects",
    },
    {
      icon: <Lock className="ecosystem-icon" />,
      title: "LP-Token Locker",
      description: "Secure Liquidity",
    },
    {
      icon: <Brain className="ecosystem-icon" />,
      title: "AI Assistant",
      description: "Smart DApp Interaction",
    },
    {
      icon: <Coins className="ecosystem-icon" />,
      title: "Rewards",
      description: "ORION Token Rewards",
    },
  ];

  return (
    <Container>
      <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: { xs: 5, md: 8 } }}>
        {title}
      </Title>

      <Grid container spacing={3}>
        {ecosystemItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.title}>
            <div className="ecosystem-box">
                <div className="ecosystem-card">
                  <div className="ecosystem-icon-wrapper">{item.icon}</div>
                  <h4 className="ecosystem-title-2">{item.title}</h4>
                  <p className="ecosystem-description">{item.description}</p>
                </div>
              </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Product;

import React, { useEffect, useRef } from "react";
import {
  Blocks,
  ArrowLeftRight,
  Rocket,
  Lock,
  PieChart,
  ShoppingBag,
  Brain,
  Coins,
  Repeat,
} from "lucide-react";
import "../assets/css/OrionEcosystem.css";
// import centerLogo from "../assets/images/Logo/Orion-06.png";
import centerLogo from "../assets/images/colorLogo/Orion-04.svg";
import { Container, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";

const EcosystemItem = ({ icon, title, description, index, total }) => {
  const angle = (index / total) * 2 * Math.PI;
  const getRadius = () => {
    if (window.innerWidth >= 1280) return 450;
    if (window.innerWidth >= 1024) return 400;
    return 300;
  };
  const radius = getRadius();
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      className="ecosystem-item rotate"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
    >
      <div className="item-content counter-rotate">
        <div className="item-card">
          <div className="item-chain-lines">
            <div className="chain-line-left" />
            <div className="chain-line-right" />
          </div>

          <div className="item-content-inner">
            <div className="item-icon-container">{icon}</div>
            <h4 className="item-title">{title}</h4>
            <p className="item-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SPatternLayout = ({ items }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const drawConnections = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const cards = container.querySelectorAll(".s-pattern-item");
      const connections = container.querySelector(".s-pattern-connections");
      const centerLogo = container.querySelector(".s-pattern-center");

      if (!connections || !centerLogo) return;
      connections.innerHTML = "";

      const logoRect = centerLogo.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Create S-pattern connections
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const nextCard = cards[index + 1];

        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();
          const isLeftToRight = index % 2 === 0;

          // Horizontal connection
          const line = document.createElement("div");
          line.className = "s-connection";
          line.style.left = isLeftToRight
            ? `${cardRect.right - containerRect.left}px`
            : `${nextRect.right - containerRect.left}px`;
          line.style.top = `${
            (cardRect.top + cardRect.bottom) / 2 - containerRect.top
          }px`;
          line.style.width = `${Math.abs(nextRect.left - cardRect.right)}px`;
          connections.appendChild(line);

          // Vertical connection
          if (nextCard) {
            const vertical = document.createElement("div");
            vertical.className = "s-connection-vertical";
            vertical.style.left = isLeftToRight
              ? `${nextRect.left - containerRect.left}px`
              : `${cardRect.left - containerRect.left}px`;
            vertical.style.top = `${
              (cardRect.top + cardRect.bottom) / 2 - containerRect.top
            }px`;
            vertical.style.height = `${nextRect.top - cardRect.bottom}px`;
            connections.appendChild(vertical);
          }
        }

        // Connect to center logo
        if (index === 3 || index === 4) {
          const vertical = document.createElement("div");
          vertical.className = "s-connection-vertical";
          vertical.style.left = `${
            (cardRect.left + cardRect.right) / 2 - containerRect.left
          }px`;
          vertical.style.top = `${cardRect.top - containerRect.top}px`;
          vertical.style.height = `${logoRect.bottom - cardRect.top}px`;
          connections.appendChild(vertical);
        }
      });
    };

    drawConnections();
    window.addEventListener("resize", drawConnections);
    return () => window.removeEventListener("resize", drawConnections);
  }, [items]);

  return (
    <div className="s-pattern-layout" ref={containerRef}>
      <div className="s-pattern-container">
        <div className="s-pattern-connections" />
        {items.slice(0, 4).map((item, index) => (
          <div key={index} className="s-pattern-item">
            <div className="item-content-inner">
              <div className="item-icon-container">{item.icon}</div>
              <h4 className="item-title">{item.title}</h4>
              <p className="item-description">{item.description}</p>
            </div>
          </div>
        ))}
        <div className="s-pattern-center">
          <div className="logo-container rotate">
            <div className="logo-inner">
              <img
                src={centerLogo}
                className="logo-icon"
                alt="Logo"
              />
            </div>
            <div className="logo-glow" />
          </div>
        </div>
        {items.slice(4).map((item, index) => (
          <div key={index + 4} className="s-pattern-item">
            <div className="item-content-inner">
              <div className="item-icon-container">{item.icon}</div>
              <h4 className="item-title">{item.title}</h4>
              <p className="item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileGrid = ({ items }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const drawConnections = () => {
      if (!gridRef.current) return;

      const container = gridRef.current;
      const cards = container.querySelectorAll(".mobile-item");
      const logo = container.querySelector(".mobile-center-logo");
      const connections = container.querySelector(".mobile-connections");

      if (!connections) return;
      connections.innerHTML = "";

      // Connect cards horizontally
      cards.forEach((card, index) => {
        if (index % 2 === 0 && index < cards.length - 1) {
          const rect1 = card.getBoundingClientRect();
          const rect2 = cards[index + 1].getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const line = document.createElement("div");
          line.className = "mobile-connection-line";
          line.style.left = `${rect1.right - containerRect.left}px`;
          line.style.top = `${
            (rect1.top + rect1.bottom) / 2 - containerRect.top
          }px`;
          line.style.width = `${rect2.left - rect1.right}px`;
          connections.appendChild(line);
        }
      });

      // Connect cards vertically
      for (let i = 0; i < cards.length - 2; i++) {
        const rect1 = cards[i].getBoundingClientRect();
        const rect2 = cards[i + 2].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const line = document.createElement("div");
        line.className = "mobile-connection-vertical";
        line.style.left = `${
          (rect1.left + rect1.right) / 2 - containerRect.left
        }px`;
        line.style.top = `${rect1.bottom - containerRect.top}px`;
        line.style.height = `${rect2.top - rect1.bottom}px`;
        connections.appendChild(line);
      }

      // Connect to center logo
      if (logo) {
        const logoRect = logo.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Connect to top cards
        const topCards = [cards[0], cards[1]];
        topCards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const line = document.createElement("div");
          line.className = "mobile-connection-vertical";
          line.style.left = `${
            (rect.left + rect.right) / 2 - containerRect.left
          }px`;
          line.style.top = `${logoRect.bottom - containerRect.top}px`;
          line.style.height = `${rect.top - logoRect.bottom}px`;
          connections.appendChild(line);
        });
      }
    };

    drawConnections();
    window.addEventListener("resize", drawConnections);
    return () => window.removeEventListener("resize", drawConnections);
  }, [items]);

  return (
    <div className="mobile-grid" ref={gridRef}>
      <div className="mobile-connections" />
      <div className="mobile-center-logo">
        <div className="logo-container rotate">
          <div className="logo-inner">
            <img
              src={centerLogo}
              className="logo-icon"
              alt="Logo"
            />
          </div>
          <div className="logo-glow" />
        </div>
      </div>

      {items.map((item, index) => (
        <div key={index} className="mobile-item">
          <div className="mobile-icon-container">{item.icon}</div>
          <h4 className="mobile-title">{item.title}</h4>
          <p className="mobile-description">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

const OrionEcosystem = () => {
  const ecosystemItems = [
    {
      icon: <ArrowLeftRight className="item-icon mobile-icon" />,
      title: "DEX",
      description: "Decentralized Exchange Platform",
    },
    {
      icon: <Repeat className="item-icon mobile-icon" />,
      title: "Cross-chain Bridge",
      description: "Seamless Asset Transfer",
    },
    {
      icon: <PieChart className="item-icon mobile-icon" />,
      title: "Arbitrage",
      description: "Smart Trading Opportunities",
    },
    {
      icon: <ShoppingBag className="item-icon mobile-icon" />,
      title: "NFT Marketplace",
      description: "Trade Digital Assets",
    },
    {
      icon: <Rocket className="item-icon mobile-icon" />,
      title: "Token Launchpad",
      description: "Launch New Projects",
    },
    {
      icon: <Lock className="item-icon mobile-icon" />,
      title: "LP-Token Locker",
      description: "Secure Liquidity",
    },
    {
      icon: <Brain className="item-icon mobile-icon" />,
      title: "AI Assistant",
      description: "Smart DApp Interaction",
    },
    {
      icon: <Coins className="item-icon mobile-icon" />,
      title: "Rewards",
      description: "ORION Token Rewards",
    },
  ];

  const getDotPosition = (index, total) => {
    const getRadius = () => {
      if (window.innerWidth >= 1280) return 450;
      if (window.innerWidth >= 1024) return 400;
      if (window.innerWidth >= 996) return 300;
      return 300;
    };
    const radius = getRadius();
    const angle = (index / total) * 2 * Math.PI;
    return {
      left: `${Math.cos(angle) * radius + radius}px`,
      top: `${Math.sin(angle) * radius + radius}px`,
    };
  };

  return (
    <div className="ecosystem-container">
      <div className="ecosystem-background" />

      <div className="container-orion">
        <Container
          sx={{ pb: { sm: 0, md: 10, lg: 20 } }}
          className="ecosystem-header"
        >
          <h2 className="ecosystem-title">Orion Blockchain Ecosystem</h2>
          <p className="ecosystem-description">
            A comprehensive suite of decentralized applications and tools
            revolving around the Orion Chain
          </p>
        </Container>
        {/* <div className="ecosystem-header" style={{ paddingBottom: "100px" }}>
          <h2 className="ecosystem-title">Orion Blockchain Ecosystem</h2>
          <p className="ecosystem-description">
            A comprehensive suite of decentralized applications and tools
            revolving around the Orion Chain
          </p>
        </div> */}

        {/* Mobile Grid Layout */}
        <MobileGrid items={ecosystemItems} />

        {/* Medium Screen S-Pattern Layout */}
        <SPatternLayout items={ecosystemItems} />

        {/* Desktop Orbital Layout */}
        <div className="orbital-layout">
          {/* Orbital Path */}
          <div className="orbital-path">
            <div className="orbital-circle">
              {/* Chain-like decorations */}
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className="orbital-dot"
                  style={getDotPosition(i, 36)}
                />
              ))}
            </div>
          </div>

          {/* Center Orion Logo */}
          <div className="center-logo">
            <div className="logo-container rotate">
              <div className="logo-inner">
                <img
                  src={centerLogo}
                  className="logo-icon"
                  alt="Logo"
                />
              </div>
              <div className="logo-glow" />
            </div>
          </div>

          {/* Ecosystem Items */}
          <div className="orbital-items">
            {ecosystemItems.map((item, index) => (
              <EcosystemItem
                key={item.title}
                {...item}
                index={index}
                total={ecosystemItems.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrionEcosystem;

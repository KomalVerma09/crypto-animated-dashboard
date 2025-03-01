import React, { useEffect, useRef } from 'react';
import {
  Rocket,
  ArrowLeftRight,
  Brain,
  Lock,
  Coins,
  ShoppingBag,
  PieChart,
  Repeat,
  Blocks,
  ExternalLink
} from 'lucide-react';
// import './RoadmapSection.css';
import '../assets/css/RoadmapSection.css';
import { Box, Container, Grid, Stack, Typography } from "@mui/material";



export const RoadmapSection = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  const roadmapItems = [
    {
      quarter: 'Q4',
      year: '2024',
      title: 'Testnet MVP',
      description: 'Experience the Orion Chain testnet with core functionalities',
      icon: <Blocks className="roadmap-icon" />,
      status: 'completed',
      link: 'https://testnet.theorionscan.com/'
    },
    {
      quarter: 'Q1',
      year: '2025',
      title: 'Mainnet Launch',
      description: 'Official launch with all standard features including DEX, Bridge, and core protocols',
      icon: <Rocket className="roadmap-icon" />,
      status: 'in-progress'
    },
    {
      quarter: 'Q2',
      year: '2025',
      title: 'DEX Platform',
      description: 'Launch of decentralized exchange with advanced trading features',
      icon: <ArrowLeftRight className="roadmap-icon" />,
      status: 'upcoming'
    },
    {
      quarter: 'Q2',
      year: '2025',
      title: 'Cross-chain Bridge',
      description: 'Implementation of secure cross-chain asset transfer protocol',
      icon: <Repeat className="roadmap-icon" />,
      status: 'upcoming'
    },
    {
      quarter: 'Q3',
      year: '2025',
      title: 'Smart Trading',
      description: 'Advanced arbitrage and trading tools powered by AI',
      icon: <PieChart className="roadmap-icon" />,
      status: 'upcoming'
    },
    {
      quarter: 'Q3',
      year: '2025',
      title: 'NFT Marketplace',
      description: 'Launch of NFT trading platform with unique features',
      icon: <ShoppingBag className="roadmap-icon" />,
      status: 'upcoming'
    },
    {
      quarter: 'Q4',
      year: '2025',
      title: 'Token Launchpad',
      description: 'Platform for new project launches and token sales',
      icon: <Rocket className="roadmap-icon" />,
      status: 'upcoming'
    },
    {
      quarter: 'Q4',
      year: '2025',
      title: 'LP Token Locker',
      description: 'Advanced liquidity protection mechanism',
      icon: <Lock className="roadmap-icon" />,
      status: 'upcoming'
    },
    {
      quarter: 'Q1',
      year: '2026',
      title: 'AI Integration',
      description: 'Advanced AI tools for DApp interaction and trading',
      icon: <Brain className="roadmap-icon" />,
      status: 'upcoming'
    },
    {
      quarter: 'Q2',
      year: '2026',
      title: 'Rewards System',
      description: 'Enhanced staking and reward distribution mechanism',
      icon: <Coins className="roadmap-icon" />,
      status: 'upcoming'
    }
  ];

  return (
    <Container>
      <div className="roadmap-section">
      <div className="roadmap-background"></div>
      
      <div className="roadmap-container">
        <div className="roadmap-header">
          <h2 className="roadmap-title">Roadmap</h2>
          <p className="roadmap-subtitle">
            Our journey to building the future of decentralized finance
          </p>
        </div>

        <div className="roadmap-timeline" ref={timelineRef}>
          <div className="timeline-line"></div>

          {roadmapItems.map((item, index) => (
            <div
              key={item.title}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              {/* Timeline dot */}
              <div className="timeline-dot-container">
                <div className={`timeline-dot ${item.status}`}>
                  {item.status === 'in-progress' && <div className="dot-pulse"></div>}
                </div>
              </div>

              {/* Content card */}
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="card-header">
                    <div className="icon-container">
                      {item.icon}
                    </div>
                    <div className="header-content">
                      <div className="quarter-year">
                        <span className="quarter">{item.quarter}</span>
                        <span className="year">{item.year}</span>
                      </div>
                      <div className="title-container">
                        <h3 className="card-title">{item.title}</h3>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="testnet-link"
                          >
                            <ExternalLink className="link-icon" />
                            <span>View Testnet</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="card-description">{item.description}</p>
                  
                  <div className="status-indicator">
                    <div className={`status-dot ${item.status}`}></div>
                    <span className="status-text">
                      {item.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Container>
  );
};

export default RoadmapSection;
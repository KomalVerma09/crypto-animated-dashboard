"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import React from 'react';
import { Check, X, Blocks, Coins } from 'lucide-react';
import '../assets/css/ComparisonSection.css';
import bitCoinImg from '../assets/images/LottieFile/bitcoin.json';
import ethCoinImg from '../assets/images/LottieFile/etherium.json';
// import logo from '../assets/images/Logo/Orion-06.png'
import logo from '../assets/images/colorLogo/Orion-04.svg'
import { Box, Container, Grid, Stack, Typography } from "@mui/material";


const ComparisonSection = () => {
  return (
    <Container>
      <div className="comparison-section" id="comparison">
      <div className="comparison-background"></div>
      <div className="comparison-container">
        <h2 className="comparison-title">Why Orion Chain?</h2>
        <p className="comparison-subtitle">
          Compare Orion Chain with other leading blockchain platforms
        </p>
        <ComparisonTable />
      </div>
    </div>
    </Container>
  );
};

const ComparisonTable = () => {
  const chains = [
    {
      name: 'Bitcoin',
      icon:  <DotLottiePlayer src={bitCoinImg} className="coinImg" autoplay loop/>,
      generation: '1st',
      tps: '7/s',
      finality: '30-60 min',
      fee: '$25-$30',
      type: 'Layer 1',
      language: 'C/C++',
      consensus: 'Proof of Work',
      smartContracts: false,
      governance: false
    },
    {
      name: 'Ethereum',
      icon: <DotLottiePlayer src={ethCoinImg} className="coinImg" autoplay loop/>,
      generation: '2nd',
      tps: '30/s',
      finality: '5 min',
      fee: '$10-$50',
      type: 'Layer 1',
      language: 'Go, Rust, C++',
      consensus: 'Proof of Stake',
      smartContracts: true,
      governance: false
    },
    {
      name: 'Orion Chain',
      icon: <img src={logo} className="chain-icon orion" />,
      generation: '3rd',
      tps: '3000/s',
      finality: '3 sec',
      fee: '$0.0001',
      type: 'Layer 1',
      language: 'Go',
      consensus: 'Proof of Stake',
      smartContracts: true,
      governance: true
    }
  ];

  return (
    <div className="comparison-grid-2">
      {chains.map((chain, index) => (
        <div
          key={chain.name}
          className={`chain-card ${chain.name === 'Orion Chain' ? 'featured' : ''}`}
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="card-overlay"></div>
          <div className="card-content">
            <div className="chain-header">
              <div className="icon-container" style={{height:"70px", width:"70px"}}>
                {chain.icon}
              </div>
              <h3 className="chain-name">{chain.name}</h3>
            </div>
            
            <div className="chain-details">
              {Object.entries(chain)
                .filter(([key]) => !['name', 'icon'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="detail-row">
                    <span className="detail-label">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="detail-value">
                      {typeof value === 'boolean' ? (
                        value ? 
                          <Check className="check-icon" /> : 
                          <X className="x-icon" />
                      ) : (
                        value
                      )}
                    </span>
                  </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComparisonSection;
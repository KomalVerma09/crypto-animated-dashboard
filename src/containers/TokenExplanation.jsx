import React, { useState } from 'react';
import { PenTool as Token, KeyRound } from 'lucide-react';
import '../assets/css/TokenExplanation.css';
import { Box, Container, Grid, Stack, Typography } from "@mui/material";



const TokenExplanation = () => {
  const [activeTab, setActiveTab] = useState('mechanism');

  return (
    <div>
      <div className="token-container" style={{marginBottom:"30px",}}>
      <div className="token-header">
        <Token className="token-icon" />
        <h2 className="token-title">Know About Orion</h2>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'mechanism' ? 'active' : ''}`}
          onClick={() => setActiveTab('mechanism')}
        >
          How It Works
        </button>
        <button
          className={`tab-button ${activeTab === 'differences' ? 'active' : ''}`}
          onClick={() => setActiveTab('differences')}
        >
          Key Differences
        </button>
      </div>

      <div className="content-section-token-mechanism">
        {activeTab === 'mechanism' ? (
          <div>
            <div className="info-card">
              <div className="card-header">
                <Token className="token-icon" />
                <h3 className="card-title">Token Mechanism</h3>
              </div>
              <p className="card-subtitle">
              Our contract follows the BEP20 standard with additional features:
              </p>
              <ol className="ordered-list">
                <li className="list-item">Implements `IBEP20` interface.</li>
                <li className="list-item">Uses `ReentrancyGuard` for security against reentrancy attacks.</li>
                <li className="list-item">Implements cooldown periods to prevent frequent transactions.</li>
              </ol>
            </div>
            
            <div className="info-card">
              <h4 className="text-emerald">Tokenomics & Supply Management</h4>
              <p className="card-subtitle">
              Our tokenomics revolve around two key reserves:
              </p>

              <ul className="unordered-list">
                <li className="list-item">`reserve0`: Represents the total supply of ORIN tokens.</li>
                <li className="list-item">`reserve1`: Represents the total USDT held in the contract.</li>
              </ul>

              <p className="card-subtitle">
              These reserves impact:
              </p>
              <ul className="unordered-list">
                <li className="list-item">Minting (when users buy ORIN with USDT).</li>
                <li className="list-item">Burning (when users sell ORIN for USDT).</li>
                <li className="list-item">The price of ORIN in terms of USDT.</li>
              </ul>

            </div>

            <div className="info-card">
              <h4 className="text-emerald">Minting (Buying ORIN with USDT)</h4>
              <p className="card-subtitle">
              How it Works:
              </p>

              <ul className="unordered-list">
                <li className="list-item">Users send USDT to the contract to mint ORIN.</li>
                <li className="list-item">ORIN price is determined dynamically using `getPrice()`.</li>
                <li className="list-item">4% fee is applied (`usdtAmount * 96 / 100`).</li>
                <li className="list-item">1% of the minted ORIN goes to `receiverAddress` (owner).</li>
                <li className="list-item">Remaining ORIN is credited to the user.</li>
              </ul>


            </div>
          </div>
        ) : (
          <div>
            <div className="info-card">
              <div className="card-header">
                <KeyRound className="token-icon" />
                <h3 className="card-title">Different from Other Token</h3>
              </div>
              <div className="comparison-grid">
                <div>
                  <h4 className="text-purple">Feature</h4>
                  <ul className="unordered-list">
                    <li className="list-item">Minting</li>
                    <li className="list-item">Burning</li>
                    <li className="list-item">Price Mechanism</li>
                    <li className="list-item">Slippage</li>
                    <li className="list-item">Cooldown</li>
                    <li className="list-item">Fee on Transactions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-purple">Other Standard Tokens</h4>
                  <ul className="unordered-list">
                    <li className="list-item">Only owner can mint</li>
                    <li className="list-item">Fixed burn mechanics</li>
                    <li className="list-item">Fixed price or algorithmic</li>
                    <li className="list-item">No slippage</li>
                    <li className="list-item">No cooldown</li>
                    <li className="list-item">No fee (usually)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-purple">Orion (Our Token)</h4>
                  <ul className="unordered-list">
                    <li className="list-item">Users mint ORIN by sending USDT</li>
                    <li className="list-item">Users sell ORIN for USDT (with slippage)</li>
                    <li className="list-item">Dynamic price based on USDT reserve</li>
                    <li className="list-item">10% slippage on selling ORIN</li>
                    <li className="list-item">1-minute cooldown between transactions</li>
                    <li className="list-item">4% fee on minting, 10% slippage on burning</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h4 className="text-amber">Additional Advantages</h4>
              <ul className="unordered-list">
                <li className="list-item">ORIN’s price is dynamic and depends on supply and demand.</li>
                <li className="list-item">Users can mint tokens** by depositing USDT, unlike fixed supply tokens.</li>
                <li className="list-item">Users can burn tokens** to redeem USDT, but with a slippage fee. </li>
                <li className="list-item">Security measures** protect against reentrancy and spam.</li>
                <li className="list-item">Cooldown mechanism** ensures fair transactions</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default TokenExplanation;
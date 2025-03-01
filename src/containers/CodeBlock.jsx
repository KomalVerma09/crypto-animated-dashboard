import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { Code, Zap, Shield, Coins } from "lucide-react";
import '../assets/css/codeBlock.css';
import { Box, Container, Grid, Stack, Typography } from "@mui/material";



const CodeBlock = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => {
        setIsTypingComplete(false);
        setKey((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTypingComplete]);

  return (
    <Container>
      <div className="grid-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="code-editor"
      >
        <div className="editor-header">
          <div className="window-controls">
            <div className="window-dot red"></div>
            <div className="window-dot yellow"></div>
            <div className="window-dot green"></div>
          </div>
          <div className="filename">OrionBridge.sol</div>
        </div>
        <div className="code-content">
          <div className="line-numbers" aria-hidden="true">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <div className="code-area">
            <pre className="code-block" >
              <code>
                <Typewriter
                  key={key}
                  onInit={(typewriter) => {
                    typewriter
                      .changeDelay(20)
                      .typeString(
                        `<span style="color: #608B4E">// SPDX-License-Identifier: MIT</span>\n`
                      )
                      .typeString(
                        `<span style="color: #569CD6">pragma</span> solidity <span style="color: #B5CEA8">^0.8.0</span>;\n\n`
                      )
                      .typeString(
                        `<span style="color: #569CD6">contract</span> <span style="color: #4EC9B0">OrionBridge</span> {\n`
                      )
                      .typeString(
                        `    <span style="color: #608B4E">// State variables</span>\n`
                      )
                      .typeString(
                        `    <span style="color: #569CD6">address private</span> <span style="color: #9CDCFE">_bridgeAddress</span>;\n`
                      )
                      .typeString(
                        `    <span style="color: #569CD6">uint256 private</span> <span style="color: #9CDCFE">_bridgeFee</span>;\n\n`
                      )
                      .typeString(
                        `    <span style="color: #608B4E">// Events</span>\n`
                      )
                      .typeString(
                        `    <span style="color: #569CD6">event</span> <span style="color: #4EC9B0">BridgeInitiated</span>(<span style="color: #569CD6">address</span> indexed from, <span style="color: #569CD6">uint256</span> amount);\n`
                      )
                      .typeString(
                        `    <span style="color: #569CD6">event</span> <span style="color: #4EC9B0">BridgeCompleted</span>(<span style="color: #569CD6">address</span> indexed to, <span style="color: #569CD6">uint256</span> amount);\n\n`
                      )
                      .typeString(
                        `    <span style="color: #569CD6">constructor</span>(<span style="color: #569CD6">address</span> bridgeAddr) {\n`
                      )
                      .typeString(
                        `        <span style="color: #9CDCFE">_bridgeAddress</span> = bridgeAddr;\n`
                      )
                      .typeString(
                        `        <span style="color: #9CDCFE">_bridgeFee</span> = <span style="color: #B5CEA8">0.001</span> <span style="color: #DCDCAA">ether</span>;\n`
                      )
                      .typeString(`    }\n\n`)
                      .typeString(`}\n`)
                      .callFunction(() => {
                        setIsTypingComplete(true);
                      })
                      .start();
                  }}
                  options={{
                    cursor: "█",
                    delay: 20,
                  }}
                />
              </code>
            </pre>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="content-section"
      >
        <h3 className="section-title">Smart Contract Development Made Easy</h3>
        <p className="section-description">
          Deploy and interact with smart contracts seamlessly on Orion Chain.
          Our EVM-compatible environment supports all your favorite development
          tools and frameworks.
        </p>
        <div className="features-grid" >
          <div className="feature-card">
            <Zap className="feature-icon" />
            <h4 className="feature-title">Lightning Fast</h4>
            <p className="feature-description">
              3-second block time with instant finality
            </p>
          </div>
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h4 className="feature-title">Secure & Reliable</h4>
            <p className="feature-description">
              Advanced security features built-in
            </p>
          </div>
          <div className="feature-card">
            <Coins className="feature-icon" />
            <h4 className="feature-title">Low Cost</h4>
            <p className="feature-description">Minimal transaction fees</p>
          </div>
          <div className="feature-card">
            <Code className="feature-icon" />
            <h4 className="feature-title">EVM Compatible</h4>
            <p className="feature-description">Use your favorite tools</p>
          </div>
        </div>
      </motion.div>
    </div>
    </Container>
  );
};

export default CodeBlock;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Clock, Zap, Cuboid as Cube, Monitor } from 'lucide-react';
import '../assets/css/BlockchainStats.css';
import { Box, Container, Grid, Stack, Typography } from "@mui/material";



const NodeCounter = () => {
  const [nodes, setNodes] = useState([]);
  const [showCount, setShowCount] = useState(false);
  const targetCount = 21;

  const getNodePosition = (index) => {
    const radius = 120;
    const angle = (index / targetCount) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  useEffect(() => {
    let currentIndex = 0;
    const addNode = () => {
      if (currentIndex < targetCount) {
        setNodes(prev => [...prev, currentIndex]);
        currentIndex++;
        setTimeout(addNode, 500);
      } else {
        setTimeout(() => {
          setShowCount(true);
        }, 500);
      }
    };

    addNode();
    return () => {
      currentIndex = targetCount;
    };
  }, []);

  return (
    <div className="node-container">
      <div className="node-center">
        <AnimatePresence>
          {showCount && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="node-count"
            >
              <span>{targetCount}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="node-graph" >
          {nodes.map((_, i) => {
            const pos = getNodePosition(i);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ 
                  position: 'absolute',
                  left: pos.x, 
                  top: pos.y,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="node-item">
                  <Monitor className="node-icon" />
                  {i > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="node-connector"
                      style={{
                        width: `${Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2)) / 2}px`,
                        transform: `rotate(${Math.atan2(pos.y, pos.x)}rad)`,
                        transformOrigin: '0 0'
                      }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BlockTimeAnimation = () => {
  const [blocks, setBlocks] = useState([]);
  const [currentTime, setCurrentTime] = useState(3);
  const maxBlocks = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev <= 0) {
          setBlocks(prevBlocks => {
            const newBlocks = [...prevBlocks, { id: Date.now(), time: 3 }];
            if (newBlocks.length > maxBlocks) {
              return [{ id: Date.now(), time: 3 }];
            }
            return newBlocks;
          });
          return 3;
        }
        return Math.max(0, prev - 0.1);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="block-time">
      <div className="time-display">
        <span className="time-value">{currentTime.toFixed(1)}</span>
        <span className="time-unit">sec</span>
      </div>
      <div className="blocks-container">
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="block"
          >
            <div className="block-bg" />
            <div className="block-border" />
            {index < blocks.length - 1 && (
              <div className="block-connector" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TPSVisualization = () => {
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [blocks, setBlocks] = useState([
    { id: 1, miniBlocks: [] }
  ]);
  const [showTPS, setShowTPS] = useState(false);
  const maxMiniBlocks = 9;

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prevBlocks => {
        const currentBlock = prevBlocks[activeBlockIndex];
        
        if (currentBlock.miniBlocks.length >= maxMiniBlocks) {
          setShowTPS(true);
          setTimeout(() => setShowTPS(false), 1000);
          
          if (activeBlockIndex === 2) {
            setActiveBlockIndex(0);
            return [{ id: Date.now(), miniBlocks: [] }];
          } else {
            setActiveBlockIndex(prev => prev + 1);
            return [...prevBlocks, { id: Date.now(), miniBlocks: [] }];
          }
        }

        return prevBlocks.map((block, index) => 
          index === activeBlockIndex
            ? {
                ...block,
                miniBlocks: [...block.miniBlocks, { id: block.miniBlocks.length + 1, timestamp: Date.now() }]
              }
            : block
        );
      });
    }, 800);

    return () => clearInterval(interval);
  }, [activeBlockIndex]);

  const BlockShape = ({ block, isActive }) => (
    <div className="block-shape">
      <div className="block-shape-top" />
      <div className="block-shape-side" />
      <div className={`block-shape-main ${isActive ? 'active' : ''}`}>
        <div className="mini-blocks-grid">
          {[...Array(maxMiniBlocks)].map((_, index) => {
            const miniBlock = block.miniBlocks[index];
            const isLoading = isActive && index === block.miniBlocks.length;
            
            return (
              <div
                key={index}
                className={`mini-block ${miniBlock ? 'filled' : ''} ${isLoading ? 'loading' : ''}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="tps-container">
      <motion.div 
        className="tps-header"
        animate={{ opacity: showTPS ? 1 : 0.5 }}
      >
        <span className="tps-value">1,500+</span>
        <span className="tps-unit">TPS</span>
      </motion.div>
      <div className="blocks-row">
        <AnimatePresence>
          {blocks.map((block, index) => (
            <div key={block.id} className="block-wrapper">
              <BlockShape block={block} isActive={index === activeBlockIndex} />
              {index < blocks.length - 1 && (
                <div className="block-connector-horizontal">
                  <div className="connector-ping" />
                </div>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LatestBlockSkeleton = () => {
  const [blocks, setBlocks] = useState([]);
  const maxBlocks = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        if (prev.length >= maxBlocks) {
          return [];
        }
        return [...prev, Math.random().toString(36).substring(2, 8)];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="latest-blocks">
      <div className="blocks-row">
        {blocks.map((block, i) => (
          <motion.div
            key={block}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="block-item"
          >
            <motion.div className="block-content">
              <span className="block-hash">{block}</span>
            </motion.div>
            {i < blocks.length - 1 && (
              <div className="block-connector-vertical" />
            )}
          </motion.div>
        ))}
        {blocks.length < maxBlocks && (
          <div className="block-placeholder animate-pulse" />
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="stat-card"
  >
    <div className="stat-header">
      <motion.div 
        className="stat-icon"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {icon}
      </motion.div>
      <h3 className="stat-title">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const BlockchainStats = () => {
  return (
    <Container sx={{ mt: { xs: 0, md: 10, lg: 10 }}}>
          <div className="stats-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="stats-header"
      >
        <h2 className="stats-title">
          Network Statistics
        </h2>
        <p className="stats-description">
          Real-time metrics showing the robust performance and growth of the Orion Chain network
        </p>
      </motion.div>
      <div className="stats-grid">
        <StatCard
          icon={<Network className="icon" />}
          title="No. of Nodes"
          delay={0}
        >
          <NodeCounter />
        </StatCard>
        
        <StatCard
          icon={<Clock className="icon" />}
          title="Avg Block Time"
          delay={0.1}
        >
          <BlockTimeAnimation />
        </StatCard>
        
        <StatCard
          icon={<Zap className="icon" />}
          title="TPS"
          delay={0.2}
        >
          <TPSVisualization />
        </StatCard>
        
        <StatCard
          icon={<Cube className="icon" />}
          title="Latest Block"
          delay={0.3}
        >
          <LatestBlockSkeleton />
        </StatCard>
      </div>
    </div>
    </Container>
  );
};

export default BlockchainStats;
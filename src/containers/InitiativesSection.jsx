import React, { useState, useEffect } from 'react';
import {
  ArrowDownUp,
  Wallet,
  RefreshCw,
  Settings,
  ChevronDown,
  Clock,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  Blocks,
  Search,
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import ReactPaginate from 'react-paginate';
import '../assets/css/InitiativesSection.css';
import TokenExplanation from './TokenExplanation';
import { Box, Container, Grid, Stack, Typography } from "@mui/material";



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Generate mock data
const generateMockTradeHistory = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    type: Math.random() > 0.5 ? 'buy' : 'sell',
    amount: (Math.random() * 10000).toFixed(2),
    price: (0.8 + Math.random() * 0.1).toFixed(2),
    total: (Math.random() * 8500).toFixed(2),
    time: `${Math.floor(Math.random() * 60)} min ago`,
    status: ['completed', 'failed', 'pending'][Math.floor(Math.random() * 3)]
  }));
};

const mockTradeHistory = generateMockTradeHistory(100);

const PriceChart = () => {
  const [currentPrice, setCurrentPrice] = useState(0.1);
  const [priceHistory, setPriceHistory] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Initialize with some historical data
    const initialHistory = Array.from({ length: 24 }, () => 
      +(0.8 + Math.random() * 0.1).toFixed(3)
    );
    setPriceHistory(initialHistory);
    
    const now = new Date();
    const initialLabels = Array.from({ length: 24 }, (_, i) => {
      const d = new Date(now);
      d.setHours(d.getHours() - (23 - i));
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    });
    setLabels(initialLabels);

    // Update price every 3 seconds
    const interval = setInterval(() => {
      const newPrice = +(0.01 + Math.random() * 0.1).toFixed(3);
      setCurrentPrice(newPrice);
      
      setPriceHistory(prev => [...prev.slice(1), newPrice]);
      setLabels(prev => {
        const now = new Date();
        return [...prev.slice(1), now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'ORION Price',
        data: priceHistory,
        borderColor: '#9d8a57',
        backgroundColor: 'rgba(157, 138, 87, 0.2)',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#9d8a57',
        borderColor: 'rgba(157, 138, 87, 0.2)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
      y: {
        grid: {
          color: 'rgba(157, 138, 87, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          callback: (value) => `$${value.toFixed(2)}`,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="price-chart">
      <div className="price-chart-header">
        <h3>Price Chart</h3>
        <div className="current-price">
          <span>Current Price:</span>
          <span className="price-value">${currentPrice.toFixed(3)}</span>
        </div>
      </div>
      <div className="chart-container">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export const InitiativesSection = () => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapped, setIsSwapped] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const itemsPerPage = 5;

  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    setFromAmount(value);
    // Mock conversion rate: 1 USDT = 0.85 ORION
    setToAmount(value ? (parseFloat(value) * (isSwapped ? 1/0.85 : 0.85)).toFixed(2) : '');
  };

  const handleSwap = () => {
    setIsSwapped(!isSwapped);
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleRefresh = () => {
    setFromAmount('');
    setToAmount('');
  };

  // Filter and paginate trade history
  const filteredHistory = mockTradeHistory.filter(trade => {
    const matchesSearch = searchTerm === '' || 
      trade.amount.includes(searchTerm) || 
      trade.price.includes(searchTerm) ||
      trade.total.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || trade.status === statusFilter;
    const matchesType = typeFilter === 'all' || trade.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const pageCount = Math.ceil(filteredHistory.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredHistory.slice(offset, offset + itemsPerPage);

  return (
    <Container>
          <div className="initiatives-section">
      <div className="background-overlay"></div>
      
      <div className="container-initiative">
        <div className="section-header">
          <h2>Join Our Initiatives</h2>
          <p>Be part of the Orion ecosystem by participating in our token sale</p>
        </div>
        <TokenExplanation/>

        <div className="content-grid">
          {/* Chart and History */}
          <div className="left-column">
            {/* Price Chart */}
            <div className="chart-card">
              <PriceChart />
            </div>

            {/* Trade History */}
            <div className="history-card">
              <div className="history-header">
                <div className="history-title-row">
                  <h3>Trade History</h3>
                  
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="search-icon" />
                  </div>
                </div>
                
                <div className="filters-row">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Types</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((trade) => (
                      <tr key={trade.id}>
                        <td>
                          <span className={`trade-type ${trade.type}`}>
                            <ArrowRightLeft />
                            {trade.type.toUpperCase()}
                          </span>
                        </td>
                        <td>{trade.amount}</td>
                        <td>{trade.price}</td>
                        <td>{trade.total}</td>
                        <td>
                          <span className="time-cell">
                            <Clock />
                            {trade.time}
                          </span>
                        </td>
                        <td>
                          <span className={`status-cell ${trade.status}`}>
                            {trade.status === 'completed' && <CheckCircle2 />}
                            {trade.status === 'failed' && <XCircle />}
                            {trade.status === 'pending' && <RefreshCw className="spinning" />}
                            {trade.status.charAt(0).toUpperCase() + trade.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName="pagination"
                previousClassName="pagination-button"
                nextClassName="pagination-button"
                pageClassName="pagination-button"
                activeClassName="active"
                disabledClassName="disabled"
              />
            </div>
          </div>

          {/* Swap Interface */}
          <div className="swap-card">
            <div className="swap-header">
              <h3>Swap</h3>
              <div className="swap-actions">
                <button onClick={handleRefresh} className="icon-button">
                  <RefreshCw />
                </button>
                <button className="icon-button">
                  <Settings />
                </button>
              </div>
            </div>

            {/* From Token */}
            <div className="token-input-container">
              <div className="token-input-header">
                <span>From</span>
                <span>Balance: {isSwapped ? '0' : '1,000'}</span>
              </div>
              <div className="token-input-content">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={handleFromAmountChange}
                  placeholder="0.0"
                />
                <button className="token-selector">
                  {isSwapped ? (
                    <Blocks className="token-icon" />
                  ) : (
                    <img
                      src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                      alt="USDT"
                      className="token-icon"
                    />
                  )}
                  <span>{isSwapped ? 'ORION' : 'USDT'}</span>
                  <ChevronDown />
                </button>
              </div>
            </div>

            <div className="swap-button-container">
              <button onClick={handleSwap} className="swap-direction-button">
                <ArrowDownUp />
              </button>
            </div>

            {/* To Token */}
            <div className="token-input-container">
              <div className="token-input-header">
                <span>To</span>
                <span>Balance: {isSwapped ? '1,000' : '0'}</span>
              </div>
              <div className="token-input-content">
                <input
                  type="number"
                  value={toAmount}
                  readOnly
                  placeholder="0.0"
                />
                <button className="token-selector">
                  {isSwapped ? (
                    <img
                      src="https://cryptologos.cc/logos/tether-usdt-logo.png"
                      alt="USDT"
                      className="token-icon"
                    />
                  ) : (
                    <Blocks className="token-icon" />
                  )}
                  <span>{isSwapped ? 'USDT' : 'ORION'}</span>
                  <ChevronDown />
                </button>
              </div>
            </div>

            <div className="exchange-rate">
              <span>Exchange Rate</span>
              <span>
                {isSwapped ? '1 ORION = 1.18 USDT' : '1 USDT = 0.1 ORION'}
              </span>
            </div>

            <button className="connect-wallet-button">
              <Wallet />
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default InitiativesSection;
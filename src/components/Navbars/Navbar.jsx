import React, { useState } from "react";
import {
  ChevronDown,
  ExternalLink,
  Globe,
  Menu,
  X,
  Bell,
  Rocket,
  RefreshCw,
} from "lucide-react";
import { NAVBAR_HEIGHT } from "../../constants";
import useScrollPosition from "../../hooks/useScrollPosition";
import { navbarContent } from "../../utils/content";
import "../../assets/css/Navbar.css";
import { Box } from "@mui/material";

const { Logo } = navbarContent;

const notifications = [
  {
    id: 1,
    title: "New Protocol Update",
    time: "2 hours ago",
    icon: <RefreshCw size={20} />,
  },
  {
    id: 2,
    title: "Token Launch Event",
    time: "5 hours ago",
    icon: <Rocket size={20} />,
  },
  {
    id: 3,
    title: "Security Enhancement",
    time: "1 day ago",
    icon: <Bell size={20} />,
  },
];
const tabs = [
  { id: "products", title: "Products", items: ["Mainnet explorer", "Testnet explorer","Become Validator","DeX","Bridge"] },
  { id: "developers", title: "Developers", items: ["Docs", "API"] },
];

const Navbar = () => {
  const scrollPosition = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowNotifications(false);
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setOpenDropdownId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        style={{
          padding: "1rem 0",
          height: NAVBAR_HEIGHT,
          background: scrollPosition > 10 ? "rgba(7,7,16,.7)" : "transparent",
          backdropFilter: scrollPosition > 10 ? "blur(60px)" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div className="nav-container">
          <div className="nav-content">
            {/* Logo */}
            {/* <img src={Logo} style={{ height:"40px",objectFit: "contain"}}alt="Logo" /> */}
            <Box
              component="img"
              src={Logo}
              sx={{
                objectFit: "contain",
                height: "40px",
              }}
              alt="Logo"
            />
            {/* Desktop Links */}
            <div className="desktop-links">
              {tabs.map((tab) => (
                <div key={tab.id} className="nav-link">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(tab.id);
                    }}
                    className="child-nav-link"
                  >
                    <span>{tab.title}</span>
                    <ChevronDown size={16} />
                  </div>

                  {/* Dropdown */}
                  {openDropdownId === tab.id && (
                    <div className="desktop-tab-dropdown tabs-dropdown">
                      {tab.items.map((item, index) => (
                        <div key={index} className="tab-item">
                          <div className="tab-content">
                            <div className="tab-title">{item}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="nav-link">
                <span>About</span>
                <ChevronDown size={16} />
              </div>
              <div className="nav-link">
                <span>Blog</span>
                <ExternalLink size={12} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="nav-actions">
              <button className="menu-button" onClick={toggleMenu}>
                <Menu size={24} />
              </button>
              <div className="desktop-actions">
                <button className="icon-button" onClick={toggleNotifications}>
                  <Bell size={20} />
                  <span className="notification-badge">3</span>
                </button>
                <button className="launch-button">
                  <a href="https://testnet.theorionscan.com/" target="_blank">
                    Launch App
                  </a>
                </button>

                {/* Desktop Notifications Dropdown */}
                {showNotifications && (
                  <div
                    className="desktop-dropdown notifications-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="dropdown-title">Notifications</h3>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="notification-item">
                        <div className="notification-icon">
                          {notification.icon}
                        </div>
                        <div className="notification-content">
                          <div className="notification-title">
                            {notification.title}
                          </div>
                          <div className="notification-time">
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <img
              src={Logo}
              style={{ height: "30px", objectFit: "contain" }}
              alt="Logo"
            />
            <button className="mobile-menu-close" onClick={toggleMenu}>
              <X size={24} />
            </button>
          </div>

          <div className="mobile-menu-section">
          {tabs.map((tab) => (
            <div key={tab.id} className="mobile-menu-item">
              <div className="mobile-menu-item-content" style={{ marginBottom: "5px" }}>
                <span>{tab.title}</span>
                <ChevronDown size={16} />
              </div>
              {/* Dropdown is always visible */}
              
              {tab.items.map((item, index) => (
              <div className="tab-item">
                  <div key={index} className="tab-content">
                    
                    <div className="tab-title">
                      <div>{item}</div>
                    </div>

                  </div>
               
              </div>
               ))}
            </div>
          ))}
            {/* <div className="mobile-menu-item">
                <div className="mobile-menu-item-content">
                  <span>Governance</span>
                  <ChevronDown size={16} />
                </div>
              </div> */}
            <div className="mobile-menu-item">
              <div className="mobile-menu-item-content">
                <span>About</span>
                <ChevronDown size={16} />
              </div>
            </div>
            <div className="mobile-menu-item">
              <div className="mobile-menu-item-content">
                <span>Blog</span>
                <ExternalLink size={12} />
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="notifications-section">
            <h3 className="section-title">Notifications</h3>
            {notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                <div className="notification-icon">{notification.icon}</div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

// Section1
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import ShootingStarImage from "../assets/images/section1/main-bg-0-0.png";
import MainBG from "../assets/images/section1/stars.png";
import TreesImage from "../assets/images/section1/main-bg-1_1.webp";
import CliffImage from "../assets/images/section1/main-bg-2_1.webp";
import HorseImage from "../assets/images/section1/main-bg-3.png";

// Section4
import NewsImg from "../assets/images/section4/news-image.webp";
import Phone1Img from "../assets/images/LottieFile/tab_img5.json";
import Phone2Img from "../assets/images/LottieFile/tab_img4.json";
import Phone3Img from "../assets/images/LottieFile/tab_img1.json";
import Phone4Img from "../assets/images/LottieFile/tab_img2.json";
import Phone5Img from "../assets/images/LottieFile/tab_img3.json";



// Section10
import DiscordImage from "../assets/images/section10/discord.webp";
import RedditImage from "../assets/images/section10/reddit.webp";
import TelegramImage from "../assets/images/section10/telegram.webp";
import TwitterImage from "../assets/images/section10/twitter.webp";

// Navbar
import Logo from "../assets/images/colorLogo/Orion-07.png";

export const section1Content = {
  MainBG,
  TreesImage,
  CliffImage,
  HorseImage,
  ShootingStarImage,
  title: "Unlock the Innovation",
  // subtitle: "to decentralized finance"
  subtitle: "Introducing Our Cutting-Edge Blockchain Orion Chain..."
};

export const section2Content = {
  
  items : [
    { counter: 12, subtitle: "Validators Online" },
    { counter: 2.5, before: "$", after: "B+", subtitle: "Total Market Cap", decimals: true },
    { counter: 1.2, after: "M+", subtitle: "Total Active Wallets", decimals: true },
    { counter: 15.8, after: "M+", subtitle: "Total Transactions", decimals: true },
  ]  ,
  
  
};


export const section4Content = {
  top: {
    title: "Ever-growing Liquidity",
    subtitle:
      "Our token protocol mechanics ensure a rising token value and price pump as liquidity grows",
    image: NewsImg,
  },
  bottom: {
    title: "Orion DeFi Wallet",
    TABS: [
      {
        name: "Buy",
        image: `data:application/json;base64,${btoa(JSON.stringify(Phone1Img))}`,
        subtitle:
          "Buy crypto with your bank card using our partner fiat gateway providers.",
      },
      {
        name: "Store",
        image: `data:application/json;base64,${btoa(JSON.stringify(Phone3Img))}`,
        subtitle:
          "Your crypto is protected with the most sophisticated security measures.",
      },
      {
        name: "Transfer",
        image: `data:application/json;base64,${btoa(JSON.stringify(Phone5Img))}`,
        subtitle: "Transfer crypto in multiple blockchain networks.",
      },
      {
        name: "Swap",
        image: `data:application/json;base64,${btoa(JSON.stringify(Phone4Img))}`,
        subtitle: "Swap any amount of tokens at the best rates.",
      },
      {
        name: "Stake",
        image: `data:application/json;base64,${btoa(JSON.stringify(Phone2Img))}`,
        subtitle:
          "Stake orion to participate in network governance and be eligible for gas costs refunds.",
      },
    ],
  },
};


export const productContent = {
  title: "Orion products",
  
};



export const section10Content = {
  SOCIALS: [
    { name: "Telegram", image: TelegramImage },
    { name: "Discord", image: DiscordImage },
    { name: "Reddit", image: RedditImage },
    { name: "Twitter", image: TwitterImage },
  ],
};


export const footerContent = {
  protocols: {
    title: "Protocols",
    links: [
      { title: "Dex" },
      { title: "Cross-Chain Bridge" },
      { title: "Arbitrage" },
      { title: "AI Assistant" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { title: "Documentation" },
      { title: "GitHub" },
      { title: "Audit" },
    ],
  },
  subscribe: {
    title: "Subscribe to orion newsletter",
    subtitle: "Get the latest news and updates",
  },
  copyright: {
    left: "© 2023 orion, All Rights Reserved.",
    // center: "ENS: theorionspace",
    right: "theorionspace.com",
  },
};

export const navbarContent = {
  Logo,
};

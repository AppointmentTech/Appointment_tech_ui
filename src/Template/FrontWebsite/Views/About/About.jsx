import React,{useState} from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tabs, Tab, Container, Paper,IconButton 
} from "@mui/material";
import {
  Apartment,
  Restaurant,
  LocalHospital,
  DirectionsCar,
  Spa,
  Checkroom,
  Work,
  Star,
} from "@mui/icons-material";
import { Menu as MenuIcon } from '@mui/icons-material';
import AboutBanner from "./Sections/AboutBanner.jsx";
import GetToKnow from "./Sections/GetToKnow.jsx";
import WhyChooseUs from "./Sections/WhyChooseUs.jsx";
import WhatOurCustomersSay from "./Sections/WhatOurCustomersSay.jsx";
import Header from '@template/FrontWebsite/Components/Header.jsx';
import Footer from '@template/FrontWebsite/Components/Footer.jsx';
// import WhatWeOffer from "./Sections/WhatWeOffer.jsx";
export default function AboutPage() {


  return (
    <>
    <Header/>
    <AboutBanner/>
    <GetToKnow/>
    <WhyChooseUs/>
    <WhatOurCustomersSay/>
    {/* <WhatWeOffer/> */}
    <Footer/>
    </>
  );
};


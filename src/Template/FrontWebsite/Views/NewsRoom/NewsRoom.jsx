import React, { useState } from "react";

import Header from "@template/FrontWebsite/Components/Header.jsx";
import Footer from "@template/FrontWebsite/Components/Footer.jsx";

import OurImpactNumber from "@template/FrontWebsite/Components/OurImpactNumber.jsx";
import NewsRoomBanner from "./Sections/NewsRoomBanner.jsx";
import OurNewsroom from "./Sections/OurNewsroom.jsx";
export default function NewsRoom() {
  return (
    <>
      <Header />
      <NewsRoomBanner />
      <OurNewsroom />
      <OurImpactNumber />
      <Footer />
    </>
  );
}

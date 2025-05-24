import React, { useState } from "react";

import Header from "Template/FrontWebsite/Components/Header.jsx";
import Footer from "Template/FrontWebsite/Components/Footer.jsx";

import OurImpactNumber from "Template/FrontWebsite/Components/OurImpactNumber.jsx";
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

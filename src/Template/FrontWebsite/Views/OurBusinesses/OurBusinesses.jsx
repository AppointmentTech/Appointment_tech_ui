import React, { useState } from "react";

import Header from "@template/FrontWebsite/Components/Header.jsx";
import Footer from "@template/FrontWebsite/Components/Footer.jsx";
import OurBusinessBanner from "./Sections/OurBusinessBanner.jsx";
import ExploreEachBusiness from "./Sections/ExploreEachBusiness.jsx";
import OurImpactNumber from "@template/FrontWebsite/Components/OurImpactNumber.jsx";
export default function OurBusinesses() {
  return (
    <>
      <Header />
      <OurBusinessBanner />
      <ExploreEachBusiness />
      <OurImpactNumber/>
      <Footer />
    </>
  );
}

import React, { useState } from "react";

import Header from "Template/FrontWebsite/Components/Header.jsx";
import Footer from "Template/FrontWebsite/Components/Footer.jsx";
import OurBusinessBanner from "./Sections/OurBusinessBanner.jsx";
import ExploreEachBusiness from "./Sections/ExploreEachBusiness.jsx";
import OurImpactNumber from "Template/FrontWebsite/Components/OurImpactNumber.jsx";
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

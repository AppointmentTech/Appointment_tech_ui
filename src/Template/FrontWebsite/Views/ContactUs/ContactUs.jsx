import React, { useState } from "react";

import Header from "Template/FrontWebsite/Components/Header.jsx";
import Footer from "Template/FrontWebsite/Components/Footer.jsx";
import ContactUsBanner from "./Sections/ContactUsBanner.jsx";
import OurImpactNumber from "Template/FrontWebsite/Components/OurImpactNumber.jsx";
import ContactUsForm from "./Sections/ContactUsForm.jsx";
export default function ContactUs() {
  return (
    <>
      <Header />
      <ContactUsBanner />
      <ContactUsForm />
      <OurImpactNumber />
      <Footer />
    </>
  );
}

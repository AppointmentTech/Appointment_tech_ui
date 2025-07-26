import React, { useState } from "react";

import Header from "@template/FrontWebsite/Components/Header.jsx";
import Footer from "@template/FrontWebsite/Components/Footer.jsx";
import ContactUsBanner from "./Sections/ContactUsBanner.jsx";
import OurImpactNumber from "@template/FrontWebsite/Components/OurImpactNumber.jsx";
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

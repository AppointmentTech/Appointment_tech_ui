
import React from 'react';
import Header from 'Template/FrontWebsite/Components/Header.jsx';
import Banner from 'Template/FrontWebsite/Views/Home/Sections/Banner.jsx';
import Hostel from './Sections/Hostel.jsx';
import Hospital from './Sections/Hospital.jsx';
import Garage from './Sections/Garage.jsx';
import Beauty from './Sections/Beauty.jsx';
import FoodCatering from './Sections/FoodCatering.jsx';
import FashionDesign from './Sections/FashionDesign.jsx';
import ProfessionalServices from './Sections/ProfessionalServices.jsx';
import Footer from 'Template/FrontWebsite/Components/Footer.jsx';
export default function Home() {
  return (
    <React.Fragment>
      <Header/>
      <Banner/>
      <Hostel/>
      <FoodCatering/>
      <Hospital/>
      <Garage/>
      <Beauty/>
      <FashionDesign/>
      <ProfessionalServices/>
      <Footer/>
      
    </React.Fragment>
    
  );
}
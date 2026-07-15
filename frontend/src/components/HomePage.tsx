import React from 'react';
import HeroSection from './herosection';
import Contact from './Contact';
import CommentCaMarche from './CommentCaMarche';
import PersoHome from './PersoHome';
import Comments from './Comments';
import BannerTest from './BannerTest';
import About from './About';



import '../assets/css/style.css';

const HomePage: React.FC = () => {
  return (
    <div className='Home'>
      
      <HeroSection />
      <CommentCaMarche/>
      <PersoHome />
      <About />
      <BannerTest />
      <Contact />
      
    </div>
  );
};

export default HomePage;

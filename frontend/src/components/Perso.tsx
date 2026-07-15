import React from 'react';
import BannerPerso from './BannerPerso';
import Personnalite from './Personnalite';
import '../assets/css/style.css';

const Perso: React.FC = () => {
  return (
    <div className='Home'>
      
      <BannerPerso/>
      <Personnalite />
      
    </div>
  );
};

export default Perso;

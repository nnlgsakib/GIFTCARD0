import React, { useState } from 'react';

const Home = ({ navigateToGiftCard }) => (
  <div>
    <h2>Home Page</h2>
    <button onClick={navigateToGiftCard}>Go to Gift Card</button>
  </div>
);

const GiftCard = ({ goBack }) => (
  <div>
    <h2>Gift Card Page</h2>
    <button onClick={goBack}>Go Back</button>
  </div>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateToGiftCard = () => setCurrentPage('giftCard');
  const goBack = () => setCurrentPage('home');

  return (
    <div>
      {currentPage === 'home' && <Home navigateToGiftCard={navigateToGiftCard} />}
      {currentPage === 'giftCard' && <GiftCard goBack={goBack} />}
    </div>
  );
};

export default App;

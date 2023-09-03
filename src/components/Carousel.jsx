import React, { useState, useEffect } from "react";
import { cards } from "../data";

// const cards = [
//   "Item 1",
//   "Item 2",
//   "Item 3",
//   "Item 4",
//   "Item 5",
//   "Item 6",
//   "Item 7",
//   "Item 8",
//   "Item 9",
//   "Item 10",
//   "Item 11",
//   "Item 12",
// ]; // Replace with your own cards

const Carousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default for large devices

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      setItemsPerPage(4); // Large screens
    } else if (screenWidth >= 768) {
      setItemsPerPage(2); // Medium screens
    } else {
      setItemsPerPage(1); // Small screens
    }
  };

  useEffect(() => {
    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize); // Listen for window resize events
    return () => {
      window.removeEventListener("resize", handleResize); // Remove the event listener on component unmount
    };
  }, []);

  const handleNext = () => {
    setCurrentPage(
      (prevPage) => (prevPage + 1) % Math.ceil(cards.length / itemsPerPage)
    );
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? Math.floor(cards.length / itemsPerPage) : prevPage - 1
    );
  };

  const renderIndicators = () => {
    const numPages = Math.ceil(cards.length / itemsPerPage);
    const indicators = [];
    for (let i = 0; i < numPages; i++) {
      indicators.push(
        <div
          key={i}
          className={`carousel-indicator ${i === currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(i)}
        ></div>
      );
    }
    return indicators;
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = (startIndex + itemsPerPage) % cards.length;
  const visibleItems =
    startIndex < endIndex
      ? cards.slice(startIndex, endIndex)
      : [...cards.slice(startIndex), ...cards.slice(0, endIndex)];

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button onClick={handlePrev} className="carousel-button prev_button">
          Prev
        </button>
        <div className="carousel-inner">
          {visibleItems.map((item, index) => (
            <div key={index} className="carousel-item ">
              <div className="card">
                <img className="card_image" src={item.image} alt="" />
                <div className="card_container">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="card_tags">
                    {item.tags.map((tag, index) => (
                      <span key={index}>#{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="card_footer">
                  <button>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="carousel-button next_button">
          Next
        </button>
      </div>
      <div className="carousel-indicators">{renderIndicators()}</div>
    </div>
  );
};

export default Carousel;

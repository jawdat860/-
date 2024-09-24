import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import axios from "axios";
import CategorySlider from "./CategorySlider";
import ServiceModal from "./ServiceModal";


const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]); // Categories list
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default selected category is "All"
  
  // Fetch services and categories data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://menuapp.ru/api/v1");
        setServices(response.data);

        // Extract unique categories from services and add "All" option
        const allCategories = [
          ...new Set(response.data.map((service) => service.category)),
        ];
        setCategories(["All", ...allCategories]);

        setLoading(false);
      } catch (err) {
        setError("Failed to load services.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 

  // Function to handle clicking on a service card
  const handleCardClick = (service) => {
    setActiveService(service);
    setIsModalOpen(true);
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Set the selected category
  };

  // Filter services based on the selected category
  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  if (loading) {
    return <p className="text-center">Loading services...</p>;
  }

  // Render error state
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Our Services</h1>

      {/* Category Slider */}
      <CategorySlider
        categories={categories} // Pass the categories to the slider
        selectedCategory={selectedCategory} // Pass the selected category
        onCategorySelect={handleCategorySelect} // Pass the function to handle selection
      />

      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => handleCardClick(service)}
          />
        ))}
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        service={activeService}
      
      />
    </div>
  );
};

export default Services;

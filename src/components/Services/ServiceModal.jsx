import React, { useState, useEffect, useContext } from "react";
import { Modal, VisuallyHidden } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import CartContext from "../store/CartContext";

const ServiceModal = ({ isOpen, onClose, service }) => {
  const [quantity, setQuantity] = useState(1);
  const cartCtx = useContext(CartContext);
  console.log(cartCtx.items)
  console.log(cartCtx.totalAmount)
  useEffect(() => {
    if (isOpen && service) {
      setQuantity(1); // Reset quantity when a new service is selected
    }
  }, [isOpen, service]);

  if (!service) return null;

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      // Remove item when quantity is 1 and decrement is pressed
      cartCtx.updateItem({
        id: service.id,
        amount: -1, // Negative amount to remove
        price: service.price ,
      });
      onClose(); // Optionally close the modal
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const addToCartHandler = () => {
    cartCtx.updateItem({
      id: service.id,
      name: service.title,
      amount: quantity, // Positive number to add
      price: service.price ,
    });
  };

  return (
    <Modal
      header={<ModalHeader>Service Details</ModalHeader>}
      open={isOpen}
      onOpenChange={(open) => onClose(open)}
      dismissible={true}
    >
      <DialogTitle>
        <VisuallyHidden>{service.title}</VisuallyHidden>
      </DialogTitle>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full flex flex-col text-center">
        <div className="relative mb-4 w-full h-48">
          <img
            className="w-full h-full object-cover rounded-md"
            alt={service.title}
            src={service.image}
          />
        </div>

        <h2 className="text-xl font-bold mb-2 dark:text-white">
          {service.title}
        </h2>

        <p className="dark:text-gray-300 mb-4">{service.description}</p>

        <p className="text-lg font-bold text-primary dark:text-secondary mb-6">
          {service.price} ₽
        </p>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 text-lg font-bold bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              className="w-12 text-center py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none"
              readOnly
            />
            <button
              className="px-3 py-1 text-lg font-bold bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>

          <button className="button-85" role="button" onClick={addToCartHandler}>
            Add to Cart
            <span className="ml-2 text-xl">{service.price * quantity} ₽</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceModal;

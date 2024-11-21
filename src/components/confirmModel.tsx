import React from "react";
import { CartItem, CustomerInfo } from "./CreateOrder";
import formatCurrency from "../helpers/formatCurrency";
import "../assets/css/ConfirmOrder.css";

type ConfirmOrderProps = {
  customer: CustomerInfo;
  cart: CartItem[];
  total: number;
  paymentMethod: "cash" | "card";
  amountGiven: number | null;
  change: number;
  onClose: () => void;
};

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({
  customer,
  cart,
  total,
  paymentMethod,
  amountGiven,
  change,
  onClose,
}) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <h2>Order Confirmation</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <p>
            <strong>Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {customer.phone}
          </p>
          <h3>Cart Details:</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {formatCurrency(item.price)} x {item.quantity}{" "}
                (Promo: {item.promotionCode || "None"})
              </li>
            ))}
          </ul>
          <p>
            <strong>Total:</strong> {formatCurrency(total)}
          </p>
          <p>
            <strong>Payment Method:</strong> {paymentMethod}
          </p>
          {paymentMethod === "cash" && (
            <>
              <p>
                <strong>Amount Given:</strong>{" "}
                {formatCurrency(amountGiven || 0)}
              </p>
              {change > 0 && <p>Change: {formatCurrency(change)}</p>}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;

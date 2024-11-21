import React, { useState } from "react";
import formatCurrency from "../helpers/formatCurrency";
import ConfirmOrder from "./confirmModel";

type Product = {
  id: number;
  name: string;
  price: number;
};

export interface CartItem extends Product {
  quantity: number;
  promotionCode: string;
}

type Promotion = {
  code: string;
  type: "percent" | "flat";
  value: number;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};

const mockProducts: Product[] = [
  { id: 1, name: "Product A", price: 180000 },
  { id: 2, name: "Product B", price: 200000 },
];

const mockPromotions: Promotion[] = [
  { code: "DISCOUNT10", type: "percent", value: 10 },
  { code: "FLAT50", type: "flat", value: 50 },
];

const CreateOrder: React.FC = () => {
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [amountGiven, setAmountGiven] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addProductToCart = (product: Product) => {
    setCart((prevCart) => [
      ...prevCart,
      { ...product, quantity: 1, promotionCode: "" },
    ]);
  };

  const updateCartItem = (index: number, field: keyof CartItem, value: any) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index] = { ...updatedCart[index], [field]: value };
      return updatedCart;
    });
  };

  const removeCartItem = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => {
      const promo = mockPromotions.find((p) => p.code === item.promotionCode);
      const discount =
        promo?.type === "percent"
          ? (item.price * promo.value) / 100
          : promo?.type === "flat"
          ? promo.value
          : 0;
      return total + item.quantity * item.price - discount;
    }, 0);
  };

  const handlePayment = () => setIsModalVisible(true);

  const totalAmount = calculateTotal();
  const changeAmount =
    paymentMethod === "cash" &&
    amountGiven !== null &&
    amountGiven > totalAmount
      ? amountGiven - totalAmount
      : 0;

  return (
    <div>
      <h2>Create Order</h2>
      <form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Customer Info */}
          <label>
            Name:
            <input
              type="text"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
            />
          </label>

          {/* Add Product */}
          <label>
            Add Product:
            <select
              onChange={(e) => {
                const product = mockProducts.find(
                  (p) => p.id === Number(e.target.value)
                );
                if (product) addProductToCart(product);
              }}
            >
              <option value="">Select Product</option>
              {mockProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Cart */}
        <h3>Cart</h3>
        <div>
          <ul>
            {cart.map((item, index) => (
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 5,
                }}
                key={item.id}
              >
                {item.name} - {formatCurrency(item.price)}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartItem(index, "quantity", Number(e.target.value))
                  }
                  min={1}
                />
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={item.promotionCode}
                  onChange={(e) =>
                    updateCartItem(index, "promotionCode", e.target.value)
                  }
                />
                <button type="button" onClick={() => removeCartItem(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <h3>Total: {formatCurrency(totalAmount)}</h3>

        {/* Payment Method */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <label style={{ display: "flex", gap: 5 }}>
            Payment Method:
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
            />
            Cash
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Card
          </label>

          {paymentMethod === "cash" && (
            <label>
              Amount Given:
              <input
                type="number"
                value={amountGiven || ""}
                onChange={(e) => setAmountGiven(Number(e.target.value))}
              />
            </label>
          )}
        </div>

        {changeAmount > 0 && <p>Change: {formatCurrency(changeAmount)}</p>}

        <div
          onClick={handlePayment}
          style={{
            marginTop: 5,
            padding: 7,
            backgroundColor: "#999999",
            color: "white",
            cursor: "pointer",
            borderRadius: "24px",
            width: 100,
            textAlign: "center",
          }}
        >
          Checkout
        </div>
      </form>

      {/* Modal */}
      {isModalVisible && (
        <ConfirmOrder
          customer={customer}
          cart={cart}
          total={totalAmount}
          paymentMethod={paymentMethod}
          amountGiven={amountGiven}
          change={changeAmount}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default CreateOrder;

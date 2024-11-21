import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 20px",
        display: "flex",
        flexDirection: "row",
        fontSize: "20px",
      }}
    >
      <div
        onClick={() => navigate("/checkout-product", { replace: true })}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px",
          borderRadius: "24px",
          cursor: "pointer",
        }}
      >
        Go to checkout
      </div>
    </div>
  );
};

export default Home;

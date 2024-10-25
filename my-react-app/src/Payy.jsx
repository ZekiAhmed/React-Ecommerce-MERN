import { useEffect, useState } from "react";
import img from "./assets/react.svg";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const KEY =
  "pk_test_51MCul8AvcnX8OgSotTfEC0v5YMw0efGcSGRLypYHdDRzXFqGaeZVYjKATKvaBW6VezQDbcpYBMcd0Oo7tbOFPp4j000CVtzzxA";
const Payy = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
    // console.log(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        navigate("/success");
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing. Please wait...</span>
      ) : (
        <StripeCheckout
          name="Lama Shop2"
          image={img}
          billingAddress
          shippingAddress
          description="Your total is $20"
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay NOw
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Payy;

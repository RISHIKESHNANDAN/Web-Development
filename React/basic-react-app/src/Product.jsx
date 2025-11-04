import "./Product.css";
import Price from "./Price";

function Product({title}) {
  
  return (
    <div className="Product">
      <h2>{title}</h2>
      <p>Description</p>
    </div>
  );
}

export default Product;

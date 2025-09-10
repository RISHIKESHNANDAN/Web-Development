import "./Product.css";

function Product({ title,price,features}) {
  
  return (
    <div className="Product">
      <h3>{title}</h3>
      <h5>Peice: {price}</h5>
    </div>
  );
}

export default Product;

import Product from "./Product.jsx";

function ProductTab() {
  let options = ["hi-tech", "durable", "fast"];
  return (
    <>
      <Product title="phone" price="23000" features={options}/>
      <Product title="laptop" price="50000"/>
      <Product title="pen" price="50"/>
    </>
  );
}

export default ProductTab;
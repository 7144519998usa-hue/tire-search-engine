import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], placement = "product-grid", pageContext = {} }) {
  const gridClassName = String(placement || "").includes("related") ? "product-grid is-related-grid" : "product-grid";
  return (
    <div className={gridClassName}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} placement={placement} pageContext={{ ...pageContext, placement }} />
      ))}
    </div>
  );
}

import { Link } from "react-router-dom";
import ProductCard from "../../components/pageComponents/ProductCard";
import SkeltonLoading from "../../shared/SkeltonLoading";
import { useGetAllProductsQuery } from "../../redux/api/endpoints/product.api";
import { toast } from "sonner";

const Home = () => {
  const { data: productData, isError, isLoading } = useGetAllProductsQuery("");
  if (isError) {
    toast.error("data fetching failed");
  }

  return (
    <div className="homeContainer">
      <section className="banner">
        <small style={{ display: "flex", justifyContent: "center", }}>For simplicity logged user can access also admin dashboard</small>
      </section>
      <span>
        <h1>latest products</h1>
        <Link className="more" style={{ color: "blue", fontSize: "20px" }} to="search">
          More
        </Link>
      </span>

      <main>
        {isLoading ? (
          <SkeltonLoading length={6} padding="1rem 5%" />
        ) : (
          productData?.data?.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))
        )}
      </main>
    </div>
  );
};
export default Home;

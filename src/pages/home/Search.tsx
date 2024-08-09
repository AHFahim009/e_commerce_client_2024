import { useState } from "react";
import ProductCard from "../../components/pageComponents/ProductCard";
import {
  useProductCategoriesQuery,
  useSearchProductsQuery,
} from "../../redux/api/endpoints/product.api";
import { debouncedFn } from "../../redux/store/useHooks";
import SkeltonLoading from "../../shared/SkeltonLoading";

const Search = () => {
  const [sortOrder, setSortOrder] = useState("");
  const [price, setPrice] = useState<number>();
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const debouncedPrice = debouncedFn({ value: price as number, delayTime: 0 });
  const debouncedSearchTerm = debouncedFn({
    value: searchTerm as string,
    delayTime: 1000,
  });
  const searchQuery: Record<string, unknown> = {};

  if (category) {
    searchQuery["category"] = category;
  }
  if (debouncedPrice) {
    searchQuery["price"] = debouncedPrice;
  }
  if (sortOrder) {
    searchQuery["sortBy"] = "price";
    searchQuery["sortOrder"] = sortOrder;
  }
  if (debouncedSearchTerm) {
    searchQuery["searchTerm"] = debouncedSearchTerm;
  }
  if (page) {
    searchQuery["page"] = page;
  }

  const { data: Categories, isLoading } = useProductCategoriesQuery("");
  const { data: searchData, isLoading: isProductLoading } =
    useSearchProductsQuery({ ...searchQuery, limit: 5 });

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < searchData!.meta!.totalPage!) {
      setPage(page + 1);
    }
  };

  return (
    <div className="searchPage">
      <aside>
        <h1>Filters</h1>
        <div>
          <h4>Sort</h4>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option>none</option>
            <option value="asc">Low to High</option>
            <option value="dsc">High to Low</option>
          </select>
        </div>
        <div>
          <h4>Price: ${price}</h4>
          <input
            type="range"
            min={0}
            max={1000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!isLoading &&
              Categories?.data?.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search by name..."
        />

        <div className="productLists">
          {isProductLoading ? (
            <SkeltonLoading length={8} />
          ) : (
            searchData?.data?.map((product) => (
              <ProductCard key={product._id} {...product}></ProductCard>
            ))
          )}
        </div>
        {searchData?.meta &&
          searchData?.meta?.document <= searchData?.meta?.limit ? null : (
          <article>
            <button onClick={handlePrev} disabled={page === 1}>
              pre
            </button>

            <button
              onClick={handleNext}
              disabled={page === searchData?.meta?.totalPage}
            >
              next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};
export default Search;

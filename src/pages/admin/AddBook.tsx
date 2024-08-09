import { Link, useNavigate } from "react-router-dom";
import UseForm from "../../components/form/UseForm";
import UseInput from "../../components/form/UseInput";
import { FaArrowLeft } from "react-icons/fa";
import { FieldValues } from "react-hook-form";
import { validation } from "../../validationTypes/validatitonTypes";
import { useCreateProductMutation } from "../../redux/api/endpoints/product.api";
import UseFileUpload from "../../components/form/UseFileUpload";
import sendResponse from "../../utils/sendResponse";
import { useState } from "react";

const AddBook = () => {
  const [createProduct] = useCreateProductMutation();
  const [isFormLoading, setIsFormLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (payload: FieldValues) => {
    //  loading start form here
    setIsFormLoading(true)



    const { photo, ...restData } = payload;
    const { price, stock } = restData;
    const modifiedRestData = {
      ...restData,
      price: Number(price),
      stock: Number(stock),
    };
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(modifiedRestData));
      formData.append("photo", photo);
      const res = await createProduct(formData);
      sendResponse(res, navigate, "/admin/inventory");
    } catch (error) {
      console.error("add book internal problem", error);
    } finally {
      setIsFormLoading(false)
    }
  };
  return (
    <div className="addBookPage">
      <section>
        <h1>ADD NEW BOOK</h1>
        <UseForm
          onSubmit={handleSubmit}
          schema={validation.productSchema}

        >
          <UseInput
            name="name"
            type="text"
            placeholder="write book name"
            label="Name"
          />
          <UseInput
            name="authorName"
            type="text"
            placeholder="write author name"
            label="Author Name"
          />
          <UseInput
            name="publishedData"
            type="date"
            placeholder="write published data"
            label="Published Date"
          />
          <UseInput
            name="price"
            type="number"
            placeholder="book price"
            label="Price"
          />
          <UseInput
            name="stock"
            type="Number"
            placeholder="write available stock"
            label="Stock"
          />

          <UseInput
            name="category"
            type="text"
            placeholder="book category"
            label="category"
          />
          <UseFileUpload
            name="photo"
            type="file"
            placeholder="give book photo"
            label="photo"
          />
          {
            isFormLoading ? <button>loading..</button> : <button type="submit">Submit</button>
          }
        </UseForm>
      </section>
      <Link className="backArrow" to="/admin/inventory">
        <FaArrowLeft />
      </Link>
    </div>
  );
};
export default AddBook;

import { FieldValues, SubmitHandler } from "react-hook-form";
import UseForm from "../../components/form/UseForm";
import UseInput from "../../components/form/UseInput";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/api/endpoints/product.api";
import SkeltonLoading from "../../shared/SkeltonLoading";
import sendResponse from "../../utils/sendResponse";
import { MdDelete } from "react-icons/md";
import ProductDeleteBox from "./ProductDeleteBox";

const ProductManage = () => {
  const productId = useParams();
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const [photo, setPhoto] = useState<string>();
  const [photoUrl, setPhotUrl] = useState<File>();
  const [isFormLoading, setIsFormLoading] = useState(false);

  //  get product details
  const { data: productInfo, isLoading } = useGetSingleProductQuery(productId.id);
  const [updateProduct] = useUpdateProductMutation();

  // preview photo :
  const handlePhoto = (data: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = data.target.files?.[0];
    setPhotUrl(file as File);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e?.target?.result;

        if (typeof result === "string") {
          setPhoto(result);
        } else {
          // Handle ArrayBuffer or null as needed
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(""); // Clear preview if invalid file
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (payload) => {
    setIsFormLoading(true); // start btn loading




    try {
      const formData = new FormData();
      if (photoUrl) {
        formData.append("photo", photoUrl);
      }
      formData.append("data", JSON.stringify(payload));

      const modifiedData = {
        productId: productId.id,
        productData: formData,
      };
      const res = await updateProduct(modifiedData);
      sendResponse(res, navigate, "/admin/inventory");
    } catch (error) {
      console.error("product manage internal error", error);
    } finally {
      setIsFormLoading(false); // end loading
    }
  };
  const handleDelete = () => {
    setIsDelete((pre) => !pre);
  };

  return (
    <>
      {isLoading ? (
        <SkeltonLoading length={14} />
      ) : (
        <div className="productManagePage">
          <section>
            <strong> ID - {productInfo?.data?._id}</strong>
            <img src={productInfo?.data?.photo} alt="coming soon" />
            <p>{productInfo?.data?.name}</p>
            <p>${productInfo?.data?.price}</p>
            {productInfo?.data && productInfo.data.stock > 0 ? (
              <span className="green">
                {productInfo?.data?.stock} available
              </span>
            ) : (
              <span className="red">Unavailable</span>
            )}
          </section>
          {/* col 2 */}
          <section className="manageBook">
            <h1>Manage Book</h1>
            <UseForm
              onSubmit={handleSubmit}
              defaultValues={{ ...productInfo?.data }}
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
                placeholder="Write author name"
                label="Author"
              />
              <UseInput
                name="price"
                type="number"
                placeholder="Product price"
                label="Price"
              />
              <UseInput
                name="stock"
                type="number"
                placeholder="Product stock available"
                label="stock"
              />
              <div className="inputDiv">
                <label>Upload photo</label>
                <input type="file" onChange={(e) => handlePhoto(e)} />
              </div>
              <figure>{photo && <img src={photo} />}</figure>
              {isFormLoading ? (
                <button type="submit">Loading..</button>
              ) : (
                <button type="submit">submit</button>
              )}
            </UseForm>
            <div className="manageDelete">
              <button onClick={handleDelete}>
                <MdDelete />
              </button>
            </div>
          </section>

          {/* delete box */}
          {isDelete && (
            <ProductDeleteBox
              productId={productId.id!}
              setIsDelete={setIsDelete}
            />
          )}
        </div>
      )}
    </>
  );
};
export default ProductManage;

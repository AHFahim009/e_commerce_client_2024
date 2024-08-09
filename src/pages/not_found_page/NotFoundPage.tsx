import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
        <h1>No page found!</h1>
        <MdError style={{ fontSize: "3rem" }} />
        <Link to={"/"}>Go to home page</Link>
      </div>
    </main>
  );
};
export default NotFoundPage;

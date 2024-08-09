import { Link } from "react-router-dom";

type TProps = {
  message: string;
  url?: any;
  pageName?: string;
};

const EmptyMessage = ({ message, url, pageName }: TProps) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px"
      }}
    >

      {message}
      {url && pageName ? <Link to={url}><p style={{ color: "blue" }}>{pageName}</p></Link> : null}
    </div>
  );
};
export default EmptyMessage;

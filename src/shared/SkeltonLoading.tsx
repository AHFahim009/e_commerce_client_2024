const SkeltonLoading = ({
  length = 3,
  padding,
}: {
  length?: number;
  padding?: string;
}) => {
  const skelton = Array.from({ length }).map((_, i) => (
    <div key={i} className="skelton-shape"></div>
  ));

  return (
    <div className="skelton-loading" style={{ padding: padding }}>
      {skelton}
    </div>
  );
};
export default SkeltonLoading;

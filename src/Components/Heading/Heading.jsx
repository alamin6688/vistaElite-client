
const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-semibold text-neutral-500 mt-2 mb-3">{subtitle}</div>
    </div>
  );
};


export default Heading;

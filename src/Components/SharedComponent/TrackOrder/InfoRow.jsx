const InfoRow = ({ icon, iconBg, label, value, valueClassName }) => (
  <div className="flex gap-3 items-start">
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}
    >
      {icon}
    </div>
    <div>
      <p className="font-medium">{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  </div>
);

export default InfoRow;

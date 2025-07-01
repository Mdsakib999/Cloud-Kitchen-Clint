export const SectionHeader = ({
  icon: Icon,
  subtitle,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {/* Icon + Subtitle */}
      <div className="inline-flex items-center gap-2">
        {Icon && <Icon className="w-8 h-8 text-primary" />}
        <span className="text-primary text-sm font-medium tracking-wider uppercase">
          {subtitle}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold font-inknut leading-tight bg-gradient-to-r from-white via-amber-100 to-primary bg-clip-text text-transparent">
        {title}
      </h1>

      {/* Description */}
      <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      {/* Underline */}
      <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-3 rounded-full"></div>
    </div>
  );
};

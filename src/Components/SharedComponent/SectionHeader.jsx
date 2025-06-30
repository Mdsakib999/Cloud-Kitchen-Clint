export const SectionHeader = ({
  icon: Icon,
  subtitle,
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {/* Icon + Subtitle */}
      <div className="inline-flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-8 h-8 text-primary" />}
        <span className="text-primary text-sm font-medium tracking-wider uppercase">
          {subtitle}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-amber-100 to-primary bg-clip-text text-transparent mb-6">
        {title}
      </h1>

      {/* Description */}
      <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      {/* Underline */}
      <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-8 rounded-full"></div>
    </div>
  );
};

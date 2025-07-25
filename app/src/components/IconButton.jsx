import PropTypes from "prop-types";

export function IconButton({
  icon: Icon,
  label,
  onClick,
  className,
  styleIcon,
}) {
  return (
    <button
      onClick={onClick}
      className={`h-60 w-60 flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200 transition shadow-md ${className}`}
    >
      <Icon className={`${styleIcon} text-7xl mb-2`} />
      <span className="text-lg font-medium text-gray-700">{label}</span>
    </button>
  );
}

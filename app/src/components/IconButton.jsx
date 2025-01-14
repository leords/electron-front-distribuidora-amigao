
import PropTypes from "prop-types";

export function IconButton({icon: Icon, label, onClick, className, styleIcon}) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-200 transition shadow-md ${className}`}
            >
              <Icon className={`${styleIcon} text-4xl mb-2`} />
              <span className="text-lg font-semibold text-gray-700">{label}</span>
        
            
        </button>
    )
}
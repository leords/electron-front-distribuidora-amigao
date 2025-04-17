export function ActionButton({ label, icon: Icon, onClick, className }) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg hover:shadow-xl transition ${className}`}
      >
        <Icon className="text-3xl mb-2" />
        <span className="text-lg font-medium">{label}</span>
      </button>
    );
  }
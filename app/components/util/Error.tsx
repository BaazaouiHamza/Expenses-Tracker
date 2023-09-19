import { FaExclamationCircle } from 'react-icons/fa';

function ErrorComponent({ title, children }) {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default ErrorComponent;
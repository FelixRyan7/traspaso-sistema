import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3">
      {/* Columna 1: gradiente + frases */}
      <div className="hidden md:relative md:flex flex-col justify-center items-center bg-gradient-to-r from-primary to-white text-white p-6">
        <h2 className="absolute top-4 left-4 font-bold">
          <Link
            to="/"
            className="no-underline text-white hover:brightness-90 transition-all duration-300"
          >
            Traspaso
          </Link>
        </h2>
        
      </div>

      {/* Columna 2 y 3: Formulario */}
      <div className="md:col-span-2 flex justify-center bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

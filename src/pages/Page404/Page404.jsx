import { Link } from "react-router-dom";
import './Page404.css';

const Page404 = () => {
  return (
    <div className="Page404"> 
      <main className="Page404__content">
        {/* Message principal 404 */}
        <h1 className="Page404__title">404</h1>

        {/* Texte explicatif */}
        <p className="Page404__message">
          Oups ! La page que vous demandez n&apos;existe pas.
        </p>

        {/* Lien vers la page de profil par défaut */}
        <Link to={"/"} className="Page404__link">
          Retourner sur HomePage
        </Link>
      </main>
    </div>
  );
};

export default Page404;
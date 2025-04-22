import Link from "next/link";
import type { Game } from "../types/games.types";
import { FaStar, FaRegStar } from "react-icons/fa";

const renderStars = (rating: number) => {
    const stars = [];
    
    // Usamos Math.floor para solo obtener el número entero de estrellas completas
    const fullStars = Math.floor(rating);
  
    // Calculamos las estrellas vacías (5 menos las estrellas completas)
    const emptyStars = 5 - fullStars;
  
    // Añadimos las estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
  
    // Añadimos las estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }
  
    return stars;
  };

export default function GameCard({ game }: { game: Game }) {

    return (

        <Link href={`/game/${game.slug}`}>

            <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">

                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{game.name}</h3>
                <div className="flex flex-row text-sm text-gray-500 items-center">{game.rating} &nbsp; {renderStars(game.rating)}</div>

            </div>

        </Link>
    );
}
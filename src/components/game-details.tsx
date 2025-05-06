import Link from "next/link";
import { Game } from "../types/games.types";
import Image from "next/image";

const GameCard = ({ game }: { game: Game }) => {
    console.log("Game object:", game);
    console.log(game);
    console.log("Game Name:", game.name);
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <Image
        src={game.background_image}
        alt={game.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-2">{game.name}</h3>
      <p className="text-gray-500">Rating: {game.rating}</p>
      <br/>
      <p className="text-gray-500">Rating: {game.background_image}</p>
      <br/>
      <p className="text-gray-500">Rating: {game.rating}</p>
      <br/>
      <Link href={`/product-sheet/${game.id}`} className="text-blue-500 hover:underline">
        Ver detalles
      </Link>
    </div>
  );
};

export default GameCard;

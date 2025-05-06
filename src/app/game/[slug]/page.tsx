import { getGameDetails } from "../../../lib/requests";
import { GameDetails } from "../../../types/game-details.types";
import AddToCartButton from "../../../components/AddToCartButton";
import Image from "next/image";
/* import GameMainInfo from "../../../components/game-main-info";
import GameMainImages from "../../../components/game-main-images";
import Rating from "../../../components/rating";
 */

export default async function GameDetailPage({ params }: {
    params: {
        slug: string
    }
}) {
    const game: GameDetails = await getGameDetails(params.slug);

    console.log("game", game);

    if (!game) return null;

    game.price = 50;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

            {/* Imagen principal */}
            <div className="mb-6">
                <Image
                    src={game.background_image}
                    alt={`Imagen de ${game.name}`}
                    className="w-full h-100 object-cover rounded-xl shadow-lg"
                />
            </div>

            <div className="flex justify-between items-center my-4">
                <span className="text-2xl font-semibold text-green-700">{ game.price } €</span>
                <AddToCartButton game={game} />
            </div>

            {/* <GameMainImages game={game} />
            <GameMainInfo game={game} />
            <Rating rating={game.rating} /> */}
            <div className="mt-6 prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: game.description }} />
            </div>

            <br />

            {/* Requisitos del sistema */}
            {game.platforms && (
                <div className="mb-6 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">Requisitos del sistema</h2>

                    {game.platforms.map((platform) => (
                        <div key={platform.platform.id}>
                            <h3 className="text-lg font-semibold">{platform.platform.name}</h3>
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                {platform.requirements.minimum}
                            </p>
                        </div>


                    ))}


                    {/* {game.platforms[0].requirements.recommended && (
                        <p className="text-sm text-gray-700 whitespace-pre-line mt-2">
                            <strong>Recomendados:</strong> {game.platforms[0].requirements.recommended}
                        </p>
                    )} */}
                </div>
            )}

            {/* Etiquetas */}
            {game.tags?.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Etiquetas</h2>
                    <div className="flex flex-wrap gap-2">

                        {game.tags.map((tag) => (
                            <span key={tag.id} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
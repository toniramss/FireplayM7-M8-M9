export default function Footer() {

    return (



        <footer className="bg-gray-800 text-white pt-10">
            <div className="max-w-6xl mx-auto flex flex-row flex-wrap justify-between">
                <div className="flex-1 flex flex-row gap-4 justify-center items-center">
                    <h3 className="text-xl font-bold">Fireplay</h3>
                    <p className="text-sm mt-2">La mejor plataforma de juegos interactivos.</p>
                </div>
                <div className="flex-1 flex flex-row gap-4 justify-center items-center">

                    <a href="/contact" className="hover:underline">Contacto</a>

                    <a href="/info" className="hover:underline">Información</a>

                    <a href="https://facebook.com/fireplay" className="hover:underline" target="_blank">Facebook</a>

                    <a href="https://twitter.com/fireplay" className="hover:underline" target="_blank">Twitter</a>


                </div>
            </div>

            <br/>

            <small className="w-full flex items-end justify-center">© {new Date().getFullYear()} Fireplay. Todos los derechos reservados.</small>
        </footer>
    );
}
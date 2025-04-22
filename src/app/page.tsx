


export default async function HomePage() {

  return (
    <>
      <main>
        {/* Sección destacada */}
        <section
          className="h-screen bg-cover bg-center text-white flex justify-center items-center text-center"
          style={{
            backgroundImage: 'url("https://img.freepik.com/foto-gratis/silla-gamer-luces-neon-multicolor_52683-99749.jpg?t=st=1745340547~exp=1745344147~hmac=d6d44b5029a9be2f6a773e23748d33863720b68ae9ad8bf88db476917b7e72da&w=900")',
          }}
        >
          <div>
            <h1 className="text-5xl font-extrabold mb-4">Bienvenido a Fireplay</h1>
            <p className="text-2xl">La mejor plataforma para disfrutar de juegos interactivos.</p>
          </div>
        </section>

        {/* Sección "¿Qué es Fireplay?" */}
        <section id="about" className="py-20 bg-gray-100 text-center">
          <h2 className="text-3xl font-semibold mb-4">¿Qué es Fireplay?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Fireplay es una plataforma diseñada para que disfrutes de una experiencia única en el mundo de los juegos. Con una gran variedad de opciones interactivas, ¡siempre habrá algo nuevo para ti!
          </p>
          <div>
            <a href="/about" className="text-blue-500 hover:underline">Saber más</a>
          </div>
        </section>

        {/* Sección "Cómo funciona" */}
        <section id="how" className="py-20 bg-white text-center">
          <h2 className="text-3xl font-semibold mb-6">Cómo Funciona</h2>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col space-y-10">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  1
                </div>
                <div className="ml-6 text-left">
                  <h3 className="text-2xl font-semibold">Crea tu cuenta</h3>
                  <p>Regístrate para acceder a todas las funcionalidades y juegos disponibles.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  2
                </div>
                <div className="ml-6 text-left">
                  <h3 className="text-2xl font-semibold">Explora los juegos</h3>
                  <p>Selecciona tu juego favorito de nuestra amplia biblioteca.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  3
                </div>
                <div className="ml-6 text-left">
                  <h3 className="text-2xl font-semibold">¡Disfruta y juega!</h3>
                  <p>Sumérgete en la acción y disfruta de la mejor experiencia de juego.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de llamada a la acción */}
        <section id="cta" className="py-20 bg-blue-500 text-white text-center">
          <h2 className="text-4xl font-semibold mb-4">¿Listo para jugar?</h2>
          <p className="text-xl mb-8">¡Únete a nosotros y empieza a jugar ahora mismo!</p>
          <a href="/games" className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
            Explorar juegos
          </a>
        </section>
      </main>

      
    </>
  );




  
}
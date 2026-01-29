import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">La ventaja competitiva que necesitas</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">En el mercado de alquiler actual, 10 minutos marcan la diferencia entre conseguir el piso o quedarte fuera.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Monitorización 24/7"
              description="Nuestros agentes revisan los portales cada minuto. No se nos escapa ni un solo anuncio."
              icon="🔍"
            />
            <FeatureCard
              title="Alertas WhatsApp"
              description="Sin emails que no ves. Recibe un mensaje directo en tu móvil con el link para llamar al momento."
              icon="📱"
            />
            <FeatureCard
              title="Filtros Inteligentes"
              description="Solo te avisamos de lo que de verdad te interesa. Zona, precio, m2 y mucho más."
              icon="🎯"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white dark:bg-neutral-800 border-2 border-primary shadow-2xl shadow-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-xl text-sm font-bold">RECOMENDADO</div>
            <h3 className="text-2xl font-bold mb-2">Plan Sniper</h3>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-extrabold">19€</span>
              <span className="ml-2 text-neutral-500">/mes</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center"><span className="text-primary mr-2">✓</span> Alertas ilimitadas</li>
              <li className="flex items-center"><span className="text-primary mr-2">✓</span> Monitorización cada 2 min</li>
              <li className="flex items-center"><span className="text-primary mr-2">✓</span> Todos los portales</li>
              <li className="flex items-center"><span className="text-primary mr-2">✓</span> Soporte prioritario</li>
            </ul>
            <button className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
              Activar mi Radar
            </button>
            <p className="mt-4 text-center text-sm text-neutral-500">Sin compromiso, cancela cuando quieras.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-neutral-500">
          <p>© 2026 Radar de Pisos (Alquiler Sniper). Made for the Spanish market.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 hover:border-primary/30 transition-all group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
}

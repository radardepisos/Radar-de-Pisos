import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';
import { Target, Search, Smartphone, Rocket, Check } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-[#020617] selection:bg-primary/30">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-6 tracking-tight">Potencia absoluta para <br className="hidden sm:block" /><span className="text-primary">encontrar tu casa</span></h2>
            <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto">En el mercado actual, 10 minutos marcan la diferencia entre conseguir el piso o quedarte fuera.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
            <FeatureCard
              title="Monitorización 24/7"
              description="Nuestros agentes revisan los portales cada minuto. No se nos escapa ni un solo anuncio."
              icon={<Search className="w-8 h-8" />}
            />
            <FeatureCard
              title="Alertas WhatsApp"
              description="Sin emails que no ves. Recibe un mensaje directo en tu móvil con el link para llamar al momento."
              icon={<Smartphone className="w-8 h-8" />}
            />
            <FeatureCard
              title="Filtros Inteligentes"
              description="Solo te avisamos de lo que de verdad te interesa. Zona, precio, m2 y mucho más."
              icon={<Target className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white dark:bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto p-12 rounded-[2.5rem] bg-white dark:bg-neutral-800 border-2 border-primary shadow-[0_20px_50px_rgba(34,197,94,0.15)] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-2xl text-xs font-black uppercase tracking-widest">RECOMENDADO</div>

            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary">
              <Rocket className="w-10 h-10" />
            </div>

            <h3 className="text-3xl font-black mb-2">Plan Sniper</h3>
            <div className="flex items-baseline justify-center mb-8">
              <span className="text-6xl font-black tracking-tighter">19€</span>
              <span className="ml-2 text-neutral-400 font-bold">/mes</span>
            </div>

            <ul className="space-y-5 mb-10 text-left max-w-sm mx-auto">
              <li className="flex items-center font-medium"><Check className="text-primary mr-3 w-5 h-5" /> Alertas ilimitadas en tiempo real</li>
              <li className="flex items-center font-medium"><Check className="text-primary mr-3 w-5 h-5" /> Monitorización cada 2 minutos</li>
              <li className="flex items-center font-medium"><Check className="text-primary mr-3 w-5 h-5" /> Todos los portales (Idealista, Fotocasa...)</li>
              <li className="flex items-center font-medium"><Check className="text-primary mr-3 w-5 h-5" /> Análisis por IA (Gemini) incluido</li>
            </ul>

            <button className="w-full py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-primary/40 transform hover:scale-[1.02]">
              Activar mi Radar Sniper
            </button>
            <p className="mt-6 text-sm text-neutral-400 font-medium">Sin compromiso, cancela cuando quieras.</p>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer Section */}
      <section className="py-20 bg-neutral-100/50 dark:bg-neutral-900/20 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-6">Aviso Legal de Agregador</h4>
          <p className="text-sm text-neutral-500 leading-relaxed">
            InmoAlert es un motor de búsqueda y agregador de información inmobiliaria. El contenido indexado proviene de fuentes públicas y portales externos. InmoAlert no es dueño de los anuncios ni tiene relación comercial directa con la publicación original salvo que se indique lo contrario. La propiedad intelectual de las imágenes, descripciones y datos de los anuncios pertenece exclusivamente a sus respectivos portales (Idealista, Fotocasa, etc.) y a los anunciantes originales.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-8">
          <div className="flex items-center space-x-2 grayscale opacity-50">
            <span className="text-xl font-black tracking-tighter tracking-widest text-primary">INMOALERT</span>
          </div>
          <p className="text-neutral-400 font-medium tracking-tight">© 2026 InmoAlert: Radar de Inversión. Made with ❤️ for the Spanish market.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 hover:border-primary/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-2">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-2xl font-black mb-4 tracking-tight">{title}</h3>
      <p className="text-neutral-500 leading-relaxed font-bold">{description}</p>
    </div>
  );
}

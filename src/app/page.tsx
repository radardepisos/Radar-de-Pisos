import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';
import { Target, Search, Smartphone, Rocket, Check } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-primary/40">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 lg:mb-28">
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-8 tracking-tighter text-white">Dominio total del <br /><span className="text-primary">mercado inmobiliario</span></h2>
            <p className="text-xl sm:text-3xl text-neutral-200 max-w-3xl mx-auto font-bold leading-tight">En el mercado actual, la velocidad no es una opción, es la única forma de conseguir el piso.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <FeatureCard
              title="Monitorización 24/7"
              description="Nuestros agentes revisan los portales cada minuto. No se nos escapa ni un solo anuncio."
              icon={<Search className="w-10 h-10" />}
            />
            <FeatureCard
              title="Alertas WhatsApp"
              description="Sin emails que no ves. Recibe un mensaje directo en tu móvil con el link para llamar al momento."
              icon={<Smartphone className="w-10 h-10" />}
            />
            <FeatureCard
              title="Filtros Sniper"
              description="Solo te avisamos de lo que de verdad le interesa. Zona, precio, m2 y mucho más."
              icon={<Target className="w-10 h-10" />}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto p-12 lg:p-16 rounded-[3rem] bg-neutral-900 border-2 border-primary shadow-[0_0_60px_rgba(59,130,246,0.3)] relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 bg-primary text-white px-8 py-3 rounded-bl-3xl text-sm font-black uppercase tracking-widest">PRO</div>

            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10 text-primary border border-primary/20">
              <Rocket className="w-12 h-12" />
            </div>

            <h3 className="text-4xl font-black mb-4 text-white">Plan Sniper</h3>
            <div className="flex items-baseline justify-center mb-10">
              <span className="text-7xl font-black tracking-tighter text-white">19€</span>
              <span className="ml-3 text-neutral-300 font-black text-xl uppercase tracking-widest">/mes</span>
            </div>

            <ul className="space-y-6 mb-12 text-left max-w-sm mx-auto">
              <li className="flex items-center font-bold text-white text-lg"><Check className="text-primary mr-4 w-6 h-6 flex-shrink-0" /> Alertas ilimitadas en tiempo real</li>
              <li className="flex items-center font-bold text-white text-lg"><Check className="text-primary mr-4 w-6 h-6 flex-shrink-0" /> Monitorización cada 2 minutos</li>
              <li className="flex items-center font-bold text-white text-lg"><Check className="text-primary mr-4 w-6 h-6 flex-shrink-0" /> Todos los portales (Idealista, Fotocasa...)</li>
              <li className="flex items-center font-bold text-white text-lg"><Check className="text-primary mr-4 w-6 h-6 flex-shrink-0" /> Análisis por IA (Gemini) incluido</li>
            </ul>

            <button className="w-full py-6 bg-primary hover:bg-primary-dark text-white rounded-[2rem] font-black text-2xl transition-all shadow-[0_0_40px_rgba(59,130,246,0.5)] transform hover:scale-[1.03]">
              Activar mi Radar Sniper
            </button>
            <p className="mt-8 text-neutral-400 font-black text-xs uppercase tracking-widest">Cancela cuando quieras • Pago Seguro</p>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer Section */}
      <section className="py-24 bg-neutral-900/50 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">Base Legal de Agregador</h4>
          <p className="text-lg text-neutral-200 leading-relaxed font-bold">
            InmoAlert es un buscador independiente y agregador de información. El contenido indexado proviene de fuentes públicas externas. La propiedad de los anuncios pertenece exclusivamente a sus respectivos portales (Idealista, Fotocasa, Habitaclia, etc.) y a los anunciantes originales.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-10">
          <div className="flex items-center">
            <span className="text-3xl font-black tracking-tighter text-white">INMO<span className="text-primary">ALERT</span></span>
          </div>
          <div className="flex space-x-8 text-xs font-black tracking-widest text-neutral-500 uppercase">
            <span>Terminos</span>
            <span>Privacidad</span>
            <span>Contacto</span>
          </div>
          <p className="text-neutral-500 font-bold text-sm tracking-tight text-center">© 2026 InmoAlert: Radar de Inversión Tecnológica.</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="p-12 rounded-[3.5rem] bg-neutral-900 border border-white/5 hover:border-primary/50 transition-all group shadow-2xl hover:-translate-y-2">
      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">{icon}</div>
      <h3 className="text-3xl font-black mb-6 tracking-tight text-white">{title}</h3>
      <p className="text-neutral-200 leading-relaxed font-bold text-lg">{description}</p>
    </div>
  );
}

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import logoMaisPrati from "../assets/logo-maisprati.png";
import { FaExclamationTriangle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  FaUserTie,
  FaLaptopCode,
  FaRocket,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const heroImages = [
  "https://plenogroup.com.br/wp-content/uploads/2023/03/Inclusao-social-no-mercado-de-trabalho-scaled-e1677759283528.jpeg",
  "https://cdn.pixabay.com/photo/2017/08/02/00/49/people-2569234_1280.jpg",
  "https://teamevents-online.de/wp-content/uploads/2022/01/Teamgeist-min-scaled.jpg",
];

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) navbar.style.display = "none";
    return () => {
      if (navbar) navbar.style.display = "flex";
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 text-gray-800 overflow-hidden">
      {/* HERO FULLSCREEN */}
      <section className="relative w-full h-screen">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          effect="fade"
          className="w-full h-full"
        >
          {heroImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-screen">
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.55]"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
                  <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl leading-tight animate-fadeIn">
                    Inclusão & Tecnologia
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 max-w-2xl text-gray-200 font-light">
                    Onde diversidade, aprendizado e tecnologia se unem para
                    criar novos futuros.
                  </p>
                  <div className="flex gap-6 flex-wrap justify-center">
                    <Link
                      to="/register"
                      className="bg-yellow-400 text-gray-900 font-bold py-3 px-10 rounded-xl hover:bg-yellow-300 transition-all shadow-lg hover:scale-105"
                    >
                      Cadastre-se Gratuitamente
                    </Link>
                    <Link
                      to="/login"
                      className="bg-transparent border border-white text-white font-semibold py-3 px-10 rounded-xl hover:bg-white/20 transition-all hover:scale-105"
                    >
                      Entrar
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SOBRE */}
      <section className="py-24 px-6 md:px-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <img
            src={logo}
            alt="Logo da Plataforma Inclusiva"
            className="w-full max-w-sm mx-auto md:mx-0 rounded-3xl shadow-2xl hover:scale-[1.03] transition-transform duration-500 object-contain"
          />

          <div>
            <h2 className="text-4xl font-bold text-indigo-800 mb-4">
              Quem Somos
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              A <strong>Plataforma Inclusiva</strong> é um espaço dedicado a
              promover oportunidades iguais no mercado de trabalho. Conectamos
              pessoas em busca de desenvolvimento profissional a empresas
              comprometidas com a diversidade e a inclusão, oferecendo acesso
              gratuito a cursos e formações que impulsionam carreiras e
              transformam o futuro.
            </p>
            <Link
              to="/register"
              className="inline-block bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-600 transition-all hover:scale-105"
            >
              Junte-se a nós!
            </Link>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-purple-50 via-white to-indigo-50 text-center">
        <h2 className="text-4xl font-bold mb-14 text-indigo-800">
          Como Funciona
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: (
                <FaUserTie className="text-5xl text-indigo-600 mx-auto mb-4" />
              ),
              title: "1. Cadastre-se",
              text: "Crie seu perfil e conte-nos sobre suas habilidades e sonhos.",
            },
            {
              icon: (
               <FaLaptopCode className="text-5xl text-indigo-600 mx-auto mb-4" />
              ),
              title: "2. Aprenda",
              text: "Tenha acesso a cursos gratuitos e trilhas de capacitação em tecnologia.",
            },
            {
              icon: (
                <FaRocket className="text-5xl text-indigo-600 mx-auto mb-4" />
              ),
              title: "3. Conquiste",
              text: "Candidate-se a vagas e alcance novas oportunidades profissionais.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl p-10 transition-all transform hover:-translate-y-2 hover:scale-[1.02]"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURSOS E OPORTUNIDADES DESTAQUE */}
      <section className="py-24 px-6 md:px-16 bg-white text-center">
        <h2 className="text-4xl font-bold mb-10 text-indigo-800">
          Cursos e Oportunidades em Destaque
        </h2>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 3000 }}
          loop
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto"
        >
          {[
            {
              img: "https://hermes.digitalinnovation.one/assets/diome/logo.svg",
              title: "DIO.me - Formação em Tecnologia",
              link: "https://dio.me",
            },
            {
              img: "https://www.alura.com.br/assets/img/alura-logo.svg",
              title: "Alura - Cursos de Programação",
              link: "https://alura.com.br",
            },
            {
              img: logoMaisPrati,
              title: "+PraTi - Formação em Tecnologia e Inclusão",
              link: "https://www.maisprati.com.br/",
            },
            {
              img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
              title: "Udemy - Cursos Online",
              link: "https://www.udemy.com/",
            },
          ].map((item, idx) => (
            <SwiperSlide key={idx}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-between h-[300px] bg-gradient-to-br from-indigo-50 to-purple-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 p-8"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150?text=Logo+Indisponível")
                  }
                  className="h-20 object-contain mb-6"
                />
                <h3 className="text-xl font-semibold text-indigo-700 flex-grow flex items-center justify-center">
                  {item.title}
                </h3>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* CONTATO */}
      <section className="relative bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 text-white py-24 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6">Entre em Contato</h2>
          <p className="text-gray-300 mb-10 text-lg">
            Tem dúvidas, ideias ou quer apoiar nosso projeto? Fale com a gente!
          </p>

          <form className="grid gap-5 text-left bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full p-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-400"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full p-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-400"
              />
            </div>
            <textarea
              rows="5"
              placeholder="Sua mensagem"
              className="w-full p-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="mt-2 bg-yellow-400 text-gray-900 font-semibold py-4 px-10 rounded-xl hover:bg-yellow-300 transition-all hover:scale-105"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>

      {/* BOTÃO FIXO DE DENÚNCIA */}
      <Link
        to="/complaints"
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white font-bold p-4 rounded-full shadow-2xl transition-transform hover:scale-110"
        title="Fazer Denúncia"
      >
        <FaExclamationTriangle className="text-2xl" />
      </Link>
      {/* BOTÃO VOLTAR AO TOPO */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 bg-indigo-700 hover:bg-indigo-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110"
          title="Voltar ao topo"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import * as z from "zod";

// ---------------- VALIDACIONES ----------------

const schema = z.object({
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(10),

  universidad: z.string().min(1),
  universidadOtra: z.string().optional(),

  carrera: z.string().min(1),
  carreraOtra: z.string().optional(),

  nuevoEvangelio: z.string().min(1),
  asisteIglesia: z.string().min(1),

  iglesia: z.string().optional(),
  otraIglesia: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const universidades = ["TecNM Campus Oaxaca (ITO)", "UABJO", "Otra"];

const carreras = {
  "TecNM Campus Oaxaca (ITO)": [
    "Contador Público",
    "Licenciatura en administración",
    "Ingeniería Química",
    "Ingeniería Mecánica",
    "Ingeniería Industrial",
    "Ingeniería en Sistemas Computacionales",
    "Ingeniería en Gestión Empresarial",
    "Ingeniería Electrónica",
    "Ingeniería Eléctrica",
    "Ingeniería en Gestión Empresarial (Mitla)",
    "Ingeniería Civil",
    "Ingeniería Civil (Mitla)",
    "Otra",
  ],
  UABJO: [
    "HUMANIDADES Y DE LAS ARTES",
    "Licenciatura en Artes Plásticas y Visuales",
    "Licenciatura en Enseñanza de Idiomas (Escolarizado) Oaxaca",
    "Licenciatura en Enseñanza de Idiomas (Semiescolarizado) Oaxaca",
    "Licenciatura en Enseñanza de Idiomas (Escolarizado) Tehuantepec",
    "Licenciatura en Enseñanza de Idiomas (Escolarizado) Puerto Escondido",
    "Licenciatura en Enseñanza de Idiomas (Escolarizado) Tututepec",
    "Licenciatura en Enseñanza de Idiomas (Escolarizado) Huajuapan",
    "Licenciatura en Entrenamiento Deportivo",
    "Licenciatura en Historia del Arte",
    "Licenciatura en Humanidades",
    "Licenciatura en Música",
    "Maestría en Educación Crítica de Lenguas",
    "Maestría en Traducción e Interpretación de Lenguas Indígenas",
    "Maestría en Lengua, Literatura y Traducción",
    "Doctorado en Estudios Críticos del Lenguaje",
    "",
    "CIENCIAS SOCIALES",
    "Licenciatura en Administración",
    "Licenciatura en Administración Pública y Gestión Municipal",
    "Licenciatura en Antropología",
    "Licenciatura en Antropología en el Área de Arqueología",
    "Licenciatura en Ciencias de la Educación",
    "Licenciatura en Ciencias Sociales y Desarrollo Regional",
    "Licenciatura en Ciencias Sociales y Estudios Políticos",
    "Licenciatura en Ciencias Sociales y Sociología Rural",
    "Licenciatura en Contaduría Pública",
    "Licenciatura en Derecho",
    "Licenciatura en Economía",
    "Licenciatura en Economía (Abierta)",
    "Licenciatura en Economía Social y Desarrollo Local (en línea)",
    "Licenciatura en Gastronomía",
    "Licenciatura en Microfinanzas",
    "Licenciatura en Negocios y Microfinanzas",
    "Licenciatura en Turismo y Desarrollo Sustentable",
    "Maestría en Administración",
    "Maestria en Ciencias Empresariales y Administración Pública",
    "Maestría en Desarrollo de Proyectos Productivos Sustentables",
    "Maestría en Educación Comunal",
    "Maestría en Educación en el Campo de la Formación Docente",
    "Maestría en Educación en el Campo de la Orientación Educativa",
    "Maestría en Educación en el Campo de la Planeación y Administración de la Educación",
    "Maestría en Educación en el Campo de las Matemáticas",
    "Maestría en Fiscal",
    "Maestría en Proyectos Productivos Sustentables",
    "Maestría en Sistema Penal Acusatorio Adversarial (en línea)",
    "Maestría en Sociología",
    "Doctorado en Ciencias de la Administración",
    "Doctorado en Ciencias de la Educación",
    "Doctorado en Ciencias Empresariales y Administración Pública",
    "",
    "CIENCIAS BIOLÓGICAS, QUÍMICAS Y DE LA SALUD",
    "Especialidad en Endodoncia",
    "Especialidad en Odontopediatría",
    "Especialidad en Ortodoncia",
    "Especialidad de Enfermería en Urgencias (Huajuapan)",
    "Licenciatura en Biología",
    "Licenciatura en Ecología",
    "Licenciatura en Cirujano Dentista",
    "Licenciatura en Enfermeria (Oaxaca)",
    "Licenciatura en Enfermería (Tehuantepec)",
    "Licenciatura en Enfermería (Huajuapan)",
    "Licenciatura en Médico Cirujano",
    "Licenciatura en Médico Veterinario Zootecnista",
    "Licenciatura en Psicología",
    "Licenciatura en Químico Farmacéutico Biólogo",
    "Licenciatura en Terapia Física",
    "Licenciatura en Terapia Ocupacional",
    "Programa Complementario de la Licenciatura en Enfermería Modalidad (semiescolarizado) Tehuantepec",
    "Maestría en Biociencias",
    "Maestría en Biomedicina Experimental",
    "Maestría en Cuidados Paliativos",
    "Maestría en Endodoncia",
    "Maestría en Odontopediatría",
    "Maestría en Ortodoncia",
    "Maestría en Periodoncia",
    "Maestría en Rehabilitación Bucal",
    "Maestría en Producción Animal",
    "Doctorado en Biociencias",
    "Doctorado en Biomedicina Experimental",
    "",
    "CIENCIAS FÍSICO - MATEMÁTICAS Y DE LA INGENIERÍAS",
    "Licenciatura en Arquitectura - 5 de Mayo",
    "Licenciatura en Arquitectura - C.U.",
    "Licenciatura en Computación",
    "Licenciatura en Física",
    "Licenciatura en Ingeniería en Innovación Tecnológica",
    "Licenciatura en Matemáticas",
    "Maestría en Arquitectura",
    "Maestría en Urbanismo",
    "Doctorado en Ordenamiento Territorial y Dimensiones Científicas de la Protección del Patrimonio",
    "Maestría en Ingeniería",
    "Otra",
  ],
};

const iglesias =
[
  "Asamblea Apostólica de la Fe en Cristo Jesús",
  "Avanzando hacia la Meta, Iglesia Cristiana Estrella del Belén",
  "Barra De Copalita (Iglesia Pentecostal)",
  "Bethel, tu Casa de Oración",
  "CAP Campus Reforma",
  "Campamento de Dios",
  "Casa de Oración Oaxaca",
  "Casa de Salvación y Sanación",
  "Centro Cristiano Agua Viva",
  "Centro Cristiano de Advenimiento Shekinah",
  "Centro Cristiano Filadelfia",
  "Centro Cristiano La Roca",
  "Centro Cristiano Oaxaca",
  "Centro Cristiano Peniel",
  "Centro Cristiano Roca de Fe",
  "Centro de Fe Cristiano Eben-Ezer Asambleas de Dios",
  "Centro de Restauración Familiar Cristo es el Camino",
  "Centro Familiar Cristiano Ágape",
  "Centro Familiar Cristiano Luz A Las Naciones",
  "Centro Familiar Cristiano Nueva Vida Asambleas de Dios",
  "City Church Oaxaca",
  "Comunidad Cristiana Dios con Nosotros",
  "Comunidad Cristiana Olor Frangante (CCOF)",
  "Comunidad Oaxaca",
  "Comunidad Vida AD",
  "Confraternidad Más que Vencedores · Monte Sion",
  "Convivencia Cristiana de Oaxaca",
  "Desarrollo Familiar de Moctezuma",
  "Desarrollo Familiar de Oaxaca (DFO)",
  "Ebenezer (Iglesia bautista)",
  "El Calvario - El precio de tu libertad",
  "El Shaddai Iglesia Bautista",
  "Fraternidad Cristiana",
  "Gracia sobre Gracia Iglesia Cristiana",
  "ICEP Oaxaca",
  "Iglesia Apostólica de la Fe en Cristo Jesús en Oaxaca",
  "Iglesia Apostólica Nueva Generación A.R.",
  "Iglesia Bautista \"Alfa Y Omega\"",
  "Iglesia Bautista \"Dios Con Nosotros\"",
  "Iglesia Bautista Getsemaní",
  "Iglesia Bautista Misionera de Oaxaca",
  "Iglesia Cristiana \"Vino Nuevo para las Naciones\"",
  "Iglesia Cristiana \"YIREH\"",
  "Iglesia Cristiana Aposento Alto",
  "Iglesia Cristiana Bautista La Resurrección de Jesucristo",
  "Iglesia Cristiana Bautista Verdad y Vida",
  "Iglesia Cristiana Bíblica Evangélica",
  "Iglesia Cristiana Casa Adulam",
  "Iglesia Cristiana Casa de Dios",
  "Iglesia Cristiana EL LEON DE LA TRIBU DE JUDA (RIMI Oaxaca)",
  "Iglesia Cristiana Evangélica",
  "Iglesia Cristiana Evangélica Espiritual",
  "Iglesia Cristiana Evangélica Príncipe de Paz",
  "Iglesia Cristiana Independiente Pentecostés A.R. Resurrección y Vida",
  "Iglesia Cristiana Interdenominacional",
  "Iglesia Cristiana Interdenominacional (Armenta y López)",
  "Iglesia Cristiana Interdenominacional A.R. (Príncipe de Paz II)",
  "Iglesia Cristiana Interdenominacional A.R. Templo \"Betania\"",
  "Iglesia Cristiana Misión de Jesús",
  "Iglesia Cristiana Monte Horeb",
  "Iglesia Cristiana Monte Sion",
  "Iglesia Cristiana Monte Sion - Santa María Atzompa",
  "Iglesia Cristiana Pentecostes Jesús es el Camino",
  "Iglesia Cristiana Pentecostés Monte Horeb",
  "Iglesia Cristiana Rama Fructífera de Fe",
  "Iglesia Cristiana Semillero del Reyno",
  "Iglesia Cristiana Shekinah",
  "Iglesia Cristiana Torre “Una Familia de familias”",
  "Iglesia Compañerismo Cristiano",
  "Iglesia de Cristo (Romanos 16:16)",
  "Iglesia de Dios (Israelita) La Fundición",
  "Iglesia de Dios Ministerial de Jesucristo Internacional",
  "Iglesia de Dios Peña de Horeb",
  "Iglesia del Compañerismo Cristiano",
  "Iglesia del Cuerpo de Cristo",
  "Iglesia del Dios Vivo \"El Buen Pastor\"",
  "Iglesia EBEN-EZER pentecostes",
  "Iglesia Evangélica Nacional Más que Vencedores",
  "Iglesia Evangélica Palabra de Vida Asambleas de Dios",
  "Iglesia Fraternidad Cristiana",
  "Iglesia Fraternidad Cristiana (Santa María Atzompa)",
  "Iglesia Llevando Vida A Las Naciones",
  "Iglesia Monte Sinaí",
  "Iglesia Nacional Presbiteriana de Mexico \"Amor Y Proclamación\"",
  "Iglesia Nacional Presbiteriana de México A.R. Antioquia",
  "Iglesia Pentecostés Ararat",
  "Iglesia Presbiteriana Ortodoxa “La Perla de Gran Precio”",
  "Iglesia Reestructurada del Espíritu Santo",
  "Iglesia Universal del Reino de Dios",
  "Iglesia Vida Abundante",
  "Instituto Bíblico Oaxaca A Las Naciones",
  "La Vid Oaxaca Iglesia Cristiana",
  "Ministerios de Fe \"Vino Nuevo\"",
  "Misión Victoria Oaxaca MVO",
  "Monte Sión",
  "Primera Iglesia Bautista de Oaxaca"
]


export default function RegistroPage() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const universidad = watch("universidad");
  const carrera = watch("carrera");
  const asiste = watch("asisteIglesia");
  const iglesia = watch("iglesia");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    console.log("DATA:", data);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md space-y-8">

        {/* TITULO */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold leading-tight">
            Registro al Grupo  
          </h1>
          <h1 className="text-3xl font-bold">Evangelístico</h1>
          <h2 className="text-3xl font-extrabold text-blue-500">
            Amor Verdadero
          </h2>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 backdrop-blur-xl p-6 rounded-2xl"
        >
          {/* --- NOMBRE / APELLIDO --- */}
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("nombre")}
              placeholder="Nombre *"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                         backdrop-blur-md text-white placeholder:text-zinc-300
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <input
              {...register("apellido")}
              placeholder="Apellido *"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                         backdrop-blur-md text-white placeholder:text-zinc-300
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* --- EMAIL --- */}
          <input
            {...register("email")}
            placeholder="Correo *"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                       backdrop-blur-md text-white placeholder:text-zinc-300
                       focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* --- TELÉFONO --- */}
          <div className="space-y-1">
            <Controller
  name="telefono"
  control={control}
  render={({ field }) => (
    <PhoneInput
      {...field}
      country="mx"
      enableSearch
      containerClass="!w-full"
      buttonClass="!bg-transparent !border-none"
      inputClass="!w-full !h-12 !rounded-xl !bg-white/10 !border !border-white/20 
                  !backdrop-blur-md !text-white !placeholder:text-zinc-300
                  !focus:ring-2 !focus:ring-blue-500 !focus:outline-none
                  !pl-14"   // <-- espacio para bandera + código
      inputStyle={{
        paddingLeft: "56px", // <-- fallback perfecto
      }}
    />
  )}
/>
            <p className="text-sm text-zinc-400">
              Usa un número válido para recibir información vía WhatsApp.
            </p>
          </div>

          {/* --- UNIVERSIDAD --- */}
          <select
            {...register("universidad")}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                       backdrop-blur-md text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Universidad *</option>
            {universidades.map((u) => (
              <option key={u} value={u} className="text-black">
                {u}
              </option>
            ))}
          </select>

          {universidad === "Otra" && (
            <input
              {...register("universidadOtra")}
              placeholder="Especifica universidad"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                         backdrop-blur-md text-white placeholder:text-zinc-300"
            />
          )}

          {/* --- CARRERA --- */}
          {universidad && (
            <select
              {...register("carrera")}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                         backdrop-blur-md text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Carrera *</option>
              {(carreras[universidad as keyof typeof carreras] || []).map((c, i) => (
                <option
                  key={`${i}-${c}`}
                  value={c}
                  className="text-black"
                  disabled={c === ""}
                >
                  {c === "" ? "—" : c}
                </option>
              ))}
            </select>
          )}

          {carrera === "Otra" && (
            <input
              {...register("carreraOtra")}
              placeholder="Especifica carrera"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                         backdrop-blur-md text-white placeholder:text-zinc-300"
            />
          )}

          {/* NUEVO EN EL EVANGELIO */}
          <select
            {...register("nuevoEvangelio")}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                       backdrop-blur-md text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">¿Eres nuevo en el evangelio? *</option>
            <option value="Sí" className="text-black">Sí</option>
            <option value="No" className="text-black">No</option>
          </select>

          {/* ASISTE A IGLESIA */}
          <select
            {...register("asisteIglesia")}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                       backdrop-blur-md text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">¿Asistes a una iglesia? *</option>
            <option value="si" className="text-black">Sí</option>
            <option value="no" className="text-black">No</option>
          </select>

          {/* IGLESIA */}
          {asiste === "si" && (
            <div className="space-y-2">
              <select
                {...register("iglesia")}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                           backdrop-blur-md text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona iglesia *</option>
                {iglesias.map((i) => (
                  <option key={i} value={i} className="text-black">
                    {i}
                  </option>
                ))}
              </select>

              {iglesia === "Otra" && (
                <input
                  {...register("otraIglesia")}
                  placeholder="Especifica iglesia"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 
                             backdrop-blur-md text-white placeholder:text-zinc-300"
                />
              )}
            </div>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
                       transition text-white font-semibold"
          >
            {loading ? "Enviando…" : "Registrarse"}
          </button>
        </form>

      </div>
    </div>
  );
}
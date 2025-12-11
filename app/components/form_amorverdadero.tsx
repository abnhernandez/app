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
  universidadotra: z.string().optional(),

  carrera: z.string().min(1),
  carreraotra: z.string().optional(),

  nuevoenelevangelio: z.string().min(1),
  asisteiglesia: z.string().min(1),

  iglesia: z.string().optional(),
  otraiglesia: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// raw source lists (may contain duplicates/empty headers)
const universidades = [
  "TecNM Campus Oaxaca (ITO)",
  "UABJO",
  "Otra",
];

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

const iglesias = [
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
  "Centro Cristiano Kairós Oaxaca - El tiempo perfecto de Dios",
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
  "Primera Iglesia Bautista de Oaxaca",
  "Otra",
];

// dedupe helpers
const unique = (arr: string[]) => Array.from(new Set(arr)).filter(Boolean);

export default function RegistroPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, control, watch, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const universidad = watch("universidad");
  const carrera = watch("carrera");
  const asiste = watch("asisteiglesia");
  const iglesia = watch("iglesia");

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("SUPABASE:", result);

      if (res.ok) {
        reset(); // limpia el formulario
        setSuccessMessage("¡Registro exitoso! Revisa tu correo para configurar tu cuenta.");
      } else {
        alert(result.error?.message || "Ocurrió un error al registrarte");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al enviar el registro.");
    } finally {
      setLoading(false);
    }
  };

  // Guard against SSR by checking for window
  const searchParams =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const success = searchParams ? searchParams.get("success") : null;

  const universidadesUnicas = unique(universidades);
  const iglesiasUnicas = unique(iglesias).sort((a, b) => a.localeCompare(b, "es"));
  const carreraOptions = universidad
    ? unique((carreras[universidad as keyof typeof carreras] || []).filter((v) => {
        // filter out section headers that are all caps or too short; keep real options + "Otra"
        return Boolean(v) && v !== "" && v.trim().toLowerCase() !== v.trim().toUpperCase();
      })).concat(
        // ensure "Otra" stays available if present in original list
        (carreras[universidad as keyof typeof carreras] || []).includes("Otra") ? ["Otra"] : []
      )
    : [];

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-8">
        {/* TITULO */}
        <div className="rounded-2xl text-black dark:text-white font-bold text-center text-lg md:text-xl select-none">
          Amor Verdadero · Registro
        </div>
        {/* SUCCESS ALERT */}
        {success === "1" && (
          <div className="p-4 mb-4 rounded bg-green-200 text-green-900">
            Registro exitoso. Revisa tu correo para el enlace de ingreso a la Comunidad.
          </div>
        )}

        {successMessage && (
          <div className="p-4 mb-4 rounded bg-green-200 text-green-900">
            {successMessage}
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 backdrop-blur-xl p-6 rounded-2xl bg-white/60 dark:bg-black/40"
        >
          {/* --- NOMBRE / APELLIDO --- */}
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("nombre")}
              placeholder="Nombre *"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />

            <input
              {...register("apellido")}
              placeholder="Apellido *"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          {/* --- EMAIL --- */}
          <input
            {...register("email")}
            placeholder="Correo *"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />

          {/* --- TELÉFONO --- */}
          <div className="space-y-1">
            <Controller
              name="telefono"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country="mx"
                  enableSearch
                  containerClass="!w-full"
                  buttonClass="!bg-transparent !border-none"
                  inputClass="!w-full !h-12 !rounded-xl !bg-white dark:!bg-white/10 !border !border-zinc-200 dark:!border-white/20 !text-black dark:!text-white !placeholder:text-zinc-500 dark:!placeholder:text-zinc-300 !focus:ring-2 !focus:ring-emerald-400 !focus:outline-none !pl-14"
                  inputStyle={{ paddingLeft: "56px" }}
                  value={field.value || ""}
                  onChange={(val: string) => field.onChange(val)}
                />
              )}
            />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Usa un número válido para recibir información por WhatsApp. Debes unirte a nuestra comunidad con ese mismo número.
            </p>
          </div>

          {/* --- UNIVERSIDAD (única, sin duplicados) --- */}
          <div className="relative">
            <select
              {...register("universidad")}
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-200 dark:border-white/20 text-black dark:text-white focus:ring-2 focus:ring-emerald-400 appearance-none"
            >
              <option value="" disabled className="text-zinc-500 dark:text-zinc-400">
                Universidad *
              </option>
              {universidadesUnicas.map((u) => (
                <option key={u} value={u} className="text-black">
                  {u}
                </option>
              ))}
            </select>

            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>

          {universidad === "Otra" && (
            <input
              {...register("universidadotra")}
              placeholder="Especifica universidad"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          )}

          {/* --- CARRERA (se actualiza según universidad, sin duplicados ni headers vacíos) --- */}
          {universidad && (
            <div className="relative">
              <select
                {...register("carrera")}
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-200 dark:border-white/20 text-black dark:text-white focus:ring-2 focus:ring-emerald-400 appearance-none"
              >
                <option value="" disabled className="text-zinc-500 dark:text-zinc-400">
                  Carrera *
                </option>
                {carreraOptions.map((c, i) => (
                  <option key={`${i}-${c}`} value={c} className="text-black">
                    {c}
                  </option>
                ))}
              </select>

              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          )}

          {carrera === "Otra" && (
            <input
              {...register("carreraotra")}
              placeholder="Especifica carrera"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          )}

          {/* NUEVO EN EL EVANGELIO */}
          <div className="relative">
            <select
              {...register("nuevoenelevangelio")}
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-200 dark:border-white/20 text-black dark:text-white focus:ring-2 focus:ring-emerald-400 appearance-none"
            >
              <option value="" disabled className="text-zinc-500 dark:text-zinc-400">
                ¿Eres nuevo en el evangelio?
              </option>
              <option value="Sí" className="text-black">Sí</option>
              <option value="No" className="text-black">No</option>
            </select>

            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>

          {/* ASISTE A IGLESIA */}
          <div className="relative">
            <select
              {...register("asisteiglesia")}
              defaultValue=""
              className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-200 dark:border-white/20 text-black dark:text-white focus:ring-2 focus:ring-emerald-400 appearance-none"
            >
              <option value="" disabled className="text-zinc-500 dark:text-zinc-400">
                ¿Asistes a una iglesia? *
              </option>
              <option value="si" className="text-black">Sí</option>
              <option value="no" className="text-black">No</option>
            </select>

            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>

          {/* IGLESIA (solo si asiste, opciones deduplicadas) */}
          {asiste === "si" && (
            <div className="space-y-2">
              <select
                {...register("iglesia")}
                defaultValue=""
                className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/40 border border-zinc-200 dark:border-white/20 text-black dark:text-white focus:ring-2 focus:ring-emerald-400"
              >
                <option value="" disabled className="text-zinc-500 dark:text-zinc-400">
                  Selecciona iglesia *
                </option>
                {iglesiasUnicas.map((i) => (
                  <option key={i} value={i} className="text-black">
                    {i}
                  </option>
                ))}
              </select>

              {iglesia === "Otra" && (
                <input
                  {...register("otraiglesia")}
                  placeholder="Especifica iglesia"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-zinc-200 dark:border-white/20 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              )}
            </div>
          )}

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-black text-white hover:opacity-90 transition font-bold dark:bg-white dark:text-black dark:hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed select-none"
          >
            {loading ? "Enviando…" : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
}
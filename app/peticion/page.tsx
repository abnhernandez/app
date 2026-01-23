import Form from "@/app/components/form"

export const metadata = {
  title: "Monte Sion Oaxaca",
  description: "Estableciendo el Reino de Dios — Un lugar para ti en el Reino de Dios",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
      <div className="pt-6 pb-12">
        <Form />
      </div>
    </div>
  )
}
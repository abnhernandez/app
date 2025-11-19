import Form from "@/app/components/form_amorverdadero";

export const metadata = {
  title: "Monte Sion Oaxaca",
  description: "Estableciendo el Reino de Dios",
};

export default function Home({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const notified = searchParams?.notified === "1";

  return (
    <>
      <Form />
    </>
  );
}
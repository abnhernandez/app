import RegistroForm from "@/app/components/registro"
import AuthLayout from "@/app/components/AuthLayout"

export default function RegistroPage() {
    return (
        <AuthLayout
            title="Crear cuenta"
            subtitle="Empieza en segundos"
        >
            <RegistroForm />
        </AuthLayout>
    )
}
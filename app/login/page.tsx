import type { Metadata } from "next";
import AuthenticationUtilities from "@/app/components/authentication/AuthenticationUtilities";
import LoginForm from "@/app/components/authentication/LoginForm";

export const metadata: Metadata = {
    title: "Login | Photon Panel",
};

export default function LoginPage() {
    return (
        <main className="fixed inset-none overflow-hidden bg-[var(--authentication-background)] p-lg">
            <div className="relative flex h-full w-full items-center justify-center">
                <AuthenticationUtilities />
                <LoginForm />
            </div>
        </main>
    );
}

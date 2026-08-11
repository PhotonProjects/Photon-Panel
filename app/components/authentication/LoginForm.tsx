"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import PanelIcon from "@/app/components/ui/PanelIcon";

const LOGO_URL = "https://cdn.nicolas4tech.fr/logos/Logo.png";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <section
            aria-labelledby="login-title"
            className="flex h-[var(--authentication-card-height)] w-[var(--authentication-card-width)] max-w-full flex-col overflow-hidden rounded-[var(--radius-default)] bg-[var(--authentication-surface)] inset-ring inset-ring-[color:var(--authentication-surface-ring)]"
        >
            <header className="flex h-[var(--authentication-card-header-height)] shrink-0 items-center gap-md bg-[var(--authentication-elevated-surface)] px-lg">
                <Image src={LOGO_URL} alt="" width={18} height={18} priority />
                <h1 id="login-title" className="text-medium text-text-100">
                    Login
                </h1>
            </header>

            <div className="h-[var(--separator-height)] shrink-0 bg-[var(--authentication-surface-ring)]" />

            <form className="flex min-h-none flex-1 flex-col gap-lg p-lg" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-sm">
                    <label
                        htmlFor="login-email"
                        className="text-form-label flex items-center gap-sm text-[var(--authentication-label)]"
                    >
                        <PanelIcon icon="Mail" size="var(--icon-size-compact)" />
                        E-mail Address
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="text-medium h-[var(--interactive-size)] w-full rounded-[var(--radius-default)] bg-[var(--authentication-elevated-surface)] px-md text-text-100 inset-ring inset-ring-[color:var(--authentication-field-ring)]"
                    />
                </div>

                <div className="flex flex-col gap-sm">
                    <label
                        htmlFor="login-password"
                        className="text-form-label flex items-center gap-sm text-[var(--authentication-label)]"
                    >
                        <PanelIcon icon="Key" size="var(--icon-size-compact)" />
                        Password
                    </label>
                    <span className="flex gap-lg">
                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autoComplete="current-password"
                            className="text-medium h-[var(--interactive-size)] min-w-none flex-1 rounded-[var(--radius-default)] bg-[var(--authentication-elevated-surface)] px-md text-text-100 inset-ring inset-ring-[color:var(--authentication-field-ring)]"
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            aria-pressed={showPassword}
                            onClick={() => setShowPassword((isVisible) => !isVisible)}
                            className="grid size-[var(--interactive-size)] shrink-0 place-items-center rounded-[var(--radius-default)] bg-[var(--authentication-primary)] text-text-100 inset-ring inset-ring-[color:var(--authentication-primary-ring)] hover:bg-[var(--authentication-primary-hover)]"
                        >
                            <PanelIcon
                                icon={showPassword ? "EyeOff" : "Eye"}
                                size="var(--icon-size-compact)"
                            />
                        </button>
                    </span>
                </div>

                <div className="flex items-center gap-lg">
                    <button
                        type="submit"
                        className="text-medium flex h-[var(--interactive-size)] items-center gap-md rounded-[var(--radius-default)] bg-[var(--authentication-primary)] px-lg text-text-100 inset-ring inset-ring-[color:var(--authentication-primary-ring)] hover:bg-[var(--authentication-primary-hover)]"
                    >
                        <PanelIcon icon="LogIn" size="var(--icon-size-compact)" />
                        Login
                    </button>

                    <Link
                        href="/signup"
                        className="text-medium flex h-[var(--interactive-size)] items-center rounded-[var(--radius-default)] px-lg text-text-100 inset-ring inset-ring-[color:var(--authentication-control-ring)] hover:bg-[var(--authentication-elevated-surface)]"
                    >
                        Signup
                    </Link>

                    <Link
                        href="/forgot-password"
                        className="text-medium ml-auto flex h-[var(--interactive-size)] items-center gap-md text-text-100"
                    >
                        <PanelIcon icon="KeyOff" size="var(--icon-size-compact)" />
                        Forgot password
                    </Link>
                </div>
            </form>
        </section>
    );
}

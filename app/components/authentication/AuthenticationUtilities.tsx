import Image from "next/image";
import PanelIcon from "@/app/components/ui/PanelIcon";
import ThemeSelector from "@/app/components/interactions/ThemeSelector";

const LOGO_URL = "https://cdn.nicolas4tech.fr/logos/Logo.png";

export default function AuthenticationUtilities() {
    return (
        <>
            <div className="absolute top-none left-none grid size-[var(--authentication-brand-panel-size)] place-items-center rounded-[var(--radius-default)] bg-[var(--authentication-surface)] inset-ring inset-ring-[color:var(--authentication-surface-ring)]">
                <div className="grid size-[var(--interactive-size)] place-items-center rounded-[var(--radius-default)] bg-[var(--authentication-elevated-surface)]">
                    <Image src={LOGO_URL} alt="Photon Panel" width={18} height={18} priority />
                </div>
            </div>

            <div className="absolute top-none right-none flex h-[var(--authentication-brand-panel-size)] w-[var(--authentication-utility-panel-width)] items-center justify-center gap-lg rounded-[var(--radius-default)] bg-[var(--authentication-surface)] inset-ring inset-ring-[color:var(--authentication-surface-ring)]">
                <ThemeSelector />

                <button
                    type="button"
                    aria-label="Open interface menu"
                    className="grid size-[var(--interactive-size)] place-items-center rounded-[var(--radius-default)] text-text-300 inset-ring inset-ring-[color:var(--authentication-control-ring)]"
                >
                    <PanelIcon icon="ThreeDotsVertical" size="var(--icon-size-compact)" />
                </button>
            </div>
        </>
    );
}

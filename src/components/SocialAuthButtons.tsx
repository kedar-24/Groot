import { signIn } from "next-auth/react";
import Button from "./button";
import Image from "next/image";

const socials = [
  {
    src: "/images/google-logo.svg",
    alt: "Google",
    label: "Google",
    provider: "google",
  },
  // Add Facebook/Apple only if configured
  {
    src: "/images/apple-logo.svg",
    alt: "Apple",
    label: "Apple",
    provider: "apple",
  },
];

export default function SocialAuthButtons({
  disabled,
}: {
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-center items-center gap-4">
      {socials.map((s) => (
        <Button
          key={s.alt}
          variant="imglogo"
          type="button"
          aria-label={`Continue with ${s.label}`}
          onClick={() => signIn(s.provider, { callbackUrl: "/" })}
          disabled={disabled}
        >
          <Image
            src={s.src}
            alt={s.alt}
            width={24}
            height={24}
            aria-hidden="true"
          />
        </Button>
      ))}
    </div>
  );
}

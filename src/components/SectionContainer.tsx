const UI = {
  colors: {
    background: "var(--color-background)",
    primary: "var(--color-primary)",
    primaryLight: "var(--color-primary-light)",
    primaryLightest: "var(--color-primary-lightest)",
    secondary: "var(--color-secondary)",
    secondaryLight: "var(--color-secondary-light)",
    black: "var(--color-black)",
    whiteText: "text-white",
    fadedWhite: "text-[var(--color-secondary-light)]/90",
    buttonText: "!text-black",
  },
  fonts: {
    heading: "font-extrabold font-serif",
    body: "font-montserrat",
  },
  layout: {
    cardWidth: "max-w-[650px] mx-auto",
    sectionPadding: "py-32 px-4 sm:px-8 lg:px-16",
    border: "border border-white/20",
    navSafe: "px-4 sm:px-8 lg:px-0",
  },
};

const SectionContainer = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`max-w-7xl mx-auto ${UI.layout.navSafe} ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default SectionContainer;

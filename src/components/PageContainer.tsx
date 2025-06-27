import React from "react";

/**
 * A reusable container that wraps page content.
 * It adds the correct top padding to clear the fixed navbar on all screen sizes.
 */
const PageContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    // This <main> tag provides the base layout for all pages.
    // pt-14 (56px) for mobile navbar (h-14)
    // sm:pt-24 (96px) for desktop navbar (sm:h-24)
    <main className={`flex-1 flex flex-col pt-14 sm:pt-24 ${className}`}>
      {children}
    </main>
  );
};

export default PageContainer;

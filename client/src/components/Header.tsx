import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#team", label: "Our Team" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrolled = useScroll(100);

  // Close mobile menu when clicking on a nav link
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Close mobile menu when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <header
      id="header"
      className={cn(
        "fixed w-full z-50 bg-white shadow-md transition-all duration-300",
        scrolled ? "py-2" : "py-3",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-bold text-xl md:text-2xl">
            <span className="text-primary">Futura Infotech </span>
            <span className="text-primary">Events</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "bg-white w-full md:hidden transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-[400px]" : "max-h-0",
        )}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-primary py-2 font-medium transition-colors duration-200"
              onClick={handleNavLinkClick}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

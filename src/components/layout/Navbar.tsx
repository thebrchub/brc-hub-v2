
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Services", to: "services" },
    { name: "Pricing", to: "/pricing" },
    { name: "Work", to: "work" },
    { name: "Contact", to: "contact" },
  ];

  // Hide the navbar while scrolling down; reveal it while scrolling up.
  useEffect(() => {
    let previousScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > previousScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < previousScrollY) {
        setIsVisible(true);
      }

      previousScrollY = currentScrollY;

    };

    window.addEventListener("scroll", controlNavbar, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  // Prevent background scrolling while the mobile drawer is open.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Navigate to a homepage section from another route.
  const handleNavClick = (targetId: string) => {
    setOpen(false);

    if (!isHomePage) {
      navigate("/", { state: { scrollTo: targetId } });
    }
  };

  const handleLogoClick = () => {
    setOpen(false);

    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: "hero" } });
    }
  };

  const linkClasses =
    "relative block cursor-pointer px-5 py-2 text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-white";

  const HoverPill = ({ index }: { index: number }) => (
    <>
      {hoveredIndex === index && (
        <motion.span
          layoutId="hover-pill"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 -z-10 rounded-full bg-white/10"
        />
      )}
    </>
  );

  return (
    <>
      {/* MAIN NAVBAR */}
      <header
        className={`fixed left-0 top-0 z-50 w-full overflow-visible py-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* LOGO */}
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="BRC Hub home"
            className="relative z-50 flex flex-shrink-0 cursor-pointer items-center gap-2 text-left"
          >
            <img
              src="/logo.svg"
              alt="BRC Hub"
              className="h-10 w-auto object-contain sm:h-12"
            />

            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="block font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              BRC <span className="text-brc-orange">Hub</span>
            </motion.span>
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 top-1/2 z-40 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-lg shadow-black/20 ring-1 ring-white/5 backdrop-blur-xl md:flex"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((item, index) => {
              // Pricing is a real page, not a homepage scroll section.
              if (item.to === "/pricing") {
                return (
                  <Link
                    key={item.name}
                    to="/pricing"
                    onMouseEnter={() => setHoveredIndex(index)}
                    aria-current={
                      location.pathname === "/pricing" ? "page" : undefined
                    }
                    className={`${linkClasses} ${
                      location.pathname === "/pricing"
                        ? "font-semibold text-white"
                        : ""
                    }`}
                  >
                    {item.name}
                    <HoverPill index={index} />
                  </Link>
                );
              }

              // On the homepage, use smooth section scrolling.
              if (isHomePage) {
                return (
                  <ScrollLink
                    key={item.name}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={800}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={linkClasses}
                    activeClass="!text-white font-semibold"
                  >
                    {item.name}
                    <HoverPill index={index} />
                  </ScrollLink>
                );
              }

              // On other routes, return to the requested homepage section.
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleNavClick(item.to)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`${linkClasses} text-left`}
                >
                  {item.name}
                  <HoverPill index={index} />
                </button>
              );
            })}
          </nav>

          {/* DESKTOP CTA + MOBILE MENU BUTTON */}
          <div className="z-50 flex flex-shrink-0 items-center gap-4">
            <div className="hidden md:block">
              {isHomePage ? (
                <ScrollLink to="contact" smooth={true} duration={800} offset={-50}>
                  <button
                    type="button"
                    className="group relative overflow-hidden rounded-full bg-brc-orange px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:shadow-orange-500/20 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2 transition-all group-hover:gap-3">
                      Start Project
                      <ChevronRight size={14} />
                    </span>
                  </button>
                </ScrollLink>
              ) : (
                <button
                  type="button"
                  onClick={() => handleNavClick("contact")}
                  className="group relative overflow-hidden rounded-full bg-brc-orange px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:shadow-orange-500/20 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2 transition-all group-hover:gap-3">
                    Start Project
                    <ChevronRight size={14} />
                  </span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20 md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] touch-none bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-[85%] max-w-sm flex-col border-l border-white/10 bg-[#0A0A0A] shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-6">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
                  Menu
                </span>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="rounded-full p-2 text-white transition hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Links */}
              <nav
                aria-label="Mobile navigation"
                className="flex flex-grow flex-col gap-2 overflow-y-auto overscroll-contain px-6 py-8"
              >
                {navLinks.map((item, index) => {
                  // Pricing navigates to its own route.
                  if (item.to === "/pricing") {
                    return (
                      <Link
                        key={item.name}
                        to="/pricing"
                        onClick={() => setOpen(false)}
                        aria-current={
                          location.pathname === "/pricing" ? "page" : undefined
                        }
                        className={`group flex items-center justify-between rounded-xl border p-4 transition-all ${
                          location.pathname === "/pricing"
                            ? "border-brc-orange/30 bg-brc-orange/10 text-white"
                            : "border-transparent text-gray-300 hover:border-white/5 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="text-lg font-medium">
                          {item.name}
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-gray-600 transition-colors group-hover:text-brc-orange"
                        />
                      </Link>
                    );
                  }

                  // Homepage section links.
                  if (isHomePage) {
                    return (
                      <ScrollLink
                        key={item.name}
                        to={item.to}
                        smooth={true}
                        offset={-50}
                        duration={800}
                        onClick={() => setOpen(false)}
                      >
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group flex cursor-pointer items-center justify-between rounded-xl border border-transparent p-4 text-gray-300 transition-all hover:border-white/5 hover:bg-white/5 hover:text-white"
                        >
                          <span className="text-lg font-medium">
                            {item.name}
                          </span>
                          <ChevronRight
                            size={16}
                            className="text-gray-600 transition-colors group-hover:text-brc-orange"
                          />
                        </motion.div>
                      </ScrollLink>
                    );
                  }

                  // Other routes return to the homepage section.
                  return (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() => handleNavClick(item.to)}
                      className="group flex w-full items-center justify-between rounded-xl border border-transparent p-4 text-left text-gray-300 transition-all hover:border-white/5 hover:bg-white/5 hover:text-white"
                    >
                      <span className="text-lg font-medium">
                        {item.name}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-gray-600 transition-colors group-hover:text-brc-orange"
                      />
                    </button>
                  );
                })}
              </nav>

              {/* Drawer CTA */}
              <div className="border-t border-white/10 bg-white/[0.02] p-6">
                {isHomePage ? (
                  <ScrollLink
                    to="contact"
                    smooth={true}
                    duration={800}
                    offset={-50}
                    onClick={() => setOpen(false)}
                  >
                    <button
                      type="button"
                      className="group w-full rounded-xl bg-brc-orange px-6 py-4 text-base font-bold text-white shadow-lg transition-transform active:scale-95"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Start Project
                        <ChevronRight size={18} />
                      </span>
                    </button>
                  </ScrollLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavClick("contact")}
                    className="group w-full rounded-xl bg-brc-orange px-6 py-4 text-base font-bold text-white shadow-lg transition-transform active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Start Project
                      <ChevronRight size={18} />
                    </span>
                  </button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

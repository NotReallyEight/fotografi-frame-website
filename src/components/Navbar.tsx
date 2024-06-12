import Logo from "./Logo";
import NavbarSections from "./NavbarSections";

const Navbar = () => (
  <div className="fixed top-0 z-30 flex h-[10%] min-w-full flex-row items-center justify-between">
    <Logo />
    <NavbarSections />
  </div>
);

export default Navbar;

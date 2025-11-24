import NavItem from "./NavItem/NavItem";
import "./SideNav.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";


const NavItems = [
  { id: 1, label: "Dashboard", link: "/", icon: "home" },
  { id: 2, label: "Drafts", link: "/drafts", icon: "box-closed" },
  {id: 3, label: "Available blocks", link: "/settings", icon: "wrench"}

];

function SideNav() {
  const [selectedNavItem, setSelectedNavItem] = useState<string>(NavItems[0].label);
  const location = useLocation();
  useEffect(() => {
    const pathSegment = location.pathname.split("/")[1];
    if (pathSegment === selectedNavItem) return;

    NavItems.forEach((item) => {
      if (item.link === pathSegment) {
        setSelectedNavItem(item.label);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const [isOpen, setIsOpen] = useState<boolean>(true);


  return (
    <nav className={`side-nav ${isOpen ? "" : "closed"}`} aria-label="Main navigation">
      <div className="nav-header">
        <span aria-label="BASS Application">TemplateX</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="close-nav-icon"
          tabIndex={0}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <ul className="nav-items">
        {NavItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            setSelectedNavItem={setSelectedNavItem}
            selectedNavItem={selectedNavItem}
          />
        ))}
      </ul>
    </nav>
  );
}

export default SideNav;

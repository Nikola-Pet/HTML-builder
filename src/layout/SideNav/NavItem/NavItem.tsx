import "./NavItem.scss";
import { Link } from "react-router-dom";
import { NavItem as NavItemType } from "./NavItem.types.tsx";

interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: NavItemType;
  setSelectedNavItem: (name: string) => void;
  selectedNavItem?: string;
}

function NavItem({
  item,
  setSelectedNavItem,
  selectedNavItem = "",
}: NavItemProps) {
  const { label, icon, link } = item;

  const onItemClick = () => {
    setSelectedNavItem(item.label);
  };

  const navItemClass = `nav-item ${selectedNavItem === item.label ? "selected" : ""}`;

  return (
    <li>
      <Link
        className={navItemClass}
        onClick={onItemClick}
        to={link || "#"}
        aria-label={label}
        aria-current={selectedNavItem === item.label ? "page" : undefined}
      >
        <i className={`icon boschicon-bosch-ic-${icon}`}></i>
        <span className="nav-label">{label}</span>
      </Link>
    </li>
  );
}

export default NavItem;

import "./NavItem.scss";
import { Link } from "react-router-dom";
import { NavItem as NavItemType } from "./NavItem.types.tsx";
import { 
  Home, 
  Package, 
  FileText, 
  Users, 
  Compass, 
  User, 
  Wrench,
  type LucideIcon
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  home: Home,
  "box-closed": Package,
  document: FileText,
  people: Users,
  compass: Compass,
  user: User,
  wrench: Wrench,
};

const Icon = ({ iconName, className, ...props }: { iconName: string; className?: string; "aria-hidden"?: boolean }) => {
  const IconComponent = iconMap[iconName] || Home;
  return <IconComponent size={20} className={className} {...props} />;
};


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
        <Icon iconName={icon} aria-hidden={true} />
        <span className="nav-label">{label}</span>
      </Link>
    </li>
  );
}

export default NavItem;

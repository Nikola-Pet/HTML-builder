import "./Header.scss";
import boschLogoSvg from "../../assets/Bosch_Logo.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import SearchField from "../SearchFiled/SearhField";
import { HelpCircle } from "lucide-react";
import { BreadcrumbsContext } from "@/contexts/breadcrumbsContext";
export interface HeaderProps {
  firstName?: string;
}

function Header() {
  const { breadcrumbs } = useContext(BreadcrumbsContext);
  return (
    <header>
      <div className="header-title">
        {breadcrumbs[breadcrumbs?.length - 1]?.label || "Dashboard"}
      </div>
      <span className="header-content">
        <Link to="/" aria-label="Bosch logo" className="bosch-logo-container">
          <img src={boschLogoSvg} alt="Bosch logo" />
        </Link>
      </span>
    </header>
  );
}

export default Header;

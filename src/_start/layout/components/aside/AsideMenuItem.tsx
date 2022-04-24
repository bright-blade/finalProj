import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { checkIsActive } from "../../../helpers";

type Props = {
  to: string;
  title: string;
  hasBullet?: boolean;
};

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  hasBullet = false,
}) => {
  const { pathname } = useLocation();
  return (
    <div
      className={clsx("menu-item", {
        here: checkIsActive(pathname, to),
      })}
    >
      <Link className="menu-link py-2" to={to}>
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}
        <span className="menu-title">{title}</span>
      </Link>
      {children}
    </div>
  );
};

export { AsideMenuItem };

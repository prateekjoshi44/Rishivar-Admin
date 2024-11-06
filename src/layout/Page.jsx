import { Link, useLocation } from "react-router-dom";
// import { sidebarLinks } from "./Sidebar";
import { useEffect, useState } from "react";
import { sidebarLinks } from "./Sidebar";

const Page = ({ children }) => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");
  const revOptions = sidebarLinks.reverse();
  console.log(sidebarLinks)
  let options = pathname.split("/");
  if (options.length === 2 && options[1] === "") options = [options[0]];
  options = options.map((o) => (o === "" ? "Dashboard" : o));

  useEffect(() => {
    const subject = pathname.split("/")[1]
    setTitle(subject || "Dashboard")
  }, [pathname]);

  return (
    <div className="p-3 p-lg-5  flex-grow-1 overflow-y-auto">
      <h3>
        <span className="me-3">{revOptions.find((o) => o.text === title)?.icon()}</span>
        {title}
      </h3>

      <div className="mb-3 mb-lg-5">
        <nav aria-label="breadcrumb ">
          <ol className="breadcrumb ">
            {options.map((option, index) => {
              if (index === options.length - 1) {
                return (
                  <li
                    key={index}
                    className="breadcrumb-item active"
                    aria-current="page"
                  >
                    {option}
                  </li>
                );
              } else {
                return (
                  <li key={index} className="breadcrumb-item ">
                    <Link to={sidebarLinks.find((o) => o.text === option).to}>
                      {option}
                    </Link>
                  </li>
                );
              }
            })}
          </ol>
        </nav>
      </div>

      {children}
    </div>
  );
};

export default Page;
import React from "react";
import searchLogo from "../../../../assets/search-logo.svg";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useCollection } from "../../../../hooks/useCollection";
import "./Sidebar.css";

const Sidebar = () => {
  const { data: users } = useCollection("users", false);
  const { user } = useAuthContext();

  return (
    <div className="mt-3 w-full">
      <div className="w-full flex justify-between items-center">
        <h4 className="ml-4 text-[#dadce1] font-normal text-lg">Contacts</h4>
        <img src={searchLogo} alt="" className="mr-4 p-2 rounded-full cursor-pointer hover:bg-[#484a4d]" style={{ width: 16 }} />
      </div>
      <ul className="my-3 mx-2 flex flex-col gap-3">
        {users &&
          users.map(eachUser => {
            if (user.displayName !== eachUser.displayName) {
              return (
                <li key={Math.random()} className="py-1 px-2 text-[#dadce1] text-base rounded-lg relative flex items-center cursor-pointer hover:bg-[#525357]">
                  <span
                    className={`user-image-container ${
                      eachUser.online && "user-online"
                    }`}
                  >
                    {eachUser.photoURL && (
                      <img
                        src={eachUser.photoURL}
                        alt=""
                        className="w-9 rounded-full mr-2"
                      />
                    )}
                  </span>
                  <span>
                    {eachUser.displayName
                      .split(" ")
                      .map(word => word[0].toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                </li>
              );
            }
            return true;
          })}
      </ul>
    </div>
  );
};

export default Sidebar;

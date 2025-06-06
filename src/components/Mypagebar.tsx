import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

const MypageSidebar = () => {
  const router = useRouter();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  useEffect(() => {
    if (router.pathname === "/mypage/myleisure") {
      const { tab } = router.query;
      if (typeof tab === "string") {
        setSelectedTab(tab);
      }
    } else {
      setSelectedTab(null);
    }
  }, [router.pathname, router.query.tab]);

  const menuItems = [
    { name: "Profile", path: "/mypage/profile" },
    { name: "My Leisure", path: "/mypage/myleisure" },
    { name: "Review", path: "/mypage/myreview" },
    { name: "Delete Account", path: "/mypage/delete" }
  ];

  const leisureSubItems = [
    { name: "Wish List", tab: "Wish List" },
    { name: "Planned Leisure", tab: "Planned Leisure" },
    { name: "Completed Leisure", tab: "Completed Leisure" }
  ];

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowSubMenu(false);
    }, 100);
  };

  return (
    <div className="relative mt-[-10px] w-full flex flex-row justify-between items-center px-[35px] text-[16px] z-10">
      {menuItems.map((item) => {
        const isMyLeisure = item.name === "My Leisure";

        return (
          <div
            key={item.path}
            className="relative"
            onMouseEnter={isMyLeisure ? handleMouseEnter : undefined}
            onMouseLeave={isMyLeisure ? handleMouseLeave : undefined}
          >
            <Link href={item.path}>
              <button
                className={`flex flex-row text-[16px] px-4 transition-colors  
                  ${router.pathname === item.path ? "text-[#000000]" : "text-[#9A9A9A]"} hover:text-black
                `}
              >
                <span>{item.name}</span>
              </button>
            </Link>

            {isMyLeisure && (
              <div
                className={`absolute left-0 top-[25px] transition-all duration-300 bg-white
      ${showSubMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}
    `}
                style={{ zIndex: 0 }}
              >
                <div className="flex flex-col px-2 ">
                  {leisureSubItems.map((sub) => (
                    <button
                      key={sub.tab}
                      className={`text-left px-2 text-[12.5px] whitespace-nowrap w-fit
                        ${selectedTab === sub.tab
                          ? "text-black"
                          : "text-[#9A9A9A] hover:text-black"
                        }
                      `}
                      onClick={() => {
                        router.push({
                          pathname: "/mypage/myleisure",
                          query: { tab: sub.tab }
                        });
                      }}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MypageSidebar;

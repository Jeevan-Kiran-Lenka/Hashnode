import Link from "next/link";
import { useContext, type FC } from "react";
import { Logo, Magic } from "~/svgs";
import { asideItems } from "~/utils/constants";
import { C, type ContextValue } from "~/utils/context";

const HamburgerMenu: FC<{
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ menu, setMenu }) => {
  const { user } = useContext(C) as ContextValue;
  return (
    <>
      <div
        onClick={() => setMenu(false)}
        className={`fixed inset-0 z-20 bg-gray-400 bg-opacity-40 ${
          menu ? "block" : "hidden"
        }`}
      />
      <section
        className={`hamburger_menu ${
          menu ? "active" : "inactive"
        } fixed left-0 top-0 z-50 h-screen w-full max-w-[16rem] overflow-auto`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <header className="flex items-center justify-between border-b border-border border-border-light bg-light-bg p-6 py-4 shadow-md dark:border-border dark:bg-primary">
            <Link href="/">
              <Logo className="h-6 fill-secondary" />
            </Link>
          </header>
          <section className="flex flex-1 flex-col bg-light-bg shadow-md dark:bg-primary">
            <div className="flex flex-1 flex-col py-4">
              <ul className="mb-4 border-b border-border-light pb-4 dark:border-border">
                {asideItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href}>
                      <div className="px-6 py-2 text-base font-semibold tracking-wide text-gray-700 dark:text-text-secondary">
                        {item.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex-1">
                <Link href="/">
                  <div className="flex items-center gap-2 px-6 py-2 text-base tracking-wide text-gray-700 dark:text-text-secondary">
                    <Magic className="h-5 w-5 fill-secondary" />
                    <span>Rix</span>
                    <button className="400 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-secondary dark:bg-border">
                      Upcomming
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            {!user?.user && (
              <div className="mt-16 flex flex-wrap justify-center gap-2 px-4">
                <button className="btn-filled w-full">Sign In</button>
                <button className="btn-outline w-full">Sign Up</button>
              </div>
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default HamburgerMenu;

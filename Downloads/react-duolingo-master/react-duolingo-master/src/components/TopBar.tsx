import dayjs from "dayjs";
import Link from "next/link";
import type { ComponentProps } from "react";
import React, { useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { Calendar } from "./Calendar";
import { FireSvg, MoreOptionsSvg } from "./Svgs";
import { BookIconSvg, SettingsIconSvg } from "./IalingoSvgs";

const EmptyFireTopBarSvg = (props: ComponentProps<"svg">) => {
  return (
    <svg width="25" height="30" viewBox="0 0 25 30" fill="none" {...props}>
      <g opacity="0.2">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.9697 2.91035C13.2187 1.96348 11.7813 1.96348 11.0303 2.91035L7.26148 7.66176L4.83362 6.36218C4.61346 6.24433 4.1221 6.09629 3.88966 6.05712C2.72329 5.86056 2.04098 6.78497 2.04447 8.03807L2.06814 16.5554C2.02313 16.9355 2 17.322 2 17.7137C2 23.2979 6.70101 27.8248 12.5 27.8248C18.299 27.8248 23 23.2979 23 17.7137C23 15.3518 22.1591 13.1791 20.7498 11.4581L13.9697 2.91035ZM11.7198 13.1888C12.0889 12.6861 12.8399 12.6861 13.209 13.1888L15.7324 16.6249C16.5171 17.4048 17 18.4679 17 19.6396C17 22.0329 14.9853 23.973 12.5 23.973C10.0147 23.973 8 22.0329 8 19.6396C8 18.6017 8.37893 17.649 9.01085 16.9029C9.0252 16.8668 9.04457 16.8315 9.06935 16.7978L11.7198 13.1888Z"
          fill="black"
        />
      </g>
    </svg>
  );
};

type MenuState = "HIDDEN" | "MODULES" | "STREAK" | "MORE";

export const TopBar = ({
  backgroundColor = "bg-primary",
  borderColor = "border-primary-dark",
}: {
  backgroundColor?: `bg-${string}`;
  borderColor?: `border-${string}`;
}) => {
  const [menu, setMenu] = useState<MenuState>("HIDDEN");
  const [now, setNow] = useState(dayjs());
  const streak = useBoundStore((x) => x.streak);
  const progress = useBoundStore((x) => x.progress);

  return (
    <header className="fixed z-20 h-[58px] w-full">
      <div
        className={`relative flex h-full w-full items-center justify-between border-b-2 px-[10px] transition duration-500 sm:hidden ${borderColor} ${backgroundColor}`}
      >
        <button
          onClick={() =>
            setMenu((x) => (x === "MODULES" ? "HIDDEN" : "MODULES"))
          }
          className="flex items-center gap-2 font-bold text-white"
        >
          <BookIconSvg className="h-6 w-6" />
          <span>Módulos</span>
        </button>

        <button
          className="flex items-center gap-2 font-bold text-white"
          onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
          aria-label="Toggle streak menu"
        >
          {streak > 0 ? <FireSvg /> : <EmptyFireTopBarSvg />}{" "}
          <span className={streak > 0 ? "text-white" : "text-black opacity-20"}>
            {streak}
          </span>
        </button>

        <MoreOptionsSvg
          onClick={() => setMenu((x) => (x === "MORE" ? "HIDDEN" : "MORE"))}
          role="button"
          tabIndex={0}
          aria-label="Toggle more menu"
        />

        <div
          className={[
            "absolute left-0 right-0 top-full bg-white transition duration-300",
            menu === "HIDDEN" ? "opacity-0" : "opacity-100",
          ].join(" ")}
          aria-hidden={menu === "HIDDEN"}
        >
          {((): null | JSX.Element => {
            switch (menu) {
              case "MODULES":
                return (
                  <div className="flex flex-col gap-3 p-5">
                    <h2 className="text-xl font-bold text-primary">Módulos</h2>
                    <div className="flex flex-col gap-2">
                      <Link
                        className="flex items-center gap-2 p-2 font-bold text-gray-700 hover:bg-gray-100"
                        href="/fundamentos"
                      >
                        <BookIconSvg className="h-6 w-6" />
                        Fundamentos
                      </Link>
                      <Link
                        className="flex items-center gap-2 p-2 font-bold text-gray-700 hover:bg-gray-100"
                        href="/limitacoes"
                      >
                        <BookIconSvg className="h-6 w-6" />
                        Limitações
                      </Link>
                      <Link
                        className="flex items-center gap-2 p-2 font-bold text-gray-700 hover:bg-gray-100"
                        href="/principios"
                      >
                        <BookIconSvg className="h-6 w-6" />
                        Princípios
                      </Link>
                      <Link
                        className="flex items-center gap-2 p-2 font-bold text-gray-700 hover:bg-gray-100"
                        href="/usos"
                      >
                        <BookIconSvg className="h-6 w-6" />
                        Usos
                      </Link>
                    </div>
                  </div>
                );

              case "STREAK":
                return (
                  <div className="flex grow flex-col items-center gap-3 p-5">
                    <h2 className="text-xl font-bold text-primary">Progresso</h2>
                    <p className="text-sm text-gray-400">
                      Mantenha seu ritmo de aprendizado!
                    </p>
                    <div className="self-stretch">
                      <Calendar now={now} setNow={setNow} />
                    </div>
                  </div>
                );

              case "MORE":
                return (
                  <div className="flex grow flex-col">
                    <Link
                      className="flex items-center gap-2 p-2 font-bold text-gray-700 hover:bg-gray-100"
                      href="/perfil"
                    >
                      <SettingsIconSvg className="h-6 w-6" />
                      Perfil
                    </Link>
                    <Link
                      className="flex items-center gap-2 border-t-2 border-gray-300 p-2 font-bold text-gray-700 hover:bg-gray-100"
                      href="/configuracoes"
                    >
                      <SettingsIconSvg className="h-6 w-6" />
                      Configurações
                    </Link>
                  </div>
                );

              case "HIDDEN":
                return null;
            }
          })()}
          <div
            className={[
              "absolute left-0 top-full h-screen w-screen bg-black opacity-30",
              menu === "HIDDEN" ? "pointer-events-none" : "",
            ].join(" ")}
            onClick={() => setMenu("HIDDEN")}
            aria-label="Hide menu"
            role="button"
          ></div>
        </div>
      </div>
    </header>
  );
};

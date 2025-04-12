import { type NextPage } from "next";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  ActiveBookSvg,
  LockedBookSvg,
  CheckmarkSvg,
  LockedDumbbellSvg,
  FastForwardSvg,
  GoldenBookSvg,
  GoldenDumbbellSvg,
  GoldenTreasureSvg,
  GoldenTrophySvg,
  GuidebookSvg,
  LessonCompletionSvg0,
  LessonCompletionSvg1,
  LessonCompletionSvg2,
  LessonCompletionSvg3,
  LockSvg,
  StarSvg,
  LockedTreasureSvg,
  LockedTrophySvg,
  UpArrowSvg,
  ActiveTreasureSvg,
  ActiveTrophySvg,
  ActiveDumbbellSvg,
  PracticeExerciseSvg,
} from "~/components/Svgs";
import { TopBar } from "~/components/TopBar";
import { BottomBar } from "~/components/BottomBar";
import { RightBar } from "~/components/RightBar";
import { LeftBar } from "~/components/LeftBar";
import { useRouter } from "next/router";
import { LoginScreen, useLoginScreen } from "~/components/LoginScreen";
import { useBoundStore } from "~/hooks/useBoundStore";
import type { Tile, TileType, Unit } from "~/utils/units";
import { units } from "~/utils/units";
import { ialingoModulesData } from "~/data/ialingoModules";
import { TopicStatus } from "~/types/ialingo";
import { useProgressStore } from "~/stores/progressStore";
import { ProgressDisplay } from "~/components/ProgressDisplay";

type TileStatus = "LOCKED" | "ACTIVE" | "COMPLETE";

const tileStatus = (tile: Tile, lessonsCompleted: number): TileStatus => {
  const lessonsPerTile = 4;
  const tilesCompleted = Math.floor(lessonsCompleted / lessonsPerTile);
  const tiles = units.flatMap((unit) => unit.tiles);
  const tileIndex = tiles.findIndex((t) => t === tile);

  if (tileIndex < tilesCompleted) {
    return "COMPLETE";
  }
  if (tileIndex > tilesCompleted) {
    return "LOCKED";
  }
  return "ACTIVE";
};

const TileIcon = ({
  tileType,
  status,
}: {
  tileType: TileType;
  status: TileStatus;
}): JSX.Element => {
  switch (tileType) {
    case "star":
      return status === "COMPLETE" ? (
        <CheckmarkSvg />
      ) : status === "ACTIVE" ? (
        <StarSvg />
      ) : (
        <LockSvg />
      );
    case "book":
      return status === "COMPLETE" ? (
        <GoldenBookSvg />
      ) : status === "ACTIVE" ? (
        <ActiveBookSvg />
      ) : (
        <LockedBookSvg />
      );
    case "dumbbell":
      return status === "COMPLETE" ? (
        <GoldenDumbbellSvg />
      ) : status === "ACTIVE" ? (
        <ActiveDumbbellSvg />
      ) : (
        <LockedDumbbellSvg />
      );
    case "fast-forward":
      return status === "COMPLETE" ? (
        <CheckmarkSvg />
      ) : status === "ACTIVE" ? (
        <StarSvg />
      ) : (
        <FastForwardSvg />
      );
    case "treasure":
      return status === "COMPLETE" ? (
        <GoldenTreasureSvg />
      ) : status === "ACTIVE" ? (
        <ActiveTreasureSvg />
      ) : (
        <LockedTreasureSvg />
      );
    case "trophy":
      return status === "COMPLETE" ? (
        <GoldenTrophySvg />
      ) : status === "ACTIVE" ? (
        <ActiveTrophySvg />
      ) : (
        <LockedTrophySvg />
      );
  }
};

const tileLeftClassNames = [
  "left-0",
  "left-[-45px]",
  "left-[-70px]",
  "left-[-45px]",
  "left-0",
  "left-[45px]",
  "left-[70px]",
  "left-[45px]",
] as const;

type TileLeftClassName = (typeof tileLeftClassNames)[number];

const getTileLeftClassName = ({
  index,
  unitNumber,
  tilesLength,
}: {
  index: number;
  unitNumber: number;
  tilesLength: number;
}): TileLeftClassName => {
  if (index >= tilesLength - 1) {
    return "left-0";
  }

  const classNames =
    unitNumber % 2 === 1
      ? tileLeftClassNames
      : [...tileLeftClassNames.slice(4), ...tileLeftClassNames.slice(0, 4)];

  return classNames[index % classNames.length] ?? "left-0";
};

const tileTooltipLeftOffsets = [140, 95, 70, 95, 140, 185, 210, 185] as const;

type TileTooltipLeftOffset = (typeof tileTooltipLeftOffsets)[number];

const getTileTooltipLeftOffset = ({
  index,
  unitNumber,
  tilesLength,
}: {
  index: number;
  unitNumber: number;
  tilesLength: number;
}): TileTooltipLeftOffset => {
  if (index >= tilesLength - 1) {
    return tileTooltipLeftOffsets[0];
  }

  const offsets =
    unitNumber % 2 === 1
      ? tileTooltipLeftOffsets
      : [
          ...tileTooltipLeftOffsets.slice(4),
          ...tileTooltipLeftOffsets.slice(0, 4),
        ];

  return offsets[index % offsets.length] ?? tileTooltipLeftOffsets[0];
};

const getTileColors = ({
  tileType,
  status,
  defaultColors,
}: {
  tileType: TileType;
  status: TileStatus;
  defaultColors: `border-${string} bg-${string}`;
}): `border-${string} bg-${string}` => {
  switch (status) {
    case "LOCKED":
      if (tileType === "fast-forward") return defaultColors;
      return "border-[#b7b7b7] bg-[#e5e5e5]";
    case "COMPLETE":
      return "border-yellow-500 bg-yellow-400";
    case "ACTIVE":
      return defaultColors;
  }
};

const TileTooltip = ({
  selectedTile,
  index,
  unitNumber,
  tilesLength,
  description,
  status,
  closeTooltip,
}: {
  selectedTile: number | null;
  index: number;
  unitNumber: number;
  tilesLength: number;
  description: string;
  status: TileStatus;
  closeTooltip: () => void;
}) => {
  const tileTooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containsTileTooltip = (event: MouseEvent) => {
      if (selectedTile !== index) return;
      const clickIsInsideTooltip = tileTooltipRef.current?.contains(
        event.target as Node,
      );
      if (clickIsInsideTooltip) return;
      closeTooltip();
    };

    window.addEventListener("click", containsTileTooltip, true);
    return () => window.removeEventListener("click", containsTileTooltip, true);
  }, [selectedTile, tileTooltipRef, closeTooltip, index]);

  const unit = units.find((unit) => unit.unitNumber === unitNumber);
  const activeBackgroundColor = unit?.backgroundColor ?? "bg-green-500";
  const activeTextColor = unit?.textColor ?? "text-green-500";

  return (
    <div
      className={[
        "relative h-0 w-full",
        index === selectedTile ? "" : "invisible",
      ].join(" ")}
      ref={tileTooltipRef}
    >
      <div
        className={[
          "absolute z-30 flex w-[300px] flex-col gap-4 rounded-xl p-4 font-bold transition-all duration-300",
          status === "ACTIVE"
            ? activeBackgroundColor
            : status === "LOCKED"
              ? "border-2 border-gray-200 bg-gray-100"
              : "bg-yellow-400",
          index === selectedTile ? "top-4 scale-100" : "-top-14 scale-0",
        ].join(" ")}
        style={{ left: "calc(50% - 150px)" }}
      >
        <div
          className={[
            "absolute left-[140px] top-[-8px] h-4 w-4 rotate-45",
            status === "ACTIVE"
              ? activeBackgroundColor
              : status === "LOCKED"
                ? "border-l-2 border-t-2 border-gray-200 bg-gray-100"
                : "bg-yellow-400",
          ].join(" ")}
          style={{
            left: getTileTooltipLeftOffset({ index, unitNumber, tilesLength }),
          }}
        ></div>
        <div
          className={[
            "text-lg",
            status === "ACTIVE"
              ? "text-white"
              : status === "LOCKED"
                ? "text-gray-400"
                : "text-yellow-600",
          ].join(" ")}
        >
          {description}
        </div>
        {status === "ACTIVE" ? (
          <Link
            href="/lesson"
            className={[
              "flex w-full items-center justify-center rounded-xl border-b-4 border-gray-200 bg-white p-3 uppercase",
              activeTextColor,
            ].join(" ")}
          >
            Start +10 XP
          </Link>
        ) : status === "LOCKED" ? (
          <button
            className="w-full rounded-xl bg-gray-200 p-3 uppercase text-gray-400"
            disabled
          >
            Locked
          </button>
        ) : (
          <Link
            href="/lesson"
            className="flex w-full items-center justify-center rounded-xl border-b-4 border-yellow-200 bg-white p-3 uppercase text-yellow-400"
          >
            Practice +5 XP
          </Link>
        )}
      </div>
    </div>
  );
};

const UnitSection = ({ unit }: { unit: Unit }): JSX.Element => {
  const router = useRouter();

  const [selectedTile, setSelectedTile] = useState<null | number>(null);

  useEffect(() => {
    const unselectTile = () => setSelectedTile(null);
    window.addEventListener("scroll", unselectTile);
    return () => window.removeEventListener("scroll", unselectTile);
  }, []);

  const closeTooltip = useCallback(() => setSelectedTile(null), []);

  const lessonsCompleted = useBoundStore((x) => x.lessonsCompleted);
  const increaseLessonsCompleted = useBoundStore(
    (x) => x.increaseLessonsCompleted,
  );
  const increaseLingots = useBoundStore((x) => x.increaseLingots);

  return (
    <>
      <UnitHeader
        unitNumber={unit.unitNumber}
        description={unit.description}
        backgroundColor={unit.backgroundColor}
        borderColor={unit.borderColor}
      />
      <div className="relative mb-8 mt-[67px] flex max-w-2xl flex-col items-center gap-4">
        {unit.tiles.map((tile, i): JSX.Element => {
          const status = tileStatus(tile, lessonsCompleted);
          return (
            <Fragment key={i}>
              {(() => {
                switch (tile.type) {
                  case "star":
                  case "book":
                  case "dumbbell":
                  case "trophy":
                  case "fast-forward":
                    if (tile.type === "trophy" && status === "COMPLETE") {
                      return (
                        <div className="relative">
                          <TileIcon tileType={tile.type} status={status} />
                          <div className="absolute left-0 right-0 top-6 flex justify-center text-lg font-bold text-yellow-700">
                            {unit.unitNumber}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div
                        className={[
                          "relative -mb-4 h-[93px] w-[98px]",
                          getTileLeftClassName({
                            index: i,
                            unitNumber: unit.unitNumber,
                            tilesLength: unit.tiles.length,
                          }),
                        ].join(" ")}
                      >
                        {tile.type === "fast-forward" && status === "LOCKED" ? (
                          <HoverLabel
                            text="Jump here?"
                            textColor={unit.textColor}
                          />
                        ) : selectedTile !== i && status === "ACTIVE" ? (
                          <HoverLabel text="Start" textColor={unit.textColor} />
                        ) : null}
                        <LessonCompletionSvg
                          lessonsCompleted={lessonsCompleted}
                          status={status}
                        />
                        <button
                          className={[
                            "absolute m-3 rounded-full border-b-8 p-4",
                            getTileColors({
                              tileType: tile.type,
                              status,
                              defaultColors: `${unit.borderColor} ${unit.backgroundColor}`,
                            }),
                          ].join(" ")}
                          onClick={() => {
                            if (
                              tile.type === "fast-forward" &&
                              status === "LOCKED"
                            ) {
                              void router.push(
                                `/lesson?fast-forward=${unit.unitNumber}`,
                              );
                              return;
                            }
                            setSelectedTile(i);
                          }}
                        >
                          <TileIcon tileType={tile.type} status={status} />
                          <span className="sr-only">Show lesson</span>
                        </button>
                      </div>
                    );
                  case "treasure":
                    return (
                      <div
                        className={[
                          "relative -mb-4",
                          getTileLeftClassName({
                            index: i,
                            unitNumber: unit.unitNumber,
                            tilesLength: unit.tiles.length,
                          }),
                        ].join(" ")}
                        onClick={() => {
                          if (status === "ACTIVE") {
                            increaseLessonsCompleted(4);
                            increaseLingots(1);
                          }
                        }}
                        role="button"
                        tabIndex={status === "ACTIVE" ? 0 : undefined}
                        aria-hidden={status !== "ACTIVE"}
                        aria-label={status === "ACTIVE" ? "Collect reward" : ""}
                      >
                        {status === "ACTIVE" && (
                          <HoverLabel text="Open" textColor="text-yellow-400" />
                        )}
                        <TileIcon tileType={tile.type} status={status} />
                      </div>
                    );
                }
              })()}
              <TileTooltip
                selectedTile={selectedTile}
                index={i}
                unitNumber={unit.unitNumber}
                tilesLength={unit.tiles.length}
                description={(() => {
                  switch (tile.type) {
                    case "book":
                    case "dumbbell":
                    case "star":
                      return tile.description;
                    case "fast-forward":
                      return status === "LOCKED"
                        ? "Jump here?"
                        : tile.description;
                    case "trophy":
                      return `Unit ${unit.unitNumber} review`;
                    case "treasure":
                      return "";
                  }
                })()}
                status={status}
                closeTooltip={closeTooltip}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

const getTopBarColors = (
  scrollY: number,
): {
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
} => {
  const defaultColors = {
    backgroundColor: "bg-[#58cc02]",
    borderColor: "border-[#46a302]",
  } as const;

  if (scrollY < 680) {
    return defaultColors;
  } else if (scrollY < 1830) {
    return units[1] ?? defaultColors;
  } else {
    return units[2] ?? defaultColors;
  }
};

const getTopicStatus = (topicId: string, completedTopicIds: string[]): TopicStatus => {
  if (completedTopicIds.includes(topicId)) {
    return TopicStatus.COMPLETE;
  }
  
  // Lógica simplificada: um tópico está ativo se for o primeiro ou se o anterior estiver completo
  const allTopics = ialingoModulesData.flatMap(module => module.topics);
  const topicIndex = allTopics.findIndex(topic => topic.id === topicId);
  
  if (topicIndex === 0) {
    return TopicStatus.ACTIVE;
  }
  
  const previousTopic = allTopics[topicIndex - 1];
  if (completedTopicIds.includes(previousTopic.id)) {
    return TopicStatus.ACTIVE;
  }
  
  return TopicStatus.LOCKED;
};

const ModuleSection = ({ module }: { module: IModule }): JSX.Element => {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<null | number>(null);
  const completedTopicIds = useBoundStore((x) => x.completedTopicIds);

  useEffect(() => {
    const unselectTopic = () => setSelectedTopic(null);
    window.addEventListener("scroll", unselectTopic);
    return () => window.removeEventListener("scroll", unselectTopic);
  }, []);

  const closeTooltip = useCallback(() => setSelectedTopic(null), []);

  return (
    <>
      <ModuleHeader
        title={module.title}
        description={module.description}
      />
      <div className="relative mb-8 mt-[67px] flex max-w-2xl flex-col items-center gap-4">
        {module.topics.map((topic, i): JSX.Element => {
          const status = getTopicStatus(topic.id, completedTopicIds);
          return (
            <Fragment key={i}>
              <div
                className={[
                  "relative -mb-4 h-[93px] w-[98px]",
                  getTopicLeftClassName({
                    index: i,
                    moduleId: module.id,
                    topicsLength: module.topics.length,
                  }),
                ].join(" ")}
              >
                {selectedTopic !== i && status === TopicStatus.ACTIVE ? (
                  <HoverLabel text="Iniciar" />
                ) : null}
                <button
                  className={[
                    "absolute m-3 rounded-full border-b-8 p-4",
                    getTopicColors(status),
                  ].join(" ")}
                  onClick={() => {
                    if (status === TopicStatus.ACTIVE) {
                      void router.push(`/lesson/${module.id}/${topic.id}`);
                    }
                  }}
                >
                  <TopicIcon topicType={topic.topicType} status={status} />
                  <span className="sr-only">Mostrar tópico</span>
                </button>
              </div>
              <TopicTooltip
                selectedTopic={selectedTopic}
                index={i}
                title={topic.title}
                description={topic.description}
                status={status}
                closeTooltip={closeTooltip}
              />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

const getTopicLeftClassName = ({
  index,
  moduleId,
  topicsLength,
}: {
  index: number;
  moduleId: string;
  topicsLength: number;
}): string => {
  if (index >= topicsLength - 1) {
    return "left-0";
  }

  const classNames = [
    "left-0",
    "left-8",
    "left-16",
    "left-24",
    "left-32",
    "left-40",
    "left-48",
    "left-56",
  ];

  return classNames[index % classNames.length] ?? "left-0";
};

const getTopicColors = (status: TopicStatus): string => {
  switch (status) {
    case TopicStatus.LOCKED:
      return "border-gray-200 bg-gray-100";
    case TopicStatus.ACTIVE:
      return "border-blue-600 bg-blue-500";
    case TopicStatus.COMPLETE:
      return "border-green-600 bg-green-500";
  }
};

const ModuleHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <article className="max-w-2xl rounded-xl bg-blue-500 text-white">
      <header className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-lg">{description}</p>
        </div>
      </header>
    </article>
  );
};

const HoverLabel = ({ text }: { text: string }) => {
  return (
    <div className="absolute left-0 right-0 top-0 flex justify-center">
      <div className="rounded-full bg-gray-200 px-3 py-1 text-sm font-bold text-gray-700">
        {text}
      </div>
    </div>
  );
};

const TopicTooltip = ({
  selectedTopic,
  index,
  title,
  description,
  status,
  closeTooltip,
}: {
  selectedTopic: number | null;
  index: number;
  title: string;
  description: string;
  status: TopicStatus;
  closeTooltip: () => void;
}) => {
  if (selectedTopic !== index) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-0 flex justify-center">
      <div className="relative rounded-2xl bg-white p-4 shadow-lg">
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          onClick={closeTooltip}
        >
          <span className="sr-only">Fechar</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
        {status === TopicStatus.LOCKED && (
          <p className="mt-2 text-sm text-gray-500">
            Complete o tópico anterior para desbloquear
          </p>
        )}
      </div>
    </div>
  );
};

const TopicIcon = ({
  topicType,
  status,
}: {
  topicType: TopicType;
  status: TopicStatus;
}) => {
  const iconColor = status === TopicStatus.LOCKED ? "text-gray-400" : "text-white";
  
  switch (topicType) {
    case TopicType.INTRO_MODULE:
      return (
        <svg
          className={`h-6 w-6 ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      );
    case TopicType.CONCEPT_EXPLANATION:
      return (
        <svg
          className={`h-6 w-6 ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case TopicType.RISK_ANALYSIS:
      return (
        <svg
          className={`h-6 w-6 ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    case TopicType.BEST_PRACTICES:
      return (
        <svg
          className={`h-6 w-6 ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    case TopicType.CASE_STUDY:
      return (
        <svg
          className={`h-6 w-6 ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      );
  }
};

const Learn: NextPage = () => {
  const { loginScreenState, setLoginScreenState } = useLoginScreen();
  const router = useRouter();
  const { completedTopicIds } = useProgressStore();

  const getTopicStatus = (topicId: string): TopicStatus => {
    if (completedTopicIds.includes(topicId)) {
      return TopicStatus.COMPLETE;
    }

    // Lógica simplificada: um tópico está ativo se todos os tópicos anteriores estiverem completos
    const module = ialingoModulesData.find((m) =>
      m.topics.some((t) => t.id === topicId)
    );
    if (!module) return TopicStatus.LOCKED;

    const topicIndex = module.topics.findIndex((t) => t.id === topicId);
    if (topicIndex === 0) return TopicStatus.ACTIVE;

    const previousTopic = module.topics[topicIndex - 1];
    return completedTopicIds.includes(previousTopic.id) ? TopicStatus.ACTIVE : TopicStatus.LOCKED;
  };

  return (
    <>
      <TopBar />
      <LeftBar selectedTab="Learn" />

      <div className="container mx-auto max-w-4xl p-4">
        <ProgressDisplay />

        <div className="mt-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Módulos</h1>
          <div className="grid gap-6">
            {ialingoModulesData.map((module) => (
              <div key={module.id} className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  {module.title}
                </h2>
                <p className="mb-4 text-gray-600">{module.description}</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {module.topics.map((topic) => {
                    const status = getTopicStatus(topic.id);
                    return (
                      <button
                        key={topic.id}
                        className={[
                          "rounded-lg border-2 p-4 text-left transition",
                          status === TopicStatus.LOCKED
                            ? "border-gray-200 bg-gray-50 text-gray-400"
                            : status === TopicStatus.ACTIVE
                            ? "border-blue-200 bg-blue-50 text-gray-900 hover:border-blue-300"
                            : "border-green-200 bg-green-50 text-gray-900",
                        ].join(" ")}
                        onClick={() => {
                          if (status === TopicStatus.ACTIVE) {
                            void router.push(`/lesson/${module.id}/${topic.id}`);
                          }
                        }}
                      >
                        <h3 className="font-medium">{topic.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {topic.description}
                        </p>
                        {status === TopicStatus.COMPLETE && (
                          <div className="mt-2 text-sm text-green-600">
                            ✓ Concluído
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomBar selectedTab="Learn" />
      <LoginScreen
        loginScreenState={loginScreenState}
        setLoginScreenState={setLoginScreenState}
      />
    </>
  );
};

export default Learn;

const LessonCompletionSvg = ({
  lessonsCompleted,
  status,
  style = {},
}: {
  lessonsCompleted: number;
  status: TileStatus;
  style?: React.HTMLAttributes<SVGElement>["style"];
}) => {
  if (status !== "ACTIVE") {
    return null;
  }
  switch (lessonsCompleted % 4) {
    case 0:
      return <LessonCompletionSvg0 style={style} />;
    case 1:
      return <LessonCompletionSvg1 style={style} />;
    case 2:
      return <LessonCompletionSvg2 style={style} />;
    case 3:
      return <LessonCompletionSvg3 style={style} />;
    default:
      return null;
  }
};

const UnitHeader = ({
  unitNumber,
  description,
  backgroundColor,
  borderColor,
}: {
  unitNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  borderColor: `border-${string}`;
}) => {
  const language = useBoundStore((x) => x.language);
  return (
    <article
      className={["max-w-2xl text-white sm:rounded-xl", backgroundColor].join(
        " ",
      )}
    >
      <header className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Unit {unitNumber}</h2>
          <p className="text-lg">{description}</p>
        </div>
        <Link
          href={`https://duolingo.com/guidebook/${language.code}/${unitNumber}`}
          className={[
            "flex items-center gap-3 rounded-2xl border-2 border-b-4 p-3 transition hover:text-gray-100",
            borderColor,
          ].join(" ")}
        >
          <GuidebookSvg />
          <span className="sr-only font-bold uppercase lg:not-sr-only">
            Guidebook
          </span>
        </Link>
      </header>
    </article>
  );
};

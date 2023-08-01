"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { typeFilters } from "@/constants";

const Types = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const handleTags = (filter: string) => {
    router.push(`${pathName}?type=${filter}`);
  };

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {typeFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              type === filter
                ? "bg-light-purp font-medium text-dark-purp"
                : "font-normal text-light-purp"
            } px-4 py-3 border-light-purp border-2 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Types;

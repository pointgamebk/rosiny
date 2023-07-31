import { PressInterface, UserProfile } from "@/common.types";
import { getUserPresses } from "@/libs/actions";
import Image from "next/image";
import Link from "next/link";

type Props = {
  userId: string;
  pressId: string;
};
const RelatedPresses = async ({ userId, pressId }: Props) => {
  const result = (await getUserPresses(userId)) as {
    user?: UserProfile;
  };

  const filteredPresses = result?.user?.presses?.edges?.filter(
    ({ node }: { node: PressInterface }) => node?.id !== pressId
  );

  if (filteredPresses?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full text-white">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-white text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredPresses?.map(({ node }: { node: PressInterface }) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/press/${node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl border-white border"
                alt="press image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">
                  {node?.strain} - {node?.type}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedPresses;

import { PressInterface } from "@/common.types";
import Types from "@/components/Types";
import PressCard from "@/components/PressCard";
import { fetchPresses } from "@/libs/actions";
import LoadMore from "@/components/LoadMore";

type SearchParams = {
  type?: string;
  endcursor?: string;
};

type Props = {
  searchParams: SearchParams;
};

type PressSearch = {
  pressSearch: {
    edges: { node: PressInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { type, endcursor } }: Props) => {
  const data = (await fetchPresses(type, endcursor)) as PressSearch;

  const pressesToDisplay = data?.pressSearch?.edges || [];

  if (pressesToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col text-center">
        <Types />
        <p className="no-result-text text-center">
          No presses found. Go make some rosin.
        </p>
      </section>
    );
  }

  const pagination = data?.pressSearch?.pageInfo;

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Types />
      <section className="projects-grid">
        {pressesToDisplay.map(({ node }: { node: PressInterface }) => (
          <PressCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            type={node?.type}
            strain={node?.strain}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}
      />
    </section>
  );
};

export default Home;

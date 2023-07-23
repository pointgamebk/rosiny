import { PressInterface } from "@/common.types";
import PressCard from "@/components/PressCard";
import { fetchAllPresses } from "@/libs/actions";

type PressSearch = {
  pressCollection: {
    edges: { node: PressInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Home = async () => {
  const data = (await fetchAllPresses()) as PressSearch;

  const pressesToDisplay = data?.pressCollection?.edges || [];

  if (pressesToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col text-center">
        Categories
        <p className="no-result-text text-center">
          No presses found. Go make rosin.
        </p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
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
      <h1>Load More</h1>
    </section>
  );
};

export default Home;

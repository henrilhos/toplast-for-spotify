import { Grid } from "@toplast/generator";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";

import { CollageDisplay } from "../components";
import { LayoutMain } from "../layouts";

interface PageProps {
  image: string;
}

const Collage: NextPage<PageProps> = ({ image }) => {
  return (
    <LayoutMain>
      <CollageDisplay image={image} />
    </LayoutMain>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const items = JSON.parse(decodeURIComponent(context.query.items as string));

  const grid = new Grid(items, true);
  const image = await grid.generate();

  return { props: { image } };
};

export default Collage;

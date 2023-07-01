import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import { Comic } from "dh-marvel/features/card.type";
import { GridCard } from "dh-marvel/components/Cards/grid-card";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";

type Props = {
  comics: Comic[];
  total: number;
};

const Index: NextPage<Props> = ({ comics, total }) => {
  const [pageComic, setPageComic] = useState<Comic[]>(comics);
  const [page, setPage] = useState(1);
  const limit = 9;
  const [isLoading, setIsLoading] = useState(false);

  const getComicsApi = async () => {
    setIsLoading(true);
    const offset = limit * (page - 1);
    const params = new URLSearchParams();
    params.set("offset", `${offset}`);
    params.set("limit", `${9}`);

    await fetch("/api/comics?" + params.toString())
      .then((res) => res.json())
      .then((data) => {
        setPageComic(data.comics.results);
        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getComicsApi();
  }, [page]);

  return (
    <>
      <Head>
        <title>DH-Marvel</title>
        <meta name="Home" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title={"comics vintage"}>
        {isLoading ? (
          <Stack spacing={2} alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          <GridCard comics={pageComic} />
        )}

        <Stack spacing={2} alignItems="center">
          <Pagination
            size="small"
            count={Math.ceil(total / 9)}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </BodySingle>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await getComics(0, 12);
  return {
    props: {
      comics: response.data.results,
      total: response.data.total,
    },
  };
};

export default Index;

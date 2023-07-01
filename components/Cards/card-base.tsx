import { FC } from "react";
import Card from "@mui/material/Card";
import router from "next/router";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

type propsComic = {
  title: string;
  image: string;
  id: number;
};

export const CardComic: FC<propsComic> = ({ title, image, id }) => {
  const handleClick = () => {
    router.push({
      pathname: "/checkout",
    });
  };

  return (
    <Card sx={{ maxWidth: 380 }}>
      <Stack spacing={2} alignItems="center">
        <CardMedia
          component="img"
          sx={{ width: 210, objectFit: "contain" }}
          height="200"
          image={image}
          alt={title}
        />
      </Stack>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.primary">
          {title}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button sx={{ marginTop: 2, color: "white", backgroundColor: "red" }} variant="contained" size="medium" onClick={handleClick}>
          Comprar
        </Button>
        <Link href={`/comics/${id}`}>
          <Button sx={{ marginTop: 2, color: "white", backgroundColor: "silver" }} variant="contained" size="medium" onClick={handleClick}>
            Ver detalle
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

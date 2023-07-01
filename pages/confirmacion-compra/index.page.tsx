import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DetalleCompra } from "dh-marvel/components/Cards/detalle-compra";
import CardDatosComic from "dh-marvel/components/formCheckout/datos-card-comics";
import useOrder from "dh-marvel/components/formCheckout/use-order";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { NextPage } from "next";
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from "react";
'use client'

export async function getServerSideProps(context: any) {
  const { req } = context;
  const isAccessedThroughURL = !req.headers.referer;

  return {
    props: { isAccessedThroughURL },
  };
} 

const OrdenConfirmada: NextPage = ( {isAccessedThroughURL}: any ) => {
  
  const { state } = useOrder();
  const data = state.order;
  const router = useRouter()

    useEffect(() => {
    if (isAccessedThroughURL) {
      router.push("/");
    }
  }, [isAccessedThroughURL]);


  if (typeof window !== 'undefined') {
  let title = localStorage.getItem("title");
  let price = localStorage.getItem("price");
  let path = localStorage.getItem("pathImage");
  let extension = localStorage.getItem("extensionImage");
  let image = path + "." + extension;


        return (
          <>
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{ backgroundColor: "red", width: "100%", textAlign: "center" }}
        variant="h5"
        color="white"
      >
        Disfruta tu compra!
      </Typography>
      <Stack spacing={2} alignItems="center">
        <CardDatosComic
          title={String(title)}
          image={String(image)}
          price={Number(price)}
        />
      </Stack>
      <Stack spacing={2} alignItems="center">
        <DetalleCompra
          name={data.customer.name}
          lastname={data.customer.lastname}
          email={data.customer.email}
          address1={data.customer.address?.address1}
          city={data.customer.address?.city}
          state={data.customer.address?.state}
        />
      </Stack>
    </Box>
    </>
  );


}
else{
  return <> </>
}
};
(OrdenConfirmada as any).Layout = LayoutCheckout;
export default OrdenConfirmada;
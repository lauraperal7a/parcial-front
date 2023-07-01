import { Box, Stack } from "@mui/material";
import StepperForm from "dh-marvel/components/formCheckout/stepper-form";
import CardDatosComic from "dh-marvel/components/formCheckout/datos-card-comics";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { NextPage } from "next";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { useEffect } from "react";
import router from "next/router";
'use client'

const CheckoutPage: NextPage = () => {

  if (typeof window !== 'undefined') {
    let title = localStorage.getItem("title");
    let price = localStorage.getItem("price");
    let path = localStorage.getItem("pathImage");
    let extension = localStorage.getItem("extensionImage");
    let image = path + "." + extension;

    if (!title) {
      router.push("./");
    }

    if (!title) {
      return <></>;
    }

    return (
      <BodySingle title={`Checkout: ${title}`}>
        <Box sx={{ width: "100%", marginLeft: "170px", marginRight: "20px" }}>
          <Stack direction="row" spacing={8}>
            <StepperForm />
            <CardDatosComic
              title={String(title)}
              image={String(image)}
              price={Number(price)}
            />
          </Stack>
        </Box>
      </BodySingle>
    );
  } else {
    return <></>;
  }
};

(CheckoutPage as any).Layout = LayoutCheckout;

export default CheckoutPage;

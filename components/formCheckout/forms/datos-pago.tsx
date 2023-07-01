import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Snackbar, Stack } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../input-text";
import { DatosPagoForm, ValidationSchemaData } from "./datos-pago.types";
import StepperNavigation from "../stepper-navigation";
import useOrder from "../use-order";
import { validCard } from "dh-marvel/pages/api/checkout.route";
import router from "next/router";

export type DatosPagoProps = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

const DatosPago: FC<DatosPagoProps> = ({ activeStep, handleBack, handleNext }) => {
  const { dispatch, state } = useOrder();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  const methods = useForm<DatosPagoForm>({
    resolver: yupResolver(ValidationSchemaData),
    defaultValues: {
      nameOnCard: "Visa",
      number: validCard,
      expDate: "06/26",
      cvc: "123",
    },
  });

  const { setFocus, handleSubmit } = methods;

  const submitBack = () => {
    handleBack();
  };

  const postApiCheckout = async (post: any) => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    if (!data.error) {
      router.push({
        pathname: "/confirmacion-compra",
      });
    } else {
      setOpen(true);
      setMessage(data.message);
    }
  };

  const onSubmit = (data: DatosPagoForm) => {
    dispatch({
      type: "SET_CARD",
      payload: data,
    });
    postApiCheckout({ ...state.order, card: data });
  };

  useEffect(() => {
    setFocus("nameOnCard");
  }, []);

  return (
    <Stack>
      <form>
        <FormProvider {...methods}>
          <InputText label="Nombre Tarjeta" name="nameOnCard" type="text" />
          <InputText label="Numero de Tarjeta" name="number" type="text"/>
          <InputText label="exp MM/YY" name="expDate" type="text"/>
          <InputText label="CVV" name="cvc" type="password"/>
        </FormProvider>
      </form>

      <StepperNavigation
        activeStep={activeStep}
        handleBack={handleSubmit(submitBack)}
        onNextClick={handleSubmit(onSubmit)}
      />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default DatosPago;

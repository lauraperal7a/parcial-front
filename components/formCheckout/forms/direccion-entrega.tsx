import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import React, { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../input-text";
import {
  DireccionEntregaForm,
  ValidationSchemaAdressDirection,
} from "./direccion-entrega.types";
import StepperNavigation from "../stepper-navigation";
import useOrder from "../use-order";

export type DireccionEntregaProps = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

const DireccionEntrega: FC<DireccionEntregaProps> = ({
  activeStep,
  handleNext,
  handleBack,
}) => {
  const { dispatch } = useOrder();

  const methods = useForm<DireccionEntregaForm>({
    resolver: yupResolver(ValidationSchemaAdressDirection),
    defaultValues: {
        address1: "Calle 32 5b-11",
        address2: "apto 5 Senderos del llano",
        city: "Villavicencio",
        state: "Meta",
        zipCode: "50004",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: DireccionEntregaForm) => {
    dispatch({
      type: "SET_ADDRESS",
      payload: data,
    });

    handleNext();
  };

  const submitBack = () => {
    handleBack();
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <InputText label="Direccion" name="address1" type="text"/>
          <InputText label="Departamento, piso, etc." name="address2" type="text" />
          <InputText label="Ciudad" name="city" type="text"/>
          <InputText label="Provincia" name="state" type="text"/>
          <InputText label="Cod Postal" name="zipCode" type="text"/>
        </FormProvider>
      </form>

      <StepperNavigation
        activeStep={activeStep}
        onNextClick={handleSubmit(onSubmit)}
        handleBack={handleSubmit(submitBack)}
      />
    </Stack>
  );
};

export default DireccionEntrega;

"use client";

import { createSubscription } from "@/data/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  resetStatus,
  startSubmitting,
  subscribeError,
  subscribeSuccess,
} from "@/store/slices/subscriptionSlice";
import type { SubscriptionFormValues, ValidationErrors } from "@/types";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";

const SubscriptionForm: React.FC = () => {
  const t = useTranslations("footer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmails, setSubmittedEmails] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const knownEmails = useAppSelector(
    (s: any) => s.subscription?.knownEmails ?? []
  );

  const validateForm = (values: SubscriptionFormValues): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!values.email) {
      errors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = t("emailInvalid");
    }

    return errors;
  };

  const handleSubmit = async (
    values: SubscriptionFormValues,
    { resetForm, setSubmitting, setErrors }: any
  ) => {
    const errors = validateForm(values);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setSubmitting(false);
      return;
    }

    if (
      submittedEmails.includes(values.email.toLowerCase()) ||
      knownEmails.includes(values.email.toLowerCase())
    ) {
      toast.error(t("alreadySubscribed"));
      setSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    dispatch(startSubmitting(values.email));

    try {
      const response = await createSubscription(values.email);
      const status = (response as any)?.error ? 400 : 200;
      if (status === 200) {
        setSubmittedEmails((prev) => [...prev, values.email.toLowerCase()]);
        dispatch(subscribeSuccess());
        toast.success(t("subscriptionSuccess"));
        resetForm();
      } else {
        dispatch(subscribeError((response as any)?.error));
        toast.error(t("subscriptionError"));
      }
    } catch (error) {
      dispatch(subscribeError("network"));
      toast.error(t("subscriptionError"));
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
      dispatch(resetStatus());
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="relative">
            <div className="w-[223px] h-[41px] rounded-[6px] bg-white flex items-center pr-3.5">
              <Field
                as={Input}
                name="email"
                type="email"
                placeholder={t("email")}
                className="text-black text-base font-normal leading-[20px] text-left border-0 focus:ring-0 focus:outline-none bg-transparent"
              />
            </div>

            {errors.email && touched.email && (
              <div className="absolute -bottom-6 left-0 text-red-400 text-xs whitespace-nowrap">
                {errors.email}
              </div>
            )}

            <div className="absolute top-1/2 -translate-y-1/2 right-[5px]">
              <button
                type="submit"
                className={`w-[101px] h-[30px] rounded-[8px] text-white text-base font-normal leading-[26px] transition-colors bg-[#4B2615] hover:bg-[#3d1f11] cursor-pointer`}
              >
                {isSubmitting ? "..." : t("subscribe")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SubscriptionForm;

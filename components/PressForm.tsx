"use client";

import { PressInterface, SessionInterface } from "@/common.types";
import { typeFilters } from "@/constants";
import { createNewPress, fetchToken, updatePress } from "@/libs/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Button from "./Button";
import CustomMenu from "./CustomMenu";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
  press?: PressInterface;
};

const PressForm = ({ type, session, press }: Props) => {
  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "submit") {
        await createNewPress(form, session?.user?.id, token);

        router.push("/");
      }

      if (type === "edit") {
        await updatePress(form, press?.id as string, token);

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const handleIntStateChange = (fieldName: string, value: number) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    type: press?.type || "",
    strain: press?.strain || "",
    image: press?.image || "",
    notes: press?.notes || "",
    time: press?.time || "",
    temp: press?.temp || "",
    pressure: press?.pressure || "",
    preWeight: press?.pressure || 0,
    postWeight: press?.pressure || 0,
  });
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form ">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a photo of your press"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "submit"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Press poster"
            fill
          />
        )}
      </div>

      <CustomMenu
        title="Type"
        state={form.type}
        filters={typeFilters}
        setState={(value) => handleStateChange("type", value)}
      />

      <FormField
        title="Strain"
        state={form.strain}
        placeholder="What strain was the material you pressed?"
        setState={(value) => handleStateChange("strain", value)}
      />

      <FormField
        title="Temperature"
        state={form.temp}
        placeholder="What temperature did you use? (farenheit)?"
        setState={(value) => handleStateChange("temp", value)}
      />

      <FormField
        title="Pressure"
        state={form.pressure}
        placeholder="How much pressure did you use (psi)"
        setState={(value) => handleStateChange("pressure", value)}
      />

      <FormField
        title="Time"
        state={form.time}
        placeholder="How long did you press for (seconds)?"
        setState={(value) => handleStateChange("time", value)}
      />

      <FormField
        title="Starting weight"
        state={form.preWeight}
        placeholder="How much material did you press (in grams)?"
        setState={(value) => handleIntStateChange("preWeight", parseInt(value))}
      />

      <FormField
        title="Final weight"
        state={form.postWeight}
        placeholder="How much rosin did you collect (in grams)?"
        setState={(value) =>
          handleIntStateChange("postWeight", parseInt(value))
        }
      />

      <FormField
        title="Notes"
        state={form.notes}
        placeholder="Any notes to add?"
        setState={(value) => handleStateChange("notes", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "submit" ? "Submitting" : "Editing"}`
              : `${type === "submit" ? "Submit" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default PressForm;

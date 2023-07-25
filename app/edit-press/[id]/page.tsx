import { PressInterface } from "@/common.types";
import Modal from "@/components/Modal";
import PressForm from "@/components/PressForm";
import { getPressDetails } from "@/libs/actions";
import { getCurrentUser } from "@/libs/session";
import { redirect } from "next/navigation";
import React from "react";

const EditPress = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getPressDetails(id)) as {
    press?: PressInterface;
  };

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Press</h3>

      <PressForm type="edit" session={session} press={result?.press} />
    </Modal>
  );
};

export default EditPress;

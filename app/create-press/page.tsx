import Modal from "@/components/Modal";
import PressForm from "@/components/PressForm";
import { getCurrentUser } from "@/libs/session";
import { redirect } from "next/navigation";
import React from "react";

const CreatePress = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text text-white">Add a new press</h3>

      <PressForm type="submit" session={session} />
    </Modal>
  );
};

export default CreatePress;

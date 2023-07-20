import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/libs/session";
import { redirect } from "next/navigation";
import React from "react";

const CreatePress = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text">Start a new press</h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreatePress;

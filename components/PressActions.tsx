"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PressActions = ({ pressId }: { pressId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProject = async () => {};
  return (
    <>
      <Link
        href={`/edit-press/${pressId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button
        type="button"
        disabled={isDeleting}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        onClick={handleDeleteProject}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default PressActions;

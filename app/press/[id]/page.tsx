import Image from "next/image";
import Modal from "@/components/Modal";
import { PressInterface } from "@/common.types";
import { getPressDetails } from "@/libs/actions";
import { getCurrentUser } from "@/libs/session";
import RelatedPresses from "@/components/RelatedPresses";
import PressActions from "@/components/PressActions";
import Link from "next/link";

const Press = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getPressDetails(id)) as {
    press?: PressInterface;
  };

  if (!result?.press) {
    <p>Failed to fetch press information</p>;
  }

  const pressDetails = result?.press;

  const renderLink = () => `/profile/${pressDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={`${pressDetails?.createdBy?.avatarUrl}`}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {pressDetails?.strain} - {pressDetails?.type}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>{pressDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
            </div>
          </div>
        </div>

        {session?.user?.email === pressDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <PressActions pressId={pressDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${pressDetails?.image}`}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">{pressDetails?.notes}</p>
        <p className="max-w-5xl text-xl font-normal">
          Temp: {pressDetails?.temp}
        </p>
        <p className="max-w-5xl text-xl font-normal">
          Time: {pressDetails?.time} seconds
        </p>
        <p className="max-w-5xl text-xl font-normal">
          Pressure: {pressDetails?.pressure} psi
        </p>
      </section>

      <RelatedPresses
        userId={pressDetails?.createdBy?.id}
        pressId={pressDetails?.id}
      />
    </Modal>
  );
};

export default Press;

import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  image: string;
  type: string;
  name: string;
  strain: string;
  temp?: string;
  time?: string;
  pressure?: string;
  avatarUrl: string;
  userId: string;
};

const PressCard = ({
  id,
  image,
  type,
  strain,
  name,
  temp,
  time,
  pressure,
  avatarUrl,
  userId,
}: Props) => {
  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card ">
      <Link
        href={`/press/${id}`}
        className="flexCenter group relative w-full h-full border-white border rounded-2xl"
      >
        <Image
          src={image}
          width={414}
          height={314}
          className="w-full h-full object-cover rounded-2xl"
          alt="Press Image"
        />

        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">
            {strain} - {type}
          </p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm text-white">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="Profile Image"
            />
            <p>{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" height={13} width={12} alt="heart" />
            <p className="text-sm">420</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" height={13} width={12} alt="heart" />
            <p className="text-sm">4.2K</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressCard;

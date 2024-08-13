import "../../../assets/styles/";

interface AccessCardProps {
  title: string;
  body: string;
  date?: string;
  imageUrl?: string;
}

const AccessCard: React.FC<AccessCardProps> = ({
  title,
  body,
  date,
  imageUrl,
}) => {
  return (
    <div className="device-card w-full h-[62px] bg-white flex gap-[12px]">
      <div className="w-[32px] h-[32px] flex justify-center">
        <img
          src={`${imageUrl ? imageUrl : "/images/DefaultLogo.png"}`}
          alt="DefaultLogo"
          className=""
        />
      </div>
      <div className="flex flex-col items-start">
        <p className="body-text-bold">{title}</p>
        <p className="body-text">{isDigit(body) ? "account" + body : body}</p>
        <p className="body-text-light">{date}</p>
      </div>
    </div>
  );
};

const isDigit = (str: string): boolean => /^\d+$/.test(str);

export default AccessCard;

import "../../assets/styles";

interface Status {
  success: boolean;
  body: string;
  container?: boolean;
}

const StatusPopup: React.FC<Status> = ({
  container = false,
  success,
  body,
}) => {
  return (
    <div
      className={`${
        container
          ? "w-[432px] h-fit rounded-[12px] bg-yellow z-[5] box-shadow overflow-hidden "
          : null
      }`}
    >
      <div className="bg-white flex flex-col justify-between items-center my-[30px]">
        <div className="w-[60px] h-[60px] flex justify-center items-center">
          <img
            src={`${
              success
                ? "/images/SuccessStatus.png"
                : "/images/FailedStatus.png"
            }`}
            alt="Status"
            className=""
          />
        </div>
        <p className="body-text font-[500] text-center mt-[24px]">{body}</p>
      </div>
    </div>
  );
};

export default StatusPopup;

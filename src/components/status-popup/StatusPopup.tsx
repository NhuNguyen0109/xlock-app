import "../../assets/styles";

interface Status {
  success: boolean;
  body: string;
}

const StatusPopup: React.FC<Status> = ({ success, body }) => {
  return (
    <div className="bg-white flex flex-col justify-between items-center my-[30px]">
      <div className="w-[60px] h-[60px] flex justify-center items-center">
        <img
          src={`${
            success
              ? "src/assets/images/SuccessStatus.png"
              : "src/assets/images/FailedStatus.png"
          }`}
          alt="Status"
          className=""
        />
      </div>
      <p className="body-text font-[500] text-center mt-[24px]">{body}</p>
    </div>
  );
};

export default StatusPopup;

import Image from "next/image";
import { useRouter } from "next/router";

export interface LeisureProps {
  activity_id: string;
  activity_type: string;
  title: string;
  image_url: string;
  start_date?: string; // optional로 변경
  end_date?: string;   // optional로 변경
}

const Leisure: React.FC<LeisureProps> = ({
  activity_id,
  activity_type,
  title,
  image_url,
  start_date,
  end_date,
}) => {
  const router = useRouter();

  const detailClick = () => {
    router.push(`/leisure_details?activity_id=${activity_id}`);
  };
  const renderDate = () => {
    if (activity_type.toUpperCase() === "MOVIE" && start_date)
      return `개봉일: ${start_date}`;
    if (start_date || end_date)
      return `${start_date} ~ ${end_date}`;
    return null;
  };

  const getActivityTypeName = (type: string) => {
    switch (type) {
      case "MOVIE":
        return "영화";
      case "PERFORMANCE":
        return "공연";
      case "EXHIBITION":
        return "전시";
      default:
        return "??";
    }
  };

  return (
    <div className="w-[290px] h-[425px]  bg-[#F6F6F6]">
      <button
        onClick={detailClick}
        className="mt-[10px] flex flex-col justify-center items-center w-[280px] h-[340px] bg-[#F6F6F6] overflow-hidden relative"
      >
        <Image
          src={image_url}
          alt="포스터"
          width={247}
          height={350}
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="mt-[15px]"
        />
      </button>

      <div className="flex flex-row mt-[8px] px-[20px]">
        <div className="flex font-normal justify-center text-white w-[40px] h-[20px] rounded-[8px] text-[12px] bg-[#447959] pt-[2px] mt-[5px]">
          {getActivityTypeName(activity_type)}
        </div>
        <div className="font-bold text-[14px] mt-[6px] ml-[6px] max-w-[200px] truncate overflow-hidden whitespace-nowrap">
          {title}
        </div>
      </div>

      {/* 날짜 출력 */}
      <div className="text-[13px] px-[20px] text-gray-600 mt-[3px] ml-[4px]">
        {renderDate()}
      </div>


    </div>
  );
};

export default Leisure;
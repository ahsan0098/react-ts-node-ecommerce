import { SERVER_PATH } from "@/constants/paths";

interface TableImage { path: string, dummy: string, size: string }
const TableImage = ({ path, dummy = "no-image.png", size = 'w-12 h-12 rounded-full' }: TableImage) => {

  return (
    <img

      src={SERVER_PATH + path}
      className={size}
      alt={dummy}
    />
  );
};

export default TableImage;

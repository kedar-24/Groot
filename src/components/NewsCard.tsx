import Image from "next/image";

interface NewsCardProps {
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  content: string;
}

const NewsCard = ({
  title,
  date,
  category,
  imageUrl,
  content,
}: NewsCardProps) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition border">
      <Image
        src={imageUrl}
        alt={title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {category} | {date}
        </p>
        <h3 className="text-lg font-semibold mt-1 mb-2">{title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3">{content}</p>
        <button className="text-red-600 mt-3 font-medium hover:underline">
          Read More
        </button>
      </div>
    </div>
  );
};

export default NewsCard;

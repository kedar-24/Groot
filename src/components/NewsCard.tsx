import Image from "next/image";

interface NewsCardProps {
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  content: string;
  url: string;
}

const NewsCard = ({
  title,
  date,
  category,
  imageUrl,
  content,
  url,
}: NewsCardProps) => {
  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-gray-400 hover:scale-105 transition-all flex flex-col h-full">
      <Image
        src={imageUrl?.startsWith("http") ? imageUrl : "/placeholder.jpg"}
        alt={title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
        placeholder="empty"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {category} | {new Date(date).toLocaleDateString()}
          </p>
          <h3 className="text-lg font-semibold mt-1 mb-2">{title}</h3>
          <p className="text-sm text-gray-700 line-clamp-3">{content}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 mt-4 font-medium hover:underline inline-block"
        >
          Read More →
        </a>
      </div>
    </div>
  );
};

export default NewsCard;

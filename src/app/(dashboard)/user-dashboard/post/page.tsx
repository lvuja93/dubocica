import Link from 'next/link';
import { CirclePlus } from 'lucide-react';

const Post = () => {
  return (
    <div className="text-gray-900">
      <div className="flex justify-center">
        <h1 className="md:hidden text-2xl py-2 px-4 font-semibold items-center justify-center gap-4 ">
          Моје објаве
        </h1>
        <div className="flex justify-center fixed bottom-20 md:hidden">
          {' '}
          <Link href="/user-dashboard/post/add-post">
            <CirclePlus size={40} color="#1E3A8A" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 ">
        <div className="flex justify-center">
          <Link
            href="/user-dashboard/post/add-post"
            className="hidden md:flex border gap-2  py-2 px-4 text-xl font-semibold text-white md:text-xl rounded-xl bg-[#F59E0B] hover:bg-[#3B82F6]"
          >
            <CirclePlus size={30} />
            Додај нову објаву
          </Link>
        </div>
        <div className="">
          <h1 className="hidden text-3xl py-2 px-4 font-semibold md:flex items-center justify-center gap-4 ">
            Моје објаве
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Post;

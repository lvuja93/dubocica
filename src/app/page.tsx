import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-2xl flex-1 justify-center pt-20 text-center">
      <h1>
        {' '}
        Naselje Dubočica <br />
        Web stranica u izradi{' '}
      </h1>
      <div className="flex justify-center">
        <img
          src="./images/logo-dub.png"
          alt=""
          className="w-auto flex justify-center"
        />
      </div>
    </div>
  );
}

import { Instagram } from 'lucide-react';
import { Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="text-center text-[#FCD34D] bg-[#162B66] text-sm py-2">
          <div className="flex justify-center  gap-2 pb-2">
            <Link href="https://www.instagram.com/dubocica_naselje/#">
              {' '}
              <Instagram />{' '}
            </Link>
            <Facebook />
          </div>
          <div className="flex items-center justify-center  border-b border-white pb-2">
            © {new Date().getFullYear()} НАСЕЉЕ ДУБОЧИЦА | Сва права задржана.
          </div>

          <div className="pt-2">
            Веб развој -{' '}
            <Link href="https://www.instagram.com/l_vuja/">
              <span className="underline cursor-pointer underline-offset-4">
                l_vuja
              </span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

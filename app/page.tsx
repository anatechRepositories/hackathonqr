import Image from 'next/image';
import InputBarCode from './components/InputBarCode';
import DisplayData from './components/DisplayData';
import StatTable from './components/StatTable';

export default function Home() {
  return (
    <div className="hero  h-screen bg-white">
      <div className="hero-content w-full flex-col lg:flex-row-reverse">
        <div className="w-full text-center lg:text-left space-y-3">
          <DisplayData />
          <InputBarCode />
        </div>
        <div className="w-full card max-w-3xl shadow-2xl bg-base-100">
          <StatTable />
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import InputBarCode from './components/InputBarCode';
import DisplayData from './components/DisplayData';
import StatTable from './components/StatTable';

export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center space-y-3 lg:text-left">
        <DisplayData />
        <InputBarCode />
      </div>
      <div className="card w-full max-w-3xl shadow-2xl bg-base-100">
        <StatTable />
      </div>
    </div>
  </div>
  );
}

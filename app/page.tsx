import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="flex w-full p-52">

        {/* <div className="grid h-20 flex-grow card bg-base-300 rounded-box"> */}

        <div className="mockup-window border w-4/6 shadow-lg bg-base-300">
          <div className="flex justify-center py-16 bg-base-200">
            <div className="overflow-x-auto">
              <div className="stats shadow">

                <div className="stat">

                  <div className="stat-title">Downloads</div>
                  <div className="stat-value">20/30</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">

                  <div className="stat-title">-</div>
                  <div className="stat-value">0,000</div>
                </div>

                <div className="stat">

                  <div className="stat-title">-</div>
                  <div className="stat-value">0,000</div>
                </div>
              </div>
              
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* </div> */}



        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">QR</div>
      </div>
    </main>
  )
}

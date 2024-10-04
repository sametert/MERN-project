import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../images/akademik.jpg";
import social from "../../images/sosyal.jpg";
import duyuru from "../../images/duyuru.jpg";
import yemekhane from "../../images/yemekhane.jpg";
import merp from "../../images/merpLogo1.png";

function Homes() {
  return (
    <div>
      <nav className="bg-white  shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={merp}
                alt="merp"
                className="align-middle"
                style={{ height: "150px" }}
              />
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4 border p-4 bg-gray-750 rounded-full text-lg cursor-pointer">
                <li>Merp Admin Panel</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full bg-merpBg h-full">
        <div className="container mx-auto p-4">
          <div className="flex gap-4 mt-3">
            <div className="bg-slate-50 w-2/6 rounded-lg p-4 z-0 md:z-50 shadow-lg shadow-cyan-500/50">
              <div className="flex flex-col gap-10 h-full">
                <div className="w-full grow">
                  <img src={img1} className="h-full" alt="" />
                </div>
                <div className="grow-0">
                  <h1 className="font-semibold text-lg">Dersler</h1>
                  <p className="text-sm text-slate-600">
                    Kullanıcıların ders programlarını görüntüleyebilmeleri
                    sağlar.
                  </p>
                  <Link
                    to="/lesson"
                    className="text-red-800 hover:font-medium text-xs hover:text-sm"
                  >
                    Daha fazlasını görmek için tıklayınız.
                  </Link>
                </div>
              </div>
            </div>

            {/* third card */}
            <div className="bg-slate-50 w-2/6 rounded-lg p-4 z-0 md:z-50 shadow-lg shadow-cyan-500/50">
              <div className="flex flex-col gap-10">
                <div className="w-full grow">
                  <img src={social} className="h-full" alt="" />
                </div>
                <div className="grow-0">
                  <h1 className="font-semibold text-lg">Sosyal Etkileşim</h1>
                  <p className="text-sm text-slate-600">
                    Kullanıcıların etkinliklere katılma ve etkinlikleri
                    görüntüleme.
                  </p>
                  <Link
                    to="/event"
                    className="text-red-800 hover:font-medium text-xs hover:text-sm"
                  >
                    Daha fazlasını görmek için tıklayınız.
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 w-2/6 rounded-lg p-4 z-0 md:z-50 shadow-lg shadow-cyan-500/50 ">
              <div className="flex flex-col gap-10 h-full">
                <div className="w-full grow">
                  <img src={duyuru} className="h-full" alt="" />
                </div>
                <div className="grow-0">
                  <h1 className="font-semibold text-lg">Duyurular</h1>
                  <p className="text-sm text-slate-600">
                    Kullanıcıların duyuruları görüntüleme işlevi.
                  </p>
                  <Link
                    to="/announ"
                    className="text-red-800 hover:font-medium text-xs hover:text-sm"
                  >
                    Daha fazlasını görmek için tıklayınız.
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-3">
            {/* four card */}

            {/* five card */}
            <div className="bg-slate-50 w-2/6 rounded-lg p-4 z-0 md:z-50 shadow-lg shadow-cyan-500/50 ">
              <div className="flex flex-col gap-10 h-full">
                <div className="w-full grow">
                  <img src={yemekhane} className="h-full" alt="" />
                </div>
                <div className="grow-0">
                  <h1 className="font-semibold text-lg">
                    Yemek Hizmetleri ve Kafeler
                  </h1>
                  <p className="text-sm text-slate-600">
                    Kullanıcıların yemek öğünleri hakkında bilgilenmeleri ve
                    kampüs içerisindeki kafeleri görüntüleyebilme.
                  </p>
                  <Link
                    to="/food"
                    className="text-red-800 hover:font-medium text-xs hover:text-sm"
                  >
                    Daha fazlasını görmek için tıklayınız.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homes;

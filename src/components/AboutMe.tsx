export default function AboutMe() {
  return (
    <section
      id="section-about-me"
      className="bg-cover bg-center bg-no-repeat px-5 py-20 overflow-hidden flex justify-center items-center"
      style={{
        backgroundImage:
          "url('/page/3ed207e6-67bf-4718-a020-457bb08bf1b2/images/db018f986906c396957a3bdf93b41c63ff3bafd4.png')",
      }}
    >
      <div className="max-w-[1448px] w-full flex items-start gap-5 max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:gap-10">
        {/* Left Column */}
        <div className="relative flex-1 max-[1200px]:w-full max-[1200px]:max-w-[600px] max-[1200px]:mb-[200px] max-[768px]:mb-0 max-[768px]:min-h-[400px] flex flex-col items-center">
          <img
            src="/page/3ed207e6-67bf-4718-a020-457bb08bf1b2/images/b475ffab2b0ecb75d84bde1f926c6d3b4d27ce6c.png"
            alt="A photographer standing on a rock with a camera rig."
            className="max-w-full h-auto object-contain relative top-[103px] max-[1200px]:top-0 max-[768px]:absolute max-[768px]:bottom-0 max-[768px]:left-1/2 max-[768px]:-translate-x-1/2 max-[768px]:max-h-[350px] max-[768px]:w-auto"
          />

          {/* Benefit Tags */}
          <div className="absolute top-[178px] left-[26px] bg-[rgba(48,48,48,0.4)] rounded-xl py-[14px] px-5 flex items-center gap-3 font-nunito font-bold text-[15px] text-[#ffe30d] max-[768px]:static max-[768px]:m-2 max-[768px]:w-fit">
            <img
              src="/page/3ed207e6-67bf-4718-a020-457bb08bf1b2/images/I227_1545_83_1265_83_1038.svg"
              alt="Focus icon"
              className="w-6 h-6"
            />
            <span>Expert Composition</span>
          </div>

          <div className="absolute top-[76px] left-[244px] bg-[rgba(48,48,48,0.4)] rounded-xl py-[14px] px-5 flex items-center gap-3 font-nunito font-bold text-[15px] text-[rgba(255,205,136,0.83)] max-[768px]:static max-[768px]:order-first max-[768px]:m-2 max-[768px]:w-fit">
            <img
              src="/page/3ed207e6-67bf-4718-a020-457bb08bf1b2/images/I227_1545_83_1267_83_1087.svg"
              alt="Photo icon"
              className="w-6 h-6"
            />
            <span>Unique Perspective</span>
          </div>

          <div className="absolute top-[178px] left-[410px] bg-[rgba(48,48,48,0.4)] rounded-xl py-[14px] px-5 flex items-center gap-3 font-nunito font-bold text-[15px] text-[#a67840] max-[768px]:static max-[768px]:m-2 max-[768px]:w-fit">
            <img
              src="/page/3ed207e6-67bf-4718-a020-457bb08bf1b2/images/I227_1545_83_1266_83_1125.svg"
              alt="Picture icon"
              className="w-6 h-6"
            />
            <span>Captured with Soul</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-[30px] pl-[60px] max-[1200px]:w-full max-[1200px]:max-w-[800px] max-[1200px]:pl-0 max-[1200px]:text-center">
          <h2 className="font-bebas text-[50px] font-normal text-[#ffd8a2] text-center m-0 max-[768px]:text-[40px]">
            About Me
          </h2>

          <div className="flex flex-col gap-[17px]">
            <p className="font-lato text-[16.5px] leading-[1.9] text-white text-justify max-[1200px]:text-left">
              I invite you to embark on a journey to the edges of the visible
              and the invisible. Through my photographs, I have sought to
              capture not only images but also fragments of emotions,
              encounters, and adventures that mark my path as a globetrotting
              photographer.
            </p>
            <p className="font-lato text-[16.5px] leading-[1.9] text-white text-justify max-[1200px]:text-left">
              My photographic development art reflects this vision: I have
              chosen to move away from colorimetric overexuberance, which, to
              me, distorts reality and dulls the imagination. I prefer
              black-and-white or matte tones—choices that enhance deep contrasts
              and open a broader space for interpretation.
            </p>
            <p className="font-lato text-[16.5px] leading-[1.9] text-white text-justify max-[1200px]:text-left">
              I firmly believe that aesthetics resides in subtlety, and the
              mystery that emerges from it leaves each person the chance to
              compose their own story, their own journey.
            </p>
          </div>

          {/* Stats */}
          <div className="border border-[#d4d4d4] p-[30px_20px] flex justify-around items-center mt-5 max-[768px]:flex-col max-[768px]:gap-[30px] max-[768px]:border-0 max-[768px]:p-5">
            <div className="text-center">
              <span className="font-bebas text-[55px] font-normal leading-[1.1] text-[rgba(255,216,162,0.9)] [text-stroke:1.1px_#ffe30d] block max-[768px]:text-[45px]">
                1,302+
              </span>
              <span className="font-inter text-[16px] text-white mt-2 block">
                Expeditions
              </span>
            </div>
            <div className="text-center">
              <span className="font-bebas text-[55px] font-normal leading-[1.1] text-[rgba(255,216,162,0.9)] [text-stroke:1.1px_#ffe30d] block max-[768px]:text-[45px]">
                500+
              </span>
              <span className="font-inter text-[16px] text-white mt-2 block">
                Photos
              </span>
            </div>
            <div className="text-center">
              <span className="font-bebas text-[55px] font-normal leading-[1.1] text-[rgba(255,216,162,0.83)] [text-stroke:1.1px_#ffe30d] block max-[768px]:text-[45px]">
                98%
              </span>
              <span className="font-inter text-[16px] text-white mt-2 block">
                Satisfied Clients
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

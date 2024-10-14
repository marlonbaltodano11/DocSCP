import { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

const InitialLoadingAnimation = () => {
  useEffect(() => {
    anime
      .timeline({
        loop: false,
        complete: () => {
          // Aquí va la función que quieres ejecutar al finalizar la animación
          alert("Animación completada");
        },
      })

      .add({
        targets: "#firstStep",
        opacity: {
          value: [0, 1],
          duration: 900,
          easing: "easeInOutSine",
        },
      })
      .add({
        targets: "#secondStep",
        opacity: {
          value: [0, 1],
          duration: 900,
          easing: "easeInOutSine",
        },
      })
      .add({
        targets: "#thirdStep",
        opacity: {
          value: [0, 1],
          duration: 900,
          easing: "easeInOutSine",
        },
      })
      .add({
        targets: "#fourthStep",
        opacity: {
          value: [0, 1],
          duration: 900,
          easing: "easeInOutSine",
        },
      })
      .add({
        targets: "#fifthStep",
        opacity: {
          value: [0, 1],
          duration: 900,
          easing: "easeInOutSine",
          endDelay: 1000,
        },
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {/*LOGO */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="367"
        height="367"
        viewBox="0 0 493 491"
        fill="none"
      >
        <g id="firstStep" filter="url(#filter0_d_981_2)">
          <path
            d="M105.826 28.7336H250C272.091 28.7336 290 46.6423 290 68.7336V213H145.826C123.735 213 105.826 195.091 105.826 173V28.7336Z"
            fill="#28A745"
          />
          <rect
            x="4"
            y="83.958"
            width="17.982"
            height="17.991"
            rx="8.99099"
            fill="#208637"
          />
          <rect
            x="61.9419"
            y="124.938"
            width="27.972"
            height="26.9865"
            rx="13.4933"
            fill="#343A40"
          />
          <rect
            width="39.965"
            height="39.975"
            rx="10"
            transform="matrix(0.865917 -0.500188 0.499812 0.866134 30.9729 19.99)"
            fill="#343A40"
          />
          <rect
            width="18.4197"
            height="18.4243"
            rx="5"
            transform="matrix(0.865917 -0.500188 0.499812 0.866134 9.99414 187.124)"
            fill="#28A745"
          />
        </g>
        <g id="secondStep" filter="url(#filter1_d_981_2)">
          <path
            d="M289.338 145.087C289.338 122.996 307.247 105.087 329.338 105.087H472.718V249C472.718 271.091 454.809 289 432.718 289H289.338V145.087Z"
            fill="#343A40"
          />
          <rect
            width="19.9083"
            height="19.9372"
            rx="5"
            transform="matrix(0.865395 -0.50109 0.498911 0.866653 446.163 44.9758)"
            fill="#28A745"
          />
          <rect
            x="390.46"
            y="61.9348"
            width="24.8672"
            height="24.9396"
            rx="12.4336"
            fill="#343A40"
          />
          <rect
            width="29.8624"
            height="29.9058"
            rx="10"
            transform="matrix(0.865395 -0.50109 0.498911 0.866653 294.97 63.9299)"
            fill="#208637"
          />
        </g>
        <g id="thirdStep" filter="url(#filter2_d_981_2)">
          <path
            d="M34.9844 252.495C34.9844 230.404 52.893 212.495 74.9844 212.495H219V356.757C219 378.849 201.091 396.757 179 396.757H34.9844V252.495Z"
            fill="#343A40"
          />
          <rect
            width="39.939"
            height="39.9657"
            rx="10"
            transform="matrix(0.865736 -0.500502 0.499499 0.866315 76 450.99)"
            fill="#343A40"
          />
          <rect
            x="184.714"
            y="409.896"
            width="17.9665"
            height="17.9906"
            rx="8.98327"
            fill="#28A745"
          />
          <rect
            x="10"
            y="419"
            width="17.9665"
            height="17.9906"
            rx="8.98327"
            fill="#208637"
          />
        </g>
        <g id="fourthStep" filter="url(#filter3_d_981_2)">
          <path
            d="M219 289H362.8C384.891 289 402.8 306.909 402.8 329V472.552H259C236.909 472.552 219 454.643 219 432.552V289Z"
            fill="#208637"
          />
          <rect
            x="412.071"
            y="412.156"
            width="17.9454"
            height="17.9212"
            rx="8.96062"
            fill="#343A40"
          />
          <rect
            x="432.01"
            y="303.633"
            width="18.9424"
            height="18.9169"
            rx="9.45844"
            fill="#343A40"
          />
          <rect
            width="30"
            height="29.9798"
            rx="10"
            transform="matrix(0.866317 -0.499494 0.500506 0.865733 450.953 460.444)"
            fill="#208637"
          />
          <rect
            x="462.917"
            y="356.401"
            width="18.9424"
            height="16.9256"
            rx="8.46281"
            fill="#28A745"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_981_2"
            x="0"
            y="3.65967"
            width="294"
            height="217.34"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_981_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_981_2"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_d_981_2"
            x="285.338"
            y="36.8325"
            width="191.38"
            height="260.167"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_981_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_981_2"
              result="shape"
            />
          </filter>
          <filter
            id="filter2_d_981_2"
            x="6"
            y="212.495"
            width="217"
            height="277.456"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_981_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_981_2"
              result="shape"
            />
          </filter>
          <filter
            id="filter3_d_981_2"
            x="215"
            y="289"
            width="277.286"
            height="201.743"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_981_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_981_2"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      {/*Texto */}
      <svg
        id="fifthStep"
        xmlns="http://www.w3.org/2000/svg"
        width="clamp(360px, 90vw, 720px)"
        height="150"
        viewBox="0 0 820 180"
        fill="none"
      >
        <g filter="url(#filter0_d_982_3)">
          <path
            d="M28.4912 67.0293C26.4404 67.0293 24.4873 66.6387 22.6318 65.8574C20.8252 65.0273 19.2383 63.9531 17.8711 62.6348C16.5039 61.2676 15.4297 59.6807 14.6484 57.874C13.8672 56.0186 13.4766 54.0654 13.4766 52.0146V21.9854C13.4766 19.9346 13.8672 18.0059 14.6484 16.1992C15.4297 14.3438 16.5039 12.7568 17.8711 11.4385C19.2383 10.0713 20.8252 8.99707 22.6318 8.21582C24.4873 7.38574 26.4404 6.9707 28.4912 6.9707H79.4678C81.5186 6.9707 83.4473 7.38574 85.2539 8.21582C87.1094 8.99707 88.7207 10.0713 90.0879 11.4385C91.4551 12.7568 92.5293 14.3438 93.3105 16.1992C94.0918 18.0059 94.4824 19.9346 94.4824 21.9854V35.5352H79.4678V21.9854H28.4912V52.0146H79.4678C81.5186 52.0146 83.4473 52.4053 85.2539 53.1865C87.1094 53.9678 88.7207 55.042 90.0879 56.4092C91.4551 57.7764 92.5293 59.3877 93.3105 61.2432C94.0918 63.0498 94.4824 64.9785 94.4824 67.0293V96.9854C94.4824 99.0361 94.0918 100.989 93.3105 102.845C92.5293 104.651 91.4551 106.238 90.0879 107.605C88.7207 108.973 87.1094 110.047 85.2539 110.828C83.4473 111.609 81.5186 112 79.4678 112H27.0264C24.9756 112 23.0225 111.609 21.167 110.828C19.3604 110.047 17.7734 108.973 16.4062 107.605C15.0391 106.238 13.9648 104.651 13.1836 102.845C12.4023 100.989 12.0117 99.0361 12.0117 96.9854V83.5088H27.0264V96.9854H79.4678V67.0293H28.4912ZM128.54 6.9707L159.082 56.043L189.697 6.9707H207.129L166.626 70.3252V112H151.611V70.3252L111.108 6.9707H128.54ZM238.696 6.9707V96.9854H292.676V112H223.682V6.9707H238.696ZM325.708 6.9707V96.9854H379.688V112H310.693V6.9707H325.708ZM444.214 6.9707L484.717 112H469.702L460.4 87.8301H413.013L403.711 112H388.696L429.199 6.9707H444.214ZM418.726 72.8154H454.614L436.743 26.5264L418.726 72.8154ZM571.143 57.2148C573.34 57.8984 575.342 58.875 577.148 60.1445C578.955 61.4141 580.493 63.0498 581.763 65.0518C583.032 67.0049 584.009 69.3242 584.692 72.0098C585.376 74.6953 585.718 77.7715 585.718 81.2383V86.5117C585.718 103.504 577.222 112 560.229 112H502.734V6.9707H557.227C574.219 6.9707 582.715 15.4912 582.715 32.5322V34.4365C582.715 40.3447 581.763 45.1787 579.858 48.9385C578.003 52.6494 575.098 55.4082 571.143 57.2148ZM517.456 66.2236V97.2783H559.79C563.745 97.2783 566.602 96.3506 568.359 94.4951C570.117 92.6396 570.996 89.7344 570.996 85.7793V77.6494C570.996 73.6455 570.117 70.7402 568.359 68.9336C566.602 67.127 563.745 66.2236 559.79 66.2236H517.456ZM517.456 21.6924V51.5752H557.812C561.426 51.4287 564.014 50.4521 565.576 48.6455C567.188 46.79 567.993 43.958 567.993 40.1494V33.2646C567.993 29.2607 567.114 26.3311 565.356 24.4756C563.599 22.6201 560.742 21.6924 556.787 21.6924H517.456ZM608.203 6.9707H623.218V96.9854H683.203V6.9707H698.218V96.9854C698.218 99.0361 697.827 100.989 697.046 102.845C696.265 104.651 695.19 106.238 693.823 107.605C692.456 108.973 690.845 110.047 688.989 110.828C687.183 111.609 685.254 112 683.203 112H623.218C621.167 112 619.214 111.609 617.358 110.828C615.552 110.047 613.965 108.973 612.598 107.605C611.23 106.238 610.156 104.651 609.375 102.845C608.594 100.989 608.203 99.0361 608.203 96.9854V6.9707ZM740.259 67.0293C738.208 67.0293 736.255 66.6387 734.399 65.8574C732.593 65.0273 731.006 63.9531 729.639 62.6348C728.271 61.2676 727.197 59.6807 726.416 57.874C725.635 56.0186 725.244 54.0654 725.244 52.0146V21.9854C725.244 19.9346 725.635 18.0059 726.416 16.1992C727.197 14.3438 728.271 12.7568 729.639 11.4385C731.006 10.0713 732.593 8.99707 734.399 8.21582C736.255 7.38574 738.208 6.9707 740.259 6.9707H791.235C793.286 6.9707 795.215 7.38574 797.021 8.21582C798.877 8.99707 800.488 10.0713 801.855 11.4385C803.223 12.7568 804.297 14.3438 805.078 16.1992C805.859 18.0059 806.25 19.9346 806.25 21.9854V35.5352H791.235V21.9854H740.259V52.0146H791.235C793.286 52.0146 795.215 52.4053 797.021 53.1865C798.877 53.9678 800.488 55.042 801.855 56.4092C803.223 57.7764 804.297 59.3877 805.078 61.2432C805.859 63.0498 806.25 64.9785 806.25 67.0293V96.9854C806.25 99.0361 805.859 100.989 805.078 102.845C804.297 104.651 803.223 106.238 801.855 107.605C800.488 108.973 798.877 110.047 797.021 110.828C795.215 111.609 793.286 112 791.235 112H738.794C736.743 112 734.79 111.609 732.935 110.828C731.128 110.047 729.541 108.973 728.174 107.605C726.807 106.238 725.732 104.651 724.951 102.845C724.17 100.989 723.779 99.0361 723.779 96.9854V83.5088H738.794V96.9854H791.235V67.0293H740.259Z"
            fill="#208637"
          />
        </g>
        <g filter="url(#filter1_d_982_3)">
          <rect
            x="40"
            y="161.142"
            width="20"
            height="20"
            rx="10"
            transform="rotate(-45 40 161.142)"
            fill="#343A40"
          />
          <rect
            x="79.2842"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="135.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="191.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="247.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="303.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="359.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="415.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="471.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="527.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="583.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="639.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="695.284"
            y="153.142"
            width="45"
            height="16"
            rx="8"
            fill="#343A40"
          />
          <rect
            x="751.284"
            y="161.142"
            width="20"
            height="20"
            rx="10"
            transform="rotate(-45 751.284 161.142)"
            fill="#343A40"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_982_3"
            x="8.01172"
            y="6.9707"
            width="802.238"
            height="113.029"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_982_3"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_982_3"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_d_982_3"
            x="36"
            y="147"
            width="747.568"
            height="36.2843"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_982_3"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_982_3"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default InitialLoadingAnimation;

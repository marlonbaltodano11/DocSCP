import { useEffect } from "react";
import anime from "animejs/lib/anime.es";

const DataLoadingAnimation = () => {
  useEffect(() => {
    // Timeline para la primera secuencia
    const timeline = anime.timeline({
      loop: false,
      complete: () => {
        circleAnimation();
      },
    });

    // Step 1: aparece desde la izquierda
    timeline
      .add({
        targets: "#firtStep",
        translateX: [-900, 0], // desde la izquierda
        opacity: [0, 1],
        duration: 1200,
      })
      // Step 2: aparece desde arriba
      .add({
        targets: "#secondStep",
        translateY: [-300, 0], // desde arriba
        opacity: [0, 1],
        duration: 1200,
      })
      // Step 3: aparece desde la derecha
      .add({
        targets: "#thirdStep",
        translateX: [900, 0], // desde la derecha
        opacity: [0, 1],
        duration: 1200,
      })
      // Step 4: solo aparece (sin desplazamiento)
      .add({
        targets: "#fourthStep",
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutBounce",
      });
  }, []);

  const circleAnimation = () => {
    anime
      .timeline({
        loop: true,
      })

      .add({
        targets: "#firstCircle",
        opacity: {
          value: [0, 1],
          duration: 1200,
          easing: "easeInOutSine",
        },
      })
      .add({
        targets: "#secondCircle",
        opacity: {
          value: [0, 1],
          duration: 1200,
          easing: "easeInOutSine",
        },
      })
      .add({
        targets: "#thirdCircle",
        opacity: {
          value: [0, 1],
          duration: 1200,
          easing: "easeInOutSine",
          endDelay: 500,
        },
      })

      .add({
        targets: "#firstCircle, #secondCircle, #thirdCircle ",
        opacity: {
          value: [1, 0],
          duration: 1000,
          easing: "easeInOutSine",
          endDelay: 50,
        },
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {/* Los tres cubitos y las letras */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="304"
        viewBox="0 0 386 404"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g id="firtStep" clipPath="url(#clip0_985_4)">
          <path
            d="M116.302 129.782C115.145 129.319 113.855 129.319 112.698 129.782L54.8831 152.906L114.5 176.747L174.117 152.906L116.302 129.782ZM182.312 160.065L119.344 185.253V261.997L182.312 236.81V160.065ZM109.656 262.007V185.243L46.6875 160.065V236.82L109.656 262.007ZM109.104 120.783C112.568 119.397 116.432 119.397 119.896 120.783L188.958 148.411C189.856 148.771 190.626 149.392 191.168 150.193C191.71 150.994 192 151.939 192 152.906V236.82C191.999 238.755 191.418 240.646 190.332 242.249C189.245 243.851 187.704 245.091 185.907 245.81L116.302 273.651C115.145 274.115 113.855 274.115 112.698 273.651L43.1031 245.81C41.3037 245.093 39.7604 243.853 38.6725 242.251C37.5846 240.648 37.002 238.756 37 236.82V152.906C37.0002 151.939 37.2901 150.994 37.8322 150.193C38.3744 149.392 39.144 148.771 40.0419 148.411L109.104 120.783Z"
            fill="#28A745"
          />
        </g>
        <g id="secondStep" clipPath="url(#clip1_985_4)">
          <path
            d="M194.302 10.7823C193.145 10.3188 191.855 10.3188 190.698 10.7823L132.883 33.9064L192.5 57.7473L252.117 33.9064L194.302 10.7823ZM260.312 41.0655L197.344 66.253V142.997L260.312 117.81V41.0655ZM187.656 143.007V66.2433L124.688 41.0655V117.82L187.656 143.007ZM187.104 1.78264C190.568 0.397322 194.432 0.397322 197.896 1.78264L266.958 29.4114C267.856 29.7712 268.626 30.3917 269.168 31.1928C269.71 31.994 270 32.9391 270 33.9064V117.82C269.999 119.755 269.418 121.646 268.332 123.249C267.245 124.851 265.704 126.091 263.907 126.81L194.302 154.651C193.145 155.115 191.855 155.115 190.698 154.651L121.103 126.81C119.304 126.093 117.76 124.853 116.672 123.251C115.585 121.648 115.002 119.756 115 117.82V33.9064C115 32.9391 115.29 31.994 115.832 31.1928C116.374 30.3917 117.144 29.7712 118.042 29.4114L187.104 1.78264Z"
            fill="#1174D6"
          />
        </g>
        <g id="thirdStep" clipPath="url(#clip2_985_4)">
          <path
            d="M260.813 130.782C259.649 130.319 258.351 130.319 257.187 130.782L198.998 153.906L259 177.747L319.001 153.906L260.813 130.782ZM327.25 161.065L263.875 186.253V262.997L327.25 237.81V161.065ZM254.125 263.007V186.243L190.75 161.065V237.82L254.125 263.007ZM253.569 121.783C257.056 120.397 260.944 120.397 264.431 121.783L333.938 149.411C334.842 149.771 335.617 150.392 336.162 151.193C336.708 151.994 337 152.939 337 153.906V237.82C336.999 239.755 336.414 241.646 335.321 243.249C334.228 244.851 332.676 246.091 330.867 246.81L260.813 274.651C259.649 275.115 258.351 275.115 257.187 274.651L187.142 246.81C185.331 246.093 183.778 244.853 182.683 243.251C181.588 241.648 181.002 239.756 181 237.82V153.906C181 152.939 181.292 151.994 181.838 151.193C182.383 150.392 183.158 149.771 184.062 149.411L253.569 121.783Z"
            fill="#444444"
          />
        </g>
        <g id="fourthStep" filter="url(#filter0_d_985_4)">
          <path
            d="M5.75 389V344.188H30.2812C37.5312 344.188 41.1562 347.823 41.1562 355.094V361.469C41.1562 368.74 37.5312 372.375 30.2812 372.375H12.1562V389H5.75ZM12.1562 365.969H29.9375C31.6458 365.969 32.875 365.594 33.625 364.844C34.375 364.094 34.75 362.865 34.75 361.156V355.406C34.75 353.698 34.375 352.469 33.625 351.719C32.875 350.969 31.6458 350.594 29.9375 350.594H12.1562V365.969ZM55.625 361.875V389H49.5V355.719H55.625V361.594C55.6667 360.781 55.8542 360.021 56.1875 359.312C56.5208 358.583 56.9583 357.958 57.5 357.438C58.0625 356.896 58.7083 356.479 59.4375 356.188C60.1667 355.875 60.9479 355.719 61.7812 355.719H68.3125C69.1667 355.719 69.9583 355.885 70.6875 356.219C71.4375 356.531 72.0938 356.969 72.6562 357.531C73.2188 358.073 73.6562 358.719 73.9688 359.469C74.3021 360.219 74.4688 361.021 74.4688 361.875V367.5H68.3125V361.875H55.625ZM110.906 382.844C110.906 383.698 110.74 384.5 110.406 385.25C110.094 386 109.656 386.656 109.094 387.219C108.552 387.76 107.906 388.198 107.156 388.531C106.427 388.844 105.635 389 104.781 389H88.25C87.4167 389 86.625 388.844 85.875 388.531C85.125 388.198 84.4688 387.76 83.9062 387.219C83.3646 386.656 82.9271 386 82.5938 385.25C82.2812 384.5 82.125 383.698 82.125 382.844V361.875C82.125 361.021 82.2812 360.219 82.5938 359.469C82.9271 358.719 83.3646 358.073 83.9062 357.531C84.4688 356.969 85.125 356.531 85.875 356.219C86.625 355.885 87.4167 355.719 88.25 355.719H104.781C105.635 355.719 106.427 355.885 107.156 356.219C107.906 356.531 108.552 356.969 109.094 357.531C109.656 358.073 110.094 358.719 110.406 359.469C110.74 360.219 110.906 361.021 110.906 361.875V382.844ZM88.25 361.875V382.844H104.781V361.875H88.25ZM127.312 361.875V382.844H143.188V377.219H149.344V382.844C149.344 383.698 149.177 384.5 148.844 385.25C148.531 386 148.094 386.656 147.531 387.219C146.99 387.76 146.344 388.198 145.594 388.531C144.844 388.844 144.042 389 143.188 389H127.312C126.479 389 125.688 388.844 124.938 388.531C124.188 388.198 123.531 387.76 122.969 387.219C122.427 386.656 121.99 386 121.656 385.25C121.344 384.5 121.188 383.698 121.188 382.844V361.875C121.188 361.021 121.344 360.219 121.656 359.469C121.99 358.719 122.427 358.073 122.969 357.531C123.531 356.969 124.188 356.531 124.938 356.219C125.688 355.885 126.479 355.719 127.312 355.719H143.188C144.042 355.719 144.844 355.885 145.594 356.219C146.344 356.531 146.99 356.969 147.531 357.531C148.094 358.073 148.531 358.719 148.844 359.469C149.177 360.219 149.344 361.021 149.344 361.875V367.5H143.188V361.875H127.312ZM187.781 375.5H165.75V382.844H187.781V389H165.75C164.917 389 164.125 388.844 163.375 388.531C162.625 388.198 161.969 387.76 161.406 387.219C160.865 386.656 160.427 386 160.094 385.25C159.781 384.5 159.625 383.698 159.625 382.844V361.875C159.625 361.021 159.781 360.219 160.094 359.469C160.427 358.719 160.865 358.073 161.406 357.531C161.969 356.969 162.625 356.531 163.375 356.219C164.125 355.885 164.917 355.719 165.75 355.719H181.625C182.479 355.719 183.281 355.885 184.031 356.219C184.781 356.531 185.427 356.969 185.969 357.531C186.531 358.073 186.969 358.719 187.281 359.469C187.615 360.219 187.781 361.021 187.781 361.875V375.5ZM165.75 361.875V369.344H181.625V361.875H165.75ZM218.156 382.844V375.125H203.562C202.708 375.125 201.906 374.969 201.156 374.656C200.406 374.323 199.75 373.885 199.188 373.344C198.646 372.781 198.208 372.125 197.875 371.375C197.562 370.625 197.406 369.823 197.406 368.969V361.875C197.406 361.021 197.562 360.219 197.875 359.469C198.208 358.719 198.646 358.073 199.188 357.531C199.75 356.969 200.406 356.531 201.156 356.219C201.906 355.885 202.708 355.719 203.562 355.719H223.031V361.875H203.562V368.969H218.156C219.01 368.969 219.802 369.135 220.531 369.469C221.281 369.781 221.938 370.219 222.5 370.781C223.062 371.323 223.5 371.969 223.812 372.719C224.146 373.469 224.312 374.271 224.312 375.125V382.844C224.312 383.698 224.146 384.5 223.812 385.25C223.5 386 223.062 386.656 222.5 387.219C221.938 387.76 221.281 388.198 220.531 388.531C219.802 388.844 219.01 389 218.156 389H197.406V382.844H218.156ZM233.938 374.469C233.938 373.615 234.094 372.823 234.406 372.094C234.74 371.344 235.177 370.688 235.719 370.125C236.281 369.562 236.938 369.125 237.688 368.812C238.438 368.479 239.229 368.312 240.062 368.312H255.938V361.875H235.844V355.719H255.938C256.792 355.719 257.594 355.885 258.344 356.219C259.094 356.531 259.74 356.969 260.281 357.531C260.844 358.073 261.281 358.719 261.594 359.469C261.927 360.219 262.094 361.021 262.094 361.875V389H255.938V383.375C255.875 384.146 255.667 384.875 255.312 385.562C254.958 386.25 254.5 386.854 253.938 387.375C253.396 387.875 252.771 388.271 252.062 388.562C251.354 388.854 250.604 389 249.812 389H240.062C239.229 389 238.438 388.844 237.688 388.531C236.938 388.198 236.281 387.76 235.719 387.219C235.177 386.656 234.74 386 234.406 385.25C234.094 384.5 233.938 383.698 233.938 382.844V374.469ZM240.062 382.844H255.938V374.469H240.062V382.844ZM301.812 389H295.656V361.875H278.5V389H272.375V355.719H278.5V361.594C278.542 360.781 278.729 360.021 279.062 359.312C279.396 358.583 279.833 357.958 280.375 357.438C280.938 356.896 281.583 356.479 282.312 356.188C283.042 355.875 283.823 355.719 284.656 355.719H295.656C296.51 355.719 297.312 355.885 298.062 356.219C298.812 356.531 299.458 356.969 300 357.531C300.562 358.073 301 358.719 301.312 359.469C301.646 360.219 301.812 361.021 301.812 361.875V389ZM312.062 361.875C312.062 361.021 312.219 360.219 312.531 359.469C312.865 358.719 313.302 358.073 313.844 357.531C314.406 356.969 315.062 356.531 315.812 356.219C316.562 355.885 317.354 355.719 318.188 355.719H335.344V342.906H341.5V389H335.344V383.375C335.281 384.146 335.073 384.875 334.719 385.562C334.365 386.25 333.906 386.854 333.344 387.375C332.802 387.875 332.177 388.271 331.469 388.562C330.76 388.854 330.01 389 329.219 389H318.188C317.354 389 316.562 388.844 315.812 388.531C315.062 388.198 314.406 387.76 313.844 387.219C313.302 386.656 312.865 386 312.531 385.25C312.219 384.5 312.062 383.698 312.062 382.844V361.875ZM318.188 382.844H335.344V361.875H318.188V382.844ZM380.531 382.844C380.531 383.698 380.365 384.5 380.031 385.25C379.719 386 379.281 386.656 378.719 387.219C378.177 387.76 377.531 388.198 376.781 388.531C376.052 388.844 375.26 389 374.406 389H357.875C357.042 389 356.25 388.844 355.5 388.531C354.75 388.198 354.094 387.76 353.531 387.219C352.99 386.656 352.552 386 352.219 385.25C351.906 384.5 351.75 383.698 351.75 382.844V361.875C351.75 361.021 351.906 360.219 352.219 359.469C352.552 358.719 352.99 358.073 353.531 357.531C354.094 356.969 354.75 356.531 355.5 356.219C356.25 355.885 357.042 355.719 357.875 355.719H374.406C375.26 355.719 376.052 355.885 376.781 356.219C377.531 356.531 378.177 356.969 378.719 357.531C379.281 358.073 379.719 358.719 380.031 359.469C380.365 360.219 380.531 361.021 380.531 361.875V382.844ZM357.875 361.875V382.844H374.406V361.875H357.875Z"
            fill="#207C35"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_985_4"
            x="1.75"
            y="342.906"
            width="382.781"
            height="54.0938"
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
              result="effect1_dropShadow_985_4"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_985_4"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_985_4">
            <rect
              width="155"
              height="155"
              fill="white"
              transform="translate(37 119)"
            />
          </clipPath>
          <clipPath id="clip1_985_4">
            <rect
              width="155"
              height="155"
              fill="white"
              transform="translate(115)"
            />
          </clipPath>
          <clipPath id="clip2_985_4">
            <rect
              width="156"
              height="155"
              fill="white"
              transform="translate(181 120)"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Los tres circulitos*/}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="162"
        height="20"
        viewBox="0 0 182 20"
        fill="none"
      >
        <circle
          style={{ opacity: "0" }}
          id="firstCircle"
          cx="10"
          cy="10"
          r="10"
          fill="#28A745"
        />
        <circle
          style={{ opacity: "0" }}
          id="secondCircle"
          cx="91"
          cy="10"
          r="10"
          fill="#1174D6"
        />
        <circle
          style={{ opacity: "0" }}
          id="thirdCircle"
          cx="172"
          cy="10"
          r="10"
          fill="#444444"
        />
      </svg>
    </div>
  );
};

export default DataLoadingAnimation;

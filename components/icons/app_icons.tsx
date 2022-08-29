import React from "react";
import Svg, { Path, SvgProps, Image } from "react-native-svg";

const CheckMark = ({
  size,
  color,
  ...rest
}: {
  size: number;
  color: string;
}): JSX.Element => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
    >
      <Path d="M233 1c-49.4 4.8-95 23-135 53.8C78.5 69.8 53.2 98 38.6 121c-6.3 9.9-18.6 35.1-23 47.1-4.9 13.4-10.2 34-12.8 49.9-3.1 19.5-3.1 56.5 0 76 4.5 27.6 11.6 49.8 23.7 74.5 13.2 26.9 26.9 46 48.9 68.1 22.1 22 41.2 35.7 68.1 48.9 24.7 12.1 46.9 19.2 74.5 23.7 19.5 3.1 56.5 3.1 76 0 27.6-4.5 49.8-11.6 74.5-23.7 26.9-13.2 46-26.9 68.1-48.9 22-22.1 35.7-41.2 48.9-68.1 8.8-17.9 13.2-29.6 18-47.6 6.3-24 7.8-37.1 7.8-64.9 0-27.8-1.5-40.9-7.8-64.9-4.8-18-9.2-29.7-18-47.6-13.2-26.9-26.9-46-48.9-68.1-22.1-22-41.2-35.7-68.1-48.9-24.6-12.1-47.4-19.3-74-23.5C279.8.7 247-.4 233 1zm153.9 151.5c17.3 4.6 28.5 21.8 26 40-1.6 11.6.6 9.2-89.8 99.8-96.6 96.8-90 91.2-106.6 91.2-15.8 0-14.1 1.4-66.6-51.3-33-33.1-46.1-46.9-47.7-50.2-4.5-9.6-4.5-22.6.1-32 3.1-6.3 10.7-13.6 17.5-16.8 4.9-2.3 7-2.7 14.7-2.7 15.2 0 16.5.9 52 36.5l30 30 70-69.9c47.2-47.1 71.4-70.6 74.2-72 8.3-4.2 17.2-5 26.2-2.6z" />
    </Svg>
  );
};

export const Cancel = (props: SvgProps): JSX.Element => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={24}
    height={24}
    {...props}
  >
    <Image
      width={24}
      height={24}
      xlinkHref={"data:img/png;base64,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" as any}
    />
  </Svg>
);

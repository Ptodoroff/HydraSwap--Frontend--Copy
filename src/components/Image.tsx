import React from "react";
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  darkMode?: boolean;
  dark?: any;
}
export default ({ ...props }: ImageProps) => {
  return <img {...props} />;
};

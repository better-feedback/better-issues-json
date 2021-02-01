import { CSSProperties } from "react";
import { Property } from "csstype";

type Props = {
  className?: string;
  style?: CSSProperties;
  blendMode1?: Property.MixBlendMode;
  blendMode2?: Property.MixBlendMode;
};

const Logo = ({
  className = "",
  style,
  blendMode1 = "darken",
  blendMode2 = "overlay",
}: Props) => (
  <svg
    className={`${className}`}
    style={style}
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <ellipse
        id="svg_3"
        style={{ mixBlendMode: blendMode1 }}
        ry="60"
        rx="60"
        cy="120"
        cx="150"
        fill="#3CBBB1"
      />
      <ellipse
        id="svg_6"
        style={{ mixBlendMode: blendMode1 }}
        ry="60"
        rx="60"
        cy="180"
        cx="190"
        fill="#EE4266"
      />
      <ellipse
        id="svg_4"
        style={{ mixBlendMode: blendMode2 }}
        ry="60"
        rx="60"
        cy="180"
        cx="110"
        fill="#FFEEB0"
      />
    </g>
  </svg>
);

export default Logo;

import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = ({loading}) => {
  let color = "hsl(182, 96%, 32%)";

  return (
    <div className="sweet-loading">
      <BounceLoader color={color} loading={loading} css={override} size={90} />
    </div>
  );
}

export { Spinner };
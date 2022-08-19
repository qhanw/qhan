import { css } from "@emotion/react";
export const cssSeries = css`
  position: relative;
  padding-left: 30px;
  margin-left: 18px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 2px;
    overflow: hidden;
    background-color: #00bec6;
    left: 0;
    top: 0;
  }
  > li {
    position: relative;
    &:not(:last-child) {
      margin-bottom: 50px;
    }
    &:last-child {
      &::before {
        content: "";
        display: inline-block;
        height: 100%;
        width: 2px;
        background: #fff;
        position: absolute;
        left: -30px;
        bottom: 0;
      }
    }
    .icon-square {
      position: absolute;
      left: -41px;
    }

    > time {
      color: #00bec6;
      display: inline-block;
      text-align: right;
    }
  }

  .icon-square {
    position: relative;
    width: 24px;
    height: 24px;
    display: inline-block;
    &::before,
    &::after {
      content: "";
      display: inline-block;
      position: absolute;

      transform: rotateZ(45deg);
      border-radius: 2px;
    }

    &::before {
      width: inherit;
      height: inherit;
      border: 2px solid #00bec6;
      background-color: #fff;
      left: 0;
      top: 0;
    }
    &::after {
      width: 10px;
      height: 10px;
      background-color: #00bec6;
      left: 7px;
      top: 7px;
    }
  }

  @media only screen and (min-width: 992px) {
    margin-left: 150px;
    > li {
      > time {
        position: absolute;
        left: -210px;
        width: 150px;
      }
    }
  }
  @media only screen and (min-width: 1200px) {
    margin-left: 240px;
    > .series-content {
      max-width: 640px;
    }
  }
`;

export const cssProject = css`
  .icon-square {
    transform: scale(0.5);
  }
  > time {
    font-size: 14px;
    font-style: italic;
    left: -205px !important;
    padding-right: 5px;
    color: #999 !important;
  }
`;

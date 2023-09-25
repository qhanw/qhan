"use client";
import Script from "next/script";
import Image from "next/image";

import "./common.scss";
import "./impress.scss";

import IMG_1 from "./images/IMG_1.jpg";
import IMG_2 from "./images/IMG_2.jpg";
import IMG_3 from "./images/IMG_3.jpg";

export default function PPT() {
  return (
    <>
      <div
        id="impress"
        data-transition-duration="1000"
        data-width="1024"
        data-height="768"
        data-max-scale="3"
        data-min-scale="0"
        data-perspective="1000"
        data-autoplay="7"
      >
        <div
          id="bored"
          className="step slide"
          data-x="-1000"
          data-y="-1500"
          data-autoplay="10"
        >
          <Image src={IMG_1} alt="" />
          <div>Are You Ready?</div>
        </div>

        <div className="step slide" data-x="0" data-y="-1500">
          <Image src={IMG_2} alt="" />
          <div>Are You Ready?</div>
        </div>

        <div className="step slide" data-x="1000" data-y="-1500">
          <Image src={IMG_3} alt="" />
          <div>Are You Ready?</div>
        </div>

        {/*
        
        This is an example of step element being scaled.
        
        Again, we use a `data-` attribute, this time it's `data-scale="4"`, so it means that this
        element will be 4 times larger than the others.
        From presentation and transitions point of view it means, that it will have to be scaled
        down (4 times) to make it back to its correct size.
        
    */}
        <div id="title" className="step" data-x="0" data-y="0" data-scale="4">
          <span className="try">then you should try</span>
          <h1>
            impress.js<sup>*</sup>
          </h1>
          <span className="footnote">
            <sup>*</sup> no rhyme intended
          </span>
        </div>

        {/*
        
        This element introduces rotation.
        
        Notation shouldn't be a surprise. We use `data-rotate="90"` attribute, meaning that this
        element should be rotated by 90 degrees clockwise.
        
    */}
        <div
          id="its"
          className="step"
          data-x="850"
          data-y="3000"
          data-rotate="90"
          data-scale="5"
        >
          <p>
            It’s a <strong>presentation tool</strong> <br />
            inspired by the idea behind <a href="http://prezi.com">
              prezi.com
            </a>{" "}
            <br />
            and based on the{" "}
            <strong>power of CSS3 transforms and transitions</strong> in modern
            browsers.
          </p>
        </div>

        <div
          id="big"
          className="step"
          data-x="3500"
          data-y="2100"
          data-rotate="180"
          data-scale="6"
        >
          <p>
            visualize your <b>big</b> <span className="thoughts">thoughts</span>
          </p>
        </div>

        {/*
        
        And now it gets really exciting! We move into third dimension!
        
        Along with `data-x` and `data-y`, you can define the position on third (Z) axis, with
        `data-z`. In the example below we use `data-z="-3000"` meaning that element should be
        positioned far away from us (by 3000px).
        
    */}
        <div
          id="tiny"
          className="step"
          data-x="2825"
          data-y="2325"
          data-z="-3000"
          data-rotate="300"
          data-scale="1"
        >
          <p>
            and <b>tiny</b> ideas
          </p>
        </div>

        {/*
        
        This step here doesn't introduce anything new when it comes to data attributes, but you
        should notice in the demo that some words of this text are being animated.
        It's a very basic CSS transition that is applied to the elements when this step element is
        reached.
        
        At the very beginning of the presentation all step elements are given the class of `future`.
        It means that they haven't been visited yet.
        
        When the presentation moves to given step `future` is changed to `present` class name.
        That's how animation on this step works - text moves when the step has `present` class.
        
        Finally when the step is left the `present` class is removed from the element and `past`
        class is added.
        
        So basically every step element has one of three classes: `future`, `present` and `past`.
        Only one current step has the `present` class.
        
        Note: data-x/y/z attributes, if not defined, by default will inherit the value of the 
        previous step. So to get back to 0 on the z-axis, we must set it to 0.
        See src/plugins/rel/README.md for more information.
        
    */}
        <div
          id="ing"
          className="step"
          data-x="3500"
          data-y="-850"
          data-z="0"
          data-rotate="270"
          data-scale="6"
        >
          <p>
            by <b className="positioning">positioning</b>,{" "}
            <b className="rotating">rotating</b> and{" "}
            <b className="scaling">scaling</b> them on an infinite canvas
          </p>
        </div>

        <div
          id="imagination"
          className="step"
          data-x="6700"
          data-y="-300"
          data-scale="6"
        >
          <p>
            the only <b>limit</b> is your{" "}
            <b className="imagination">imagination</b>
          </p>
        </div>

        <div
          id="source"
          className="step"
          data-x="6300"
          data-y="2000"
          data-rotate="20"
          data-scale="4"
        >
          <p>want to know more?</p>
          <q>
            <a href="http://github.com/impress/impress.js">use the source</a>,
            Luke!
          </q>
        </div>

        <div
          id="one-more-thing"
          className="step"
          data-x="6000"
          data-y="4000"
          data-scale="2"
        >
          <p>one more thing...</p>
        </div>

        {/*
        
        And the last one shows full power and flexibility of impress.js.
        
        You can not only position element in 3D, but also rotate it around any axis.
        So this one here will get rotated by -40 degrees (40 degrees anticlockwise) around X axis and
        10 degrees (clockwise) around Y axis.
        
        You can of course rotate it around Z axis with `data-rotate-z` - it has exactly the same effect
        as `data-rotate` (these two are basically aliases).
        
    */}
        <div
          id="its-in-3d"
          className="step"
          data-x="6200"
          data-y="4300"
          data-z="-100"
          data-rotate-x="-40"
          data-rotate-y="10"
          data-scale="2"
        >
          <p>
            <span className="have">have</span> <span className="you">you</span>{" "}
            <span className="noticed">noticed</span>{" "}
            <span className="its">it’s</span> <span className="in">in</span>{" "}
            <b>
              3D<sup>*</sup>
            </b>
            ?
          </p>
          <span className="footnote">* beat that, prezi ;)</span>
        </div>

        {/*
        
        So to summarize of all the possible attributes used to position presentation steps, we have:
        
        * `data-x`, `data-y`, `data-z` - they define the position of **the center** of step element on
            the canvas in pixels; their default value is 0;
        * `data-rotate-x`, `data-rotate-y`, 'data-rotate-z`, `data-rotate` - they define the rotation of
            the element around given axis in degrees; their default value is 0; `data-rotate` and `data-rotate-z`
            are exactly the same;
        * `data-scale` - defines the scale of step element; default value is 1
        
        These values are used by impress.js in CSS transformation functions, so for more information consult
        CSS transfrom docs: https://developer.mozilla.org/en/CSS/transform
        
    */}
        {/*  */}
        <div
          id="overview"
          className="step"
          data-x="3000"
          data-y="1500"
          data-z="0"
          data-scale="10"
        ></div>
      </div>
      <Script
        src="https://cdn.jsdelivr.net/gh/impress/impress.js@2.0.0/js/impress.js"
        onReady={() => {
          window.impress().init();
        }}
      />
    </>
  );
}

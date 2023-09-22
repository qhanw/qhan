"use client";
import Script from "next/script";
import "./common.css";
import "./impress.css";

export default function PPT() {
  return (
    <>
      {/*
    
    Now that's the core element used by impress.js.
    
    That's the wrapper for your presentation steps. In this element all the impress.js magic happens.
    It doesn't have to be a `<div>`. Only `id` is important here as that's how the script find it.
    
    Often you don't need to use any attributes here, but for educational purposes I have used all of them below.

    To change the duration of the transition between slides use `data-transition-duration="2000"` giving it
    a number of ms. It defaults to 1000 (1s).
    
    When authoring impress.js presentations, you should target some screen size, which you can define here.
    The default is 1024 x 768. You should write your CSS as if this is the screen size used for the
    presentation. When you present your presentation on a screen (or browser window) of different size,
    impress.js will automatically scale the presentation to fit the screen. The minimum and maximum limits
    to this scaling can also be defined here.
    
    NOTE: I intend to change the defaults to target HD screens in 2021. So you may want to make a habit
    of explicitly defining these attributes for now, to avoid any disruption when the defaults change.
    
    You can also control the perspective with `data-perspective="500"` giving it a number of pixels.
    It defaults to 1000. You can set it to 0 if you don't want any 3D effects.
    If you are willing to change this value make sure you understand how CSS perspective works:
    https://developer.mozilla.org/en/CSS/perspective
    
    Plugins:
    
    We set the default time for autoplay plugin to 7 seconds. Autoplay will automatically advance
    to next slide after a timeout expires.
*/}
      <div
        className="z-50"
        id="impress"
        data-transition-duration="1000"
        data-width="1024"
        data-height="768"
        data-max-scale="3"
        data-min-scale="0"
        data-perspective="1000"
        data-autoplay="7"
      >
        {/*
        
        Here is where interesting thing start to happen.
        
        Each step of the presentation should be an element inside the `#impress` with a className name
        of `step`. These step elements are positioned, rotated and scaled by impress.js, and
        the 'camera' shows them on each step of the presentation.
        
        Positioning information is passed through data attributes.
        
        In the example below we only specify x and y position of the step element with `data-x="-1000"`
        and `data-y="-1500"` attributes. This means that **the center** of the element (yes, the center)
        will be positioned in point x = -1000px and y = -1500px of the presentation 'canvas'.
        
        It will not be rotated or scaled.
        
        --------
        Plugins: For first slide, set the autoplay time to a custom 10 seconds.
        
    */}
        <div
          id="bored"
          className="step slide"
          data-x="-1000"
          data-y="-1500"
          data-autoplay="10"
        >
          <q>
            Aren’t you just <b>bored</b> with all those slides-based
            presentations?
          </q>
        </div>

        {/*
        
        The `id` attribute of the step element is used to identify it in the URL, but it's optional.
        If it is not defined, it will get a default value of `step-N` where N is a number of slide.
        
        So in the example below it'll be `step-2`.
        
        The hash part of the url when this step is active will be `#/step-2`.
        
        You can also use `#step-2` in a link, to point directly to this particular step.
        
        Please note, that while `#/step-2` (with slash) would also work in a link it's not recommended.
        Using classic `id`-based links like `#step-2` makes these links usable also in fallback mode.
        
    */}
        <div className="step slide" data-x="0" data-y="-1500">
          <q>
            Don’t you think that presentations given{" "}
            <strong>in modern browsers</strong> shouldn’t{" "}
            <strong>copy the limits</strong> of ‘classic’ slide decks?
          </q>
        </div>

        <div className="step slide" data-x="1000" data-y="-1500">
          <q>
            Would you like to <strong>impress your audience</strong> with{" "}
            <strong>stunning visualization</strong> of your talk?
          </q>
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

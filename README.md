MMO Online HD
=============

###Round Two! 
MMO Online spent too much time reinventing the wheel. Time to embrace the future, where everything is built on everything else. There are many reasons why this will be objectively better than the original.

#####pixi.js
This snazzy rendering engine is going to take a load off my shoulders, so I can focus more on quality networking, and actually having gameplay. It will also be much faster on browsers that support WebGL, and its support for Spine will obsolete my own 2D rigging system. I enjoyed making it, but there is so much I'd like to redo, and it's just too much work to do solo.

#####CreateJS
Backed by several big players such as Adobe, this will include libraries to handle asset preloading and sound. While my own preloader was novel, it was a pain to work with, and had problems with loading new versions of changed assets. Further, its measly cache of 2.5MB wasn't really going to save anyone much time. Perhaps something to revisit when local caching is more mature.

#####Java?!
Not final yet, but implementing the browser in a more multithreading-friendly language like Java would make everything better for everyone. Java is becoming more of a naughty word these days, so I'll look into C# as an alternative. Given that this is a solo project, I'm not looking to stay quite high level, for time's sake. Using a language such as this will make a more compressed serialization, like MessagePack, a more appealing alternative.

#####Improved Latency Compensation
The old system was modelled somewhat after TCP's "ramp up, fall back" mechanism. It was okay, but it wasn't great. The new scheme is much smarter, smoother, and all around better.

#####I'm just better now
Plain and simple. I know JavaScript better, and I know networking better. Look out, world.

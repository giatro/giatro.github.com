---
layout: post
title:  "Using XBee on Raspberry Pi"
date:   2015-10-07
tags: [raspberry pi, xbee]
---

{% highlight sh %}

#install minicom
sudo apt-get install minicom

#start serial connection
minicom -b 9600 -o -D /dev/ttyUSB0

{% endhighlight %}